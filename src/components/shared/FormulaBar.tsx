'use client';

interface FormulaBarProps {
  formula: string;
}

export default function FormulaBar({ formula }: FormulaBarProps) {
  return (
    <div
      className="text-center py-2.5 px-3 rounded-[10px] border border-bd text-lg italic mb-4"
      style={{
        fontFamily: "var(--font-dm-serif), serif",
        background: 'var(--bg3)',
        color: 'var(--amber)',
      }}
    >
      {formula}
    </div>
  );
}
