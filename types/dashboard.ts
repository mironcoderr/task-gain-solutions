import { Course } from "./course";
import { Student } from "./student";

export interface Dashboard {
    totalStudents: number;
    totalCourses: number;
    totalFaculty: number;
    topStudents: Student[];
    popularCourses: Course[];
}
