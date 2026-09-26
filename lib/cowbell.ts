let ctx: AudioContext | null = null;

/**
 * A synthesized TR-808 style cowbell: two detuned square waves through a
 * band-pass filter with a fast decay. Mississippi State fans will understand.
 */
export function ringCowbell() {
  if (typeof window === "undefined") return;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx ??= new AC();
  const t = ctx.currentTime;

  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2640;
  filter.Q.value = 1.2;
  gain.connect(filter).connect(ctx.destination);

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.35, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.12, t + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

  for (const frequency of [540, 800]) {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = frequency;
    osc.connect(gain);
    osc.start(t);
    osc.stop(t + 0.72);
  }
}
