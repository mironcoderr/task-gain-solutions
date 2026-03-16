"use client"

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteStudent } from "@/library/student";

interface Props {
    identify: 'course' | 'faculty' | 'student';
    deleteId: string
}

export default function DeleteComponent({identify, deleteId}: Props) {

    const router = useRouter();

    const handleDelete = async () => {
        if (identify === 'student') {
            await deleteStudent(deleteId);
            toast.success('Student Successfully Deleted!');
            router.push('/students')
        }
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/50">
            <div className="w-full max-w-md mx-auto my-10 p-6 text-center rounded-2xl bg-white">
                <i className="mc-line-alertness text-5xl text-danger mb-3"></i>
                <h3 className="mb-3 text-xl font-semibold capitalize">delete confirmation</h3>
                <p className="mb-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eveniet? Officiis ab, earum cumque sint modi excepturi pariatur quod reprehenderit, nulla accusantium doloribus atque maiores!</p>
                <nav className="flex items-center justify-center gap-3">
                    <button type="button" onClick={handleDelete} className="px-4 h-9 leading-9 text-sm font-semibold rounded-lg capitalize bg-primary text-white">confirm</button>
                    <button type="button" onClick={router.back} className="px-4 h-9 leading-9 text-sm font-semibold rounded-lg capitalize bg-gray-200 text-paragraph">cancel</button>
                </nav>
            </div>
        </div>
    )
}