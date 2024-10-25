import { atom } from "recoil";

export const ImageUploadLinkAtom = atom<string>({
    key: "imageUploadLink",
    default: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
})