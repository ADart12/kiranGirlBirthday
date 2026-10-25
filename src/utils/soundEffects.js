// Web Audio API Synthesizer for romantic ambient music and sound effects
// 100% self-contained: works with zero external assets, no missing file errors.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.volume = 0.4;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // Play a soft romantic chime
  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.12 * this.volume, now + i * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.9);
      });
    } catch {
      // AudioContext muted or blocked
    }
  }

  // Play gentle pop / sparkle for confetti & clicks
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);

      gain.gain.setValueAtTime(0.15 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // AudioContext blocked
    }
  }

  // Play magical twinkle when picking a star in wish jar
  playTwinkle() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [880, 1174.66, 1318.51, 1567.98, 1760];
      const now = this.ctx.currentTime;
      notes.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08 * this.volume, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.7);
      });
    } catch {
      // Ignore
    }
  }

  // Play gentle whoosh when candles are blown out
  playBreeze() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  // Romantic gentle music loop (lo-fi warm chords & music box)
  startRomanticBgm() {
    if (this.isBgmPlaying) return;
    this.init();
    this.isBgmPlaying = true;

    // Chord progressions in F major: Fmaj7 -> Dm7 -> Bbmaj7 -> C7
    const chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [233.08, 349.23, 466.16, 587.33], // Bbmaj7
      [261.63, 329.63, 392.00, 523.25]  // C
    ];

    let step = 0;
    const playChordStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = chords[step % chords.length];

      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = i === 3 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.04 * this.volume, now + i * 0.12 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 2.8);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 3.0);
      });

      // Arpeggio note
      const bellNote = chord[step % chord.length] * 2;
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(bellNote, now + 1.2);
      bellGain.gain.setValueAtTime(0, now + 1.2);
      bellGain.gain.linearRampToValueAtTime(0.03 * this.volume, now + 1.25);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      bellOsc.connect(bellGain);
      bellGain.connect(this.bgmGain);
      bellOsc.start(now + 1.2);
      bellOsc.stop(now + 2.6);

      step++;
      this.bgmTimer = setTimeout(playChordStep, 2600);
    };

    playChordStep();
  }

  stopRomanticBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleRomanticBgm() {
    if (this.isBgmPlaying) {
      this.stopRomanticBgm();
      return false;
    } else {
      this.startRomanticBgm();
      return true;
    }
  }
}

export const sound = new SoundManager();
