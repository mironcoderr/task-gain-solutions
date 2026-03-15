import SelectOptionComponent from "@/components/SelectOptionComponent";
import SearchComponent from "@/components/SearchComponent";
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

    const totalPages = Math.ceil(courses.total / courses.limit);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const departments = Array.from(new Set(courses.data.map((c: Course) => c.department)));
    const hasSearchParams = Object.keys(searchOption).length > 0;

    return (
        <>
        <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-xl font-semibold capitalize">Courses</h3>
            <div className="flex items-center gap-3">
                <SearchComponent 
                    paramName="search" 
                    initialValue={searchOption.search} 
                />
                <SelectOptionComponent 
                    modelValue={searchOption.department}
                    options={departments}
                    selectClass="px-3 w-44 h-9 rounded-lg border border-gray-100"
                    optionClass="w-full top-9"
                    paramName="department"
                />
                <SelectOptionComponent
                    modelValue={courses.limit.toString()}
                    options={['3', '4', '5', '9']}
                    selectClass="px-3 h-9 rounded-lg border border-gray-100"
                    optionClass="w-full top-9"
                    paramName="limit"
                />
                {hasSearchParams &&
                    <Link href="/courses" className="px-4 h-9 leading-9 rounded-lg bg-primary text-white">
                        Reset
                    </Link>
                }
            </div>
        </div>
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
            <div className="flex items-center justify-between gap-4 mt-4">
                <p className="text-sm">
                    Showing 
                    <b> {courses.data.length} </b>
                    of 
                    <b> {courses.total} </b>
                    Results
                </p>
                <nav className="flex items-center gap-2">
                    {pages.map((page) => (
                        <Link
                            key={page}
                            href={{
                                pathname: "/courses",
                                query: { ...searchOption, page },
                            }}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${page === courses.page
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {page}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}