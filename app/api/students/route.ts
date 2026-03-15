import students from "@/json/students.json";
import { Student } from "@/types/student";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || students.length);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const department = searchParams.get("department")?.toLowerCase() || "";

    let filtered = [...students];

    // Search by name
    if (search) {
        filtered = filtered.filter((s: Student) => s.name.toLowerCase().includes(search));
    }

    // Filter by department
    if (department) {
        filtered = filtered.filter(
            (s: Student) => s.department.toLowerCase() === department
        );
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    const allStudentData = {
        data: paginated,
        total: filtered.length,
        page,
        limit,
    }

    return NextResponse.json(allStudentData, { 
        status: 200,
        headers: { "Cache-Control": "no-store" }
    })
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newStudent = {
            id: students.length + 1,
            ...body,
        };

        students.push(newStudent);

        return NextResponse.json(newStudent, { 
            status: 201,
            headers: { "Cache-Control": "no-store" }
        });
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Failed to create student" },
            { status: 500 }
        );
    }
}