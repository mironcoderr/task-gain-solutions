"use client"

import Select from "react-select";
import { useState, useEffect } from "react";

interface Option {
    value: number;
    label: string;
}

interface Props {
    defaultValue?: Option[];
    options: Option[];
    name: string;
    onChange?: (selected: Option[]) => void; 
}

export default function MultiSelectComponent({ defaultValue, options, name, onChange }: Props) {
    
    const [mounted, setMounted] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultValue || []);

    useEffect(() => {
        setSelectedOptions(defaultValue || []);
    }, [defaultValue]);

    const handleChange = (selected: any) => {
        setSelectedOptions(selected || []);
        onChange?.(selected || []);
    };

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Select
            name={name}
            value={selectedOptions}
            onChange={handleChange}
            isMulti
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
}