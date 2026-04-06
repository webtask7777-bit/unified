'use client';

import { ChipPreset } from '@/lib/types';

interface ChipPresetsProps {
  chips: ChipPreset[];
  onSelect: (value: string) => void;
}

export default function ChipPresets({ chips, onSelect }: ChipPresetsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3.5">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onSelect(chip.value)}
          className="text-[13px] py-1.5 px-3 border border-bd rounded-full cursor-pointer transition-all hover:border-bd2 hover:text-t"
          style={{ background: 'var(--bg2)', color: 'var(--t2)', fontFamily: 'inherit' }}
        >
          {chip.icon} {chip.label}
        </button>
      ))}
    </div>
  );
}
