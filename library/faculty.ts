import { Faculty, FacultyOptions, FacultyResponse } from "@/types/faculty";

export async function getAllFaculties({ page, limit, search, department }: FacultyOptions = {}): Promise<FacultyResponse> {
    try {
        const params = new URLSearchParams();

        if (page !== undefined) params.append("page", page.toString());
        if (limit !== undefined) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (department) params.append("department", department);

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/faculties?" + params);

        if (!response.ok) {
            throw new Error("Failed to fetch faculties data");
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error fetching faculties data:", error);
        throw error;
    }
}

export async function getSingleFaculty(id: string): Promise<Faculty> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/faculties/" + id);

        if (!response.ok) {
            throw new Error("Failed to fetch faculty data");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error fetching faculty data:", error);
        throw error;
    }
}