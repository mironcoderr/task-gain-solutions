import SelectOptionComponent from "@/components/SelectOptionComponent";
import SearchComponent from "@/components/SearchComponent";
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

    const totalPages = Math.ceil(faculties.total / faculties.limit);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const departments = Array.from(new Set(faculties.data.map((f: Faculty) => f.department)));
    const hasSearchParams = Object.keys(searchOption).length > 0;

    return (
        <>
        <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-xl font-semibold capitalize">faculties</h3>
            <div className="flex items-center gap-3">
                <SearchComponent 
                    paramName="search" 
                    initialValue={searchOption.search} 
                />
                <SelectOptionComponent 
                    modelValue={searchOption.department}
                    options={departments}
                    selectClass="px-3 w-44 h-9 rounded-lg border border-gray-100"
                    optionClass="w-full top-9"
                    paramName="department"
                />
                <SelectOptionComponent
                    modelValue={faculties.limit.toString()}
                    options={['3', '4', '5', '10']}
                    selectClass="px-3 h-9 rounded-lg border border-gray-100"
                    optionClass="w-full top-9"
                    paramName="limit"
                />
                {hasSearchParams &&
                    <Link href="/faculties" className="px-4 h-9 leading-9 rounded-lg bg-primary text-white">
                        Reset
                    </Link>
                }
            </div>
        </div>
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
            <div className="flex items-center justify-between gap-4 mt-4">
                <p className="text-sm">
                    Showing 
                    <b> {faculties.data.length} </b>
                    of 
                    <b> {faculties.total} </b>
                    Results
                </p>
                <nav className="flex items-center gap-2">
                    {pages.map((page) => (
                        <Link
                            key={page}
                            href={{
                                pathname: "/students",
                                query: { ...searchOption, page },
                            }}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${page === faculties.page
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {page}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}