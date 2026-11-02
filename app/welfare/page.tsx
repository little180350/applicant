'use client';
import Image from "next/image";
import { Search1,Heart,ArrowRight } from "@tailgrids/icons";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuPositioner,
    NavigationMenuTrigger
} from "@/components/tailgrids/core/navigation-menu";
import { Button } from "@/components/tailgrids/core/button";


export default function page() {
    const welfareItems = [
        {
            category: 'สุขภาพ',
            title: 'ค่ารักษาพยาบาล',
            description: 'เบิกค่าตรวจรักษาผู้ป่วยนอกและค่ายาตามใบเสร็จ',
            amount: '10,000 บาท / ปี',
            remaining: 'คงเหลือ 7,500 บาท',
            status: 'ใช้สิทธิ์ได้'
        },
        {
            category: 'สุขภาพ',
            title: 'ค่าทันตกรรม',
            description: 'เบิกค่ารักษาฟันและบริการทันตกรรมในคลินิกที่ร่วมโครงการ',
            amount: '5,000 บาท / ปี',
            remaining: 'คงเหลือ 3,200 บาท',
            status: 'ใช้สิทธิ์ได้'
        },
        {
            category: 'สุขภาพ',
            title: 'ตรวจสุขภาพประจำปี',
            description: 'ให้สิทธิเบิกค่าตรวจร่างกายและสุขภาพประจำปี',
            amount: '3,000 บาท / ปี',
            remaining: 'คงเหลือ 2,250 บาท',
            status: 'ใช้สิทธิ์ได้'
        },
        {
            category: 'การเรียนรู้',
            title: 'ค่าลงทะเบียนอบรม',
            description: 'สนับสนุนค่าอบรมและหลักสูตรฝึกอบรมทางวิชาชีพ',
            amount: '12,000 บาท / ปี',
            remaining: 'คงเหลือ 8,500 บาท',
            status: 'ใช้สิทธิ์ได้'
        },
        {
            category: 'ครอบครัว',
            title: 'ค่ารักษาพยาบาลบุตร',
            description: 'เบิกค่ารักษาพยาบาลสำหรับสมาชิกในครอบครัวสำคัญ',
            amount: '8,000 บาท / ปี',
            remaining: 'คงเหลือ 5,200 บาท',
            status: 'ใช้สิทธิ์ได้'
        },
        {
            category: 'ครอบครัว',
            title: 'ค่าภูมิคุ้มกันบุตร',
            description: 'จัดสรรสำหรับค่า vaccine และบริการฉีดวัคซีนตามนโยบาย',
            amount: '4,500 บาท / ปี',
            remaining: 'คงเหลือ 2,900 บาท',
            status: 'ใช้สิทธิ์ได้'
        }
    ];

    return (
        <>
            <div className="flex gap-5 items-center">
                <div className="flex h-[40px] w-[85%] border items-center px-2 gap-3">
                    <Search1 /><input type="text" placeholder='ค้นหาสวัสดิการ...' className='w-full outline-none' />
                </div>
                <div className='border'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    สิทธิ์ปี 2569
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    
                                    <NavigationMenuLink>

                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className='flex mt-3 gap-3'>
                <Button className='border'>ทั้งหมด</Button>
                <Button className='border'>สุขภาพ</Button>
                <Button className='border'>การเรียนรู้</Button>
                <Button className='border'>ครอบครัว</Button>
            </div>
            <div className='mt-3'>
                <p>
                    สิทธิ์ที่คุณใช้ได้ ....... รายการ
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4 my-3">
                {welfareItems.map((item) => (
                    <div key={item.title} className='border h-[auto] rounded-md p-3'>
                        <div className="flex justify-between items-center">
                            <Heart/><div className='border rounded-md text-sm p-1'>{item.status}</div>
                        </div>
                        <div className='mt-3 space-y-2'>
                            <p className='text-[13px] text-gray-400 leading-5'>{item.category}</p>
                            <p className='text-lg leading-7'>{item.title}</p>
                            <p className='text-[13px] text-gray-400 leading-5'>{item.description}</p>
                        </div>
                        <hr className='my-3' />
                        <div className='space-y-2'>
                            <div className='text-[15px] leading-6'>{item.amount}</div>
                            <div className='text-[15px] leading-6'>{item.remaining}</div>
                            <div className='flex items-center pt-1'>
                                <Button className='inline-flex items-center gap-2 px-3 py-2 border cursor-pointer'>
                                    <span>ดูรายละเอียด</span>
                                    <ArrowRight size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
