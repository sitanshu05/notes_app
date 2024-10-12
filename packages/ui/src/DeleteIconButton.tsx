
import {Button} from "@nextui-org/button";
import { RiDeleteBin6Fill } from "react-icons/ri";


export function DeleteIconButton({onClick}: {onClick: () => void}) {

    return(
        <Button isIconOnly color="danger" aria-label="Delete" onClick={onClick} type="button">
            <RiDeleteBin6Fill />
        </Button>
    )

}