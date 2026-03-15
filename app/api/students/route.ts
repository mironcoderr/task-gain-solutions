import students from "@/json/students.json";
import { Student } from "@/types/student";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || students.length);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const department = searchParams.get("department")?.toLowerCase() || "";

    let filtered = [...students];

    // Search by name
    if (search) {
        filtered = filtered.filter(
            (s: Student) => s.name.toLowerCase().includes(search)
        );
    }

    // Filter by department
    if (department) {
        filtered = filtered.filter(
            (s: Student) => s.department.toLowerCase() === department
        );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return NextResponse.json(
        { data, total, page, limit },
        { status: 200 }
    )
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newStudent: Student = {
            id: students.length + 1,
            ...body,
        };

        students.push(newStudent);

        revalidateTag('students', 'max');
        revalidateTag(`students-${newStudent.id}`, 'max');

        return NextResponse.json(newStudent, { status: 201 });
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Failed to create student" },
            { status: 500 }
        );
    }
}