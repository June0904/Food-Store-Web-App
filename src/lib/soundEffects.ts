let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let lastHoverAt = 0;
let lastScrollAt = 0;

function getCtx(): AudioContext | null {
  if (!soundEnabled || typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function tone(freq: number, endFreq: number, duration: number, gainVal: number, type: OscillatorType = "sine", delay = 0) {
  const ctx = getCtx();
  if (!ctx) return;
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), start + duration);
  gain.gain.setValueAtTime(gainVal, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

export const sfx = {
  isEnabled: () => soundEnabled,
  setEnabled: (v: boolean) => { soundEnabled = v; },
  click: () => {
    tone(620, 310, 0.05, 0.075, "triangle", 0);
    tone(980, 520, 0.035, 0.035, "sine", 0.015);
  },
  softTap: () => tone(320, 180, 0.04, 0.035, "sine"),
  hover: () => {
    const now = Date.now();
    if (now - lastHoverAt < 55) return;
    lastHoverAt = now;
    tone(1520, 1780, 0.024, 0.018, "sine");
  },
  keyType: () => tone(780, 440, 0.028, 0.035, "triangle"),
  scrollTick: () => {
    const now = Date.now();
    if (now - lastScrollAt < 110) return;
    lastScrollAt = now;
    tone(420, 480, 0.018, 0.014, "sine");
  },
  whoosh: () => {
    tone(260, 680, 0.14, 0.055, "sine", 0);
    tone(520, 880, 0.12, 0.04, "triangle", 0.04);
  },
  toggleOn: () => {
    tone(520, 660, 0.07, 0.07, "sine", 0);
    tone(660, 880, 0.09, 0.07, "triangle", 0.045);
  },
  toggleOff: () => tone(540, 340, 0.08, 0.06, "sine", 0),
  error: () => {
    tone(210, 160, 0.09, 0.09, "sawtooth", 0);
    tone(190, 140, 0.11, 0.09, "sawtooth", 0.09);
  },
  toss: () => {
    [440, 554, 659, 880].forEach((f, i) => tone(f, f * 1.12, 0.09, 0.06, "triangle", i * 0.04));
  },
  success: () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, f, 0.16, 0.07, "sine", i * 0.055));
  },
};
