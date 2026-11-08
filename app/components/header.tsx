'use client';

import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/': 'ภาพรวมสวัสดิการของฉัน',
  '/profile/changeprofile': 'ยื่นคำขอเปลี่ยนข้อมูล',
  '/welfare': 'สิทธิ์สวัสดิการ',
  '/withdraw': 'ยื่นคำขอสวัสดิการ',
  '/HeadEm': 'ยื่นคำขอสวัสดิการแทนพนักงาน',
  '/status': 'ติดตามสถานะ',
  '/organization': 'โครงสร้างองค์กร',
  '/welfare/welfaredetail': 'รายละเอียดสวัสดิการ',
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'ระบบข้อมูลพนักงานและสวัสดิการ';

  return (
    <div className="border-b-2 border-gray-300 w-full h-[64px] flex items-center justify-between p-4">
      {title}
    </div>
  );
}