import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "../../lib/soundEffects";

interface AnimatedStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function AnimatedStepper({ value, onChange, min = 1, max = 20, step = 1 }: AnimatedStepperProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [scope, animate] = useAnimate();
  const valueRef = useRef(value);
  useEffect(() => { valueRef.current = value; }, [value]);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopHold = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (holdInterval.current) clearInterval(holdInterval.current);
    holdTimer.current = null;
    holdInterval.current = null;
  }, []);

  useEffect(() => stopHold, [stopHold]);

  const nudge = useCallback((dir: 1 | -1) => {
    const next = valueRef.current + dir * step;
    if (next < min || next > max) {
      sfx.error();
      animate(scope.current, { x: [0, dir * 5, dir * -4, dir * 2, 0] }, { duration: 0.26 });
      stopHold();
      return;
    }
    setDirection(dir);
    sfx.click();
    onChange(next);
  }, [animate, max, min, onChange, scope, step, stopHold]);

  const startHold = (dir: 1 | -1) => {
    nudge(dir);
    holdTimer.current = setTimeout(() => {
      holdInterval.current = setInterval(() => nudge(dir), 95);
    }, 360);
  };

  const digits = String(value).split("");

  return (
    <motion.div ref={scope} className="d-inline-flex align-items-center gap-2 p-1 rounded-pill"
      style={{ border: "1px solid var(--md-line-strong)", background: "var(--md-surface-2)" }}>
      <motion.button type="button" className="md-btn-ghost py-1 px-3 rounded-pill"
        whileTap={{ scale: 0.9 }}
        onPointerDown={() => startHold(-1)} onPointerUp={stopHold} onPointerLeave={stopHold}
        aria-label="Decrease quantity">
        &minus;
      </motion.button>
      <div className="d-inline-flex align-items-center justify-content-center fw-bold px-2"
        style={{ minWidth: 34, overflow: "hidden" }} aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {digits.map((digit, index) => (
            <motion.span key={`${index}-${digit}`} custom={direction}
              variants={{
                initial: (d: number) => ({ y: d * 14, opacity: 0, filter: "blur(3px)" }),
                animate: { y: 0, opacity: 1, filter: "blur(0px)" },
                exit: (d: number) => ({ y: d * -14, opacity: 0, filter: "blur(3px)" }),
              }}
              initial="initial" animate="animate" exit="exit"
              transition={{ type: "spring", stiffness: 620, damping: 32 }}
              style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}>
              {digit}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <motion.button type="button" className="md-btn-ghost py-1 px-3 rounded-pill"
        whileTap={{ scale: 0.9 }}
        onPointerDown={() => startHold(1)} onPointerUp={stopHold} onPointerLeave={stopHold}
        aria-label="Increase quantity">
        +
      </motion.button>
    </motion.div>
  );
}