"use server"
import db from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export async function starToggleAction(noteId : number) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user.id){
        throw new Error("Not authenticated")
    }


    const userId = session.user.id

    const existingStar = await db.starredNotes.findFirst({
        where : {
            userId : Number(userId),
            noteId
        }
    })

    if(existingStar){
        await db.starredNotes.delete({
            where : {
                id : existingStar.id
            }
        })

        await db.notes.update({
            where : {
                id : noteId
            },
            data : {
                stars : {
                    decrement : 1
                }
            }
        })
    }
    else{
        await db.starredNotes.create({
            data : {
                userId : Number(userId),
                noteId
            }
        })

        await db.notes.update({
            where : {
                id : noteId
            },
            data : {
                stars : {
                    increment : 1
                }
            }
        })
    }

    return {success : true}
    

}