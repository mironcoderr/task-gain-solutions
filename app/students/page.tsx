import SearchComponent from "@/components/SearchComponent";
import StudentFormComponent from "@/components/StudentFormComponent";
import SelectOptionComponent from "@/components/SelectOptionComponent";
import { getAllStudents, getSingleStudent } from "@/library/student";
import { getAllCourses, getSingleCourse } from "@/library/course";
import { Student, StudentOptions } from "@/types/student";
import DeleteComponent from "@/components/DeleteComponent";
import { Course } from "@/types/course";
import Link from "next/link";

type StudentExtendOptions = StudentOptions & {
    add?: string;
    edit?: string;
    delete?: string;
}

export default async function StudentsPage({ searchParams }: { searchParams: Promise<StudentExtendOptions> }) {

    const searchOption = await searchParams;

    const courses = await getAllCourses();

    let student: Student | null = null;
    let editCourses: Course[] | null = null;

    if (searchOption.edit) {
        student = await getSingleStudent(searchOption.edit);
        editCourses = await Promise.all(
            student.courseIds.map((id) => getSingleCourse(id.toString()))
        )
    }

    const students = await getAllStudents({
        page: searchOption.page,
        limit: searchOption.limit,
        search: searchOption.search,
        department: searchOption.department,
    });

    const totalPages = Math.ceil(students.total / students.limit);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const departments = Array.from(new Set(students.data.map((s: Student) => s.department)));
    const hasSearchParams = Object.keys(searchOption).length > 0;

    return (
        <>
        <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-xl font-semibold capitalize">students</h3>
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
                    modelValue={students.limit.toString()}
                    options={['3', '4', '5']}
                    selectClass="px-3 h-9 rounded-lg border border-gray-100"
                    optionClass="w-full top-9"
                    paramName="limit"
                />
                {hasSearchParams &&
                    <Link href="/students" className="px-4 h-9 leading-9 text-sm rounded-lg bg-danger text-white">
                        Reset
                    </Link>
                }
                <Link href="/students?add=new" className="px-4 h-9 leading-9 text-sm rounded-lg bg-primary text-white">
                    Add New
                </Link>
            </div>
        </div>
        <div className="rounded-2xl overflow-x-auto">
            <table className="w-full ltr:text-left rtl:text-right">
                <thead className="text-xs uppercase text-white bg-primary">
                    <tr>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">id</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">name</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">email</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">phone</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">department</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">course</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">year</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">gpa</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">action</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {students.data.map((student: Student, index: number) => (
                        <tr key={index} className="odd:bg-white even:bg-primary/5">
                            <th scope="row" className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">#{student.id}</th>
                            <td className="px-4 py-4">{student.name}</td>
                            <td className="px-4 py-4">{student.email}</td>
                            <td className="px-4 py-4">{student.phone}</td>
                            <td className="px-4 py-4">{student.department}</td>
                            <td className="px-4 py-4">{student.courseIds.length}</td>
                            <td className="px-4 py-4">{student.year}</td>
                            <td className="px-4 py-4">{student.gpa}</td>
                            <td className="px-4 py-4 flex items-center justify-center gap-2">
                                <Link href={`/students/${student.id}`} className="mc-fill-eye text-base -mt-0.5 text-primary hover:text-primary/80"></Link>
                                <Link href={`/students?edit=${student.id}`} className="mc-fill-edit text-lg text-success hover:text-success/80"></Link>
                                <Link href={`/students?delete=${student.id}`} className="mc-fill-delete text-lg text-danger hover:text-danger/80"></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex items-center justify-between gap-4 mt-4">
            <p className="text-sm">
                Showing 
                <b> {students.data.length} </b>
                of 
                <b> {students.total} </b>
                Results
            </p>
            <nav className="flex items-center gap-2">
                {pages.map((page) => (
                    <Link
                        key={page}
                        href={{
                            pathname: "/students",
                            query: { ...searchOption, page },
                        }}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg ${page === students.page
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {page}
                    </Link>
                ))}
            </nav>
        </div>

        {(searchOption.add || searchOption.edit) && (
            <StudentFormComponent
                student={student}
                courses={courses.data}
                editCourses={editCourses}
                title={searchOption.add ? "add new student" : "edit this student"}
            />
        )}

        {(searchOption.delete) && ( 
            <DeleteComponent 
                identify='student'
                deleteId={searchOption.delete}
            />
        )}

        </>
    );
}