"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { NoteType } from "@repo/types";
// import { connect } from "http2";
// import { Form } from "aws-sdk/clients/amplifyuibuilder";


// model Notes {
//     id Int @id @default(autoincrement())
//     name String
//     stars Int @default(0)
//     courseId Int
//     username String
//     content Json?
//     course Course @relation(fields: [courseId],references: [id])
//     user User @relation(fields: [username],references: [username])
  
//   }

export async function addNotesAction(notes : NoteType){


    const session = await getServerSession(authOptions);


    const addNotes = await db.notes.create({
        data : {
            name : notes.noteName,
            courseId: notes.courseId,
            username : session?.user?.username,
            about : notes.aboutNote,
            content : JSON.parse(JSON.stringify(notes.chapters))
        }
    })


    return {success : true}



    
   

}
