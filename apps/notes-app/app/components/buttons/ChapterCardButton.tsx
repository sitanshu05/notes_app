"use client"
import { GradientButton } from "@repo/ui"
import { useRouter } from "next/navigation"
import {useSetViewingLink} from "@repo/store/viewinglink"


export function ChapterCardButton({link}:{link:string}){

    const router = useRouter()
    const setLink = useSetViewingLink()

    
    
    const onClickHandler = () => {
        if(link.startsWith("https://pub-67d4aa85b0554d29b1dcec76b76c1fe2.r2.dev")){
            setLink(link)
            router.push(`/viewfile`)

        }else{
            window.open(link,"_blank");
        }
    }

    return (
        <GradientButton
            title="View Notes"
            onClick={onClickHandler}
        />
    )
}