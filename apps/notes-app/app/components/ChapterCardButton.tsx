"use client"
import { GradientButton } from "@repo/ui"


export function ChapterCardButton({link}:{link:string}){
    return (
        <GradientButton
            title="View Notes"
            onClick={() => {window.open(link,'_blank')}}
        />
    )
}