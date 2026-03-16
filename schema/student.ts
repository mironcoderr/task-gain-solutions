import { z } from "zod";

const currentYear = new Date().getFullYear();

const studentSchema = z.object({
    name: z.string().min(1, "Name is required"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    phone: z.string().min(1, "Phone is required"),

    department: z.string().min(1, "Department is required"),

    year: z
        .number()
        .int("Year must be a valid year")
        .min(2000, "Year must be after 2000")
        .max(currentYear, "Year cannot be in the future"),

    gpa: z
        .number()
        .min(1, "GPA must be at least 1.00")
        .max(5, "GPA cannot exceed 5.00")
        .refine((val) => /^\d(\.\d{1,2})?$/.test(val.toString()), {
            message: "GPA must have up to 2 decimal places",
        }),

    courseIds: z
        .array(z.number())
        .min(1, "Select at least one course"),
});

export default studentSchema;