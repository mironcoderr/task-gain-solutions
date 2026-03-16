import { Faculty, FacultyOptions } from "@/types/faculty";
import { getAllFaculties } from "@/library/faculty";
import Link from "next/link";

export default async function FacultiesPage({ searchParams }: { searchParams: Promise<FacultyOptions> }) {

    const searchOption = await searchParams;

    const faculties = await getAllFaculties({
        page: searchOption.page,
        limit: searchOption.limit,
        search: searchOption.search,
        department: searchOption.department,
    });

    return (
        <>
        <h3 className="text-xl font-semibold capitalize mb-4">faculties</h3>
        <div className="rounded-2xl overflow-x-auto">
            <table className="w-full ltr:text-left rtl:text-right">
                <thead className="text-xs uppercase text-white bg-primary">
                    <tr>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">id</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">name</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">email</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">department</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">designation</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">course</th>
                        <th scope="col" className="px-4 py-3.5 tracking-wide">action</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {faculties.data.map((faculty: Faculty, index: number) => (
                        <tr key={index} className="odd:bg-white even:bg-primary/5">
                            <th scope="row" className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">#{faculty.id}</th>
                            <td className="px-4 py-4">{faculty.name}</td>
                            <td className="px-4 py-4">{faculty.email}</td>
                            <td className="px-4 py-4">{faculty.department}</td>
                            <td className="px-4 py-4">{faculty.designation}</td>
                            <td className="px-4 py-4">{faculty.courseIds.length}</td>
                            <td className="px-4 py-4">
                                <Link href={`/faculties/${faculty.id}`} className="text-primary hover:text-primary/80">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}