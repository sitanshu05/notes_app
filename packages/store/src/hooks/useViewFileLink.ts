
import { useRecoilValue, useSetRecoilState } from "recoil"
import { viewFileLinkAtom } from "../atoms/viewFileLink"


export const useGetViewingLink = () => {
    const value = useRecoilValue(viewFileLinkAtom);
    return value;
}   

export const useSetViewingLink = () => {
    const setViewingLink = useSetRecoilState(viewFileLinkAtom);
    return (link: string) => {
        setViewingLink(link); // Update the atom with the new link
    };
};