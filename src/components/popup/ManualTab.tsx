import { TRACKERS } from '@/trackers/catalog';

export function ManualTab() {
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] leading-snug text-[#56707f]">
        Edit the hostname on any{' '}
        <span className="text-[#8f98a0]">steamcommunity.com</span> profile URL.
      </p>
      <table className="w-full text-left text-[11px]">
        <tbody>
          {TRACKERS.map((tracker) => (
            <tr key={tracker.id} className="align-top">
              <td className="w-[72px] shrink-0 py-1 pr-2 text-[#8f98a0]">
                {tracker.label}
              </td>
              <td className="py-1">
                <div className="text-[#acb2b8]">{tracker.manualHint}</div>
                <div className="mt-0.5 font-mono text-[10px] text-[#56707f]">
                  {tracker.manualExample}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
