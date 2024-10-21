"use client"
import { GradientButton } from "@repo/ui"
import { useRouter } from "next/navigation"

export function AddChapterButton(courseId : number){

    const redirect = useRouter();
    return (
        <GradientButton
            title="Add Notes"
            onClick={() => {redirect.push(`/${courseId}/createNote`)}}
        />
    )
}