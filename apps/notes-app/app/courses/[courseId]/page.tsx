import { getServerSession } from "next-auth";
import { NotesCard } from "../../components/NotesCard";
import db from "@repo/db/client"
import { authOptions } from "../../lib/authOptions";
import { AddChapterButton } from "../../components/AddChapterButton";
export default async function CoursePage({params} : {params : {courseId : string}}){

    const getNotes = async () =>{
        const session = await getServerSession(authOptions)

        if (!session || !session.user.id || !session.collegeId) {
            throw new Error("User not authorized");
        }

        const notes = await db.notes.findMany({
            where:{
                courseId : Number(params.courseId),
                course : {
                    collegeId : session.collegeId
                }
                
            },
        })
        console.log(notes)
        return notes
    }

    const notes = await getNotes()

    return (
        <div className="flex flex-col items-center gap-5 pt-20">
            <h1>Notes for CourseName</h1>

            {
            notes.length > 0 ? 
            <div>
                {notes.map((course)=>{
                    return (
                        <NotesCard
                        name={course.name}
                        stars={course.stars}
                        username={course.username}
                        noteId={course.id}
                        courseId={course.courseId}
                        />
                    )
                })}
            </div>
            :
            <div>Invalid course id</div>
            } 
        </div>
    )
}