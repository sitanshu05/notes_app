
import zod from "zod"


const contentUploadSchema = zod.object({
    text : zod.string().min(5, "text about is required"),
    link : zod.union([zod.string().url("Please enter a valid link"),zod.custom((value) => value instanceof FileList, {
        message: "Please upload a file.",
    })])
})

const chapterUploadSchema = zod.object({
    chapterName : zod.string().min(2, "Chapter name is required"),
    chapterNumber : zod.number().min(1, "Chapter number is required"),
    chapterContent : zod.array(contentUploadSchema)
})
export const noteUploadSchema = zod.object({
    noteName : zod.string().min(3, "Note name is required"),
    courseId : zod.number(),
    aboutNote : zod.string().min(5, "About note is required"),
    image : zod.string().url(),
    chapters : zod.array(chapterUploadSchema)
})