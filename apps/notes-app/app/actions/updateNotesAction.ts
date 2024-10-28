"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { NoteType } from "@repo/types";
import { noteUploadSchema } from "@repo/schemas";

export async function updateNotesAction(noteId : number, notes: NoteType) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.username) {
            throw new Error("User not authorized");
        }

        // Validate note data
        const parsedNotes = noteUploadSchema.safeParse(notes);
        if (!parsedNotes.success) {
            return { success: false, error: parsedNotes.error.message };
        }

        // Ensure the note exists and belongs to the current user
        const existingNote = await db.notes.findUnique({
            where: {
                id: noteId,
                username: session.user.username,
            },
        });

        if (!existingNote) {
            return { success: false, error: "Note not found or not authorized to update." };
        }

        // Update the note in the database
        const updatedNote = await db.notes.update({
            where: { id: noteId },
            data: {
                name: notes.noteName,
                courseId: notes.courseId,
                image: notes.image,
                about: notes.aboutNote,
                content: JSON.parse(JSON.stringify(notes.chapters)),
            },
        });

        return { success: true, noteId: updatedNote.id };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "An unexpected error occurred.",
        };
    }
}