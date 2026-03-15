"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface SelectOptionComponentProps {
    modelValue?: string;
    options: string[];
    groupClass?: string;
    selectClass?: string;
    optionClass?: string;
    placeholder?: string;
    direction?: string;
    paramName: string;
}

export default function SelectOptionComponent({
    modelValue = "",
    options,
    groupClass,
    selectClass,
    optionClass,
    paramName,
    direction = "rtl",
    placeholder = "Select an option",
}: SelectOptionComponentProps) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(modelValue);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setSelectedOption(modelValue);
    }, [modelValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);

        const current = Object.fromEntries(searchParams.entries());
        const params = new URLSearchParams(current);
        params.set(paramName, option);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div ref={dropdownRef} className={`${groupClass} relative`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${selectClass} flex items-center cursor-pointer gap-1.5`}
            >
                <span className="flex-auto w-fit text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis text-gray-700">
                    {selectedOption || placeholder}
                </span>
                <i className={`
                        mc-line-chevron-down text-base shrink-0 transition-all duration-300
                        ${isOpen ? "rotate-180" : "rotate-0"}
                    `}
                ></i>
            </div>

            <ul className={`
                py-2 absolute top-6 z-20 shadow-paper rounded-xl origin-top thin-scrolling bg-white transition-transform duration-300
                ${direction === 'left' ? 'ltr:left-0 rtl:right-0' : 'ltr:right-0 rtl:left-0'}
                ${isOpen ? "scale-y-100" : "scale-y-0"}
                ${optionClass}
            `}>
                {options.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelect(option)}
                        className="px-4 py-1.5 text-sm cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden hover:text-primary hover:bg-gray-50"
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}
