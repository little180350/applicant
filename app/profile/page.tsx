'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type ChangeRequest = {
    id: string;
    field: string;
    submittedAt: string;
    status: "pending" | "approved" | "draft";
    latestUpdate: string;
};

const initialRequests: ChangeRequest[] = [
    {
        id: "PC-2569-008",
        field: "ที่อยู่ปัจจุบัน",
        submittedAt: "12 ก.พ. 2569 · 10:15 น.",
        status: "pending",
        latestUpdate: "ฝ่ายบุคคลกำลังตรวจสอบเอกสาร",
    },
    {
        id: "PC-2569-006",
        field: "ผู้ติดต่อฉุกเฉิน",
        submittedAt: "7 ก.พ. 2569 · 14:20 น.",
        status: "approved",
        latestUpdate: "บันทึกเมื่อ 8 ก.พ. 2569 · 09:42 น.",
    },
    {
        id: "PC-2569-009",
        field: "เบอร์โทรศัพท์",
        submittedAt: "13 ก.พ. 2569 · 09:10 น.",
        status: "draft",
        latestUpdate: "ยังไม่ได้ส่งข้อมูล · กรอกต่อ →",
    },
];

const statusLabels = {
    pending: "รอตรวจสอบ",
    approved: "อนุมัติและบันทึกแล้ว",
    draft: "ฉบับร่าง",
};

const statusStyles = {
    pending: "bg-neutral-100 text-neutral-700",
    approved: "border border-neutral-300 bg-white text-neutral-700",
    draft: "border border-neutral-300 bg-white text-neutral-700",
};

function ProfileField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1">
            <dt className="text-[11px] text-neutral-400">{label}</dt>
            <dd className="text-xs font-medium leading-5 text-neutral-800">
                {children}
            </dd>
        </div>
    );
}

export default function ProfilePage() {
    const [requests, setRequests] = useState(initialRequests);
    const [cancelRequestId, setCancelRequestId] = useState<string | null>(null);
    const requestToCancel = requests.find((request) => request.id === cancelRequestId);

    useEffect(() => {
        if (!cancelRequestId) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setCancelRequestId(null);
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [cancelRequestId]);

    function cancelRequest() {
        if (!cancelRequestId) return;
        setRequests((current) =>
            current.filter((request) => request.id !== cancelRequestId),
        );
        setCancelRequestId(null);
    }

    return (
        <div className="mx-auto max-w-[1500px] space-y-4 px-1 pb-8 text-sm text-neutral-800">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <div className="mb-1 text-xs text-neutral-400">
                        พนักงาน / โปรไฟล์ของฉัน
                    </div>
                    <h1 className="text-xl font-semibold">โปรไฟล์ของฉัน</h1>
                    <p className="mt-1 text-xs text-neutral-500">
                        ตรวจสอบข้อมูลส่วนตัวและติดตามคำขอเปลี่ยนแปลงข้อมูลของคุณ
                    </p>
                </div>
                <Link href={'/profile/changeprofile'}><button
                    className="rounded bg-neutral-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-neutral-700"
                >
                    ยื่นคำขอเปลี่ยนข้อมูล
                </button></Link>

            </div>

            <aside className="flex items-start gap-3 rounded border border-neutral-200 bg-neutral-100 p-3">
                <span className="mt-0.5 text-neutral-600" aria-hidden="true">
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <rect x="5" y="10" width="14" height="11" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                </span>
                <div>
                    <h2 className="text-xs font-semibold">
                        ฝ่ายบุคคลเท่านั้นที่แก้ไขข้อมูลจริงได้
                    </h2>
                    <p className="mt-1 text-[11px] text-neutral-500">
                        คุณสามารถดูข้อมูลและยื่นคำขอเปลี่ยนข้อมูลได้
                        แต่ไม่สามารถแก้ไขข้อมูลในโปรไฟล์ได้โดยตรง
                    </p>
                </div>
            </aside>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.92fr)]">
                <section className="rounded border border-neutral-200 bg-white p-4">
                    <h2 className="font-semibold">ข้อมูลส่วนตัว</h2>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded bg-neutral-100 text-sm font-semibold text-neutral-700">
                                กจ
                            </span>
                            <div>
                                <p className="text-sm font-semibold">กมลชนก ใจดี</p>
                                <p className="mt-1 text-[11px] text-neutral-500">
                                    EMP-1024 · ฝ่ายการตลาด
                                </p>
                            </div>
                        </div>
                        <span className="rounded border border-neutral-200 px-2 py-1 text-[11px] text-neutral-600">
                            ดูข้อมูลเท่านั้น
                        </span>
                    </div>

                    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 pt-3 sm:grid-cols-2">
                        <ProfileField label="วันเกิด">15 พฤษภาคม 2535</ProfileField>
                        <ProfileField label="ตำแหน่ง">เจ้าหน้าที่การตลาด</ProfileField>
                        <ProfileField label="วันที่เริ่มงาน">1 มีนาคม 2565</ProfileField>
                        <ProfileField label="หน่วยงาน">ฝ่ายการตลาด</ProfileField>
                        <ProfileField label="สถานภาพสมรส">โสด</ProfileField>
                        <ProfileField label="ชื่อบิดา">สมหมาย ใจดี</ProfileField>
                        <ProfileField label="ชื่อมารดา">สมศรี ใจดี</ProfileField>
                        <ProfileField label="สัญชาติ">ไทย</ProfileField>
                        <ProfileField label="เพศ">หญิง</ProfileField>
                        <ProfileField label="ศาสนา">พุทธ</ProfileField>
                        <ProfileField label="อีเมล">kamonchanok.j@example.com</ProfileField>
                        <ProfileField label="เบอร์โทรศัพท์">081-234-5678</ProfileField>
                        <div className="sm:col-span-2">
                            <ProfileField label="ที่อยู่ปัจจุบัน">
                                88/24 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900
                            </ProfileField>
                        </div>
                        <div className="sm:col-span-2">
                            <ProfileField label="ผู้ติดต่อฉุกเฉิน">
                                กิตติ ใจดี (พี่ชาย) · 082-345-6789
                            </ProfileField>
                        </div>
                    </dl>
                </section>

                <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <section className="rounded border border-neutral-200 bg-white p-4">
                        <h2 className="font-semibold">การแก้ไขล่าสุด</h2>
                        <dl className="mt-3 space-y-3">
                            <ProfileField label="วันที่และเวลา">
                                8 มิ.ย. 2569 · 09:42 น.
                            </ProfileField>
                            <ProfileField label="ผู้แก้ไขข้อมูล">
                                ศิริพร วัฒนกุล
                            </ProfileField>
                        </dl>
                        <div className="mt-3 border-b border-neutral-200 pb-3">
                            <span className="rounded border border-neutral-200 px-2 py-1 text-[10px] text-neutral-600">
                                เจ้าหน้าที่บุคคล (HR)
                            </span>
                        </div>
                        <p className="mt-3 text-[11px] text-neutral-400">
                            บันทึกข้อมูลผู้ติดต่อฉุกเฉินตามคำขอ PC-2569-006
                        </p>
                    </section>

                    <section className="rounded border border-neutral-200 bg-white p-4">
                        <h2 className="font-semibold">เมื่อข้อมูลไม่ถูกต้อง</h2>
                        <p className="mt-3 text-xs leading-5 text-neutral-600">
                            ยื่นคำขอพร้อมเหตุผลและหลักฐานให้ฝ่ายบุคคลตรวจสอบ
                            เมื่อข้อมูลได้รับการตรวจสอบและอนุมัติแล้ว ระบบจะอัปเดตให้
                        </p>
                        <a
                            href="mailto:hr@example.com"
                            className="mt-3 inline-block text-[11px] text-neutral-500 underline"
                        >
                            ติดต่อเพิ่มเติมกับฝ่ายทรัพยากรบุคคล
                        </a>
                    </section>
                </div>
            </div>

            <section className="rounded border border-neutral-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-semibold">คำขอเปลี่ยนข้อมูลของฉัน</h2>
                    <span className="text-[11px] text-neutral-400">
                        {requests.length} รายการ · รอตรวจสอบ{" "}
                        {requests.filter((request) => request.status === "pending").length} ·
                        อนุมัติแล้ว{" "}
                        {requests.filter((request) => request.status === "approved").length}
                    </span>
                </div>

                <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[680px] border-collapse text-left text-xs">
                        <thead>
                            <tr className="bg-neutral-100 text-neutral-600">
                                <th className="px-3 py-2 font-medium">เลขที่คำขอ</th>
                                <th className="px-3 py-2 font-medium">
                                    ข้อมูลที่เปลี่ยน / วันที่ยื่นคำขอ
                                </th>
                                <th className="px-3 py-2 font-medium">สถานะ</th>
                                <th className="px-3 py-2 font-medium">ความคืบหน้าล่าสุด</th>
                                <th className="px-3 py-2 text-right font-medium">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr
                                    key={request.id}
                                    className={`border-b border-neutral-100 ${index === 0 ? "bg-neutral-50" : ""
                                        }`}
                                >
                                    <td className="px-3 py-3 font-medium">{request.id}</td>
                                    <td className="px-3 py-3">
                                        <p className="font-medium">{request.field}</p>
                                        <p className="mt-1 text-[11px] text-neutral-400">
                                            {request.submittedAt}
                                        </p>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={`whitespace-nowrap rounded px-2 py-1 text-[11px] ${statusStyles[request.status]}`}
                                        >
                                            {statusLabels[request.status]}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-neutral-500">
                                        {request.latestUpdate}
                                    </td>
                                    <td className="px-3 py-3 text-right">
                                        {request.status === "pending" ? (
                                            <button
                                                type="button"
                                                onClick={() => setCancelRequestId(request.id)}
                                                className="whitespace-nowrap rounded border border-neutral-300 px-2 py-1 text-[11px] text-neutral-700 transition hover:bg-neutral-100"
                                            >
                                                ยกเลิกคำขอ
                                            </button>
                                        ) : request.status === "draft" ? (
                                            <Link
                                                href="/profile/changeprofile"
                                                className="whitespace-nowrap rounded border border-neutral-300 px-2 py-1 text-[11px] text-neutral-700 transition hover:bg-neutral-100"
                                            >
                                                แก้ไขฉบับร่าง
                                            </Link>
                                        ) : (
                                            <span className="text-[11px] text-neutral-400">ยกเลิกไม่ได้</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-3 py-8 text-center text-neutral-500"
                                    >
                                        ไม่มีคำขอเปลี่ยนข้อมูล
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {requestToCancel && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) setCancelRequestId(null);
                    }}
                >
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="cancel-request-title"
                        aria-describedby="cancel-request-description"
                        className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl"
                    >
                        <h2 id="cancel-request-title" className="text-base font-semibold">
                            ยืนยันการยกเลิกคำขอ
                        </h2>
                        <p id="cancel-request-description" className="mt-2 text-sm text-neutral-600">
                            ต้องการยกเลิกคำขอ {requestToCancel.id} ({requestToCancel.field})
                            ใช่หรือไม่? เมื่อยืนยันแล้ว คำขอนี้จะถูกนำออกจากรายการ
                        </p>
                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                autoFocus
                                onClick={() => setCancelRequestId(null)}
                                className="rounded border border-neutral-300 px-3 py-2 text-xs hover:bg-neutral-50"
                            >
                                กลับ
                            </button>
                            <button
                                type="button"
                                onClick={cancelRequest}
                                className="rounded bg-neutral-800 px-3 py-2 text-xs text-white hover:bg-neutral-700"
                            >
                                ยืนยันการยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
