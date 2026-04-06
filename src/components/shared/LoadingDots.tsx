'use client';

export default function LoadingDots() {
  return (
    <div className="flex gap-[5px]">
      <div className="dot w-[5px] h-[5px] rounded-full bg-accent-blue" />
      <div className="dot w-[5px] h-[5px] rounded-full bg-accent-blue" />
      <div className="dot w-[5px] h-[5px] rounded-full bg-accent-blue" />
    </div>
  );
}
