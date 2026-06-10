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
      className={`relative h-[20px] w-[36px] shrink-0 rounded-full border transition-colors ${
        checked ? "border-white bg-white" : "border-neutral-700 bg-neutral-900"
      }`}
      onClick={onChange}
      role="switch"
      type="button"
    >
      <span
        className={`absolute top-[2px] size-[14px] rounded-full transition-[left] duration-150 ${
          checked ? "left-[18px] bg-black" : "left-[2px] bg-neutral-500"
        }`}
      />
    </button>
  );
}
