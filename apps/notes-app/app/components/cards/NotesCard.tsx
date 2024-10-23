"use client"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { useRouter} from "next/navigation"


type NotesCardProps = {
    name: string
    stars: number
    username: string
    noteId: number,
    courseId : number
    courseName? : string
}
export const NotesCard = ({name,stars,username,noteId,courseId,courseName}: NotesCardProps) =>{

   
    const router = useRouter();

    return (
        <div className="min-w-64">
            <Card isPressable onPress={()=>{router.push(`/courses/${courseId}/${noteId}`)}} className="w-full">
                <CardHeader className="flex gap-5">
                    <h2>{name}</h2>  <br></br>
                    <h3>stars: {stars}</h3>
                </CardHeader>
                <CardBody>
                    {courseName ? <p>Course: {courseName}</p> : <p>by {username}</p> }
                </CardBody>
            </Card>
        </div>
    )
}

