export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    year: number;
    department: string;
    courseIds: number[];
    gpa: number;
}

export interface StudentResponse {
    data: Student[];
    total: number;
    page: number;
    limit: number;
}

export interface StudentOptions {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
}