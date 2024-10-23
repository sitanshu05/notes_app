import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/authOptions"
import { NotesCard } from "../components/cards/NotesCard"


const getNotes = async () => {

    const session = await getServerSession(authOptions)

    const username = session.user.username;

    const notes = await db.notes.findMany({
        where : {
            username : username
        },
        include : {
            course : {
                select : {
                    name : true
                }
            }
        }
    })

    return notes
}


export default async function MyNotes() {

    return(
        <>
            <div className="text-3xl w-full text-center my-5">Notes</div>

            <div className="flex flex-col gap-5 items-center justify-center">

            {
                (await getNotes()).map(note=>{
                    return <NotesCard
                    name={note.name}
                    stars={note.stars}
                    username={note.username}
                    noteId={note.id}
                    courseId={note.courseId}
                    courseName={note.course.name}
                    />
                })
            }
            </div>
        </>
    )

}