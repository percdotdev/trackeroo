import { GITHUB_ISSUES_URL, GITHUB_URL } from '@/lib/constants';

export function InfoTab() {
  return (
    <div className="space-y-3 text-[11px] leading-relaxed text-[#8f98a0]">
      <p>
        Know or run a tracker site that fits the Steam profile URL trick?
        I&apos;m happy to add it.
      </p>
      <p>
        Open an{' '}
        <a
          href={GITHUB_ISSUES_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#66c0f4] hover:text-white"
        >
          issue
        </a>{' '}
        or send a{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#66c0f4] hover:text-white"
        >
          PR
        </a>{' '}
        on GitHub — or just tell me.
      </p>
      <p className="text-[#56707f]">Trackeroo is open source.</p>
    </div>
  );
}
