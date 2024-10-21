import db from "@repo/db/client"
import { CourseCard } from "../components/cards/CourseCard";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";



const getCourses = async () => {

    const session = await getServerSession(authOptions)
    console.log(JSON.stringify(session))
    
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
        <div className="flex justify-center items-center h-screen">
            {courses.map(course=>{
                return (
                    <CourseCard
                    title={course.name}
                    text={course.degree + " " + course.branch}
                    courseId={course.id}
                    />     
                )
            })}
        </div>
    )
}