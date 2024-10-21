import {atom } from "recoil";

export const viewingLinkAtom = atom<string>({
    key: "viewingLink",
    default: "",
})