import db from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import {StarButton} from "../../../components/buttons/StarButton"
import { NotesAccordion } from "../../../components/cards/NotesAccordion";

export default async function Notes({params} : {params : {courseId : string, notesId : string,courseName:string}}){

    const getNoteContent = async () =>{

        const session = await getServerSession(authOptions);

        if (!session || !session.user.id || !session.collegeId) {
            throw new Error("User not authorized");
        }

        const notes = await db.notes.findUnique({
            where: {
                id: Number(params.notesId),
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
        console.log(notes)
        return notes
    }   


    const notesByUser = await getNoteContent()
    return (
        <div>
            <div>
                <img src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="" 
                className="w-full h-64 object-cover"/>
            </div>

            <div className="flex justify-center px-3">
                <div className="flex flex-col items-center justify-center pt-10 w-full md:w-10/12">
                    <div className="flex items-center justify-between mx-2 w-full">
                        <div>
                            <h1 className="text-3xl">Notes for {notesByUser.course.name} by {notesByUser.username}</h1>
                        </div>
                        <div>
                            <StarButton isStarred={notesByUser.starredBy.length > 0} totalStars={notesByUser.stars} noteId={notesByUser.id}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-5 mt-10 ">
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