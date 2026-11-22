import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

interface StarRatingProps {
  value: number;
  onChange?: (val: number) => void;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ value, onChange, size = 15, showValue = true }: StarRatingProps) {
  return (
    <span className="d-inline-flex align-items-center gap-1" style={{ color: "var(--md-moss)" }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = value >= n - 0.25;
        const half = !filled && value >= n - 0.75;
        return (
          <span
            key={n}
            role={onChange ? "button" : undefined}
            tabIndex={onChange ? 0 : undefined}
            onClick={() => onChange?.(n)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onChange?.(n); }}
            style={{ cursor: onChange ? "pointer" : "default", display: "inline-flex" }}
            aria-label={onChange ? `Rate ${n} stars` : undefined}
          >
            {filled ? <StarFill size={size} /> : half ? <StarHalf size={size} /> : <Star size={size} />}
          </span>
        );
      })}
      {showValue && (
        <span className="small fw-semibold ms-1" style={{ color: "var(--md-text)" }}>
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}