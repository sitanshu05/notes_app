import { getServerSession } from "next-auth";
import { AddChapterForm } from "../../../components/AddChapterForm";
import { authOptions } from "../../../lib/authOptions";
import db from "@repo/db/client"
import { div } from "framer-motion/client";

export default async function CreateNotes({params}:{params : {courseId : string}}){

    const session = await getServerSession(authOptions);

    const validateCourseAccess = async () =>{
        
        const user = await db.user.findUnique({
            where : {id : Number(session.user.id)},
            select : {
                college : {
                    select : {
                        courses : {
                            where : {id: Number(params.courseId)}
                        }
                    }
                }
            }
        })

        if(!user){
            return false
        }
        return user?.college.courses.length > 0

    }
    const access = await validateCourseAccess()

    return (
        <div>
            {access ? <AddChapterForm/> : <div>Invalid course</div>}
        </div>
    
    )
}