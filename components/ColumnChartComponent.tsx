"use client";

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Student } from "@/types/student";


export default function ColumnChartComponent({ students }: { students: Student[] }) {

    const series = [
        {
            name: "GPA",
            data: students.map((s) => s.gpa),
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
            fontFamily: "inherit",
        },

        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "40%",
            },
        },

        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            offsetY: -20,
            style: {
                fontSize: "12px",
            },
        },

        xaxis: {
            categories: students.map((_, index) => index + 1),
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        tooltip: {
            x: {
                formatter: (_, { dataPointIndex }) => {
                    return students[dataPointIndex].name;
                },
            },
        },

        yaxis: {
            max: 4,
            min: 0,
            tickAmount: 4,
        },

        grid: {
            strokeDashArray: 4,
        },

        colors: ["#518dff"],
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