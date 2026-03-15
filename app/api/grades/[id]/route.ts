import grades from "@/json/grades.json";
import { Grade } from "@/types/grade";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const gradeId = Number((await params).id);
    const grade = grades.find((g: Grade) => g.id === gradeId);

    if (!grade) {
        return new Response(JSON.stringify({ message: "Grade not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(grade), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const gradeId = Number((await params).id);
    const body = await request.json();

    const index = grades.findIndex((g: Grade) => g.id === gradeId);

    if (index === -1) {
        return new Response(JSON.stringify({ message: "Grade not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    grades[index] = { ...grades[index], ...body };

    return new Response(JSON.stringify(grades[index]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const gradeId = Number((await params).id);

    const index = grades.findIndex((g: Grade) => g.id === gradeId);
    
    if (index === -1) {
        return new Response(JSON.stringify({ message: "Grade not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const removed = grades.splice(index, 1);

    return new Response(JSON.stringify(removed[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}