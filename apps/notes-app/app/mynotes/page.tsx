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
        },
        orderBy : {
            stars : "desc"
        }
    })

    return notes
}


export default async function MyNotes() {

    return(
        <div className="w-full max-w-[1440px] mx-auto mt-16 px-2">
            <div className="text-3xl font-bold tracking-tight w-full text-left ml-2 md:ml-5 my-5">My Notes</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-1 md:p-5">

            {
                (await getNotes()).map(note=>{
                    return <NotesCard
                    name={note.name}
                    image={note.image}
                    stars={note.stars}
                    username={note.username}
                    noteId={note.id}
                    courseId={note.courseId}
                    courseName={note.course.name}
                    />
                })
            }
            </div>
        </div>
    )

}