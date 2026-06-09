import type { PopupTab } from '@/lib/popup-tabs';
import { POPUP_TABS } from '@/lib/popup-tabs';

type TabBarProps = {
  activeTab: PopupTab;
  onChange: (tab: PopupTab) => void;
};

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <nav className="mt-3 flex gap-3 border-b border-[#2a475e]/80 px-3">
      {POPUP_TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`-mb-px border-b pb-2 transition-colors ${
            activeTab === id
              ? 'border-[#66c0f4] text-white'
              : 'border-transparent text-[#56707f] hover:text-[#8f98a0]'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
