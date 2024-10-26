"use client"
import { Button } from "@nextui-org/button";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { starToggleAction } from "../../actions/starToggleAction";
import { useState } from "react";


interface StarButtonProps {
    isStarred : boolean
    totalStars : number
    noteId : number
}
export function StarButton({isStarred, totalStars,noteId} : StarButtonProps) {

    const [starState, setStarState] = useState<{isStarred : boolean, totalStars : number}>({isStarred : isStarred, totalStars : totalStars})
    

    const handleToggle = async () => {
        await starToggleAction(noteId)
        
        setStarState({
            isStarred : !starState.isStarred,
            totalStars : starState.isStarred ? starState.totalStars - 1 : starState.totalStars + 1
        })
    }

    
    return (
        <Button onClick={handleToggle}>
            <div className="flex gap-2 items-center justify-evenly p-1">
                {starState.isStarred ? <FaStar size={25} color="#FFD700"/> : <CiStar size={25}/>}
                stars: {starState.totalStars}
            </div>
        </Button>
    )
}