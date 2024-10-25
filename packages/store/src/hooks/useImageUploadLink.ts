import { useRecoilValue, useSetRecoilState } from "recoil";
import { ImageUploadLinkAtom } from "../atoms/imageUploadLink";


export const useGetImageUploadLink = () => {
    const value = useRecoilValue(ImageUploadLinkAtom);
    return value;
}

export const useSetImageUploadLink = () => {
    const setImageUploadLink = useSetRecoilState(ImageUploadLinkAtom);
    return (link: string) => {
        setImageUploadLink(link); // Update the atom with the new link
    };
}
