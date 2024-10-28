import db from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import {StarButton} from "../../../components/buttons/StarButton"
import { NotesAccordion } from "../../../components/cards/NotesAccordion";
import { CapitalizeEveryWord } from "../../../utils/CapitalizeEveryWord";
import { EditNoteButton } from "../../../components/buttons/EditNoteButton";

export default async function Notes({params} : {params : {courseId : string, notesId : string,courseName:string}}){

    const session = await getServerSession(authOptions)

    const getNoteContent = async () =>{

        const session = await getServerSession(authOptions);

        if (!session || !session.user.id || !session.collegeId) {
            throw new Error("User not authorized");
        }

        const notes = await db.notes.findUnique({
            where: {
                id: Number(params.notesId),
                courseId: Number(params.courseId),
                course: {
                    collegeId: session.collegeId
                }
            },
            include: {
                course: true,

                starredBy : {
                    where:{
                        userId : Number(session.user.id)
                    }
                }
            }
        });

        if(!notes){
            throw new Error("Notes not found")
        }
        return notes
    }   

    const noteBelongToUser = () => {
        return notesByUser.username == session.user.username
    }


    const notesByUser = await getNoteContent()


    return (
        <div>
            <div>
                <img src={notesByUser.image}
                alt="" 
                className="w-full h-64 object-cover"/>
            </div>

            <div className="flex justify-center px-3">
                <div className="flex flex-col items-center justify-center pt-10 w-full md:w-10/12">
                    <div className="flex items-start justify-between mx-2 w-full">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">{CapitalizeEveryWord(notesByUser.name)}</h1>
                            <p className="text-lg font-light text-zinc-400 pt-2">by {notesByUser.username}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <StarButton isStarred={notesByUser.starredBy.length > 0} totalStars={notesByUser.stars} noteId={notesByUser.id}/>
                            {noteBelongToUser() && <EditNoteButton courseId={notesByUser.courseId} noteId={notesByUser.id}/>}
                        </div>
                    </div>
                    <div className="text-md text-left mt-5 text-zinc-200 font-normal w-full">
                        {notesByUser.about}
                    </div>
                    <div className="flex w-full flex-col gap-5 my-10 ">
                        {
                        notesByUser.content ?
                        <NotesAccordion chapters={JSON.parse(JSON.stringify((notesByUser.content)))}/>
                        : "No notes available"}
                    </div>
                </div>
            </div>
        </div>
    )
    
}