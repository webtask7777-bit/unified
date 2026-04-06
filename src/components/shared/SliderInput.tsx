'use client';

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  unit: string;
  color: string;
}

export default function SliderInput({ label, min, max, step = 1, value, onChange, unit, color }: SliderInputProps) {
  const displayValue = step < 1 ? parseFloat(String(value)).toFixed(1) : value;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-[13px] mb-1.5" style={{ color: 'var(--t2)' }}>
        <span>{label}</span>
        <span style={{ color }}>{displayValue} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
