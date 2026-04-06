'use client';

interface HeaderProps {
  onMenuToggle: () => void;
}

const PILLS = ['🍎 Newton', '⚡ Einstein', '∞ Ramanujan', '🌊 S.N. Bose', '⚖️ Noether'];

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <div
      className="flex items-center justify-between py-3.5 px-4 md:px-7 border-b border-bd sticky top-0 z-50 gap-4"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="hamburger-btn border-none bg-transparent cursor-pointer text-xl p-0"
          style={{ color: 'var(--t)' }}
        >
          ☰
        </button>
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 20, letterSpacing: 1 }}>
          UNI<span style={{ color: 'var(--blue)' }}>FIED</span>
        </div>
      </div>
      <div className="header-pills">
        {PILLS.map((p) => (
          <div
            key={p}
            className="text-[12px] py-0.5 px-2.5 rounded-full border border-bd2 whitespace-nowrap"
            style={{ color: 'var(--t2)', background: 'var(--bg2)' }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
