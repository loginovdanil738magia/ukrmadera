type ArrowUpRightProps = {
    className?: string;
};

export default function ArrowUpRight({
    className = "",
}: ArrowUpRightProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
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