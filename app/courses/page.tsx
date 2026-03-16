import { Course, CourseOptions } from "@/types/course";
import { getAllCourses } from "@/library/course";
import Link from "next/link";

export default async function CoursesPage({ searchParams }: { searchParams: Promise<CourseOptions> }) {

    const searchOption = await searchParams;

    const courses = await getAllCourses({
        page: searchOption.page,
        limit: searchOption.limit,
        search: searchOption.search,
        department: searchOption.department,
    });

    return (
        <>
            <h3 className="text-xl font-semibold capitalize mb-4">Courses</h3>
            <div className="rounded-2xl overflow-x-auto">
                <table className="w-full ltr:text-left rtl:text-right">
                    <thead className="text-xs uppercase text-white bg-primary">
                        <tr>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">id</th>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">title</th>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">code</th>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">department</th>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">faculty</th>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">enrollment</th>
                            <th scope="col" className="px-4 py-3.5 tracking-wide">action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        {courses.data.map((course: Course, index: number) => (
                            <tr key={index} className="odd:bg-white even:bg-primary/5">
                                <th scope="row" className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">#{course.id}</th>
                                <td className="px-4 py-4">{course.title}</td>
                                <td className="px-4 py-4">{course.code}</td>
                                <td className="px-4 py-4">{course.department}</td>
                                <td className="px-4 py-4">{course.facultyId}</td>
                                <td className="px-4 py-4">{course.enrollmentCount}</td>
                                <td className="px-4 py-4">
                                    <Link href={`/courses/${course.id}`} className="text-primary hover:text-primary/80">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}