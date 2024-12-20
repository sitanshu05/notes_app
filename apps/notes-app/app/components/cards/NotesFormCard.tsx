import { useFieldArray, useFormContext } from "react-hook-form"
import { DeleteIconButton, GradientButton } from "@repo/ui"
import {Button, Input} from "@nextui-org/react"
import { Tabs, Tab } from "@nextui-org/react"
export function NotesFormCard({chapterIndex} : any){

    const {control, register} = useFormContext();

    const {fields, append,remove} = useFieldArray({
        control,
        name : `chapters.${chapterIndex}.chapterContent`
    })

    return (
        <div>

            {
                fields.map((content,index)=>{
                    return(
                        <div className=" shadow-lg rounded-lg bg-zinc-950 flex flex-col mb-8 p-5" key={content.id}>

                            <Input
                            type="text"
                            label="About Note"
                            {...register(`chapters.${chapterIndex}.chapterContent.${index}.text`)}
                            />

                            <Tabs className="mt-5">
                                <Tab title="Link">
                                    <Input
                                    type="text"
                                    {...register(`chapters.${chapterIndex}.chapterContent.${index}.link`)}
                                    />
                                </Tab>
                                <Tab title="Upload">
                                    <Input
                                    type="file"
                                    {...register(`chapters.${chapterIndex}.chapterContent.${index}.link`)}
                                    />
                                </Tab>
                            </Tabs>
                            <div className="w-full flex justify-end">
                                <DeleteIconButton onClick={() => {remove(index)}} />
                            </div>
                        </div>


                    )
                })
            }

            <div className="w-full flex justify-center">
                <Button className="text-3xl font-extralight text-gray-400 w-full bg-zinc-700 hover:bg-zinc-600 "
                onClick={() => append({ text: "", link: "" })} // Append a new note
                type="button"
                >
                    +
                </Button>
            </div>
    
            
        </div>
    )
}