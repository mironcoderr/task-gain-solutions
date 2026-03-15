export interface Course {
    id: number;
    title: string;
    code: string;
    department: string;
    facultyId: number;
    enrollmentCount: number;
}

export interface CourseResponse {
    data: Course[];
    total: number;
    page: number;
    limit: number;
}

export interface CourseOptions {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
}