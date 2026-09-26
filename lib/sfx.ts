let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  return ctx;
}

/**
 * A synthesized TR-808 style cowbell: two detuned square waves through a
 * band-pass filter with a fast decay. Mississippi State fans will understand.
 */
export function ringCowbell() {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;

  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2640;
  filter.Q.value = 1.2;
  gain.connect(filter).connect(ac.destination);

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.35, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.12, t + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

  for (const frequency of [540, 800]) {
    const osc = ac.createOscillator();
    osc.type = "square";
    osc.frequency.value = frequency;
    osc.connect(gain);
    osc.start(t);
    osc.stop(t + 0.72);
  }
}

/** Disc meets chains: a short burst of bright noise plus a scatter of little metallic tinks. */
export function rattleChains() {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = 0.16;
  master.connect(ac.destination);

  const length = Math.floor(ac.sampleRate * 0.45);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  const noise = ac.createBufferSource();
  noise.buffer = buffer;
  const highpass = ac.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 2500;
  noise.connect(highpass).connect(master);
  noise.start(t);

  for (let i = 0; i < 9; i++) {
    const at = t + Math.random() * 0.3;
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 2400 + Math.random() * 3200;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.25, at + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.09 + Math.random() * 0.12);
    osc.connect(gain).connect(master);
    osc.start(at);
    osc.stop(at + 0.25);
  }
}
