'use client';

import { ToolId } from '@/lib/types';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  active: ToolId;
  onNavigate: (id: ToolId) => void;
}

export default function MobileNav({ isOpen, onClose, active, onNavigate }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 h-full w-[260px] z-50 border-r border-bd py-4 overflow-y-auto md:hidden"
        style={{ background: 'var(--bg)' }}
      >
        <div className="flex items-center justify-between px-4 mb-4">
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 20, letterSpacing: 1 }}>
            UNI<span style={{ color: 'var(--blue)' }}>FIED</span>
          </div>
          <button
            onClick={onClose}
            className="border-none bg-transparent text-t2 cursor-pointer text-lg"
          >
            ✕
          </button>
        </div>
        {(() => {
          let lastGroup = '';
          return NAV_ITEMS.map((item) => {
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
                  onClick={() => { onNavigate(item.id); onClose(); }}
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
          });
        })()}
      </div>
    </>
  );
}
