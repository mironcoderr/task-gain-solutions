import courses from "@/json/courses.json";
import { Course } from "@/types/course";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || courses.length);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const department = searchParams.get("department")?.toLowerCase() || "";
    const facultyId = Number(searchParams.get("facultyId") || 0);

    let filtered = [...courses];

    // Search by title or code
    if (search) {
        filtered = filtered.filter(
            (c: Course) =>
                c.title.toLowerCase().includes(search) ||
                c.code.toLowerCase().includes(search)
        );
    }

    // Filter by department
    if (department) {
        filtered = filtered.filter(
            (c: Course) => c.department.toLowerCase() === department
        );
    }

    // Filter by facultyId
    if (facultyId) {
        filtered = filtered.filter((c: Course) => c.facultyId.toString().includes(facultyId.toString()));
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return new Response(JSON.stringify({
        data: paginated,
        total: filtered.length,
        page,
        limit
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    const newCourse = {
        id: courses.length + 1,
        enrollmentCount: 0, 
        ...body
    };

    courses.push(newCourse);

    return new Response(JSON.stringify(newCourse), {
        status: 201,
        headers: { "Content-Type": "application/json" }
    });
}