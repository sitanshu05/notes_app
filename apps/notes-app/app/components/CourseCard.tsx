"use client"
import {Card , CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {useRouter} from "next/navigation";


type CardProps = {
    title : string
    text : string
    courseId : number
}
export const CourseCard = ({title,text,courseId}: CardProps) => {

    const router = useRouter()


    return (

        <Card  className="w-full max-w-64" isPressable onPress={()=> router.push(`/courses/${courseId}`)}>
            <CardHeader className="w-full flex justify-center">
            <p>{title}</p> 
            </CardHeader>
            <CardBody className=" text-center">
                <p>{text}</p>
            </CardBody>
        </Card>

    )
}