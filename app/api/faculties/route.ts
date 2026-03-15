import faculties from "@/json/faculties.json";
import { Faculty } from "@/types/faculty";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || faculties.length);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const department = searchParams.get("department")?.toLowerCase() || "";

    let filtered = [...faculties];

    // Search by name or email
    if (search) {
        filtered = filtered.filter(
            (f: Faculty) =>
                f.name.toLowerCase().includes(search) ||
                f.email.toLowerCase().includes(search)
        );
    }

    // Filter by department
    if (department) {
        filtered = filtered.filter(
            (f: Faculty) => f.department.toLowerCase() === department
        );
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return new Response(
        JSON.stringify({
            data: paginated,
            total: filtered.length,
            page,
            limit,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}

export async function POST(request: Request) {
    const body = await request.json();

    const newFaculty = {
        id: faculties.length + 1,
        courseIds: [],
        ...body,
    };

    faculties.push(newFaculty);

    return new Response(JSON.stringify(newFaculty), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const updates = await request.json();

    const updatedFaculties = updates.map((update: Faculty) => {
        const index = faculties.findIndex((f: Faculty) => f.id === update.id);
        if (index !== -1) {
            faculties[index] = { ...faculties[index], ...update };
            return faculties[index];
        }
        return null;
    }).filter(Boolean);

    return new Response(JSON.stringify(updatedFaculties), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}