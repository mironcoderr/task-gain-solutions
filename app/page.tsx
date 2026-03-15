import Link from "next/link";
import { Course } from "@/types/course";
import { Student } from "@/types/student";
import { getDashboardData } from "@/library/dashboard"
import BarChartComponent from "@/components/BarChartComponent";
import ColumnChartComponent from "@/components/ColumnChartComponent";

export default async function DashboardPage() {

    const dashboard = await getDashboardData();

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex items-center gap-4 p-4 h-24 rounded-2xl bg-linear-to-l from-black/5 to-red-50">
                <div className="flex-auto">
                    <h3 className="text-2xl font-semibold mb-2">
                        {dashboard.totalStudents}
                    </h3>
                    <p className="text-base capitalize">
                        total students
                    </p>
                </div>
                <i className="mc-line-users text-3xl text-red-600"></i>
            </div>
            <div className="col-span-4 flex items-center gap-4 p-4 h-24 rounded-2xl bg-linear-to-l from-black/5 to-yellow-50">
                <div className="flex-auto">
                    <h3 className="text-2xl font-semibold mb-2">
                        {dashboard.totalCourses}
                    </h3>
                    <p className="text-base capitalize">
                        total courses
                    </p>
                </div>
                <i className="mc-line-keyboard-open text-3xl text-yellow-600"></i>
            </div>
            <div className="col-span-4 flex items-center gap-4 p-4 h-24 rounded-2xl bg-linear-to-l from-black/5 to-green-50">
                <div className="flex-auto">
                    <h3 className="text-2xl font-semibold mb-2">
                        {dashboard.totalFaculty}
                    </h3>
                    <p className="text-base capitalize">
                        total faculty
                    </p>
                </div>
                <i className="mc-line-element-plus text-3xl text-green-600"></i>
            </div>

            <div className="col-span-12">
                <h3 className="text-lg font-semibold capitalize mb-3">top ranking students</h3>
                <div className="rounded-2xl overflow-x-auto">
                    <table className="w-full ltr:text-left rtl:text-right">
                        <thead className="text-xs uppercase text-white bg-primary">
                            <tr>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">id</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">name</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">email</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">phone</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">department</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">gpa</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {dashboard.topStudents.map((student: Student, index: number) => (
                                <tr key={index} className="odd:bg-white even:bg-primary/5">
                                    <th scope="row" className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">#{student.id}</th>
                                    <td className="px-4 py-4">{student.name}</td>
                                    <td className="px-4 py-4">{student.email}</td>
                                    <td className="px-4 py-4">{student.phone}</td>
                                    <td className="px-4 py-4">{student.department}</td>
                                    <td className="px-4 py-4">{student.gpa}</td>
                                    <td className="px-4 py-4">
                                        <Link href={`/students/${student.id}`} className="text-primary hover:text-primary/80">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="col-span-12">
                <h3 className="text-lg font-semibold capitalize mb-3">most popular courses</h3>
                <div className="rounded-2xl overflow-x-auto">
                    <table className="w-full ltr:text-left rtl:text-right">
                        <thead className="text-xs uppercase text-white bg-primary">
                            <tr>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">id</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">title</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">code</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">department</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">enrollment</th>
                                <th scope="col" className="px-4 py-3.5 tracking-wide">action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {dashboard.popularCourses.map((course: Course, index: number) => (
                                <tr key={index} className="odd:bg-white even:bg-primary/5">
                                    <th scope="row" className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">#{course.id}</th>
                                    <td className="px-4 py-4">{course.title}</td>
                                    <td className="px-4 py-4">{course.code}</td>
                                    <td className="px-4 py-4">{course.department}</td>
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
            </div>

            <div className="col-span-6">
                <h3 className="text-lg font-semibold capitalize -mb-3">
                    course enrollment
                </h3>
                <BarChartComponent 
                    courses={dashboard.popularCourses} 
                />
            </div>

            <div className="col-span-6">
                <h3 className="text-lg font-semibold capitalize -mb-3">
                    leaderboard students
                </h3>
                <ColumnChartComponent 
                    students={dashboard.topStudents} 
                />
            </div>

        </div>
    )
}