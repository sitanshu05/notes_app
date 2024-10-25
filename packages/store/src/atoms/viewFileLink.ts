import {atom } from "recoil";

export const viewFileLinkAtom = atom<string>({
    key: "viewingLink",
    default: "",
})