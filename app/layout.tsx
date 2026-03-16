import { Toaster } from 'react-hot-toast';
import { Urbanist } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/public/icons/iconly.css";
import "./globals.css";

const googleFont = Urbanist({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Gain Solutions Task",
    description: "Gain Solutions Task - Academic Management Dashboard",
    authors: [{ name: "Miron Mahmud", url: "https://mironmahmud.com" }],
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" dir="ltr">
            <body className={`${googleFont.className} antialiased flex gap-4 p-4`}>
                <aside className='w-64 shrink-0 p-4 rounded-2xl bg-primary/5'>
                    <Link href="/" className='w-fit mb-4'>
                        <Image src="/images/logo.webp" alt="logo" width={150} height={50} loading="eager" className="w-32" />
                    </Link>
                    <nav className='flex flex-col'>
                        <Link className='flex items-center gap-3 py-2' href="/"><i className='mc-line-area-chart text-xl'></i>Dashboard</Link>
                        <Link className='flex items-center gap-3 py-2' href="/students"><i className='mc-line-users text-xl'></i>Students</Link>
                        <Link className='flex items-center gap-3 py-2' href="/courses"><i className='mc-line-keyboard-open text-xl'></i>Courses</Link>
                        <Link className='flex items-center gap-3 py-2' href="/faculties"><i className='mc-line-element-plus text-xl'></i>Faculties</Link>
                    </nav>
                </aside>
                <main className="w-full flex-auto">
                    {children}
                </main>

                <Toaster
                    toastOptions={{
                        style: {
                            padding: "8px 16px",
                            borderRadius: "12px",
                        },
                    }}
                />
            </body>
        </html>
    );
}