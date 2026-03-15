import fs from "fs";
import path from "path";
import { Student } from "@/types/student";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "json/students.json");

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const fileData = fs.readFileSync(filePath, "utf-8");
    let students: Student[] = JSON.parse(fileData);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || students.length);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const department = searchParams.get("department")?.toLowerCase() || "";

    if (search) {
        students = students.filter(
            (s: Student) => s.name.toLowerCase().includes(search)
        );
    }

    if (department) {
        students = students.filter(
            (s: Student) => s.department.toLowerCase() === department
        );
    }

    const total = students.length;
    const start = (page - 1) * limit;
    const data = students.slice(start, start + limit);

    return NextResponse.json(
        { data, total, page, limit },
        { status: 200 }
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const fileData = fs.readFileSync(filePath, "utf-8");
        const students: Student[] = JSON.parse(fileData);

        const newStudent: Student = {
            id: students.length + 1,
            ...body,
        };

        students.push(newStudent);
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

        revalidateTag("students", 'max');
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