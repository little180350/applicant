'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const draftStorageKey = "profile-change-draft";

const changeOptions = [
  { value: "phone", label: "เบอร์โทรศัพท์", type: "tel", placeholder: "ระบุเบอร์โทรศัพท์ใหม่" },
  { value: "email", label: "อีเมล", type: "email", placeholder: "ระบุอีเมลใหม่" },
  { value: "name", label: "ชื่อ-นามสกุล", type: "text", placeholder: "ระบุชื่อ-นามสกุลใหม่" },
  { value: "address", label: "ที่อยู่ปัจจุบัน", type: "textarea", placeholder: "ระบุที่อยู่ปัจจุบัน" },
] as const;

type ChangeField = (typeof changeOptions)[number]["value"];

const currentValues: Record<ChangeField, string> = {
  phone: "081-234-5678",
  email: "kamonchanok.j@example.com",
  name: "กมลชนก ใจดี",
  address: "88/24 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
};

const inputClassName =
  "min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-olive-700 focus:ring-2 focus:ring-olive-100";

type RequestDraft = {
  field: ChangeField;
  newValue: string;
  reason: string;
};

function isChangeField(value: unknown): value is ChangeField {
  return changeOptions.some((option) => option.value === value);
}

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ChangeProfilePage() {
  const [field, setField] = useState<ChangeField>("phone");
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedOption = changeOptions.find((option) => option.value === field)!;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      try {
        const savedDraft = window.localStorage.getItem(draftStorageKey);
        if (!savedDraft) return;

        const parsed: unknown = JSON.parse(savedDraft);
        if (typeof parsed !== "object" || parsed === null) return;

        const draft = parsed as Partial<RequestDraft>;
        if (isChangeField(draft.field)) setField(draft.field);
        if (typeof draft.newValue === "string") setNewValue(draft.newValue);
        if (typeof draft.reason === "string") setReason(draft.reason);
      } catch {
        setNotice("เปิดฉบับร่างที่บันทึกไว้ไม่สำเร็จ คุณสามารถกรอกคำขอใหม่ได้");
      }
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  function chooseEvidence(file: File | undefined) {
    setNotice("");
    if (!file) return;

    const extensionIsAllowed = /\.(pdf|jpe?g|png)$/i.test(file.name);
    const fileIsTooLarge = file.size > 10 * 1024 * 1024;
    if (!extensionIsAllowed) {
      setEvidence(null);
      setNotice("ไฟล์ไม่รองรับ กรุณาเลือก PDF, JPG หรือ PNG");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (fileIsTooLarge) {
      setEvidence(null);
      setNotice("ไฟล์มีขนาดเกิน 10 MB กรุณาเลือกไฟล์ที่มีขนาดเล็กกว่า");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setEvidence(file);
  }

  function saveDraft() {
    const draft: RequestDraft = { field, newValue, reason };
    try {
      window.localStorage.setItem(draftStorageKey, JSON.stringify(draft));
      setNotice(
        evidence
          ? "บันทึกฉบับร่างแล้ว ไฟล์แนบจะต้องเลือกใหม่เมื่อกลับมากรอกต่อ"
          : "บันทึกฉบับร่างแล้ว คุณกลับมากรอกต่อได้ภายหลัง",
      );
    } catch {
      setNotice("บันทึกฉบับร่างไม่สำเร็จ กรุณาตรวจสอบพื้นที่จัดเก็บในเบราว์เซอร์");
    }
  }

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      window.localStorage.removeItem(draftStorageKey);
    } catch {
      setNotice("ส่งคำขอไม่ได้ เนื่องจากไม่สามารถล้างฉบับร่างเดิมได้ กรุณาลองอีกครั้ง");
      return;
    }
    setSubmitted(true);
    setNotice("");
  }

  return (
    <div className="mx-auto max-w-[1160px] px-1 pb-8 pt-2 text-sm text-slate-800">
      <nav aria-label="เส้นทางนำทาง" className="mb-3 text-xs text-slate-500">
        <Link href="/profile" className="underline-offset-4 hover:text-slate-800 hover:underline">
          พนักงาน
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href="/profile" className="underline-offset-4 hover:text-slate-800 hover:underline">
          โปรไฟล์ของฉัน
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span aria-current="page">ยื่นคำขอเปลี่ยนข้อมูล</span>
      </nav>

      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            ยื่นคำขอเปลี่ยนข้อมูล
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            กรอกข้อมูลที่ต้องการเปลี่ยนและแนบหลักฐาน · ช่องที่มี * จำเป็นต้องกรอก
          </p>
        </div>
        <Link
          href="/profile"
          className="inline-flex min-h-9 items-center rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
        >
          กลับไปโปรไฟล์
        </Link>
      </header>

      <aside className="mb-4 flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <i className="bi bi-lock mt-0.5 text-slate-600" aria-hidden="true" />
        <div>
          <h2 className="text-xs font-semibold text-slate-800">
            ฝ่ายบุคคลเท่านั้นที่แก้ไขข้อมูลจริงได้
          </h2>
          <p className="mt-1 text-[11px] leading-5 text-slate-600">
            การส่งคำขอนี้ไม่เปลี่ยนข้อมูลของคุณโดยอัตโนมัติ ข้อมูลจะเปลี่ยนหลังจากฝ่ายบุคคลตรวจสอบและอนุมัติเท่านั้น
          </p>
        </div>
      </aside>

      <ol aria-label="ขั้นตอนการยื่นคำขอ" className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-slate-200 py-3 text-xs">
        <li aria-current="step" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-olive-700 text-[10px] text-white">1</span>
          กรอกข้อมูลและแนบหลักฐาน
        </li>
        <li className="text-slate-400" aria-hidden="true">→</li>
        <li className="flex items-center gap-2 text-slate-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px]">2</span>
          รอฝ่ายบุคคลตรวจสอบ
        </li>
        <li className="text-slate-400" aria-hidden="true">→</li>
        <li className="flex items-center gap-2 text-slate-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px]">3</span>
          ติดตามผลในโปรไฟล์
        </li>
      </ol>

      {submitted ? (
        <section
          aria-labelledby="submitted-title"
          className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="mx-auto max-w-xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive-50 text-olive-800">
              <i className="bi bi-check-lg text-xl" aria-hidden="true" />
            </span>
            <h2 id="submitted-title" className="mt-4 text-lg font-semibold text-slate-900">
              ตรวจสอบข้อมูลเรียบร้อย
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              คำขอเปลี่ยน{selectedOption.label}พร้อมสำหรับส่งให้ฝ่ายบุคคลตรวจสอบ
            </p>
            <p className="mt-4 rounded-md bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
              หน้าจอตัวอย่างนี้ยังไม่ได้เชื่อมต่อระบบส่งคำขอจริง ข้อมูลจึงยังไม่ถูกส่งไปยังฝ่ายบุคคล
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
              >
                กลับไปแก้ไข
              </button>
              <Link
                href="/profile"
                className="inline-flex min-h-10 items-center rounded-md bg-olive-700 px-4 text-sm font-medium text-white transition hover:bg-olive-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
              >
                กลับไปโปรไฟล์
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <form onSubmit={submitRequest} className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(250px,0.8fr)]">
          <div className="grid min-w-0 gap-4">
            <section aria-labelledby="requester-title" className="rounded-md border border-slate-200 bg-white p-4">
              <h2 id="requester-title" className="text-sm font-semibold text-slate-900">
                ข้อมูลผู้ยื่นคำขอ
              </h2>
              <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] text-slate-500">ชื่อ-นามสกุล</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">กมลชนก ใจดี</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-500">รหัสพนักงาน</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">EMP-1024</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-500">หน่วยงาน</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">ฝ่ายการตลาด</dd>
                </div>
              </dl>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600">
                อีเมล kamonchanok.j@example.com · โทร. 081-234-5678
              </p>
              <p className="mt-2 text-[10px] text-slate-500">
                ข้อมูลผู้ยื่นคำขอมาจากระบบ ไม่สามารถแก้ไขจากแบบฟอร์มนี้ได้
              </p>
            </section>

            <section aria-labelledby="change-details-title" className="rounded-md border border-slate-200 bg-white p-4">
              <h2 id="change-details-title" className="text-sm font-semibold text-slate-900">
                ข้อมูลที่ขอเปลี่ยน
              </h2>

              <div className="mt-3">
                <label htmlFor="change-field" className="mb-1.5 block text-xs font-medium text-slate-800">
                  เลือกข้อมูลที่ต้องการเปลี่ยน <span aria-hidden="true">*</span>
                </label>
                <select
                  id="change-field"
                  value={field}
                  onChange={(event) => {
                    setField(event.target.value as ChangeField);
                    setNewValue("");
                  }}
                  className={inputClassName}
                  required
                >
                  {changeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
                  เลือกได้หนึ่งรายการต่อคำขอ หากต้องการเปลี่ยนหลายรายการ กรุณาส่งคำขอแยก
                </p>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="current-value" className="mb-1.5 block text-xs font-medium text-slate-700">
                    ค่าเดิมในโปรไฟล์
                  </label>
                  <input
                    id="current-value"
                    value={currentValues[field]}
                    readOnly
                    className={`${inputClassName} bg-slate-50 text-slate-500`}
                  />
                </div>
                <div>
                  <label htmlFor="new-value" className="mb-1.5 block text-xs font-medium text-slate-800">
                    ค่าใหม่ที่ต้องการ <span aria-hidden="true">*</span>
                  </label>
                  {selectedOption.type === "textarea" ? (
                    <textarea
                      id="new-value"
                      value={newValue}
                      onChange={(event) => setNewValue(event.target.value)}
                      placeholder={selectedOption.placeholder}
                      rows={3}
                      className={inputClassName}
                      required
                    />
                  ) : (
                    <input
                      id="new-value"
                      type={selectedOption.type}
                      value={newValue}
                      onChange={(event) => setNewValue(event.target.value)}
                      placeholder={selectedOption.placeholder}
                      autoComplete={field === "phone" ? "tel" : field === "email" ? "email" : "name"}
                      className={inputClassName}
                      required
                    />
                  )}
                </div>
              </div>
              <p className="mt-1.5 text-[10px] text-slate-500">
                ข้อมูลใหม่จะถูกบันทึกหลังจากฝ่ายบุคคลตรวจสอบและอนุมัติแล้วเท่านั้น
              </p>

              <div className="mt-3">
                <label htmlFor="change-reason" className="mb-1.5 block text-xs font-medium text-slate-800">
                  เหตุผลในการขอเปลี่ยนข้อมูล <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="change-reason"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="อธิบายเหตุผลที่ต้องการเปลี่ยนข้อมูล"
                  className={inputClassName}
                  required
                />
                <p className="mt-1 text-right text-[10px] text-slate-500">{reason.length}/500</p>
              </div>
            </section>

            <section aria-labelledby="evidence-title" className="rounded-md border border-slate-200 bg-white p-4">
              <h2 id="evidence-title" className="text-sm font-semibold text-slate-900">
                หลักฐานประกอบคำขอ <span aria-hidden="true">*</span>
              </h2>
              <label
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  chooseEvidence(event.dataTransfer.files[0]);
                }}
                className="mt-3 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center transition hover:border-olive-500 hover:bg-olive-50/40 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-olive-700"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(event) => chooseEvidence(event.target.files?.[0])}
                  className="sr-only"
                  aria-label="เลือกไฟล์หลักฐาน"
                />
                <i className="bi bi-upload text-base text-slate-600" aria-hidden="true" />
                <span className="mt-1 text-xs font-medium text-slate-800">
                  {evidence ? "เลือกไฟล์ใหม่" : "ลากไฟล์มาที่นี่ หรือเลือกไฟล์"}
                </span>
                <span className="mt-1 text-[10px] text-slate-500">PDF, JPG, PNG · ไม่เกิน 10 MB · สูงสุด 1 ไฟล์</span>
              </label>

              {evidence && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <i className="bi bi-file-earmark-text text-slate-600" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-slate-800">{evidence.name}</p>
                      <p className="text-[10px] text-slate-500">{formatFileSize(evidence.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEvidence(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    aria-label={`ลบไฟล์ ${evidence.name}`}
                    className="shrink-0 rounded px-2 py-1 text-[11px] text-slate-600 underline underline-offset-2 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
                  >
                    ลบ
                  </button>
                </div>
              )}
            </section>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-700">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-olive-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
                />
                <span>
                  ฉันรับรองว่าข้อมูลและหลักฐานเป็นความจริง และยินยอมให้บริษัทตรวจสอบข้อมูลเพื่อดำเนินการตามคำขอ <span aria-hidden="true">*</span>
                </span>
              </label>
              {notice && (
                <p role="status" aria-live="polite" className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700">
                  {notice}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <Link
                  href="/profile"
                  className="inline-flex min-h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
                >
                  ยกเลิก
                </Link>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
                  >
                    บันทึกฉบับร่าง
                  </button>
                  <button
                    type="submit"
                    className="min-h-10 rounded-md bg-olive-700 px-4 text-xs font-medium text-white transition hover:bg-olive-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
                  >
                    ส่งคำขอให้บุคคล
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid content-start gap-4">
            <section aria-labelledby="review-title" className="rounded-md border border-slate-200 bg-white p-4">
              <h2 id="review-title" className="text-sm font-semibold text-slate-900">ตรวจสอบก่อนส่ง</h2>
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="text-[10px] text-slate-500">เลขที่คำขอ</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">PC-2569-009</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-500">ข้อมูลที่ขอเปลี่ยน</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">{selectedOption.label}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-500">ค่าเดิมในโปรไฟล์</dt>
                  <dd className="mt-1 break-words text-xs font-medium text-slate-800">{currentValues[field]}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-500">ค่าที่ขอเปลี่ยน</dt>
                  <dd className="mt-1 break-words text-xs font-medium text-slate-800">{newValue || "ยังไม่ได้ระบุ"}</dd>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <dt className="text-[10px] text-slate-500">หลักฐานที่แนบ</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">{evidence ? "1 ไฟล์" : "ยังไม่ได้แนบ"}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-500">ส่งถึง</dt>
                  <dd className="mt-1 text-xs font-medium text-slate-800">ฝ่ายบุคคล (HR)</dd>
                </div>
              </dl>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[10px] leading-5 text-slate-500">
                การส่งคำขอไม่ได้เปลี่ยนข้อมูลทันที ข้อมูลจะเปลี่ยนหลังผ่านการตรวจสอบและอนุมัติ
              </p>
            </section>

            <section aria-labelledby="process-title" className="rounded-md border border-slate-200 bg-white p-4">
              <h2 id="process-title" className="text-sm font-semibold text-slate-900">หลังส่งคำขอ</h2>
              <ol className="mt-3 divide-y divide-slate-200">
                <li className="flex gap-2.5 py-3 first:pt-0">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-medium text-slate-700">1</span>
                  <div>
                    <h3 className="text-xs font-medium text-slate-800">ฝ่ายบุคคลตรวจสอบ</h3>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">ตรวจสอบข้อมูลและหลักฐานประกอบคำขอ</p>
                  </div>
                </li>
                <li className="flex gap-2.5 py-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-medium text-slate-700">2</span>
                  <div>
                    <h3 className="text-xs font-medium text-slate-800">อนุมัติและบันทึกข้อมูล</h3>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">ข้อมูลใหม่จะแสดงในโปรไฟล์หลังอนุมัติ</p>
                  </div>
                </li>
                <li className="flex gap-2.5 py-3 last:pb-0">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-medium text-slate-700">3</span>
                  <div>
                    <h3 className="text-xs font-medium text-slate-800">ตรวจสอบผลในโปรไฟล์</h3>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">ดูสถานะและผลการเปลี่ยนข้อมูลได้ที่หน้าโปรไฟล์</p>
                  </div>
                </li>
              </ol>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[10px] leading-5 text-slate-500">
                หากมีข้อสงสัย โปรดติดต่อฝ่ายบุคคลของคุณ
              </p>
            </section>
          </aside>
        </form>
      )}
    </div>
  );
}
