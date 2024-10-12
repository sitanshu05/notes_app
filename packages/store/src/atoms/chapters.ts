import { ChapterType } from "@repo/types";
import { atom } from "recoil";


export const chaptersAtom = atom<ChapterType[]>({
    key: "chapters",
    default: [],
})