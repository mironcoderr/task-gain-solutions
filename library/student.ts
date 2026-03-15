import { Student, StudentOptions, StudentResponse } from "@/types/student";

export async function getAllStudents({ page, limit, search, department }: StudentOptions = {}): Promise<StudentResponse> {
    try {
        const params = new URLSearchParams();

        if (page !== undefined) params.append("page", page.toString());
        if (limit !== undefined) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (department) params.append("department", department);

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/students?" + params, {
            method: 'GET',
            cache: 'no-store',
            next: { tags: ["students"] }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch students data");
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error fetching students data:", error);
        throw error;
    }
}

export async function getSingleStudent(id: string): Promise<Student> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/students/" + id, {
            method: 'GET',
            cache: 'no-store',
            next: { tags: [`students-${id}`] }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch student data");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error fetching student data:", error);
        throw error;
    }
}

export async function postCreateStudent(data: Omit<Student, "id">): Promise<Student> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/students",
            {
                method: "POST",
                cache: 'no-store',
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create student");
        }

        const student: Student = await response.json();

        return student;
    } 
    catch (error) {
        console.error("Create student error:", error);
        throw error;
    }
}

export async function putUpdateStudent(data: Student): Promise<Student> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/students/" + data.id,
            {
                method: 'PUT',
                cache: 'no-store',
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update student: ${errorText}`);
        }

        const updatedStudent: Student = await response.json();
        return updatedStudent;
    }
    catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
}



