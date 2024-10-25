import { Card, CardFooter } from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { Link } from "@nextui-org/react";
import { useSetImageUploadLink } from "@repo/store/imageuploadlink";

interface ImageCardProps {
    url : string
    author : string
    author_url : string
}
export function ImageCard({url, author, author_url} : ImageCardProps) {

    const setLink = useSetImageUploadLink()


    const handleOnClick = () => {
        setLink(url)
        
    }
    return (
        <Card
        isFooterBlurred
        className="rounded-sm"
        isPressable
        onClick={handleOnClick}
        >
        <Image
            className="object-cover rounded-md"
            height={75}
            src={url}
            width={150}
        />
        <CardFooter className="flex pl-0 gap-1 items-start before:bg-white/10 border-white/20 border-t-1 overflow-hidden py-1 absolute before:rounded-xl rounded-b-md bottom-0 w-full z-10 text-xs">
            <p>by</p> <Link href={author_url} target="_blank" className="text-xs text-white underline">{author}</Link>
        </CardFooter>  
        </Card>
    )
}