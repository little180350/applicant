'use client';
import Link from "next/link";
import { Search1, Heart, ArrowRight } from "@tailgrids/icons";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/tailgrids/core/navigation-menu";
import { Button } from "@/components/tailgrids/core/button";

export default function WelfarePage() {
    const welfareItems = [
        {
            category: 'สุขภาพ',
            title: 'ค่ารักษาพยาบาล',
            description: 'เบิกค่าตรวจรักษาผู้ป่วยนอกและค่ายาตามใบเสร็จ',
            amount: '10,000 บาท / ปี',
            remaining: 'คงเหลือ 7,500 บาท',
            status: 'ใช้สิทธิ์ได้',
            href: '/welfare/welfaredetail1',
        },
        {
            category: 'สุขภาพ',
            title: 'ค่าทันตกรรม',
            description: 'เบิกค่ารักษาฟันและบริการทันตกรรมในคลินิกที่ร่วมโครงการ',
            amount: '5,000 บาท / ปี',
            remaining: 'คงเหลือ 3,200 บาท',
            status: 'ใช้สิทธิ์ได้',
            href: '/welfare/welfaredetail2',
        },
        {
            category: 'สุขภาพ',
            title: 'ตรวจสุขภาพประจำปี',
            description: 'ให้สิทธิเบิกค่าตรวจร่างกายและสุขภาพประจำปี',
            amount: '3,000 บาท / ปี',
            remaining: 'คงเหลือ 2,250 บาท',
            status: 'ใช้สิทธิ์ได้',
            href: '/welfare/welfaredetail3',
        },
        {
            category: 'การเรียนรู้',
            title: 'ค่าลงทะเบียนอบรม',
            description: 'สนับสนุนค่าอบรมและหลักสูตรฝึกอบรมทางวิชาชีพ',
            amount: '12,000 บาท / ปี',
            remaining: 'คงเหลือ 8,500 บาท',
            status: 'ใช้สิทธิ์ได้',
            href: '/welfare/welfaredetail4',
        },
        {
            category: 'ครอบครัว',
            title: 'ค่ารักษาพยาบาลบุตร',
            description: 'เบิกค่ารักษาพยาบาลสำหรับสมาชิกในครอบครัวสำคัญ',
            amount: '8,000 บาท / ปี',
            remaining: 'คงเหลือ 5,200 บาท',
            status: 'ใช้สิทธิ์ได้',
            href: '/welfare/welfaredetail5',
        },
        {
            category: 'ครอบครัว',
            title: 'ค่าภูมิคุ้มกันบุตร',
            description: 'จัดสรรสำหรับค่า vaccine และบริการฉีดวัคซีนตามนโยบาย',
            amount: '4,500 บาท / ปี',
            remaining: 'คงเหลือ 2,900 บาท',
            status: 'ใช้สิทธิ์ได้',
            href: '/welfare/welfaredetail6',
        },
    ];

    return (
        <div className="mx-auto max-w-[1280px] space-y-4 px-1 py-3 text-slate-800">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex h-[42px] w-full items-center gap-3 border border-slate-200 bg-white px-3 md:max-w-[760px]">
                    <Search1 className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="ค้นหาสวัสดิการ..."
                        className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                </div>

                <div className="rounded border border-slate-200 bg-white">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="px-4 py-2 text-sm text-slate-700">
                                    สิทธิ์ปี 2569
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                                        2569
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {['ทั้งหมด', 'สุขภาพ', 'การเรียนรู้', 'ครอบครัว'].map((tab, index) => (
                    <Button
                        key={tab}
                        className={index === 0
                            ? 'border border-sky-200 bg-sky-50 text-sm font-medium text-sky-700 hover:bg-sky-100'
                            : 'border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50'}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="text-sm text-slate-500">
                สิทธิ์ที่คุณใช้ได้ <span className="font-medium text-slate-700">{welfareItems.length}</span> รายการ
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {welfareItems.map((item) => (
                    <div key={item.title} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-100">
                                <Heart className="h-4 w-4" />
                            </div>
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                                {item.status}
                            </span>
                        </div>

                        <div className="mt-4 space-y-2">
                            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">{item.category}</p>
                            <p className="text-[1.05rem] font-semibold text-slate-900">{item.title}</p>
                            <p className="min-h-[2.5rem] text-[13px] leading-5 text-slate-500">{item.description}</p>
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500">วงเงิน</div>
                                    <div className="mt-1 font-semibold text-slate-800">{item.amount}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500">เหลือ</div>
                                    <div className="mt-1 font-semibold text-sky-700">{item.remaining}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4">
                            <Link
                                href={item.href}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2.5 text-sm font-medium text-sky-700 transition duration-200 ease-out hover:bg-sky-100"
                            >
                                <span>ดูรายละเอียด</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
