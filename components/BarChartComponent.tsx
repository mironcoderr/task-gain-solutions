"use client";

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Course } from "@/types/course";

export default function BarChartComponent({ courses }: { courses: Course[] }) {

    const series = [
        {
            name: "Enrollments",
            data: courses.map((course) => course.enrollmentCount),
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 350,
            fontFamily: 'inherit',
            foreColor: '#5A5C5E',
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: true,
            },
        },
        xaxis: {
            axisBorder: { show: false },
            categories: courses.map((course) => course.title),
        },
        dataLabels: { enabled: false},
        grid: { show: false },
        colors:['#518dff'],
    };

    return (
        <ReactApexChart 
            options={options} 
            series={series} 
            height={350} 
            type="bar" 
        />
    );
}