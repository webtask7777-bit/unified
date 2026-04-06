'use client';

import { useRef } from 'react';

interface InputAreaProps {
  label: string;
  placeholder: string;
  hint: string;
  buttonText: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  rows?: number;
}

export default function InputArea({
  label, placeholder, hint, buttonText,
  value, onChange, onSubmit, disabled, rows = 4,
}: InputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className="rounded-[14px] border border-bd p-3.5 mb-3 transition-colors focus-within:border-bd2"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="text-[13px] mb-2" style={{ color: 'var(--t2)' }}>{label}</div>
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !disabled) {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-bd">
        <span className="text-[13px]" style={{ color: 'var(--t3)' }}>{hint}</span>
        <button
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="bg-accent-blue text-white border-none rounded-[9px] py-2 px-4.5 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 transition-all hover:opacity-88 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: 'inherit' }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
