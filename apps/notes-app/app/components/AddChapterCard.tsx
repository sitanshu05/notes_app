"use client"
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { DeleteIconButton, GradientButton, InputBox } from "@repo/ui";
import { ChapterNoteType, ChapterType, NoteType } from "@repo/types";
import { Control, Controller, FieldArrayWithId, useFieldArray } from "react-hook-form";

type AddChapterCardProps = {
    chapterIndex : number
    chapter : ChapterType
    control: Control<{ notes : NoteType }>
    key : string
    removeChapter : (index : number)=>void
}

export function AddChapterCard({chapterIndex,control,removeChapter}:AddChapterCardProps){


    const { fields: notes, append: appendNote, remove } = useFieldArray({
        control,
        name: `notes.chapters.${chapterIndex}.chapterNotes` // Adjust the name to match the structure
    });

    
    return (
        <div>
            <Card className="p-3">
                <CardHeader className="flex justify-evenly gap-10">
                    <div>
                        <Controller
                            name={`notes.chapters.${chapterIndex}.chapterNumber`}
                            control={control}
                            render={({ field }) => (
                            <InputBox
                                type="number"
                                label="Chapter Number"
                                {...field}
                            />
                            )}
                        />
                    </div>
                
                    <Controller
                        name={`notes.chapters.${chapterIndex}.chapterName`}
                        control={control}
                        render={({ field }) => (
                        <InputBox
                            type="text"
                            label="Chapter Name"
                            {...field}
                        />
                        )}
                    />
                    <DeleteIconButton onClick={()=>removeChapter(chapterIndex)}/>
                    
                </CardHeader>
                <CardBody>
                    <div className="p-5 border border-solid border-slate-500 rounded-2xl flex flex-col gap-5">
                    {notes.map((note, noteindex) => (
                        <div
                        key={note.id}
                        className="p-5 border border-solid border-slate-500 rounded-2xl flex flex-col gap-5 mb-4"
                        >
                            <Controller
                                    control={control}
                                    name={`notes.chapters.${chapterIndex}.chapterNotes.${noteindex}.text`}
                                    render={({ field }) => (
                                        <InputBox
                                            type="text"
                                            label={`About Note ${noteindex + 1}`}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={`notes.chapters.${chapterIndex}.chapterNotes.${noteindex}.link`}
                                    render={({ field }) => (
                                        <InputBox
                                            type="text"
                                            label={`Link ${noteindex + 1}`}
                                            {...field}
                                        />
                                    )}
                                />
                            <div className="flex justify-end">
                                <DeleteIconButton onClick={() => {
                                    console.log("Removing note at index:", noteindex, "with data:", note);
                                    remove(noteindex);
                                    console.log("Updated notes:", notes); // Check the updated notes array
                                }} />
                            </div>
                        </div>
                    ))}
                   <GradientButton
                        title="Add Note"
                        onClick={() => appendNote({ text: "", link: "" })} // Append a new note
                        type="button"
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}