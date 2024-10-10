"use client"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { GradientButton } from "@repo/ui"
import {ChapterNoteType} from "@repo/types"
type ChapterCardProps = {
    chapterName : string,
    chapterNumber: number,
    chapterNotes: ChapterNoteType[]
}
export default function ChapterCard({chapterName,chapterNumber,chapterNotes}: ChapterCardProps) {
    return (
        <Card className="w-full border border-solid border-gray-900">
            <CardHeader>
                 Chapter {chapterNumber} {chapterName}
            </CardHeader>
            <CardBody>
               
                    {chapterNotes.map((note, index) => {
                        return (<div className="flex flex-col justify-between mt-8  border border-solid border-gray-800 p-3 rounded-3xl">
                            {note.text}
                            <div className="w-full flex justify-end">
                                <GradientButton
                                    title="View Notes"
                                    onClick={() => {window.open(note.link,'_blank')}}
                                />
                            </div>
                        </div>)
                    })}
               
            </CardBody>
            <CardFooter>
               
            </CardFooter>
        </Card>
    )
}