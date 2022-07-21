import { RK4_step } from "./diffeq";

class DoublePendulumSystem {
  constructor(state, params={}) {
    this.state = state;
    this.m1 = params.m1 ? this.m1 : 1;
    this.m2 = params.m2 ? this.m2 : 1;
    this.l1 = params.l1 ? this.l1 : 1;
    this.l2 = params.l2 ? this.l2 : 1;
    this.g = params.g ? this.g : 9.8;
  }

  getDerivs = ([t1, t2, w1, w2]) => {
    const [m1, m2, l1, l2, g] = [this.m1, this.m2, this.l1, this.l2, this.g];
    const a1 = (l2 / l1) * (m2 / (m1 + m2)) * Math.cos(t1 - t2);
    const a2 = (l1 / l2) * Math.cos(t1 - t2);
    const f1 = -(l2 / l1) * (m2 / (m1 + m2)) * (w2**2) * Math.sin(t1 - t2) - (g / l1) * Math.sin(t1);
    const f2 = (l1 / l2) * (w1**2) * Math.sin(t1 - t2) - (g / l2) * Math.sin(t2);
    const g1 = (f1 - a1 * f2) / (1 - a1 * a2);
    const g2 = (f2 - a2 * f1) / (1 - a1 * a2);
    return [w1, w2, g1, g2];
  }

  nextState = (dt = 0.01) => {
    const d_state = RK4_step(this.getDerivs, this.state, 0, dt);
    return this.state.map((v, idx) => v + d_state[idx]);
  }
  
  setState = (state) => {
    this.state = state;
  }

  getKineticEnergy = () => {
    const [t1, t2, w1, w2] = this.state;
    const [v1, v2] = [this.l1 * w1, this.l2 * w2];
    return 0.5 * (this.m1 * v1**2 + this.m2 * (v1**2 + v2**2 + 2 * v1 * v2 * Math.cos(t1 - t2)));
  }

  getPotentialEnergy = () => {
    const [t1, t2, w1, w2] = this.state;
    const y1 = this.l1 * Math.cos(t1);
    const y2 = y1 + this.l2 * Math.cos(t2);
    return -this.g * (this.m1 * y1 + this.m2 * y2);
  }

  getTotalEnergy = () => {
    return this.getKineticEnergy() + this.getPotentialEnergy();
  }
};


export { DoublePendulumSystem };
