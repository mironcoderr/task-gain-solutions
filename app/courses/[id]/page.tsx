import { getSingleFaculty } from "@/library/faculty";
import { getSingleCourse } from "@/library/course"

export default async function CourseDetailsPage({params}: {params: Promise<{id: string}>}) {

    const courseId = (await params).id
    const course = await getSingleCourse(courseId);
    const faculty = await getSingleFaculty(course.facultyId.toString());

    return (
        <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">id:</span>
                <span className="font-medium">{course.id}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">title:</span>
                <span className="font-medium">{course.title}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">code:</span>
                <span className="font-medium">{course.code}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">department:</span>
                <span className="font-medium">{course.department}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">enrollmentCount:</span>
                <span className="font-medium">{course.enrollmentCount}</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold capitalize">faculty:</span>
                <span className="font-medium">{faculty.name}</span>
            </li>
        </ul>
    )
}