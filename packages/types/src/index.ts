

export type ChapterNoteType = {
    text:string;
    link:string;
}

export type ChapterType = {
    chapterName:string;
    chapterNumber: number;
    chapterNotes: ChapterNoteType[]
}

export type NoteType = {
    noteName : string,
    courseId : number,
    aboutNote : string,
    chapters : ChapterType[]
}


