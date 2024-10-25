"use client"
import { Card,  CardFooter, Image } from "@nextui-org/react"
import { useRouter} from "next/navigation"
import { FaStar } from "react-icons/fa";
import { CapitalizeEveryWord } from "../../utils/CapitalizeEveryWord";


type NotesCardProps = {
    name: string
    stars: number
    username: string
    noteId: number
    image: string
    courseId : number
    courseName? : string
}
export const NotesCard = ({name,stars,username,noteId,image,courseId,courseName}: NotesCardProps) =>{

   
    const router = useRouter();

    const handleRedirect = () => {
        router.push(`/courses/${courseId}/${noteId}`)
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
                src={image}
                className="object-cover"
            />
            <CardFooter className="justify-between bg-zinc-800/55  border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 min-h-16" >
                <div className="flex justify-between items-start w-full text-left">
                    <div>
                        <p className="text-xl font-bold tracking-tight ">{CapitalizeEveryWord(name)}</p>
                        <p className="text-sm mt-1 font-thin">by {username}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 rounded-md px-2">
                        <div className="flex items-center gap-1">
                            <p>{stars}</p>
                            <FaStar color="#FFD700"/>
                        </div>
                        {courseName && <div>{courseName}</div>}
                    </div>
                </div>

            </CardFooter>

        </Card>
    )
}

