import students from "@/json/students.json";
import { Student } from "@/types/student";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {

    const studentId = Number((await params).id);
    const student = students.find((s: Student) => s.id === studentId);

    if (!student) {
        return NextResponse.json(
            { message: "Student not found" },
            { status: 404 }
        )
    }

    return NextResponse.json(student, { status: 200 })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const studentId = Number((await params).id);
    const body = await request.json();

    const index = students.findIndex((s: Student) => s.id === studentId);

    if (index === -1) {
        return NextResponse.json(
            { message: "Student not found" },
            { status: 4040 }
        )
    }

    students[index] = { ...students[index], ...body };

    revalidateTag('students', 'max');
    revalidateTag(`students-${students[index].id}`, 'max');

    return NextResponse.json(students[index], { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const studentId = Number((await params).id);

    const index = students.findIndex((s: Student) => s.id === studentId);

    if (index === -1) {
        return NextResponse.json(
            { message: "Student not found" },
            { status: 404 }
        )
    }

    const removed = students.splice(index, 1);

    revalidateTag('students', 'max');
    revalidateTag(`students-${removed[0].id}`, 'max');

    return NextResponse.json(removed[0], { status: 200 });
}