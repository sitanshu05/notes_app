"use client"

import { GradientButton } from "@repo/ui";
import { useRouter } from "next/navigation";

export function EditNoteButton({courseId,noteId} : {courseId : number,noteId :number}){

    const redirect = useRouter();
    return (
            <GradientButton
                title="Edit Note"
                onClick={() => {redirect.push(`/courses/${courseId}/createNotes?noteId=${noteId}`)}}
            />
    )
}