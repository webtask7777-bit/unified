'use client';

interface TabSwitcherProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onSwitch: (id: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onSwitch }: TabSwitcherProps) {
  return (
    <div className="flex gap-0.5 border-b border-bd mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSwitch(tab.id)}
          className="py-[7px] px-3.5 text-xs border-b-2 mb-[-1px] cursor-pointer transition-colors"
          style={{
            fontFamily: 'inherit',
            background: 'none',
            border: 'none',
            borderBottom: `2px solid ${activeTab === tab.id ? 'var(--blue)' : 'transparent'}`,
            color: activeTab === tab.id ? 'var(--t)' : 'var(--t2)',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
