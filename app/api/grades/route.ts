import grades from "@/json/grades.json";
import { Grade } from "@/types/grade";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const studentId = Number(searchParams.get("studentId") || grades.length);
    const courseId = Number(searchParams.get("courseId") || 0);
    const leaderboard = searchParams.get("leaderboard") === "true";

    let filtered = [...grades];

    // Filter by studentId
    if (studentId) {
        filtered = filtered.filter((g: Grade) => g.studentId === studentId);
    }

    // Filter by courseId
    if (courseId) {
        filtered = filtered.filter((g: Grade) => g.courseId === courseId);
    }

    // Leaderboard: sort by score descending
    if (leaderboard) {
        filtered.sort((a: Grade, b: Grade) => b.score - a.score);
    }

    return new Response(JSON.stringify(filtered), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    // body: { studentId, courseId, grade, score, semester }

    const newGrade = {
        id: grades.length + 1,
        ...body
    };

    grades.push(newGrade);

    return new Response(JSON.stringify(newGrade), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}