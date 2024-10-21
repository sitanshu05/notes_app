"use client"
import {useGetViewingLink} from "@repo/store/viewinglink"

export default function Viewfile(){


    const link = useGetViewingLink()

    if(!link){
        return <div>NO link</div>
    }

      

  
    return (    
    <div className="w-full h-svh">
          <iframe src={link} className="w-full h-svh" />
      </div>
    );
}