"use client"

import { GradientButton } from "@repo/ui";
import { useRouter } from "next/navigation";

export function CreateNoteButton({courseId} : {courseId : number}){

    const redirect = useRouter();
    return (
            <GradientButton
                title="Create Note"
                onClick={() => {redirect.push(`${courseId}/createNotes`)}}
            />
    )
}