import { ImageCard } from "../components/ImageCard";
import galleryJson  from "../data/galleryImages.json";
export function Gallery() {


    return (

        <div className=" max-h-96 overflow-y-auto">
            {
            galleryJson.categories.map((category,index) => {
                return(
                    <>
                        <div className="text-sm font-light text-zinc-300 my-2 mt-5">{category.category}</div>
                        <div className="grid grid-cols-3 gap-5">
                        {
                            category.images.map((image,index)=>{
                                return(
                                    <ImageCard url={image.url} author={image.author} author_url={image.author_url}/>
                                )
                            })
                        }
                        </div>
                    </>
                )
            })
            }
        </div>
        
    )
}