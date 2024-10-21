import db from "@repo/db/client"
import ChapterCard from "../../../components/cards/ChapterCard";
import {ChapterType} from "@repo/types"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";

export default async function Notes({params} : {params : {courseId : string, notesId : string,courseName:string}}){

    const getNoteContent = async () =>{

        const session = await getServerSession(authOptions);

        const notes = await db.notes.findUnique({
            where:{
                id : Number(params.notesId),
                course : {
                    id : Number(params.courseId),
                    collegeId: session.collegeId
                }
            }
        })

        if(!notes){
            throw new Error("Notes not found")
        }
        console.log(notes)
        return notes
    }   
    const getCourseName = async () => {

        const session = await getServerSession(authOptions)

        if (!session || !session.user.id || !session.collegeId) {
            throw new Error("User not authorized");
        }

        const course = await db.course.findUnique({
            where:{
                id : Number(params.courseId),
                collegeId : session.collegeId
            },
            select :{
                name : true
            }
        })
        if(!course){
            throw new Error("Course not found")
        }
        return course
    }

    const notesByUser = await getNoteContent()
    // const content = notesByUser.content ? JSON.parse(notesByUser.content as string) : null;
    const courseName = await getCourseName();
    return (
        <div>

            <div className="flex flex-col items-center justify-center pt-10">
                <h1 className="text-3xl">Notes for {courseName.name} by {notesByUser.username}</h1>

                <div className="flex w-6/12 flex-col gap-5 mt-10">
                    {
                    
                    notesByUser.content ? JSON.parse(JSON.stringify((notesByUser.content))).map((note:any)=>{
                        return (
                            
                                <ChapterCard
                                    chapterNumber={note.chapterNumber}
                                    chapterName={note.chapterName}
                                    chapterContent={note.chapterContent}
                                />
                       
                        )
                    })
                    : "No notes available"}
                </div>
            </div>
        </div>
    )
    
}