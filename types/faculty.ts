export interface Faculty {
    id: number;
    name: string;
    email: string;
    department: string;
    designation: string;
    courseIds: number[];
}

export interface FacultyResponse {
    data: Faculty[];
    total: number;
    page: number;
    limit: number;
}

export interface FacultyOptions {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
}