'use client'

import { MenuHamburger1, DashboardSquare1, BoxGift2, FileText, MusicList2, UserMultiple4 } from "@tailgrids/icons";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navs() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const pathname = usePathname();

    return (
        <>
            <div className={`${isCollapsed ? "w-[72px]" : "w-[240px]"} sticky top-0 flex h-screen shrink-0 flex-col overflow-x-hidden overflow-y-auto border-r border-black px-3 py-4 transition-[width] duration-300`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
                    <button
                        type="button"
                        aria-expanded={!isCollapsed}
                        aria-label={isCollapsed ? "opensidebar" : "closesidebar"}
                        onClick={() => setIsCollapsed((collapsed) => !collapsed)}
                        className="shrink-0 cursor-pointer"
                    >
                        <MenuHamburger1 size={35} />
                    </button>
                    {!isCollapsed && (
                        <div className='whitespace text-15 leading-snug font-semibold text-ink'>
                            ระบบข้อมูลพนักงานและสวัสดิการ
                            <hr />
                            <div className='font-IBMPlexSans text-sm text-gray-500'>
                                พนักงาน
                            </div>
                        </div>
                    )}
                </div>
                <div className={`mt-8 flex items-center font-IBMPlexSans text-sm ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    {!isCollapsed && <span className="whitespace-nowrap">พื้นที่ของฉัน</span>}
                    {!isCollapsed && (
                        <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls="navs"
                            aria-label={isOpen ? "openmenu" : "closemenu"}
                            onClick={() => setIsOpen((open) => !open)}
                        >
                            <i className={`bi bi-caret-down-fill inline-block cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}></i>
                        </button>
                    )}
                </div>
                <div
                    className={`mt-5 grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    id="navs"
                    aria-hidden={!isOpen}
                >
                    <div className={`min-h-0 overflow-hidden font-IBMPlexSans text-sm flex flex-col transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                        {[
                            { icon: DashboardSquare1, label: "ภาพรวมสวัสดิการของฉัน", href: '/' },
                            { icon: BoxGift2, label: "สิทธิ์สวัสดิการ", href: "/welfare" },
                            { icon: FileText, label: "ยื่นคำขอสวัสดิการ", href: "/withdraw" },
                            { icon: MusicList2, label: "ติดตามสถานะ", href: "/status" },
                            { icon: UserMultiple4, label: "โครงสร้างองค์กร", href: "/organization" },
                        ].map(({ icon: Icon, label, href }) => {
                            const isSelected = pathname === href;

                            return <Link
                                key={label}
                                href={href}
                                aria-current={isSelected ? "page" : undefined}
                                title={isCollapsed ? label : undefined}
                                className={`flex h-[37px] w-full cursor-pointer items-center rounded transition-colors ${isCollapsed ? "justify-center" : "gap-2 px-2 text-left"} ${isSelected ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            >
                                <Icon size={20} /> {!isCollapsed && label}
                            </Link>;
                        })}
                    </div>
                </div>
                <div className={`mt-auto flex min-h-[48px] shrink-0 items-center justify-between border-t border-gray-200 pt-3 font-IBMPlexSans text-sm ${isCollapsed ? "flex-col justify-center gap-3" : ""}`}>
                    <button
                        type="button"
                        aria-label="ออกจากระบบ"
                        title={isCollapsed ? "ออกจากระบบ" : undefined}
                        className={`flex cursor-pointer items-center rounded px-2 py-1 text-gray-700 transition-colors hover:bg-gray-100 ${isCollapsed ? "justify-center" : "gap-2"}`}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        {!isCollapsed && <span>ออกจากระบบ</span>}
                    </button>
                    <Link href="/profile">
                        <div
                            className={`flex items-center text-gray-600 ${isCollapsed ? "justify-center" : "gap-2"}`}
                            title={isCollapsed ? "โปรไฟล์พนักงาน" : undefined}
                        >
                            <i className="bi bi-person-circle text-lg"></i>
                            {!isCollapsed && (
                                <span className="whitespace-nowrap text-xs">พนักงาน</span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}