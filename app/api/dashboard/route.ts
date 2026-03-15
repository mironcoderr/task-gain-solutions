import students from "@/json/students.json";
import courses from "@/json/courses.json";
import faculties from "@/json/faculties.json";

export async function GET() {

    // totals
    const totalStudents = students.length;
    const totalCourses = courses.length;
    const totalFaculty = faculties.length;

    // top ranking students by GPA
    const topStudents = [...students]
        .sort((a, b) => b.gpa - a.gpa)
        .slice(0, 5)

    // most popular courses by enrollment count
    const popularCourses = [...courses]
        .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
        .slice(0, 5)

    return new Response(
        JSON.stringify({
            totalStudents,
            totalCourses,
            totalFaculty,
            topStudents,
            popularCourses
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" }
        }
    );
}