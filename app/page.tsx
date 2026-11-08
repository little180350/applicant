'use client';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Link from "next/link";
export default function Home() {
  const requests = [
    {
      id: 'WF-2569-014',
      type: 'ค่ารักษาพยาบาล',
      date: '12 ต.ค. 2569',
      amount: '1,000',
      status: 'กำลังตรวจสอบ',
      budget: '10,000',
      remaining: '7,500',
    },
    {
      id: 'WF-2569-011',
      type: 'ค่าทันตกรรม',
      date: '20 ก.ย. 2569',
      amount: '1,200',
      status: 'อนุมัติแล้ว',
      budget: '3,000',
      remaining: '1,800',
    },
    {
      id: 'WF-2569-006',
      type: 'ค่ารักษาพยาบาล',
      date: '15 มิ.ย. 2569',
      amount: '1,500',
      status: 'อนุมัติแล้ว',
      budget: '10,000',
      remaining: '8,500',
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl font-semibold tracking-tight text-[#0F172A]'>ภาพรวมสวัสดิการของฉัน</h1>
          <p className='text-sm text-[#64748B]'>ตรวจสอบสิทธิ์สวัสดิการของคุณได้ที่นี่</p>
        </div>
        <Link href="/withdraw" className='inline-flex min-h-10 items-center justify-center rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]'>
          ยื่นคำขอใหม่
        </Link>
      </div>
      <div className="mt-8 flex flex-col gap-2 font-IBMPlexSans sm:flex-row sm:items-center sm:justify-between">
        <h2 className='font-medium text-[#0F172A]'>สิทธิ์คงเหลือของฉัน</h2>
        <div className='flex items-center justify-between gap-4 text-sm'>
          <span className='text-[#64748B]'>1 ม.ค. – 31 ธ.ค. 2569</span>
          <Link href="/welfare" className='inline-flex shrink-0 items-center gap-1 text-[#1E40AF] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]'>
            ดูสิทธิ์ทั้งหมด <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
      <div className="mt-3 grid gap-3 font-IBMPlexSans text-sm lg:grid-cols-3">
        <article className='rounded-lg border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-[#DBEAFE]'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <p className='text-base font-semibold text-[#0F172A]'>ค่ารักษาพยาบาล</p>
            <span className='rounded-full bg-[#EFF6FF] px-2.5 py-1 text-xs font-medium text-[#1E40AF]'>ประจำปี</span>
          </div>
          <div className='mb-3 flex items-end gap-2'>
            <span className='text-3xl font-semibold tabular-nums text-[#0F172A]'>7,500</span>
            <span className='pb-1 text-xs text-[#64748B]'>บาทคงเหลือ</span>
          </div>
          <div className='mb-3 h-2 w-full overflow-hidden rounded-full bg-[#EFF6FF]' role='progressbar' aria-label='วงเงินค่ารักษาพยาบาลคงเหลือ' aria-valuemin={0} aria-valuemax={10000} aria-valuenow={7500}>
            <div className='h-full w-[75%] rounded-full bg-[#1D4ED8]'></div>
          </div>
          <div className='flex items-center justify-between text-xs text-[#64748B]'>
            <span>ใช้แล้ว</span>
            <span className='font-medium tabular-nums text-[#334155]'>2,500 / 10,000 บาท</span>
          </div>
        </article>

        <article className='rounded-lg border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-[#DBEAFE]'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <p className='text-base font-semibold text-[#0F172A]'>ค่าทันตกรรม</p>
            <span className='rounded-full bg-[#EFF6FF] px-2.5 py-1 text-xs font-medium text-[#475569]'>ประจำปี</span>
          </div>
          <div className='mb-3 flex items-end gap-2'>
            <span className='text-3xl font-semibold tabular-nums text-[#0F172A]'>1,800</span>
            <span className='pb-1 text-xs text-[#64748B]'>บาทคงเหลือ</span>
          </div>
          <div className='mb-3 h-2 w-full overflow-hidden rounded-full bg-[#EFF6FF]' role='progressbar' aria-label='วงเงินค่าทันตกรรมคงเหลือ' aria-valuemin={0} aria-valuemax={3000} aria-valuenow={1800}>
            <div className='h-full w-[60%] rounded-full bg-[#1D4ED8]'></div>
          </div>
          <div className='flex items-center justify-between text-xs text-[#64748B]'>
            <span>ใช้แล้ว</span>
            <span className='font-medium tabular-nums text-[#334155]'>1,200 / 3,000 บาท</span>
          </div>
        </article>

        <article className='rounded-lg border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-[#DBEAFE]'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <p className='text-base font-semibold text-[#0F172A]'>ค่าอบรมและพัฒนา</p>
            <span className='rounded-full bg-[#EFF6FF] px-2.5 py-1 text-xs font-medium text-[#475569]'>ถึงสิทธิ์</span>
          </div>
          <div className='mb-3 flex items-end gap-2'>
            <span className='text-3xl font-semibold tabular-nums text-[#0F172A]'>5,000</span>
            <span className='pb-1 text-xs text-[#64748B]'>บาทคงเหลือ</span>
          </div>
          <div className='mb-3 h-2 w-full overflow-hidden rounded-full bg-[#EFF6FF]' role='progressbar' aria-label='วงเงินค่าอบรมและพัฒนาคงเหลือ' aria-valuemin={0} aria-valuemax={5000} aria-valuenow={5000}>
            <div className='h-full w-full rounded-full bg-[#1D4ED8]'></div>
          </div>
          <div className='flex items-center justify-between text-xs text-[#64748B]'>
            <span>ใช้แล้ว</span>
            <span className='font-medium tabular-nums text-[#334155]'>5,000 / 5,000 บาท</span>
          </div>
        </article>
      </div>
      <div className='my-2'>
        <p className='text-sm text-[#64748B]'>วงเงินคงเหลือหักเฉพาะรายการที่อนุมัติแล้ว</p>
      </div>
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
        <div className='flex min-h-[76px] items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569]'>คำขอทั้งหมด <span className='text-2xl font-semibold tabular-nums text-[#0F172A]'>4</span></div>
        <div className='flex min-h-[76px] items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569]'>รออนุมัติ <span className='text-2xl font-semibold tabular-nums text-[#0F172A]'>2</span></div>
        <div className='flex min-h-[76px] items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569]'>อนุมัติแล้ว <span className='text-2xl font-semibold tabular-nums text-[#0F172A]'>1</span></div>
        <div className='flex min-h-[76px] items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm text-[#475569]'>ฉบับร่าง <span className='text-2xl font-semibold tabular-nums text-[#0F172A]'>1</span></div>
      </div>
      <div className='mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-[2fr_1fr]'>
        <section className='min-w-0 rounded-lg border border-[#E2E8F0] bg-white p-4 sm:p-5' aria-labelledby='recent-requests-title'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 id='recent-requests-title' className='text-lg font-semibold'>คำขอล่าสุด</h2>
            <Link href="/status" className='inline-flex items-center gap-1 rounded text-sm text-[#1E40AF] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]'>
              ติดตามทั้งหมด <i className='bi bi-arrow-right' aria-hidden='true'></i>
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[680px] table-fixed border-collapse text-left text-sm'>
              <thead className='bg-[#F8FAFC] text-xs text-[#475569]'>
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
                  <tr className='h-16 border-b border-slate-100'>
                    <th scope='row' className='px-3 py-2 font-semibold'>{request.id}</th>
                    <td className='px-3 py-2'>
                      <div className='font-medium'>{request.type}</div>
                      <div className='mt-1 text-xs text-gray-500'>{request.date}</div>
                    </td>
                    <td className='px-3 py-2 font-semibold'>{request.amount}</td>
                    <td className='px-3 py-2'>
                      <span className={`inline-block rounded-full border px-2.5 py-1 text-xs ${request.status === 'กำลังตรวจสอบ' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-[#DBEAFE] bg-[#EFF6FF] text-[#1E40AF]'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className='px-3 py-2'>
                      <div className='font-semibold'>{request.budget} เงินต้น</div>
                      <div className='mt-1 text-xs text-gray-500'>{request.remaining} เงินคงเหลือ</div>
                    </td>
                  </tr>
                  <tr className='border-b border-[#E2E8F0] bg-[#F8FAFC]/70'>
                    <td colSpan={5} className='px-3 py-2 text-xs text-[#64748B]'>
                      ผู้ดูแลคำขอ: [ชื่อผู้ดูแล] · ฝ่ายบุคคล
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </section>

        <section className='rounded-lg border border-[#E2E8F0] bg-white p-5' aria-labelledby='announcements-title'>
          <h2 id='announcements-title' className='mb-4 text-lg font-semibold'>ประกาศสวัสดิการ</h2>
          <article className='border-b border-[#E2E8F0] py-4 first:pt-0'>
            <h3 className='mb-1 font-semibold leading-6 text-[#0F172A]'>กำหนดส่งคำขอรอบเดือนตุลาคม</h3>
            <p className='text-sm leading-6 text-[#475569]'>ส่งคำขอพร้อมเอกสารภายใน 25 ต.ค. 2569 เพื่อรับการพิจารณาในรอบนี้</p>
            <p className='mt-2 text-xs text-[#64748B]'>8 ต.ค. 2569</p>
          </article>
          <article className='pt-4'>
            <h3 className='mb-1 font-semibold leading-6 text-[#0F172A]'>เตรียมเอกสารก่อนยื่นคำขอ</h3>
            <p className='text-sm leading-6 text-[#475569]'>ใบเสร็จต้องระบุชื่อพนักงาน วันที่ และยอดที่ชำระอย่างชัดเจน</p>
            <p className='mt-2 text-xs text-[#64748B]'>1 ต.ค. 2569</p>
          </article>
        </section>
      </div>


    </>
  )
}
