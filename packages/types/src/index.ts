export interface ContentType {
    text:string;
    link:string;
}

export interface ChapterNoteUploadType extends Omit<ContentType,"link">{
    link: string  | File
}

export interface ChapterType  {
    chapterName:string;
    chapterNumber: number;
    chapterContent: ContentType[]
}

export interface ChapterUploadType extends Omit<ChapterType,"chapterContent">{
    chapterContent: ChapterNoteUploadType[];
}

export interface NoteType {
    noteName : string,
    courseId : number,
    aboutNote : string,
    chapters : ChapterType[]
}

export interface NoteUploadType extends Omit<NoteType,"chapters">{
    chapters: ChapterUploadType[]
}


