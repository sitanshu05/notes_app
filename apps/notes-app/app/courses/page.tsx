import db from "@repo/db/client"
import { CourseCard } from "../components/cards/CourseCard";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";



const getCourses = async () => {

    const session = await getServerSession(authOptions)
    
    if(!session){
        redirect("/api/auth/signin")
    }
    else{
        const collegeId = session.collegeId;
        if (!collegeId) {
            console.log("No college ID found in session. Returning no courses.");
            return [];  // Return no courses if collegeId is invalid
        }

        const courses = await db.course.findMany({
            where:{
                collegeId : collegeId
            }
        })
        return courses;
    }
}

export default async function Courses() {
    const courses = await getCourses()
    return (
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-5 pt-10 md:pt-16 text-left">
            <div className="w-full flex justify-between items-center px-2 md:px-5 md:pb-8">
                <h1 className="text-4xl font-bold tracking-tight">{"Courses"}</h1>
            </div>

            {
            courses.length > 0 ? 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
                {courses.map((course)=>{
                    return (
                        <CourseCard
                        name={course.name}
                        courseCode="123456"
                        courseId={course.id}
                        />
                    )
                })}
            </div>
            :
            <div>Invalid course id</div>
            } 
        </div>
    )
}