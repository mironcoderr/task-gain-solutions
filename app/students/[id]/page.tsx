import { getSingleStudent } from "@/library/student"
import { getSingleCourse } from "@/library/course"
import { Course } from "@/types/course"

export default async function StudentDetailsPage({params}: {params: Promise<{id: string}>}) {

    const studentId = (await params).id
    const student = await getSingleStudent(studentId)

    const courses = await Promise.all(
        student.courseIds.map((id) => getSingleCourse(id.toString()))
    )

    return (
        <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">id:</span>
                <span className="font-medium">{student.id}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">name:</span>
                <span className="font-medium">{student.name}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">email:</span>
                <span className="font-medium">{student.email}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">phone:</span>
                <span className="font-medium">{student.phone}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">year:</span>
                <span className="font-medium">{student.year}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">gpa:</span>
                <span className="font-medium">{student.gpa}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">department:</span>
                <span className="font-medium">{student.department}</span>
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