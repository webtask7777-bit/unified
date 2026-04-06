'use client';

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
  displayValue: string;
}

export default function ProgressBar({ label, value, color, displayValue }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2.5 my-1">
      <div className="text-[13px] min-w-[120px]" style={{ color: 'var(--t2)' }}>{label}</div>
      <div className="flex-1 h-[3px] rounded-sm overflow-hidden" style={{ background: 'var(--bd)' }}>
        <div className="h-full rounded-sm" style={{ width: `${value}%`, background: color }} />
      </div>
      <div className="text-[13px] min-w-7 text-right" style={{ color: value < 50 ? color : 'var(--t2)' }}>{displayValue}</div>
    </div>
  );
}
