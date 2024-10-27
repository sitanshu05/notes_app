"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { NoteType } from "@repo/types";
import { noteUploadSchema } from "@repo/schemas";

export async function addNotesAction(notes : NoteType){


    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.username) {
            throw new Error("User not authorized");
        }
    
        // Validate note data
        const parsedNotes = noteUploadSchema.safeParse(notes);
        if (!parsedNotes.success) {
            return { success: false, error: parsedNotes.error.message};
        }
    
    
        const note = await db.notes.create({
            data : {
                name : notes.noteName,
                courseId: notes.courseId,
                username : session?.user?.username,
                image : notes.image,
                about : notes.aboutNote,
                content : JSON.parse(JSON.stringify(notes.chapters))
            }
        })
        return {success : true, noteId:note.id}

    }catch(e){
        return {
            success : false,
            error: e instanceof Error ? e.message : "An unexpected error occurred.",
        };
    }
   

}
