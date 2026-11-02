'use client';
import { Button } from "@/components/tailgrids/core/button";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Link from "next/link";
export default function Home() {
  const requests = [
    {
      id: 'WF-2569-014',
      type: 'ค่ารักษาพยาบาล',
      date: '12 ต.ค. 2569',
      amount: '1000',
      status: 'กำลังตรวจสอบ',
      budget: '10000',
      remaining: '7500',
    },
    {
      id: 'WF-2569-011',
      type: 'ค่าทันตกรรม',
      date: '20 ก.ย. 2569',
      amount: '1,200',
      status: 'อนุมัติแล้ว',
      budget: '3000',
      remaining: '1800',
    },
    {
      id: 'WF-2569-006',
      type: 'ค่ารักษาพยาบาล',
      date: '15 มิ.ย. 2569',
      amount: '1,500',
      status: 'อนุมัติแล้ว',
      budget: '10000',
      remaining: '8500',
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className='flex flex-col'>
          <span>ภาพรวมสวัสดิการของฉัน</span>
          <span className='text-gray-400'>สวัสดีคุณ !.............. ตรวจสอบสิทธิ์สวัสดิการของคุณได้ที่นี่</span>
        </div>
        <div className='flex font-IBMPlexSans text-sm text-white'><Button className='bg-olive-700 w-[110px] h-[40px] rounded-sm cursor-pointer'>ยื่นคำขอใหม่</Button></div>
      </div>
      <div className="flex mt-8 font-IBMPlexSans w-full ">
        <div className='w-[50%]'>สิทธิ์คงเหลือของฉัน</div><div className='w-[50%] flex justify-end text-gray-400'>1 ม.ค-31 ธ.ค 2569 </div>&nbsp;&nbsp;<Link href="/welfare" className='text-nowrap text-gray-400 cursor-pointer'>ดูสิทธิ์ทั้งหมด<i className="bi bi-arrow-right"></i></Link>
      </div>
      <div className="flex gap-4 mt-2 font-IBMPlexSans text-sm ">
        <div className='w-[33%] border py-2 px-6 rounded-md'>
          <p className='text-lg mb-2'>ค่ารักษาพยาบาล</p>
          <div className='text-2xl flex gap-2 items-baseline mb-2'>7500<p className='text-sm text-gray-400'>บาทคงเหลือ</p></div>
          <div className='mb-2 h-2 w-full overflow-hidden rounded bg-gray-300' role='progressbar' aria-label='วงเงินค่ารักษาพยาบาลคงเหลือ' aria-valuemin={0} aria-valuemax={10000} aria-valuenow={7500}>
            <div className='h-full w-[75%] rounded bg-olive-700'></div>
          </div>
          <p className='text-gray-400 '>ใช้แล้ว 2500/10000 บาทต่อปี</p>
        </div>
        <div className='w-[33%] border py-2 px-6 rounded-md'>
          <p className='text-lg mb-2'>ค่าทันตกรรม</p>
          <div className='text-2xl flex gap-2 items-baseline mb-2'>1800<p className='text-sm text-gray-400'>บาทคงเหลือ</p></div>
          <div className='mb-2 h-2 w-full overflow-hidden rounded bg-gray-300' role='progressbar' aria-label='วงเงินค่าทันตกรรมคงเหลือ' aria-valuemin={0} aria-valuemax={3000} aria-valuenow={1800}>
            <div className='h-full w-[60%] rounded bg-olive-700'></div>
          </div>
          <p className='text-gray-400 '>ใช้แล้ว 1200/3000 บาทต่อปี</p>
        </div>
        <div className='w-[33%] border py-2 px-6 rounded-md'>
          <p className='text-lg mb-2'>ค่าอบรมและพัฒนา</p>
          <div className='text-2xl flex gap-2 items-baseline mb-2'>5000<p className='text-sm text-gray-400'>บาทคงเหลือ</p></div>
          <div className='mb-2 h-2 w-full overflow-hidden rounded bg-gray-300' role='progressbar' aria-label='วงเงินค่าอบรมและพัฒนาคงเหลือ' aria-valuemin={0} aria-valuemax={5000} aria-valuenow={5000}>
            <div className='h-full w-full rounded bg-olive-700'></div>
          </div>
          <p className='text-gray-400 '>ใช้แล้ว 5000/5000 บาทต่อปี</p>
        </div>
      </div>
      <div className='my-2'>
        <p className='text-gray-400 text-sm'>วงเงินคงเหลือหักเฉพาะรายการที่อนุมัติแล้ว</p>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='border w-[25%] rounded-md py-6 px-4 flex justify-between'>คำขอทั้งหมด <div className='text-2xl font-blod'>4</div></div>
        <div className='border w-[25%] rounded-md py-6 px-4 flex justify-between'>รออนุมัติ <div className='text-2xl font-blod'>2</div></div>
        <div className='border w-[25%] rounded-md py-6 px-4 flex justify-between'>อนุมัติแล้ว <div className='text-2xl font-blod'>1</div></div>
        <div className='border w-[25%] rounded-md py-6 px-4 flex justify-between'>ฉบับร่าง <div className='text-2xl font-blod'>1</div></div>
      </div>
      <div className='mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-[2fr_1fr]'>
        <section className='min-w-0 rounded-md border border-gray-300 p-5' aria-labelledby='recent-requests-title'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 id='recent-requests-title' className='text-lg font-semibold'>คำขอล่าสุด</h2>
            <button type='button' className='text-sm cursor-pointer'>ติดตามทั้งหมด <i className='bi bi-arrow-right' aria-hidden='true'></i></button>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[680px] table-fixed border-collapse text-left text-sm'>
              <thead className='bg-gray-100 text-xs'>
                <tr>
                  <th scope='col' className='w-[18%] px-3 py-3 font-medium'>เลขที่คำขอ</th>
                  <th scope='col' className='w-[24%] px-3 py-3 font-medium'>ประเภท / วันที่ยื่น</th>
                  <th scope='col' className='w-[15%] px-3 py-3 font-medium'>จำนวนเงิน (บาท)</th>
                  <th scope='col' className='w-[23%] px-3 py-3 font-medium'>สถานะ / ความคืบหน้า</th>
                  <th scope='col' className='w-[20%] px-3 py-3 font-medium'>เงินต้นคงเหลือ (บาท)</th>
                </tr>
              </thead>
              {requests.map((request) => (
                <tbody key={request.id}>
                  <tr className='h-16'>
                    <th scope='row' className='px-3 py-2 font-semibold'>{request.id}</th>
                    <td className='px-3 py-2'>
                      <div className='font-medium'>{request.type}</div>
                      <div className='mt-1 text-xs text-gray-500'>{request.date}</div>
                    </td>
                    <td className='px-3 py-2 font-semibold'>{request.amount}</td>
                    <td className='px-3 py-2'>
                      <span className={`inline-block rounded border px-2 py-1 text-xs ${request.status === 'กำลังตรวจสอบ' ? 'bg-gray-100' : 'bg-white'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className='px-3 py-2'>
                      <div className='font-semibold'>{request.budget} เงินต้น</div>
                      <div className='mt-1 text-xs text-gray-500'>{request.remaining} เงินคงเหลือ</div>
                    </td>
                  </tr>
                  <tr className='border-b border-gray-200 bg-gray-50'>
                    <td colSpan={5} className='px-3 py-2 text-xs text-gray-500'>
                      ผู้ดูแลคำขอ: [ชื่อผู้ดูแล] · ฝ่ายบุคคล
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </section>

        <section className='rounded-md border border-gray-300 p-5' aria-labelledby='announcements-title'>
          <h2 id='announcements-title' className='mb-4 text-lg font-semibold'>ประกาศสวัสดิการ</h2>
          <article className='border-b border-gray-200 py-4'>
            <h3 className='mb-1 font-semibold'>กำหนดส่งคำขอรอบเดือนตุลาคม</h3>
            <p className='text-sm leading-6 text-gray-500'>ส่งคำขอพร้อมเอกสารภายใน 25 ต.ค. 2569 เพื่อรับการพิจารณาในรอบนี้</p>
            <p className='mt-1 text-xs text-gray-500'>8 ต.ค. 2569</p>
          </article>
          <article className='pt-4'>
            <h3 className='mb-1 font-semibold'>เตรียมเอกสารก่อนยื่นคำขอ</h3>
            <p className='text-sm leading-6 text-gray-500'>ใบเสร็จต้องระบุชื่อพนักงาน วันที่ และยอดที่ชำระอย่างชัดเจน</p>
            <button type='button' className='mt-1 text-xs text-gray-500'>1 ต.ค. 2569 · อ่านเพิ่มเติม <i className='bi bi-arrow-right' aria-hidden='true'></i></button>
          </article>
        </section>
      </div>


    </>
  )
}
