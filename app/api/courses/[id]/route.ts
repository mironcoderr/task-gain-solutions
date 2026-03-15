import courses from "@/json/courses.json";
import { Course } from "@/types/course";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const courseId = Number((await params).id);
    const course = courses.find((c: Course) => c.id === courseId);

    if (!course) {
        return new Response(JSON.stringify({ message: "Course not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify(course), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const courseId = Number((await params).id);
    const body = await request.json();

    const index = courses.findIndex((c: Course) => c.id === courseId);

    if (index === -1) {
        return new Response(JSON.stringify({ message: "Course not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    courses[index] = { ...courses[index], ...body };

    return new Response(JSON.stringify(courses[index]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const courseId = Number((await params).id);

    const index = courses.findIndex((c: Course) => c.id === courseId);
    
    if (index === -1) {
        return new Response(JSON.stringify({ message: "Course not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    const removed = courses.splice(index, 1);

    return new Response(JSON.stringify(removed[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}