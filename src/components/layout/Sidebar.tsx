'use client';

import { ToolId } from '@/lib/types';
import { NAV_ITEMS } from '@/lib/constants';

interface SidebarProps {
  active: ToolId;
  onNavigate: (id: ToolId) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  let lastGroup = '';

  return (
    <div
      className="sidebar-nav border-r border-bd py-4.5 sticky overflow-y-auto"
      style={{ top: 53, height: 'calc(100vh - 53px)' }}
    >
      {NAV_ITEMS.map((item) => {
        const showLabel = item.group && item.group !== lastGroup;
        if (item.group) lastGroup = item.group;
        return (
          <div key={item.id}>
            {showLabel && (
              <div className="text-[11px] tracking-widest uppercase px-5 mt-4 mb-1.5" style={{ color: 'var(--t3)' }}>
                {item.group}
              </div>
            )}
            <div
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-2.5 py-2 px-3 mx-2 mb-px rounded-[10px] cursor-pointer transition-all"
              style={{
                background: active === item.id ? 'var(--bg3)' : undefined,
                border: `1px solid ${active === item.id ? 'var(--bd2)' : 'transparent'}`,
              }}
            >
              <div
                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm shrink-0"
                style={{ background: item.dimColor }}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-medium leading-tight">{item.title}</div>
                <div className="text-[12px]" style={{ color: 'var(--t2)' }}>{item.subtitle}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="mx-2.5 mt-5 p-3 rounded-[10px] border border-bd text-[13px] leading-relaxed"
        style={{ background: 'var(--bg2)', color: 'var(--t2)' }}
      >
        Newton, Einstein, Ramanujan, Bose — 2026 mein wapas aaye aur yeh banaya. Har tool ek scientist ki theory se hai.
      </div>
    </div>
  );
}
