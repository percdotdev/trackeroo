interface ToggleProps {
  ariaLabel: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}

export function Toggle({ checked, onChange, ariaLabel, label }: ToggleProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={ariaLabel}
      className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-neutral-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      onClick={onChange}
      role="switch"
      type="button"
    >
      <span className="truncate text-[13px] text-white">{label}</span>
      <span
        aria-hidden="true"
        className={`relative h-[20px] w-[36px] shrink-0 rounded-full border transition-colors ${
          checked
            ? "border-white bg-white"
            : "border-neutral-700 bg-neutral-900"
        }`}
      >
        <span
          className={`absolute top-[2px] size-[14px] rounded-full transition-[left] duration-150 ${
            checked ? "left-[18px] bg-black" : "left-[2px] bg-neutral-500"
          }`}
        />
      </span>
    </button>
  );
}
