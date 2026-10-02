type ArrowDirection = "up-right" | "down-right" | "left" | "right" | "down";

type ArrowIconProps = {
  direction?: ArrowDirection;
  className?: string;
};

const rotations: Record<ArrowDirection, number> = {
  "up-right": 0,
  "down-right": 90,
  left: -135,
  right: 45,
  down: 135,
};

export default function ArrowIcon({
  direction = "up-right",
  className = "",
}: ArrowIconProps) {
  return (
    <svg
      className={`ui-arrow-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <path
        d="M6 18L18 6M9 6H18V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
