"use client"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { useRouter} from "next/navigation"


type NotesCardProps = {
    name: string
    stars: number
    username: string
    noteId: number,
    courseId : number
}
export const NotesCard = ({name,stars,username,noteId,courseId}: NotesCardProps) =>{

   
    const router = useRouter();

    return (
        <div>
            <Card isPressable onPress={()=>{router.push(`${courseId}/${noteId}`)}}>
                <CardHeader className="flex gap-5">
                    <h2>{name}</h2>  <br></br>
                    <h3>stars: {stars}</h3>
                </CardHeader>
                <CardBody>
                    <p>by {username}</p>
                </CardBody>
            </Card>
        </div>
    )
}

