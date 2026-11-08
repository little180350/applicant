'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';

const employees = [
  {
    id: 'EMP-1024',
    name: 'กมลชนก ใจดี',
    department: 'ฝ่ายการตลาด',
    position: 'เจ้าหน้าที่การตลาด',
  },
];

const benefits = [
  { name: 'ค่ารักษาพยาบาล', limit: 10000, remaining: 7500 },
  { name: 'ค่าทันตกรรม', limit: 5000, remaining: 3200 },
  { name: 'ตรวจสุขภาพประจำปี', limit: 3000, remaining: 2250 },
  { name: 'ค่าลงทะเบียนอบรม', limit: 12000, remaining: 8500 },
  { name: 'ค่ารักษาพยาบาลบุตร', limit: 8000, remaining: 5200 },
  { name: 'ค่าภูมิคุ้มกันบุตร', limit: 4500, remaining: 2900 },
];

type BenefitField = {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  wide?: boolean;
};

const benefitFields: Record<string, BenefitField[]> = {
  'ค่ารักษาพยาบาล': [
    { key: 'patientName', label: 'ชื่อผู้เข้ารับการรักษา', type: 'text', placeholder: 'ระบุชื่อผู้ป่วย' },
    { key: 'hospital', label: 'ชื่อสถานพยาบาล / คลินิก', type: 'text', placeholder: 'ระบุชื่อสถานพยาบาล' },
    { key: 'serviceDate', label: 'วันที่เข้ารับการรักษา', type: 'date' },
    { key: 'diagnosis', label: 'อาการหรือรายละเอียดการรักษา', type: 'textarea', placeholder: 'ระบุอาการ การวินิจฉัย หรือรายละเอียดการรักษา', wide: true },
    { key: 'amount', label: 'จำนวนเงินที่ขอเบิก', type: 'number' },
  ],
  'ค่าทันตกรรม': [
    { key: 'patientName', label: 'ชื่อผู้เข้ารับบริการ', type: 'text', placeholder: 'ระบุชื่อผู้เข้ารับบริการ' },
    { key: 'clinic', label: 'ชื่อคลินิก / ทันตแพทย์', type: 'text', placeholder: 'ระบุชื่อคลินิกหรือทันตแพทย์' },
    { key: 'serviceDate', label: 'วันที่เข้ารับบริการ', type: 'date' },
    { key: 'treatmentType', label: 'ประเภทการรักษา', type: 'select', options: ['ขูดหินปูน', 'อุดฟัน', 'ถอนฟัน', 'รักษารากฟัน', 'จัดฟัน', 'อื่น ๆ'] },
    { key: 'toothArea', label: 'ตำแหน่ง / ซี่ฟันที่รักษา', type: 'text', placeholder: 'เช่น ฟันกรามซี่ที่ 36' },
    { key: 'amount', label: 'จำนวนเงินที่ขอเบิก', type: 'number' },
  ],
  'ตรวจสุขภาพประจำปี': [
    { key: 'facility', label: 'สถานพยาบาลที่ตรวจ', type: 'text', placeholder: 'ระบุชื่อโรงพยาบาลหรือคลินิก' },
    { key: 'packageName', label: 'ชื่อโปรแกรมตรวจสุขภาพ', type: 'text', placeholder: 'ระบุแพ็กเกจหรือรายการตรวจ' },
    { key: 'checkupDate', label: 'วันที่เข้ารับการตรวจ', type: 'date' },
    { key: 'checkupType', label: 'รูปแบบการตรวจ', type: 'select', options: ['ตรวจสุขภาพประจำปี', 'ตรวจตามความเสี่ยงของงาน', 'ตรวจเพิ่มเติมตามแพทย์แนะนำ'] },
    { key: 'amount', label: 'ค่าใช้จ่ายตามใบเสร็จ', type: 'number' },
  ],
  'ค่าลงทะเบียนอบรม': [
    { key: 'courseName', label: 'ชื่อหลักสูตร', type: 'text', placeholder: 'ระบุชื่อหลักสูตรอบรม' },
    { key: 'institution', label: 'สถาบัน / ผู้จัดอบรม', type: 'text', placeholder: 'ระบุชื่อหน่วยงานผู้จัด' },
    { key: 'courseFormat', label: 'รูปแบบการอบรม', type: 'select', options: ['อบรมในสถานที่', 'อบรมออนไลน์', 'อบรมแบบผสมผสาน'] },
    { key: 'courseDate', label: 'วันที่เริ่มอบรม', type: 'date' },
    { key: 'registrationType', label: 'ประเภทค่าใช้จ่าย', type: 'select', options: ['ค่าลงทะเบียน', 'ค่าธรรมเนียมหลักสูตร', 'ค่าอบรมและเอกสารประกอบ'] },
    { key: 'amount', label: 'ค่าลงทะเบียนที่ขอเบิก', type: 'number' },
  ],
  'ค่ารักษาพยาบาลบุตร': [
    { key: 'childName', label: 'ชื่อบุตรผู้เข้ารับการรักษา', type: 'text', placeholder: 'ระบุชื่อ-นามสกุลบุตร' },
    { key: 'relationship', label: 'ความสัมพันธ์กับพนักงาน', type: 'select', options: ['บุตรโดยชอบด้วยกฎหมาย', 'บุตรบุญธรรม'] },
    { key: 'hospital', label: 'ชื่อสถานพยาบาล / คลินิก', type: 'text', placeholder: 'ระบุชื่อสถานพยาบาล' },
    { key: 'serviceDate', label: 'วันที่เข้ารับการรักษา', type: 'date' },
    { key: 'treatmentDetail', label: 'อาการหรือรายละเอียดการรักษา', type: 'textarea', placeholder: 'ระบุอาการและการรักษาของบุตร', wide: true },
    { key: 'amount', label: 'จำนวนเงินที่ขอเบิก', type: 'number' },
  ],
  'ค่าภูมิคุ้มกันบุตร': [
    { key: 'childName', label: 'ชื่อบุตรผู้รับวัคซีน', type: 'text', placeholder: 'ระบุชื่อ-นามสกุลบุตร' },
    { key: 'relationship', label: 'ความสัมพันธ์กับพนักงาน', type: 'select', options: ['บุตรโดยชอบด้วยกฎหมาย', 'บุตรบุญธรรม'] },
    { key: 'vaccineName', label: 'ชื่อวัคซีน', type: 'text', placeholder: 'เช่น วัคซีนไข้หวัดใหญ่' },
    { key: 'doseNumber', label: 'ครั้งที่ / เข็มที่', type: 'select', options: ['เข็มที่ 1', 'เข็มที่ 2', 'เข็มที่ 3', 'เข็มกระตุ้น', 'ไม่ระบุ'] },
    { key: 'injectionDate', label: 'วันที่รับวัคซีน', type: 'date' },
    { key: 'clinic', label: 'สถานพยาบาลที่ให้วัคซีน', type: 'text', placeholder: 'ระบุชื่อโรงพยาบาลหรือคลินิก' },
    { key: 'amount', label: 'ค่าใช้จ่ายที่ขอเบิก', type: 'number' },
  ],
};

const steps = ['ข้อมูลพนักงานและคำขอ', 'เอกสารและยืนยัน'];

function formatAmount(amount: number) {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function HeadEmPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [employeeId, setEmployeeId] = useState(employees[0].id);
  const [benefitName, setBenefitName] = useState(benefits[0].name);
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({
    'ค่ารักษาพยาบาล': {
      patientName: employees[0].name,
      hospital: 'โรงพยาบาลบำรุงราษฎร์',
      serviceDate: '2026-10-12',
      diagnosis: 'ค่ารักษาพยาบาลตามใบเสร็จ',
      amount: '1800',
    },
  });
  const [files, setFiles] = useState<File[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [formError, setFormError] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const employee = employees.find((item) => item.id === employeeId) ?? employees[0];
  const benefit = benefits.find((item) => item.name === benefitName) ?? benefits[0];
  const fields = benefitFields[benefitName];
  const currentFormData = formData[benefitName] ?? {};
  const requestedAmount = Number(currentFormData.amount) || 0;
  const remainingAfterRequest = Math.max(benefit.remaining - requestedAmount, 0);
  const amountExceedsBalance = requestedAmount > benefit.remaining;

  const requestDetails = fields.map((field) => ({
    label: field.label,
    value: field.key === 'amount'
      ? `${formatAmount(requestedAmount)} บาท`
      : currentFormData[field.key] || 'ยังไม่ได้ระบุ',
  }));
  const summaryItems = [
    { label: 'วงเงินสวัสดิการ', value: `${formatAmount(benefit.limit)} บาท` },
    { label: 'คงเหลือก่อนเบิก', value: `${formatAmount(benefit.remaining)} บาท` },
    { label: 'ยอดที่ขอเบิก', value: `${formatAmount(requestedAmount)} บาท` },
    { label: 'คงเหลือหลังเบิก', value: `${formatAmount(remainingAfterRequest)} บาท` },
    ...requestDetails,
  ];

  function setFieldValue(key: string, value: string) {
    setFormData((currentData) => ({
      ...currentData,
      [benefitName]: {
        ...currentData[benefitName],
        [key]: value,
      },
    }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const maxFileSize = 10 * 1024 * 1024;
    const allowedTypes = new Set(['application/pdf', 'image/jpeg', 'image/png']);
    const validFiles = selectedFiles.filter((file) => {
      const hasAllowedType = allowedTypes.has(file.type)
        || (file.type === '' && /\.(pdf|jpe?g|png)$/i.test(file.name));
      return hasAllowedType && file.size <= maxFileSize;
    });
    const rejectedFile = selectedFiles.find((file) => !validFiles.includes(file));

    if (rejectedFile) {
      setFormError(`ไฟล์ ${rejectedFile.name} มีรูปแบบไม่รองรับหรือมีขนาดเกิน 10 MB`);
    } else if (validFiles.length > 0) {
      setFormError('');
    }

    setFiles((currentFiles) => [...currentFiles, ...validFiles]);
    event.target.value = '';
  }

  function continueToDocuments() {
    const hasMissingField = fields.some((field) => !currentFormData[field.key]?.trim());
    if (!employeeId || hasMissingField || requestedAmount <= 0) {
      setFormError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    if (amountExceedsBalance) {
      setFormError('ยอดที่ขอเบิกเกินวงเงินสวัสดิการคงเหลือ');
      return;
    }

    setFormError('');
    setCurrentStep(1);
  }

  function submitRequest() {
    if (files.length === 0) {
      setFormError('กรุณาแนบเอกสารประกอบอย่างน้อย 1 ไฟล์');
      return;
    }

    if (!agreed) {
      setFormError('กรุณายืนยันความถูกต้องของข้อมูลก่อนส่งคำขอ');
      return;
    }

    setFormError('');
    setSubmitted(true);
  }

  return (
    <div className="mx-auto min-w-[1080px] max-w-[1480px] px-4 py-4 text-slate-800">
      <div className="mb-3 text-xs text-slate-500">
        <span>หน้าหลัก</span>
        <span className="mx-2">/</span>
        <span>ยื่นคำขอสวัสดิการแทนพนักงาน</span>
      </div>

      <header className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            ยื่นคำขอสวัสดิการแทนพนักงาน
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            เลือกพนักงาน ตรวจสอบสิทธิ์ และส่งคำขอพร้อมเอกสารประกอบ
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
          หัวหน้างาน · ยื่นแทน
        </span>
      </header>

      <div className="mt-4 flex items-center rounded-lg border border-slate-200 bg-white px-4 py-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep || submitted;

          return (
            <div key={step} className="flex flex-1 items-center gap-2">
              <span
                className={[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                  isComplete
                    ? 'border-slate-800 bg-slate-800 text-white'
                    : isActive
                      ? 'border-slate-700 bg-slate-100 text-slate-900'
                      : 'border-slate-300 bg-white text-slate-500',
                ].join(' ')}
              >
              {isComplete ? (
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : index + 1}
              </span>
              <span className={`text-sm ${isActive ? 'font-medium text-slate-900' : 'text-slate-500'}`}>
                {step}
              </span>
              {index < steps.length - 1 && <span className="mx-4 h-px flex-1 bg-slate-200" />}
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_340px] items-start gap-5">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-xl font-semibold text-emerald-800">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                  <path d="m4.5 10 3.5 3.5 7.5-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">ส่งคำขอเรียบร้อยแล้ว</h2>
              <p className="mt-2 text-sm text-slate-600">
                คำขอของ {employee.name} ถูกส่งให้ฝ่ายบุคคลตรวจสอบแล้ว
              </p>
              <p className="mt-1 text-xs text-slate-500">สามารถติดตามผลได้ที่เมนู “ติดตามสถานะ”</p>
            </div>
          ) : (
            <>
              {currentStep === 0 ? (
                <>
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">ข้อมูลพนักงานและคำขอ</h2>
                    <p className="mt-1 text-sm text-slate-500">ตรวจสอบข้อมูลผู้รับสิทธิ์ก่อนกรอกรายละเอียดการเบิก</p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <label htmlFor="employee" className="mb-2 block text-sm font-medium text-slate-700">
                      เลือกพนักงานผู้รับสิทธิ์ <span className="text-rose-600">*</span>
                    </label>
                    <select
                      id="employee"
                      value={employeeId}
                      onChange={(event) => setEmployeeId(event.target.value)}
                      className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-100"
                    >
                      {employees.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} · {item.id}
                        </option>
                      ))}
                    </select>

                    <div className="mt-3 grid grid-cols-3 gap-3 rounded-md border border-slate-200 bg-white p-3">
                      <div>
                        <p className="text-xs text-slate-500">ชื่อ-นามสกุล</p>
                        <p className="mt-1 text-sm font-medium text-slate-800">{employee.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">รหัสพนักงาน</p>
                        <p className="mt-1 text-sm font-medium text-slate-800">{employee.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">หน่วยงาน</p>
                        <p className="mt-1 text-sm font-medium text-slate-800">{employee.department}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">ตำแหน่ง: {employee.position}</p>
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <h3 className="text-base font-semibold text-slate-900">ข้อมูลคำขอสวัสดิการ</h3>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="benefit" className="mb-1.5 block text-sm font-medium text-slate-700">
                          ประเภทสวัสดิการ <span className="text-rose-600">*</span>
                        </label>
                        <select
                          id="benefit"
                          value={benefitName}
                          onChange={(event) => setBenefitName(event.target.value)}
                          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-100"
                        >
                          {benefits.map((item) => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                      {fields.map((field) => {
                        const fieldId = `request-${field.key}`;
                        const className = 'h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-100';

                        return (
                          <div key={field.key} className={field.wide || field.key === 'amount' ? 'col-span-2' : undefined}>
                            <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-slate-700">
                              {field.label} <span className="text-rose-600">*</span>
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea
                                id={fieldId}
                                rows={3}
                                value={currentFormData[field.key] ?? ''}
                                onChange={(event) => setFieldValue(field.key, event.target.value)}
                                placeholder={field.placeholder}
                                className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-100"
                              />
                            ) : field.type === 'select' ? (
                              <select
                                id={fieldId}
                                value={currentFormData[field.key] ?? ''}
                                onChange={(event) => setFieldValue(field.key, event.target.value)}
                                className={className}
                              >
                                <option value="">เลือก{field.label}</option>
                                {field.options?.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : field.type === 'number' ? (
                              <div className="flex h-10 items-center rounded-md border border-slate-300 bg-white focus-within:border-slate-600 focus-within:ring-2 focus-within:ring-slate-100">
                                <input
                                  id={fieldId}
                                  value={currentFormData[field.key] ?? ''}
                                  onChange={(event) => setFieldValue(field.key, event.target.value)}
                                  className="h-full min-w-0 flex-1 rounded-md bg-transparent px-3 text-sm text-slate-800 outline-none"
                                />
                                <span className="px-3 text-sm text-slate-500">บาท</span>
                              </div>
                            ) : (
                              <input
                                id={fieldId}
                                type={field.type}
                                value={currentFormData[field.key] ?? ''}
                                onChange={(event) => setFieldValue(field.key, event.target.value)}
                                placeholder={field.placeholder}
                                className={className}
                              />
                            )}
                            {field.key === 'amount' && amountExceedsBalance && (
                              <p className="mt-1 text-xs text-rose-700">
                                ยอดเบิกเกินวงเงินคงเหลือ {formatAmount(benefit.remaining)} บาท
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">เอกสารและยืนยันคำขอ</h2>
                    <p className="mt-1 text-sm text-slate-500">แนบหลักฐานการเบิกและตรวจสอบข้อมูลก่อนส่ง</p>
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                    <p className="mb-1 text-sm font-medium text-slate-800">
                      เอกสารประกอบคำขอ <span className="text-rose-600">*</span>
                    </p>
                    <label
                      htmlFor="documents"
                      className="flex cursor-pointer flex-col items-center rounded-md px-4 py-6 text-sm text-slate-600 hover:bg-white"
                    >
                      <svg aria-hidden="true" className="mb-2 h-6 w-6 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M12 16V4m0 0L8 8m4-4 4 4M5 14v5h14v-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-medium text-slate-800">เลือกไฟล์เพื่ออัปโหลด</span>
                      <span className="mt-1 text-xs text-slate-500">รองรับ PDF, JPG, PNG ขนาดไม่เกิน 10 MB ต่อไฟล์</span>
                    </label>
                    <input
                      id="documents"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </div>

                  {files.length > 0 && (
                    <ul className="mt-3 divide-y divide-slate-200 rounded-md border border-slate-200">
                      {files.map((file, index) => (
                        <li key={`${file.name}-${index}`} className="flex items-center justify-between px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                              {file.name.split('.').pop()?.toUpperCase() ?? 'FILE'}
                            </span>
                            <span className="text-sm text-slate-700">{file.name}</span>
                            <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => fileIndex !== index))}
                            className="rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-slate-700"
                          >
                            ลบ
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-800">ตรวจสอบคำขอ</h3>
                    <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <div>
                        <dt className="text-xs text-slate-500">พนักงานผู้รับสิทธิ์</dt>
                        <dd className="mt-1 font-medium text-slate-800">{employee.name} · {employee.id}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500">ประเภทสวัสดิการ</dt>
                        <dd className="mt-1 font-medium text-slate-800">{benefit.name}</dd>
                      </div>
                      {fields.map((field) => (
                        <div key={field.key} className={field.wide ? 'col-span-2' : undefined}>
                          <dt className="text-xs text-slate-500">{field.label}</dt>
                          <dd className="mt-1 whitespace-pre-wrap font-medium text-slate-800">
                            {field.key === 'amount'
                              ? `${formatAmount(requestedAmount)} บาท`
                              : currentFormData[field.key] || 'ยังไม่ได้ระบุ'}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(event) => setAgreed(event.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-slate-800 focus:ring-slate-700"
                    />
                    <span>ข้าพเจ้ายืนยันว่าข้อมูลและเอกสารประกอบถูกต้องครบถ้วน และได้รับอนุญาตให้ยื่นคำขอแทนพนักงานรายนี้</span>
                  </label>
                </>
              )}

              {formError && (
                <p role="alert" className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                  {formError}
                </p>
              )}
              {draftSaved && (
                <p role="status" className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  บันทึกฉบับร่างไว้ในหน้านี้แล้ว
                </p>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormError('');
                    setCurrentStep(0);
                  }}
                  disabled={currentStep === 0}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ย้อนกลับ
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDraftSaved(true)}
                    className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    บันทึกร่าง
                  </button>
                  {currentStep === 0 ? (
                    <button
                      type="button"
                      onClick={continueToDocuments}
                      className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                    >
                      ไปขั้นตอนถัดไป
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submitRequest}
                      disabled={!agreed}
                      className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                    >
                      ส่งคำขอแทนพนักงาน
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        <aside className="space-y-4">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <h2 className="text-base font-semibold text-slate-900">ตรวจสอบก่อนส่ง</h2>

            <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
              <span className="rounded bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-900">ใช้สิทธิ์ได้</span>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-slate-500">พนักงานผู้รับสิทธิ์</dt>
                  <dd className="mt-1 font-medium text-slate-800">{employee.name} · {employee.id}</dd>
                  <dd className="mt-0.5 text-xs text-slate-500">{employee.department}</dd>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <dt className="text-xs text-slate-500">สิทธิ์สวัสดิการ</dt>
                  <dd className="mt-1 font-medium text-slate-800">{benefit.name}</dd>
                </div>
                {summaryItems.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-3">
                    <dt className="text-xs text-slate-500">{item.label}</dt>
                    <dd className="text-right text-xs font-semibold tabular-nums text-slate-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 rounded-md border border-slate-200 p-3 text-xs leading-5 text-slate-600">
              <h3 className="font-semibold text-slate-800">เงื่อนไขการยื่นแทน</h3>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>ตรวจสอบข้อมูลพนักงานและวงเงินก่อนส่งคำขอ</li>
                <li>แนบหลักฐานการเบิกให้ครบถ้วนและอ่านได้ชัดเจน</li>
                <li>ผู้ยื่นต้องได้รับอนุญาตจากพนักงานผู้รับสิทธิ์</li>
              </ul>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">การพิจารณาคำขอ</h2>
            <ol className="mt-3 space-y-3 text-xs text-slate-600">
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-medium text-slate-800">1</span>
                หัวหน้างานส่งคำขอและเอกสาร
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-medium text-slate-600">2</span>
                ฝ่ายบุคคลตรวจสอบสิทธิ์และหลักฐาน
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-medium text-slate-600">3</span>
                แจ้งผลการพิจารณาในเมนูติดตามสถานะ
              </li>
            </ol>
          </section>
        </aside>
      </div>

      <footer className="mt-5 border-t border-slate-200 pt-3 text-xs text-slate-500">
        หากพบข้อมูลสิทธิ์ไม่ถูกต้อง โปรดติดต่อฝ่ายบุคคลก่อนส่งคำขอ
      </footer>
    </div>
  );
}
