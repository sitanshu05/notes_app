"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { NoteType } from "@repo/types";
import { connect } from "http2";


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

export async function addNotesAction(formData : FormData){


    const session = await getServerSession(authOptions);
    
    if(!formData){
        return
    }
     const note : NoteType = {
        noteName : "",
        aboutNote : "",
        courseId : Number(formData.get("courseId")),
        chapters : []
    };


    for (const pair of formData) {
        const [key, value] = pair;

        // Parse top-level fields
        if(key.startsWith("$ACTION_ID")){
            continue;
        }
        else if (key === 'notes.noteName') {
            note.noteName = value.toString();
        } else if (key === 'notes.aboutNote') {
            note.aboutNote = value.toString()
        }else{

            const chapterIndex = Number(key.slice(15,16))


            if(chapterIndex == note.chapters.length){

                note.chapters.push({
                    chapterNumber: 0,
                    chapterName: '',
                    chapterNotes: []
                });
            }
            const subkey = key.slice(17)
            
            if(note.chapters[chapterIndex]){

                if(subkey == "chapterName"){
                    note.chapters[chapterIndex].chapterName = value.toString();
                }
                else if(subkey == "chapterNumber"){
                    note.chapters[chapterIndex].chapterNumber = Number(value);
                }
                else if(subkey.startsWith("chapterNotes")){

                    const [noteKey,noteIndex,valueType] = subkey.split(".");

                    if(!noteIndex || !valueType){
                        return
                    }else{
                        if(Number(noteIndex) == note.chapters[chapterIndex].chapterNotes.length){
                            note.chapters[chapterIndex].chapterNotes.push({text:"",link:""});
                        }

                        const chapterNote = note.chapters[chapterIndex].chapterNotes[Number(noteIndex)];
                        if (chapterNote) {
                            if(valueType === "text"){
                                chapterNote.text = value.toString();
                            }
                            else if(valueType === "link"){
                                    chapterNote.link = value.toString();
                            }
                        }
                    }


                }
            }

        }

    }

    const notes = await db.notes.create({
        data : {
            name : note.noteName,
            about : note.aboutNote,
            courseId : note.courseId,
            username : session.user.username,
            content : note.chapters
        }
    })

    console.log(notes)

    return {
        message : "success"
    }


}
