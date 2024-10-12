"use client";
import { useParams } from "next/navigation";
import { AddChapterCard } from "../components/AddChapterCard";
import { NoteType } from "@repo/types";
import { GradientButton, InputBox } from "@repo/ui";
import { useForm, useFieldArray } from "react-hook-form";
import { addNotesAction } from "../actions/addNotesAction";
import { Input } from "@nextui-org/react";

export function AddChapterForm(){

    const {courseId} = useParams();
    
    const { control } = useForm<{ notes: NoteType }>({
        defaultValues: {
            notes :{
                noteName : "",
                aboutNote : "",
                chapters: [{ chapterNumber : 0, chapterName: "", chapterNotes: [{ text: "", link: "" }] }]
            }
        }
    });

    const { fields, append , remove : removeChapter} = useFieldArray({
        control,
        name: "notes.chapters"
    });

    return (
        <form action={addNotesAction}>
            <input type="text" value={courseId} hidden name="courseId"/>
           <Input
               {...control.register("notes.noteName")}
               label="Note Name"
           />
           <Input
               {...control.register("notes.aboutNote")}
               label="About Note"
           />

            <div className=" p-10">
                {fields.map((chapter, index) => (
                    <div key={chapter.id}>
                        <AddChapterCard
                            key={chapter.id} // Use a unique identifier if available
                            chapter={chapter}
                            control={control}
                            chapterIndex={index}
                            removeChapter={removeChapter}
                        />
                    </div>
                ))}
            </div>
            <GradientButton 
                title="Add Chapter"
                onClick={() => append({ chapterNumber: fields.length + 1, chapterName: "", chapterNotes: [{ text: "", link: "" }] })}
                type="button"
            />
            <GradientButton 
                title="Submit All Chapters"
                type="submit"
            />
        </form>
    );
   
}
