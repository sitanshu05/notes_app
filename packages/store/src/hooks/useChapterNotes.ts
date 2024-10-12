import { useRecoilState, useRecoilValue } from "recoil";
import { chapterNotesAtom } from "../atoms/chapterNotes";
import { ChapterNoteType } from "@repo/types";


export const useChapterNotes = () => {
    const value = useRecoilValue(chapterNotesAtom);
    return value;
}

export const setChapterNotes = (newChapterNotes: ChapterNoteType[]) => {
    useRecoilState(chapterNotesAtom)[1](newChapterNotes);
}
