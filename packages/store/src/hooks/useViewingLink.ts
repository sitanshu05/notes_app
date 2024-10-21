
import { useRecoilValue, useSetRecoilState } from "recoil"
import { viewingLinkAtom } from "../atoms/viewingLink"


export const useGetViewingLink = () => {
    const value = useRecoilValue(viewingLinkAtom);
    return value;
}   

export const useSetViewingLink = () => {
    const setViewingLink = useSetRecoilState(viewingLinkAtom);
    return (link: string) => {
        setViewingLink(link); // Update the atom with the new link
    };
};