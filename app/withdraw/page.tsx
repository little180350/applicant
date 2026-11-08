'use client';

import { useMemo, useState } from 'react';

const steps = [
    { label: 'กรอกข้อมูล', active: 'กรอกข้อมูลและแนบเอกสาร' },
    { label: 'ยืนยัน', active: 'ตรวจสอบและส่ง' },
];

const initialForm = {
    employeeId: 'EMP-1024',
    fullName: 'กมลชนก ใจดี',
    department: 'ฝ่ายการตลาด',
    policyType: 'ค่ารักษาพยาบาล',
    claimType: 'เบิกตามใบเสร็จ',
    hospital: 'โรงพยาบาลบำรุงราษฎร์',
    requestDate: '12 ต.ค. 2569',
    amount: '1,800.00',
    coverage: '7,500.00',
    note: '',
    invoice: 'ใบเสร็จ.pdf',
    patientName: '',
    treatmentType: '',
    courseName: '',
    vaccineName: '',
};

const policyFieldConfig: Record<string, { title: string; fields: { key: keyof typeof initialForm; label: string; type: 'input' | 'textarea'; placeholder?: string }[] }> = {
    'ค่ารักษาพยาบาล': {
      title: '2. ข้อมูลผู้เข้ารับการรักษาและค่าใช้จ่าย',
      fields: [
        { key: 'hospital', label: 'ชื่อสถานพยาบาล / คลินิก', type: 'input', placeholder: 'ระบุชื่อสถานพยาบาล' },
        { key: 'patientName', label: 'ชื่อผู้ป่วย', type: 'input', placeholder: 'ระบุชื่อผู้ป่วย' },
        { key: 'requestDate', label: 'วันที่ต้องการเบิก', type: 'input', placeholder: 'วว ดด ปปปป' },
        { key: 'amount', label: 'จำนวนเงิน', type: 'input', placeholder: '0.00' },
        { key: 'note', label: 'หมายเหตุ', type: 'textarea', placeholder: 'กรอกรายละเอียดเพิ่มเติม' },
      ],
    },
    'ค่าทันตกรรม': {
      title: '2. ข้อมูลผู้เข้ารับการรักษาและค่าใช้จ่าย',
      fields: [
        { key: 'hospital', label: 'ชื่อคลินิก / ทันตแพทย์', type: 'input', placeholder: 'ระบุชื่อคลินิกทันตกรรม' },
        { key: 'patientName', label: 'ชื่อผู้เข้ารับบริการ', type: 'input', placeholder: 'ระบุชื่อผู้ป่วย' },
        { key: 'treatmentType', label: 'ประเภทการรักษา', type: 'input', placeholder: 'เช่น ขูดหินปูน / ร้อยกราม' },
        { key: 'requestDate', label: 'วันที่เข้ารับบริการ', type: 'input', placeholder: 'วว ดด ปปปป' },
        { key: 'amount', label: 'จำนวนเงิน', type: 'input', placeholder: '0.00' },
      ],
    },
    'ตรวจสุขภาพประจำปี': {
      title: '2. ข้อมูลผู้เข้ารับการรักษาและค่าใช้จ่าย',
      fields: [
        { key: 'hospital', label: 'ชื่อสถานพยาบาล / คลินิก', type: 'input', placeholder: 'ระบุชื่อสถานพยาบาล' },
        { key: 'treatmentType', label: 'ประเภทการตรวจสุขภาพ', type: 'input', placeholder: 'เช่น ตรวจร่างกายประจำปี' },
        { key: 'requestDate', label: 'วันที่เข้ารับการตรวจ', type: 'input', placeholder: 'วว ดด ปปปป' },
        { key: 'amount', label: 'จำนวนเงิน', type: 'input', placeholder: '0.00' },
      ],
    },
    'ค่าลงทะเบียนอบรม': {
      title: '2. ข้อมูลหลักสูตรและค่าใช้จ่าย',
      fields: [
        { key: 'courseName', label: 'ชื่อหลักสูตร / สถาบัน', type: 'input', placeholder: 'ระบุชื่อหลักสูตร' },
        { key: 'treatmentType', label: 'ประเภทหลักสูตร', type: 'input', placeholder: 'เช่น ฝึกอบรม / หลักสูตรออนไลน์' },
        { key: 'requestDate', label: 'วันที่อบรม / ลงทะเบียน', type: 'input', placeholder: 'วว ดด ปปปป' },
        { key: 'amount', label: 'จำนวนเงิน', type: 'input', placeholder: '0.00' },
      ],
    },
    'ค่ารักษาพยาบาลบุตร': {
      title: '2. ข้อมูลผู้เข้ารับการรักษาและค่าใช้จ่าย',
      fields: [
        { key: 'patientName', label: 'ชื่อบุตร / ผู้ป่วย', type: 'input', placeholder: 'ระบุชื่อบุตร' },
        { key: 'hospital', label: 'ชื่อสถานพยาบาล / คลินิก', type: 'input', placeholder: 'ระบุชื่อสถานพยาบาล' },
        { key: 'requestDate', label: 'วันที่เข้ารับบริการ', type: 'input', placeholder: 'วว ดด ปปปป' },
        { key: 'amount', label: 'จำนวนเงิน', type: 'input', placeholder: '0.00' },
        { key: 'note', label: 'หมายเหตุ', type: 'textarea', placeholder: 'กรอกรายละเอียดเพิ่มเติม' },
      ],
    },
    'ค่าภูมิคุ้มกันบุตร': {
      title: '2. ข้อมูลวัคซีนและค่าใช้จ่าย',
      fields: [
        { key: 'patientName', label: 'ชื่อบุตร / ผู้รับบริการ', type: 'input', placeholder: 'ระบุชื่อบุตร' },
        { key: 'vaccineName', label: 'ชื่อวัคซีน', type: 'input', placeholder: 'เช่น วัคซีน MMR, DTaP' },
        { key: 'hospital', label: 'ชื่อคลินิก / โรงพยาบาล', type: 'input', placeholder: 'ระบุสถานที่ฉีดวัคซีน' },
        { key: 'requestDate', label: 'วันที่ฉีดวัคซีน', type: 'input', placeholder: 'วว ดด ปปปป' },
        { key: 'amount', label: 'จำนวนเงิน', type: 'input', placeholder: '0.00' },
      ],
    },
};

export default function WithdrawPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState(initialForm);
    const [agreed, setAgreed] = useState(false);

    const summaryItems = useMemo(
        () => [
            { label: 'สิทธิ์สวัสดิการ', value: form.policyType },
            { label: 'วงเงินรวม', value: '10,000.00 บาท' },
            { label: 'ใช้ไปแล้ว', value: '2,500.00 บาท' },
            { label: 'คงเหลือ', value: '7,500.00 บาท' },
            { label: 'เบิกครั้งนี้', value: `${form.amount} บาท` },
            { label: 'คงเหลือหลังเบิก', value: '5,700.00 บาท' },
        ],
        [form.amount, form.policyType],
    );

    const setValue = (key: keyof typeof initialForm, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="mx-auto max-w-[1250px] px-4 py-5 text-[#0F172A]">
            <div className="mb-4">
                <h1 className="text-[29px] font-semibold tracking-[-0.04em] text-[#0F172A]">ยื่นคำขอวัสดิการ</h1>
                <p className="mt-1 text-sm text-[#64748B]">แบบฟอร์มยื่นคำขอเบิกสวัสดิการตามสิทธิ์ของคุณ</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isComplete = index < currentStep;
                        return (
                            <div key={step.label} className="flex items-center gap-2">
                                <div className={[
                                    'flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold',
                                    isComplete
                                        ? 'border-sky-600 bg-sky-600 text-white'
                                        : isActive
                                            ? 'border-sky-600 bg-[#DBEAFE] text-[#1D4ED8]'
                                            : 'border-[#CBD5E1] bg-white text-[#64748B]',
                                ].join(' ')}>
                                    {index + 1}
                                </div>
                                <span className={isActive ? 'font-medium text-[#0F172A]' : 'text-[#64748B]'}>{step.label}</span>
                                {index < steps.length - 1 && <span className="text-[#94A3B8]">›</span>}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                    {currentStep === 0 && (
                        <>
                            <div className="mb-5">
                                <h2 className="text-[20px] font-semibold text-[#0F172A]">1. ข้อมูลผู้ยื่น</h2>
                                <p className="mt-1 text-sm text-[#64748B]">ข้อมูลส่วนบุคคล และสิทธิ์ที่สามารถเบิกได้</p>
                            </div>

                            <div className="space-y-5">
                                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#334155]">รหัสพนักงาน</label>
                                            <div className="flex h-11 w-full items-center rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-[#475569]">
                                                {form.employeeId}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#334155]">สังกัด</label>
                                            <div className="flex h-11 w-full items-center rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-[#475569]">
                                                {form.department}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-[#334155]">ชื่อ-นามสกุล</label>
                                            <div className="flex h-11 w-full items-center rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-[#475569]">
                                                {form.fullName}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                    <div className="mb-4">
                                        <h3 className="text-[20px] font-semibold text-[#0F172A]">
                                            {policyFieldConfig[form.policyType]?.title ?? '2. ข้อมูลผู้เข้ารับการรักษาและค่าใช้จ่าย'}
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-[#334155]">สิทธิ์สวัสดิการ</label>
                                                <select
                                                    value={form.policyType}
                                                    onChange={(e) => setValue('policyType', e.target.value)}
                                                    className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#334155] outline-none focus:border-sky-500 focus:ring-3 focus:ring-sky-100"
                                                >
                                                    {['ค่ารักษาพยาบาล', 'ค่าทันตกรรม', 'ตรวจสุขภาพประจำปี', 'ค่าลงทะเบียนอบรม', 'ค่ารักษาพยาบาลบุตร', 'ค่าภูมิคุ้มกันบุตร'].map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-[#334155]">ประเภทการเบิก</label>
                                                <select
                                                    value={form.claimType}
                                                    onChange={(e) => setValue('claimType', e.target.value)}
                                                    className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#334155] outline-none focus:border-sky-500 focus:ring-3 focus:ring-sky-100"
                                                >
                                                    {['เบิกตามใบเสร็จ', 'เบิกแบบผู้ป่วยนอก', 'เบิกแบบค่าห้องพัก', 'เบิกแบบยกเว้น'].map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {((policyFieldConfig[form.policyType] ?? policyFieldConfig['ค่ารักษาพยาบาล']).fields).map((field) => {
                                            const value = form[field.key] ?? '';
                                            const className = 'h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#334155] outline-none focus:border-sky-500 focus:ring-3 focus:ring-sky-100';

                                            return (
                                                <div key={field.label}>
                                                    <label className="mb-2 block text-sm font-medium text-[#334155]">{field.label}</label>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            value={value}
                                                            onChange={(e) => setValue(field.key, e.target.value)}
                                                            rows={3}
                                                            placeholder={field.placeholder}
                                                            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#334155] outline-none focus:border-sky-500 focus:ring-3 focus:ring-sky-100"
                                                        />
                                                    ) : (
                                                        <input
                                                            value={value}
                                                            onChange={(e) => setValue(field.key, e.target.value)}
                                                            placeholder={field.placeholder}
                                                            className={className}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <div className="mb-5">
                                <h2 className="text-[20px] font-semibold text-[#0F172A]">3. เอกสารและยืนยัน</h2>
                            </div>

                            <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4">
                                <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#EFF6FF] text-[#475569]">PDF</div>
                                        <div>
                                            <div className="text-sm font-medium text-[#0F172A]">{form.invoice}</div>
                                            <div className="text-xs text-[#64748B]">แนบใบเสร็จและเอกสารประกอบ</div>
                                        </div>
                                    </div>
                                    <button type="button" className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#475569] hover:bg-[#F8FAFC]">อัปโหลด</button>
                                </div>
                            </div>

                            <div className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#475569]">
                                <label className="flex items-start gap-3">
                                    <input type="checkbox" checked={agreed} onChange={() => setAgreed((prev) => !prev)} className="mt-1 h-4 w-4 rounded border-[#CBD5E1] text-sky-600 focus:ring-sky-500" />
                                    <span>ข้าพเจ้ายืนยันว่าข้อมูลดังกล่าวเป็นความจริงทุกประการ และยินยอมให้บริษัทตรวจสอบข้อมูลตามเงื่อนไขของสวัสดิการ</span>
                                </label>
                            </div>
                        </>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ย้อนกลับ
                        </button>

                        <div className="flex gap-3">
                            <button type="button" className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155]">บันทึกร่าง</button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1E40AF]"
                            >
                                {currentStep === 0 ? 'ไปหน้าถัดไป' : 'ส่งคำขอ'}
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                    <div className="mb-4">
                        <h3 className="text-[20px] font-semibold text-[#0F172A]">ตรวจสอบก่อนส่ง</h3>
                    </div>

                    <div className="space-y-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-[11px] uppercase tracking-[0.08em] text-[#64748B]">สิทธิ์</div>
                                <div className="mt-1 font-medium text-[#0F172A]">{form.policyType}</div>
                            </div>
                            <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-1 text-[10px] font-medium text-[#166534]">ใช้สิทธิ์ได้</span>
                        </div>

                        <div className="space-y-2 border-t border-[#E2E8F0] pt-3">
                            {summaryItems.map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-[#64748B]">{item.label}</span>
                                    <span className="font-medium text-[#0F172A]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm text-[#475569]">
                        <div className="font-medium text-[#0F172A]">เงื่อนไข</div>
                        <ul className="mt-3 space-y-2">
                            <li>• ต้องแนบหลักฐานการเบิกให้ครบถ้วน</li>
                            <li>• วงเงินที่เหลือจะปรับตามคำขอปัจจุบัน</li>
                            <li>• หากเอกสารไม่ครบกระบวนการจะถูกยกเลิก</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
