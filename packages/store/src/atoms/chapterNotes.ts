import {atom } from "recoil";
import { ChapterNoteType } from "@repo/types";

export const chapterNotesAtom = atom<ChapterNoteType[]>({
    key: "chapterNotes",
    default: [],
})