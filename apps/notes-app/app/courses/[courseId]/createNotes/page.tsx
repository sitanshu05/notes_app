import { getServerSession } from "next-auth";
import { AddChapterForm } from "../../../components/forms/AddChapterForm";
import { authOptions } from "../../../lib/authOptions";
import db from "@repo/db/client";

export default async function CreateNotes({ params, searchParams }: { params: { courseId: string}, searchParams : {noteId? : string} }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id || !session.collegeId) {
        throw new Error("User not authorized");
    }


    // Validate user access to the specified course
    const hasCourseAccess = await db.user.findUnique({
        where: { id: Number(session.user.id) },
        select: {
            college: {
                select: {
                    courses: {
                        where: { id: Number(params.courseId) },
                        select: { id: true },
                    },
                },
            },
        },
    });

    if (!hasCourseAccess || hasCourseAccess.college.courses.length === 0) {
        return <div>Invalid course</div>;
    }

    // Retrieve note if editing an existing one
    const note = searchParams.noteId
        ? await db.notes.findFirst({
            where: {
                id: Number(searchParams.noteId),
                username: session.user.username,
                course: {
                    id: Number(params.courseId),
                    collegeId: session.collegeId,
                },
            },
            select: {
                id: true,
                name: true,
                about: true,
                stars: true,
                image: true,
                courseId: true,
                content: true,
            },
        }).then(note => note && {
            id: note.id,
            noteName: note.name,
            aboutNote: note.about,
            stars: note.stars,
            image: note.image,
            courseId: note.courseId,
            chapters: note.content ? JSON.parse(JSON.stringify(note.content)) : "",
        })
        : null;

    if (searchParams.noteId && !note) {
        throw new Error("Invalid note");
    }

    return (
        <div>
            <AddChapterForm type={searchParams.noteId ? "edit" : "new"} defaultValues={note || null} />
        </div>
    );
}