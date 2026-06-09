import { GITHUB_TRACKER_REQUEST_URL, GITHUB_URL } from '@/lib/constants';

export function InfoTab() {
  return (
    <div className="space-y-3 text-[11px] leading-relaxed text-[#8f98a0]">
      <p>
        Missing a tracker?{' '}
        <a
          href={GITHUB_TRACKER_REQUEST_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#66c0f4] hover:text-white"
        >
          Open a tracker request
        </a>{' '}
        with the site name and URL trick. PRs to{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#66c0f4] hover:text-white"
        >
          catalog.ts
        </a>{' '}
        welcome too.
      </p>
    </div>
  );
}
