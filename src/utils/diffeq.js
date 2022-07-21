/**
 * Returns the state derivatives after timestep dt
 * @param {func} function - function f(y,t) that returns the derivative of y
 * @param {state} array - initial state of the system
 * @param {t0} float - time t0
 * @param {dt} float - step size
*/
const RK4_step = (func, state, t0, dt=0.01) => {
  const k1 = func(state, t0);
  const k2 = func((state).map((v, idx) => v + dt * k1[idx] / 2), t0 + dt / 2);
  const k3 = func((state).map((v, idx) => v + dt * k2[idx] / 2), t0 + dt / 2);
  const k4 = func((state).map((v, idx) => v + dt * k3[idx]), t0 + dt);
  return (state).map((v, idx) => dt * (k1[idx] + 2 * k2[idx] + 2 * k3[idx] + k4[idx]) / 6);
};

export { RK4_step };
