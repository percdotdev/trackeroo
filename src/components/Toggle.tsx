interface ToggleProps {
  ariaLabel: string;
  checked: boolean;
  onChange: () => void;
}

export function Toggle({ checked, onChange, ariaLabel }: ToggleProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`relative h-[24px] w-[44px] shrink-0 rounded-full border transition-colors ${
        checked ? "border-white bg-white" : "border-neutral-600 bg-neutral-900"
      }`}
      onClick={onChange}
      role="switch"
      type="button"
    >
      <span
        className={`absolute top-[3px] size-[16px] rounded-full transition-[left] duration-150 ${
          checked ? "left-[23px] bg-black" : "left-[3px] bg-neutral-400"
        }`}
      />
    </button>
  );
}
