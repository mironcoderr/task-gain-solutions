import { Course, CourseOptions, CourseResponse } from "@/types/course";

export async function getAllCourses({ page, limit, search, department }: CourseOptions = {}): Promise<CourseResponse> {
    try {
        const params = new URLSearchParams();

        if (page !== undefined) params.append("page", page.toString());
        if (limit !== undefined) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (department) params.append("department", department);

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/courses?" + params);

        if (!response.ok) {
            throw new Error("Failed to fetch courses data");
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error fetching courses data:", error);
        throw error;
    }
}

export async function getSingleCourse(id: string): Promise<Course> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/courses/" + id);

        if (!response.ok) {
            throw new Error("Failed to fetch course data");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error fetching course data:", error);
        throw error;
    }
}