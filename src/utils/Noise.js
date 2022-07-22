/**
 * https://en.wikipedia.org/wiki/Perlin_noise
 */

class Perlin2D {
  constructor(resolution=1.3) {
    this.resolution = resolution;
  }

  _randomGradientAt = (ix, iy) => {
    const w = 8 * 4;
    const s = w / 2;
    let a = ix;
    let b = iy;
    a *= 3284157443;
    b ^= (a << s) | (a >>> w-s);
    b *= 1911520717;
    a ^= (b << s) | (b >>> w-s);
    a *= 2048419325;
    a >>>= 1;
    b >>>= 1;
    const d = ~0 >>> 1;
    return [a / d, b / d];
  }
  _interpolateLinear = (a0, a1, w) => { return (a1 - a0) * w + a0; }
  _interpolateCubic = (a0, a1, w) => { return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0; }
  _interpolateSmootherstep = (a0, a1, w) => { return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0; }
  _interpolate = (a0, a1, w) => {
    // return this._interpolateLinear(a0, a1, w);
    // return this._interpolateCubic(a0, a1, w);
    return this._interpolateSmootherstep(a0, a1, w);
  }

  // x and y are floats 0 < x,y < 1
  // sample returns a float -1 < ret < 1
  sample = (xcoord, ycoord) => {
    const x = xcoord * this.resolution;
    const y = ycoord * this.resolution;
    const x0 = ~~x;
    const y0 = ~~y;
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    // compute distance to candidate point
    const s = [x - x0, y - y0];

    // compute the 4 dot products of the gradient with the distances to the cell corner
    const [n0, n1, n2, n3] = [[x0, y0], [x1, y0], [x0, y1], [x1, y0]].map(([ix, iy]) => {
      const gradient = this._randomGradientAt(ix, iy);
      console.log(s);
      return gradient[0] * (x - ix) + gradient[1] * (y - iy);
    });

    // interpolate
    const ix0 = this._interpolate(n0, n1, s[0]);
    const ix1 = this._interpolate(n2, n3, s[0]);
    return this._interpolate(ix0, ix1, s[1]);
  }
};

export { Perlin2D }