struct Signal {
  size: vec2f,
  origin: vec2f,
  time: f32,
  strength: f32,
  assembly: f32,
}

@group(0) @binding(0) var<uniform> signal: Signal;

fn hash(cell: vec2f) -> f32 {
  return fract(sin(dot(cell, vec2f(127.1, 311.7))) * 43758.5453);
}

fn pigment(color: vec3f, opacity: f32) -> vec4f {
  let alpha = clamp(opacity, 0.0, 1.0);
  return vec4f(color * alpha, alpha);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let scale = signal.size / max(min(signal.size.x, signal.size.y), 1.0);
  let point = (uv - signal.origin) * scale;
  let radius = length(point);
  let blue = vec3f(0.21, 0.57, 0.94);
  let gold = vec3f(0.95, 0.72, 0.10);

  if (signal.assembly > 0.5) {
    let progress = clamp(signal.time / 0.92, 0.0, 1.0);
    let contraction = mix(1.0, 0.38, progress * progress);
    let grid = point * 32.0 / contraction;
    let cell = floor(grid);
    let seed = hash(cell);
    let shift = vec2f(seed, hash(cell + 42.0)) * 0.65 + 0.175;
    let dotPoint = fract(grid) - shift;
    let particle = 1.0 - smoothstep(0.025, 0.085, length(dotPoint));
    let annulus = smoothstep(0.10, 0.20, radius) * (1.0 - smoothstep(0.45, 0.64, radius));
    let wave = exp(-20.0 * abs(radius - mix(0.60, 0.12, progress)));
    let band = 0.35 + 0.65 * pow(abs(sin(atan2(point.y, point.x) * 1.5 + radius * 9.0)), 4.0);
    let opacity = particle * annulus * band * (0.46 + wave * 0.46) * (1.0 - smoothstep(0.55, 1.0, progress));
    return pigment(mix(blue, gold, step(0.72, seed)), opacity);
  }

  let pixels = (uv - signal.origin) * signal.size;
  let glow = exp(-length(pixels / vec2f(185.0, 105.0)) * 2.0);
  let grid = fract(uv * signal.size / 20.0) - 0.5;
  let trace = 1.0 - smoothstep(0.025, 0.075, min(abs(grid.x), abs(grid.y)));
  let node = 1.0 - smoothstep(0.05, 0.15, length(grid));
  let sweep = exp(-abs(pixels.y - 12.0 * sin(signal.time * 3.0)) / 5.0);
  return pigment(mix(blue, gold, node * 0.78), signal.strength * glow * (0.21 + 0.32 * trace + 0.35 * node + sweep * 0.20));
}
