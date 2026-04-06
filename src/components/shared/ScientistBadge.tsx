'use client';

interface ScientistBadgeProps {
  initial: string;
  name: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
}

export default function ScientistBadge({ initial, name, subtitle, bgColor, textColor }: ScientistBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 border border-bd2 rounded-full py-1 pr-3.5 pl-1 mb-4" style={{ background: 'var(--bg2)' }}>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-semibold"
        style={{ background: bgColor, color: textColor }}
      >
        {initial}
      </div>
      <div className="leading-tight">
        <div className="text-[13px] font-medium">{name}</div>
        <div className="text-[12px]" style={{ color: 'var(--t2)' }}>{subtitle}</div>
      </div>
    </div>
  );
}
