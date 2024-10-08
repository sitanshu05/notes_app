import db from "@repo/db/client"
import { CourseCard } from "../components/CourseCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";



const getCourses = async () => {
    const session = await getServerSession(authOptions)
    console.log(JSON.stringify(session))
    
    if(!session){
        redirect("/api/auth/signin")
    }
    else{
        const courses = await db.course.findMany({
            where:{
                collegeId : session.collegeId
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
                    />     
                )
            })}
        </div>
    )
}