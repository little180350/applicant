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
            <div className={`app-sidebar ${isCollapsed ? "app-sidebar--collapsed" : ""} sticky top-0 flex h-screen shrink-0 flex-col overflow-x-hidden overflow-y-auto border-r border-[#E2E8F0] px-3 py-4 transition-[width] duration-300`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
                    <button
                        type="button"
                        aria-expanded={!isCollapsed}
                        aria-label={isCollapsed ? "ขยายแถบเมนู" : "ย่อแถบเมนู"}
                        onClick={() => setIsCollapsed((collapsed) => !collapsed)}
                        className="shrink-0 cursor-pointer rounded p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                    >
                        <MenuHamburger1 size={35} />
                    </button>
                    {!isCollapsed && (
                        <div className='whitespace text-15 leading-snug font-semibold text-ink max-md:hidden'>
                            ระบบข้อมูลพนักงานและสวัสดิการ
                            <hr />
                            <div className='font-IBMPlexSans text-sm text-gray-500'>
                                พนักงาน
                            </div>
                        </div>
                    )}
                </div>
                <div className={`mt-8 flex items-center font-IBMPlexSans text-sm ${isCollapsed ? "justify-center" : "justify-between"} max-md:hidden`}>
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
                            { icon: UserMultiple4, label: "ยื่นคำขอสวัสดิการแทนพนักงาน", href: "/HeadEm" },
                            { icon: MusicList2, label: "ติดตามสถานะ", href: "/status" },
                            { icon: UserMultiple4, label: "โครงสร้างองค์กร", href: "/organization" },
                        ].map(({ icon: Icon, label, href }) => {
                            const isSelected = pathname === href;

                            return <Link
                                key={label}
                                href={href}
                                aria-current={isSelected ? "page" : undefined}
                                aria-label={label}
                                title={isCollapsed ? label : undefined}
                                className={`flex h-10 w-full cursor-pointer items-center rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${isCollapsed ? "justify-center" : "gap-2 px-2 text-left"} ${isSelected ? "bg-[#EFF6FF] text-olive-900" : "text-[#334155] hover:bg-[#F8FAFC]"} max-md:justify-center max-md:gap-0 max-md:px-0`}
                            >
                                <Icon size={20} aria-hidden="true" /> {!isCollapsed && <span className="max-md:hidden">{label}</span>}
                            </Link>;
                        })}
                    </div>
                </div>
                <div className={`mt-auto flex min-h-[48px] shrink-0 items-center justify-between border-t border-[#E2E8F0] pt-3 font-IBMPlexSans text-sm ${isCollapsed ? "flex-col justify-center gap-3" : ""} max-md:flex-col max-md:justify-center max-md:gap-3`}>
                    <button
                        type="button"
                        aria-label="ออกจากระบบ"
                        title={isCollapsed ? "ออกจากระบบ" : undefined}
                        className={`flex cursor-pointer items-center rounded px-2 py-1 text-[#334155] transition-colors hover:bg-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${isCollapsed ? "justify-center" : "gap-2"} max-md:justify-center`}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        {!isCollapsed && <span className="max-md:hidden">ออกจากระบบ</span>}
                    </button>
                    <Link href="/profile">
                        <div
                            className={`flex items-center text-[#475569] ${isCollapsed ? "justify-center" : "gap-2"} max-md:justify-center`}
                            title={isCollapsed ? "โปรไฟล์พนักงาน" : undefined}
                        >
                            <i className="bi bi-person-circle text-lg" aria-hidden="true"></i>
                            {!isCollapsed && (
                                <span className="whitespace-nowrap text-xs max-md:hidden">พนักงาน</span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}