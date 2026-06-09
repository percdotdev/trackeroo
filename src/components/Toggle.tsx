type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-[18px] w-[34px] shrink-0 rounded-full transition-colors ${
        checked ? 'bg-[#417a9b]' : 'bg-[#3d4450]'
      }`}
    >
      <span
        className="absolute top-[2px] size-[14px] rounded-full bg-white transition-[left] duration-150"
        style={{ left: checked ? 18 : 2 }}
      />
    </button>
  );
}
