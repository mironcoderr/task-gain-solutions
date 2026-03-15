"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SearchInputProps {
    paramName: string;
    initialValue?: string;
}

export default function SearchInput({ paramName, initialValue = "" }: SearchInputProps) {

    const [value, setValue] = useState(initialValue);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ⭐ important fix
    useEffect(() => {
        setValue(initialValue || "");
    }, [initialValue]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const current = Object.fromEntries(searchParams.entries());
        const params = new URLSearchParams(current);

        if (value) {
            params.set(paramName, value);
        } else {
            params.delete(paramName);
        }

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            className="flex items-center px-2.5 w-50 h-9 gap-2 border border-gray-100 rounded-lg"
            onSubmit={handleSearch}
        >
            <button type="submit" className="mc-line-search"></button>

            <input
                type="text"
                placeholder="Search students..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full outline-none"
            />
        </form>
    );
}