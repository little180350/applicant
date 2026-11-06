import Link from "next/link";

const benefits = [
  "ครอบคลุมค่ารักษาฟันและการทำฟันเพื่อสุขภาพช่องปาก",
  "สามารถเบิกได้ตามใบเสร็จจริงที่มีระบุบริการที่ใช้",
  "สามารถใช้สิทธิ์ได้ภายในรอบปีงบประมาณ 2569",
  "ต้องใช้สิทธิ์ก่อนวันสิ้นสุดระยะเวลาการยืนยันบัญชี",
  "หากเกินวงเงินที่กำหนดจะต้องชำระส่วนที่เหลือเอง",
  "กรณีเป็นการรักษาพิเศษให้ตรวจสอบก่อนเบิกเพิ่มเติม",
];

function DetailCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border-b border-slate-200 py-3 last:border-b-0">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">{title}</div>
      <div className="mt-2 text-[15px] font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default function WelfareDetailPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-2 py-5 text-slate-800">
      <div className="mb-4 text-[12px] text-slate-500">พนักงาน / สิทธิสวัสดิการ / ค่าทันตกรรม</div>
      <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.04em] text-slate-900">รายละเอียดสวัสดิการ</h1>
      <p className="mt-2 text-sm text-slate-500">ตรวจสอบเงื่อนไขและสิทธิ์การใช้สวัสดิการของคุณ</p>
      <div className="mt-6 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 10V8.5A5 5 0 0 1 17 8.5V10" />
                <path d="M5 10h14v7.5A2.5 2.5 0 0 1 16.5 20h-9A2.5 2.5 0 0 1 5 17.5V10Z" />
              </svg>
            </span>
            <div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500">หมวดหมู่</div>
              <div className="text-[15px] font-semibold text-slate-900">ค่าทันตกรรม</div>
            </div>
          </div>
          <button type="button" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] font-medium text-slate-700 transition hover:bg-slate-100">ใช้สิทธิ์</button>
        </div>
        <div className="grid gap-6 p-5 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[15px] font-semibold text-slate-900">เงื่อนไขการใช้สิทธิ์</h2>
              <div className="text-[12px] text-slate-500">หมดอายุ 31 ธ.ค. 2569</div>
            </div>
            <ul className="space-y-3 text-[14px] leading-6 text-slate-700">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-slate-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-[15px] font-semibold text-slate-900">วงเงินคงเหลือ</h2>
            <div className="mt-4 space-y-2">
              <DetailCard title="วงเงินรวม" value="5,000 บาท" />
              <DetailCard title="ใช้ไปแล้ว" value="1,800 บาท" />
              <DetailCard title="คงเหลือ" value="3,200 บาท" />
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4 text-[12px] text-slate-500">
              <div className="font-medium text-slate-700">อัปเดตล่าสุด</div>
              <div className="mt-2">1 ม.ค. – 31 ธ.ค. 2569</div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 bg-slate-50/80 px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">การยืนยัน</div>
              <p className="mt-1 text-sm text-slate-700">การเบิกจ่ายจะต้องมีใบเสร็จและเอกสารยืนยันที่ชัดเจนตามเงื่อนไข</p>
            </div>
            <Link href="/welfare" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-slate-700">กลับสวัสดิการ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
