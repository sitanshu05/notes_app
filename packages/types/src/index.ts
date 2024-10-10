

export type ChapterNoteType = {
    text:string;
    link:string;
}

export type ChapterType = {
    chapterName:string;
    chapterNumber: number;
    chapterNotes: ChapterNoteType[]
}


