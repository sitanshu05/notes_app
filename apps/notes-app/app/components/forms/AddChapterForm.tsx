"use client"

import { NoteType, NoteUploadType } from "@repo/types";
import { Input} from "@nextui-org/react"
import { useFieldArray, useForm, FormProvider } from "react-hook-form"
import { DeleteIconButton, GradientButton } from "@repo/ui";
import { NotesFormCard } from "../cards/NotesFormCard";
import useFormPersist from 'react-hook-form-persist'
import { getPresignedURL } from "../../actions/getPresignedURL";
import axios from "axios";
import { addNotesAction } from "../../actions/addNotesAction";
import { useParams } from "next/navigation";


export const AddChapterForm = () => {

    const methods = useForm<NoteUploadType>({

        defaultValues : {
            noteName : "",
            aboutNote : "",
            chapters : [{ chapterNumber : 1, chapterName: "", chapterContent: [{ text: "", link: "" }] }]
        }
    });

    const {register, handleSubmit,control,watch,setValue} =  methods
    const {courseId} = useParams();



    useFormPersist("notes",{
        watch,
        setValue,
        storage : window.localStorage,
    })

    const { fields, append , remove } = useFieldArray({
        control,
        name: "chapters"
    });


    const onSubmit = async (data : NoteUploadType) => { // add proper validation
        console.log(data)

        data.courseId = Number(courseId);


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

        addNotesAction(data as NoteType)
    }


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text"
                label="Note Name"
                {...register("noteName")}
                />
                <Input
                type="text"
                label="About Note"
                {...register("aboutNote")}
                />

                {
                    fields.map((chapter,index)=>{
                        return (
                        <div key={chapter.id} className="border border-gray-500 p-3">
                            <div className="flex gap-5 mb-5 items-center">
                                <Input type="number" label="Chapter #" {...register(`chapters.${index}.chapterNumber`)} className="max-w-28"/>
                                <Input type="text" label="Chapter Name" {...register(`chapters.${index}.chapterName`)} className="grow"/>
                                <DeleteIconButton onClick={()=>remove(index)}/>
                            </div>

                            <NotesFormCard control={control} chapterIndex={index} register={register} setValue={setValue}/>
                        </div>
                        )
                    })
                }

                <GradientButton 
                    title="Add Chapter"
                    onClick={() => append({ chapterNumber: fields.length + 1, chapterName: "", chapterContent: [{ text: "", link: "" }] })}
                    type="button"
                />
                <GradientButton 
                    title="Submit All Chapters"
                    type="submit"
                />
            </form>
            </FormProvider>
    )

}