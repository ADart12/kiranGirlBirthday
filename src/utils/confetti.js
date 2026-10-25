import confetti from 'canvas-confetti';

export const triggerConfetti = (origin = { x: 0.5, y: 0.6 }) => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin,
    colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fcd34d', '#c084fc', '#38bdf8'],
    disableForReducedMotion: true
  });
};

export const triggerHeartShower = () => {
  const end = Date.now() + 2 * 1000;
  const colors = ['#f43f5e', '#fb7185', '#ec4899', '#fda4af'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      disableForReducedMotion: true
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      disableForReducedMotion: true
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const triggerGrandCelebration = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    disableForReducedMotion: true
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#fb7185', '#fda4af']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fcd34d', '#f43f5e', '#ec4899']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#c084fc', '#38bdf8', '#f43f5e']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#fb7185', '#f43f5e']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fcd34d', '#ec4899']
  });
};
