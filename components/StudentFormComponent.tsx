import Link from "next/link"
import {postCreateStudent, putUpdateStudent} from "@/library/student";
import { getAllCourses, getSingleCourse } from "@/library/course";
import MultiSelectComponent from "./MultiSelectComponent";
import { getSingleStudent } from "@/library/student"
import { Student } from "@/types/student";
import { Course } from "@/types/course";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function StudentFormComponent({ title, editId }: { title: string, editId?: string }) {

    let student: Student | null = null;
    let editCourses: Course[] | null = null;
    
    const courses = await getAllCourses();
    
    if (editId) {
        student = await getSingleStudent(editId);
        editCourses = await Promise.all(
            student.courseIds.map((id) => getSingleCourse(id.toString()))
        )
    }

    const defaultValues = editCourses?.map((course: Course) => ({
        value: course.id,
        label: course.title,
    }))

    const selectOptions = courses.data.map((course: Course) => ({
        value: course.id,
        label: course.title,
    }))

    const handleStudentForm = async (formData: FormData) => {
        "use server"

        const rawCourseIds = formData.getAll("courseIds"); 
        const convertedCourseIds: number[] = rawCourseIds
            .filter(id => id !== "") 
            .map(id => Number(id));

        const createdData = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            phone: String(formData.get("phone") || ""),
            department: String(formData.get("department") || ""),
            year: Number(formData.get("year") || 0),
            gpa: Number(formData.get("gpa") || 0),
            courseIds: convertedCourseIds
        };

        const updatedData = {
            ...createdData,
            id: Number(editId)
        }

        if(editId) await putUpdateStudent(updatedData)
        else await postCreateStudent(createdData)

        revalidatePath('/students')
        redirect('/students')
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/50">
            <div className="w-full max-w-xl mx-auto my-10 rounded-2xl bg-white">

                <div className="flex items-start justify-between gap-2 p-4 border-b border-gray-100">
                    <h3 className="text-lg capitalize font-semibold">{title}</h3>
                    <Link href="/students" className="mc-fill-close-circle text-xl text-danger"></Link>
                </div>

                <form action={handleStudentForm} className="p-4 grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={student?.name || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={student?.email || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            defaultValue={student?.phone || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Department</label>
                        <input
                            type="text"
                            name="department"
                            defaultValue={student?.department || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Year</label>
                        <input
                            type="number"
                            name="year"
                            defaultValue={student?.year || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">GPA</label>
                        <input
                            type="number"
                            name="gpa"
                            defaultValue={student?.gpa || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="col-span-12">
                        <label className="text-sm font-medium">Select Courses</label>
                        <MultiSelectComponent 
                            name="courseIds"
                            options={selectOptions}
                            defaultValue={defaultValues}
                        />
                    </div>
                    <div className="col-span-12">
                        <button
                            type="submit"
                            className="w-full h-10 rounded-lg bg-primary text-white"
                        >
                            {student ? "Update Student" : "Create Student"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}