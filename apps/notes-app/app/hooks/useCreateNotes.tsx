import { NoteType, NoteUploadType } from "@repo/types";
import { useState } from "react";
import { getPresignedURL } from "../actions/getPresignedURL";
import axios from "axios";
import { addNotesAction } from "../actions/addNotesAction";
import { noteUploadSchema } from "@repo/schemas";


export function useCreateNotes(){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<null | string>(null);

    const createNote = async (data : NoteUploadType)=>{

        setLoading(true)
        const validationResult = noteUploadSchema.safeParse(data);
        if(!validationResult.success){
            setError(validationResult.error.errors[0]?.message || "Validation failed");
            setLoading(false);
            return {success : false, error : "validation fail"}
        }

        try {
            
            const notePromises = data.chapters.map(async (note,index)=>{
            const chapterPromises = note.chapterContent.map(async (content)=>{
                            
                if(content.link instanceof FileList){
                    const file = content.link[0];
                    if(!file){
                        return 
                    }
            
                    const url = await getPresignedURL();
            
                    if(url.success?.uploadUrl){
                        axios.put(url.success.uploadUrl, file, {
                            headers : {
                                "Content-Type" : file.type
                                    }
                                })
                            }
                                content.link = url.success?.publicUrl.toString()!;
                    }
                })
            
                await Promise.all(chapterPromises)
            })
            await Promise.all(notePromises)
            
            const result = await addNotesAction(data as NoteType)
            if(result.success){

                return {success : true, noteId : result.noteId}
            }else{
                setError(result.error ? result.error.toString()  :  "An unexpected error occurred.");
                return {success : false, error : result.error}
            }

        }catch(e){
            setError("An unexpected error occurred.");

        }finally{
            setLoading(false)
        }



    }

    return {loading,error,createNote}
}