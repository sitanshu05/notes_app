"use client"
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChapterType } from "@repo/types";
import { AnchorIcon } from "../svg/anchor";
import { ChapterCardButton } from "../buttons/ChapterCardButton";


export function NotesAccordion({chapters}: {chapters: ChapterType[]}) {


    return (
        <Accordion defaultExpandedKeys={["theme"]} variant="splitted" selectionMode="multiple">

            {
                chapters.map((chapter,index)=>{
                    return <AccordionItem
                    key={index}
                    title={`Chapter ${chapter.chapterNumber}: ${chapter.chapterName}`}
                    indicator={<AnchorIcon />}
                    classNames={{ title: 'text-xl'}} 
                    >
                        <div className="flex flex-col  gap-5 items-center">
                        {
                            chapter.chapterContent.map((content,index)=>{
                                return(
                                <div className="flex  flex-col md:flex-row p-5 w-full  md:w-11/12 gap-5 m-3 bg-bg_dark rounded-lg shadow-2xl">
                                    <p className="grow">{content.text}</p>
                                 <div className="flex justify-end">
                                        <ChapterCardButton link={content.link}/>
                                    </div>
                                </div>)
                            })
                        }
                        </div>
                    </AccordionItem>

                })
            }
            
        </Accordion>
    )

}