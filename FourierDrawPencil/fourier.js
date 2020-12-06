function dft(x) {
  let X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N;
    im = im / N;

    let freq = k;
    let phase = atan2(im, re);
    let amp = sqrt(re**2 + im**2);
    X[k] = { re, im, freq, phase, amp };
  }
  return X;
}
