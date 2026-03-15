import { getSingleFaculty } from "@/library/faculty"
import { getSingleCourse } from "@/library/course"
import { Course } from "@/types/course"

export default async function FacultyDetailsPage({params}: {params: Promise<{id: string}>}) {

    const facultyId = (await params).id
    const faculty = await getSingleFaculty(facultyId)

    const courses = await Promise.all(
        faculty.courseIds.map((id) => getSingleCourse(id.toString()))
    )

    return (
        <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">id:</span>
                <span className="font-medium">{faculty.id}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">name:</span>
                <span className="font-medium">{faculty.name}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">email:</span>
                <span className="font-medium">{faculty.email}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">department:</span>
                <span className="font-medium">{faculty.department}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">designation:</span>
                <span className="font-medium">{faculty.designation}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">course:</span>
                <span className="font-medium">
                    {courses.map((course: Course, index: number)=> (
                        <span key={index} className="block">{index + 1}. {course.title}</span>
                    ))}
                </span>
            </li>
        </ul>
    )
}