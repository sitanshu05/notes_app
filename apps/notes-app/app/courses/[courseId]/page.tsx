import { getServerSession } from "next-auth";
import { NotesCard } from "../../components/cards/NotesCard";
import db from "@repo/db/client"
import { authOptions } from "../../lib/authOptions";
import { CreateNoteButton } from "../../components/buttons/CreateNoteButton";
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
                },
            },
            include : {
                course : {
                    select : {
                        name : true
                    }
                }
            },
            orderBy : {
                stars : "desc"
            }
        })

        return notes
    }

    const notes = await getNotes()

    return (
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-5 pt-10 md:pt-16 text-left">
            <div className="w-full flex justify-between items-center px-2 md:px-5 md:pb-8">
                <h1 className="text-4xl font-bold tracking-tight">Notes for {notes[0]?.course.name}</h1>
                <CreateNoteButton courseId={Number(params.courseId)}/>
            </div>

            {
            notes.length > 0 ? 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
                {notes.map((note)=>{
                    return (
                        <NotesCard
                        name={note.name}
                        stars={note.stars}
                        image={note.image}
                        username={note.username}
                        noteId={note.id}
                        courseId={note.courseId}
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