"use client"

import { NoteType, NoteUploadType } from "@repo/types";
import { Button, Input} from "@nextui-org/react"
import { useFieldArray, useForm, FormProvider } from "react-hook-form"
import { DeleteIconButton, GradientButton, ImageUploadPopover } from "@repo/ui";
import { NotesFormCard } from "../cards/NotesFormCard";
import useFormPersist from 'react-hook-form-persist'
import { getPresignedURL } from "../../actions/getPresignedURL";
import axios from "axios";
import { addNotesAction } from "../../actions/addNotesAction";
import { useParams } from "next/navigation";
import { useGetImageUploadLink } from "@repo/store/imageuploadlink";



export const AddChapterForm = () => {
    const src = useGetImageUploadLink()

    const methods = useForm<NoteUploadType>({

        defaultValues : {
            noteName : "",
            aboutNote : "",
            image : src,
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

        data.courseId = Number(courseId);
        data.image = src


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
        <>
             <div className="relative">
                 <div>
                    <img src={src}
                    alt=""
                    className="w-full h-64 object-cover"/>
                </div>
                <div className="bg-zinc-800/60 absolute bottom-0 right-0 pr-3 pb-3 md:pb-6 md:pr-6 flex justify-between w-full items-center">
                    <h2 className="ml-2 text-bold tracking-tight text-2xl md:text-4xl mt-3 md:ml-20">Create Notes</h2>
                    <ImageUploadPopover/>
                </div>
             </div>
            <FormProvider {...methods} >
                <div className="flex justify-center w-full ">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-5xl">
                    <div className="p-5 flex flex-col gap-2">
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
                    </div>
                        <div className="flex w-full flex-col gap-6">
                        {
                            fields.map((chapter,index)=>{
                                return (
                                <div key={chapter.id} className=" bg-zinc-900 rounded-lg m-3 p-3 md:p-8">
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
                        </div>
                        <div className="w-full flex justify-end gap-3 md:gap-5 mt-3 mb-6 px-3">
                            <Button
                                className="bg-secondary"
                                onClick={() => append({ chapterNumber: fields.length + 1, chapterName: "", chapterContent: [{ text: "", link: "" }] })}
                                type="button"
                            >Add Chapter</Button>
                            <GradientButton
                                title="Submit"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
                </FormProvider>
            </>
    )

}