"use client"
import {Card , CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import { CapitalizeEveryWord } from "../../utils/CapitalizeEveryWord";


type CardProps = {
    name : string
    courseCode : string
    courseId : number
}
export const CourseCard = ({name,courseCode, courseId,}: CardProps) => {

    const router = useRouter()

    const handleRedirect = () => {
        router.push(`/courses/${courseId}`)
    }


    return (
        <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full max-w-md transition-all box-shadow hover:scale-105 duration-300 hover:-translate-y-2"
        isPressable
        onPress={handleRedirect}
        >
            <Image
                src={"https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                className="object-cover"
            />
            <CardFooter className="justify-between bg-zinc-800/55  border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 min-h-16" >
                <div className="flex justify-between items-start w-full text-left">
                    <div>
                        <p className="text-xl font-bold tracking-tight ">{CapitalizeEveryWord(name)}</p>
                        <p className="text-sm mt-1 font-thin">by {courseCode}</p>
                    </div>
                 
                </div>

            </CardFooter>

        </Card>

    )
}