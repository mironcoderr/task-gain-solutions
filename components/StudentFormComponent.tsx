"use client"

import Link from "next/link"
import toast from "react-hot-toast";
import studentSchema from "@/schema/student";
import MultiSelectComponent from "./MultiSelectComponent";
import {postCreateStudent, putUpdateStudent} from "@/library/student";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/types/student";
import { Course } from "@/types/course";

interface Props {
    title: string;
    courses: Course[];
    student: Student | null;
    editCourses: Course[] | null;
}

export default function StudentFormComponent({ title, student, courses, editCourses }: Props) {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const defaultValues = editCourses?.map((course: Course) => ({
        value: course.id,
        label: course.title,
    }))

    const selectOptions = courses.map((course: Course) => ({
        value: course.id,
        label: course.title,
    }))

    const handleStudentForm = async (event: React.SubmitEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const rawCourseIds = formData.getAll("courseIds"); 
        const convertedCourseIds: number[] = rawCourseIds
            .filter(id => id !== "") 
            .map(id => Number(id));

        const formValues = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            phone: String(formData.get("phone") || ""),
            department: String(formData.get("department") || ""),
            year: Number(formData.get("year") || 0),
            gpa: Number(formData.get("gpa") || 0),
            courseIds: convertedCourseIds
        };

        const validation = studentSchema.safeParse(formValues);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {}

            validation.error.issues.forEach((err) => {
                const field = err.path[0] as string
                fieldErrors[field] = err.message
            })

            setErrors(fieldErrors);
            setLoading(false);
            return
        }

        try {
            if (student) {
                await putUpdateStudent({ ...validation.data, id: Number(student.id) })
                toast.success("Student Updated Successfully!")
            }
            else {
                await postCreateStudent(validation.data)
                toast.success("Student Created Successfully!")
            }

            router.push("/students");

        } 
        catch {
            toast.error("Something went wrong");
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/50">
            <div className="w-full max-w-xl mx-auto my-10 rounded-2xl bg-white">

                <div className="flex items-start justify-between gap-2 p-4 border-b border-gray-100">
                    <h3 className="text-lg capitalize font-semibold">{title}</h3>
                    <Link href="/students" className="mc-fill-close-circle text-xl text-danger"></Link>
                </div>

                <form onSubmit={handleStudentForm} className="p-4 grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={student?.name || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                        {errors.name && <small className="text-red-500">{errors.name}</small>}
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={student?.email || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                        {errors.email && <small className="text-red-500">{errors.email}</small>}
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            defaultValue={student?.phone || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                        {errors.phone && <small className="text-red-500">{errors.phone}</small>}
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Department</label>
                        <input
                            type="text"
                            name="department"
                            defaultValue={student?.department || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                        {errors.department && <small className="text-red-500">{errors.department}</small>}
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">Year</label>
                        <input
                            type="number"
                            name="year"
                            min="2000"
                            max="2100"
                            defaultValue={student?.year || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                        {errors.year && <small className="text-red-500">{errors.year}</small>}
                    </div>
                    <div className="col-span-6">
                        <label className="text-sm font-medium">GPA</label>
                        <input
                            type="number"
                            name="gpa"
                            step="0.01"
                            min="1"
                            max="5"
                            defaultValue={student?.gpa || ""}
                            className="w-full px-3 h-10 rounded-lg border border-gray-300"
                        />
                        {errors.gpa && <small className="text-red-500">{errors.gpa}</small>}
                    </div>
                    <div className="col-span-12">
                        <label className="text-sm font-medium">Select Courses</label>
                        <MultiSelectComponent 
                            name="courseIds"
                            options={selectOptions!}
                            defaultValue={defaultValues!}
                        />
                        {errors.courseIds && (
                            <small className="text-red-500">{errors.courseIds}</small>
                        )}
                    </div>
                    <div className="col-span-12">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 rounded-lg bg-primary text-white disabled:opacity-50"
                        >
                            {loading
                                ? (student ? "Updating..." : "Creating...")
                                : (student ? "Update Student" : "Create Student")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}