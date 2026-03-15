import faculties from "@/json/faculties.json";
import { Faculty } from "@/types/faculty";

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }> }
) {
    const facultyId = Number((await params).id);
    const faculty = faculties.find((f: Faculty) => f.id === facultyId);

    if (!faculty) {
        return new Response(JSON.stringify({ message: "Faculty not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(faculty), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const facultyId = Number((await params).id);
    const body = await request.json();

    const index = faculties.findIndex((f: Faculty) => f.id === facultyId);

    if (index === -1) {
        return new Response(JSON.stringify({ message: "Faculty not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    faculties[index] = { ...faculties[index], ...body };

    return new Response(JSON.stringify(faculties[index]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const facultyId = Number((await params).id);

    const index = faculties.findIndex((f: Faculty) => f.id === facultyId);
    
    if (index === -1) {
        return new Response(JSON.stringify({ message: "Faculty not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const removed = faculties.splice(index, 1);

    return new Response(JSON.stringify(removed[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}