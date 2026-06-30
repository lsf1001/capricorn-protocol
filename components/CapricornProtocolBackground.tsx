"use client";

import { useEffect, useRef } from "react";

type NodeKind = "ai" | "contract" | "network";
type ResponsiveTier = "desktop" | "mobile" | "tablet";

interface ProtocolNode {
  depth: number;
  kind: NodeKind;
  phase: number;
  x: number;
  y: number;
}

interface Particle {
  alpha: number;
  depth: number;
  layer: "far" | "mid" | "near";
  radius: number;
  speed: number;
  x: number;
  y: number;
}

interface PointerPosition {
  active: boolean;
  x: number;
  y: number;
}

interface HashLabel {
  label: string;
  phase: number;
  size: number;
  x: number;
  y: number;
}

interface Scene {
  height: number;
  particles: Particle[];
  pointer: PointerPosition;
  tier: ResponsiveTier;
  width: number;
}

const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(max-width: 1023px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const TAU = Math.PI * 2;

const NETWORK_LINE_COLOR = "rgba(87, 170, 190, 0.12)";
const DATA_LINE_COLOR = "rgba(34, 211, 238, 0.34)";
const GRID_PACKET_COLOR = "rgba(34, 211, 238, 0.16)";

const PARTICLE_COUNTS: Readonly<Record<ResponsiveTier, number>> = {
  desktop: 78,
  mobile: 24,
  tablet: 48,
};

const PROTOCOL_NODES: readonly ProtocolNode[] = [
  { x: 0.09, y: 0.29, kind: "network", phase: 0.4, depth: 0.85 },
  { x: 0.18, y: 0.39, kind: "network", phase: 1.7, depth: 0.4 },
  { x: 0.28, y: 0.31, kind: "contract", phase: 2.5, depth: 0.65 },
  { x: 0.36, y: 0.47, kind: "network", phase: 4.1, depth: 0.92 },
  { x: 0.47, y: 0.36, kind: "ai", phase: 0.9, depth: 0.55 },
  { x: 0.57, y: 0.5, kind: "network", phase: 3.3, depth: 0.78 },
  { x: 0.68, y: 0.37, kind: "contract", phase: 5.2, depth: 0.35 },
  { x: 0.77, y: 0.47, kind: "network", phase: 2.1, depth: 0.7 },
  { x: 0.86, y: 0.34, kind: "ai", phase: 4.7, depth: 0.5 },
  { x: 0.25, y: 0.68, kind: "network", phase: 5.7, depth: 0.6 },
  { x: 0.43, y: 0.7, kind: "ai", phase: 1.2, depth: 0.8 },
  { x: 0.62, y: 0.67, kind: "network", phase: 3.8, depth: 0.42 },
  { x: 0.79, y: 0.72, kind: "contract", phase: 0.1, depth: 0.66 },
] as const;

const DESKTOP_CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [1, 9], [3, 9], [3, 10], [4, 10], [5, 10], [5, 11], [6, 11], [7, 12], [11, 12],
] as const;

const TABLET_CONNECTIONS = DESKTOP_CONNECTIONS.slice(0, 12);
const MOBILE_CONNECTIONS = DESKTOP_CONNECTIONS.slice(0, 7);
const CONNECTIONS: Readonly<Record<ResponsiveTier, ReadonlyArray<readonly [number, number]>>> = {
  desktop: DESKTOP_CONNECTIONS,
  mobile: MOBILE_CONNECTIONS,
  tablet: TABLET_CONNECTIONS,
};

const HASH_LABELS: readonly HashLabel[] = [
  { label: "0x", x: 0.13, y: 0.61, phase: 0.2, size: 12 },
  { label: "hash", x: 0.33, y: 0.2, phase: 1.5, size: 10 },
  { label: "node", x: 0.53, y: 0.79, phase: 2.7, size: 11 },
  { label: "agent", x: 0.71, y: 0.18, phase: 3.9, size: 11 },
  { label: "proof", x: 0.9, y: 0.59, phase: 5.1, size: 10 },
  { label: "contract", x: 0.2, y: 0.83, phase: 4.3, size: 11 },
  { label: "forge", x: 0.81, y: 0.87, phase: 0.8, size: 10 },
  { label: "capricorn", x: 0.46, y: 0.1, phase: 5.8, size: 12 },
];

function pseudo_random(index: number): number {
  const value = Math.sin(index * 91.345 + 17.123) * 43758.5453;
  return value - Math.floor(value);
}

function select_layer(index: number): Particle["layer"] {
  const bucket = pseudo_random(index + 211) * 3;
  if (bucket < 1) {
    return "near";
  }
  if (bucket < 2) {
    return "mid";
  }
  return "far";
}

function create_particles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const layer = select_layer(index);
    const layer_radius: Readonly<Record<Particle["layer"], [number, number]>> = {
      near: [0.7, 1.6],
      mid: [0.35, 1.15],
      far: [0.18, 0.55],
    };
    const layer_speed: Readonly<Record<Particle["layer"], [number, number]>> = {
      near: [0.0014, 0.0026],
      mid: [0.0008, 0.002],
      far: [0.0003, 0.001],
    };
    const layer_alpha: Readonly<Record<Particle["layer"], [number, number]>> = {
      near: [0.14, 0.36],
      mid: [0.08, 0.28],
      far: [0.05, 0.18],
    };
    const [r_min, r_max] = layer_radius[layer];
    const [s_min, s_max] = layer_speed[layer];
    const [a_min, a_max] = layer_alpha[layer];
    return {
      alpha: a_min + pseudo_random(index + 31) * (a_max - a_min),
      depth: layer === "far" ? 0.4 : layer === "mid" ? 0.7 : 1,
      layer,
      radius: r_min + pseudo_random(index + 53) * (r_max - r_min),
      speed: s_min + pseudo_random(index + 79) * (s_max - s_min),
      x: pseudo_random(index + 7),
      y: pseudo_random(index + 19),
    };
  });
}

const NEBULA_FILL = "rgba(67, 56, 142, 0.06)";
const NEBULA_FILL_COLD = "rgba(34, 211, 238, 0.045)";
const GROUND_GLOW = "rgba(34, 211, 238, 0.05)";

function draw_nebulas(context: CanvasRenderingContext2D, scene: Scene): void {
  const { height, pointer, width } = scene;
  context.save();
  const drift = pointer.active ? pointer.x * 18 - 9 : 0;
  const drift_y = pointer.active ? pointer.y * 14 - 7 : 0;
  const warm = context.createRadialGradient(
    width * 0.78 + drift,
    height * 0.32 + drift_y,
    0,
    width * 0.78 + drift,
    height * 0.32 + drift_y,
    Math.max(width * 0.55, 480),
  );
  warm.addColorStop(0, NEBULA_FILL);
  warm.addColorStop(1, "rgba(67, 56, 142, 0)");
  context.fillStyle = warm;
  context.fillRect(0, 0, width, height);

  const cold = context.createRadialGradient(
    width * 0.18 - drift,
    height * 0.78 - drift_y,
    0,
    width * 0.18 - drift,
    height * 0.78 - drift_y,
    Math.max(width * 0.5, 380),
  );
  cold.addColorStop(0, NEBULA_FILL_COLD);
  cold.addColorStop(1, "rgba(34, 211, 238, 0)");
  context.fillStyle = cold;
  context.fillRect(0, 0, width, height);

  const horizon = context.createRadialGradient(
    width * 0.5,
    height,
    0,
    width * 0.5,
    height,
    Math.max(width * 0.65, 520),
  );
  horizon.addColorStop(0, GROUND_GLOW);
  horizon.addColorStop(1, "rgba(34, 211, 238, 0)");
  context.fillStyle = horizon;
  context.fillRect(0, 0, width, height);
  context.restore();
}

function draw_hash_drift(
  context: CanvasRenderingContext2D,
  scene: Scene,
  time: number,
): void {
  if (scene.tier === "mobile") {
    return;
  }
  context.save();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textBaseline = "middle";
  const offset = scene.pointer.active ? scene.pointer.x * 24 : 0;
  for (const item of HASH_LABELS) {
    const drift = scene.tier === "desktop" ? Math.sin(time * 0.00015 + item.phase) * 18 + offset : 0;
    const opacity = 0.07 + (Math.sin(time * 0.0004 + item.phase) + 1) * 0.02;
    context.fillStyle = `rgba(113, 166, 181, ${opacity})`;
    context.fillText(item.label, item.x * scene.width + drift * scene.width * 0.04, item.y * scene.height);
  }
  context.restore();
}

function draw_grid(context: CanvasRenderingContext2D, scene: Scene, time: number): void {
  const horizon = scene.height * 0.38;
  const column_count = scene.tier === "mobile" ? 8 : 12;
  const row_count = scene.tier === "mobile" ? 5 : 9;
  context.save();
  context.strokeStyle = "rgba(84, 133, 168, 0.055)";
  context.lineWidth = 1;
  for (let index = 0; index <= column_count; index += 1) {
    const bottom_x = (scene.width / column_count) * index;
    const horizon_x = scene.width * 0.5 + (bottom_x - scene.width * 0.5) * 0.25;
    context.beginPath();
    context.moveTo(horizon_x, horizon);
    context.lineTo(bottom_x, scene.height);
    context.stroke();
  }
  for (let index = 0; index < row_count; index += 1) {
    const depth = index / (row_count - 1);
    const y = horizon + Math.pow(depth, 1.8) * (scene.height - horizon);
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(scene.width, y);
    context.stroke();
  }
  const packet_phase = (time * 0.0002) % 1;
  if (packet_phase <= 0.35) {
    const packet_x = (time * 0.018 + scene.width * 0.17) % Math.max(scene.width, 1);
    context.strokeStyle = GRID_PACKET_COLOR;
    context.beginPath();
    context.moveTo(packet_x, scene.height * 0.63);
    context.lineTo(Math.min(packet_x + 34, scene.width), scene.height * 0.63);
    context.stroke();
  }
  context.restore();
}

function draw_particles(context: CanvasRenderingContext2D, scene: Scene, time: number): void {
  context.save();
  for (const particle of scene.particles) {
    const y = ((particle.y + time * particle.speed) % 1) * scene.height;
    const tinted_color = particle.layer === "near" ? "157, 224, 224" : particle.layer === "far" ? "120, 161, 184" : "157, 205, 224";
    context.fillStyle = `rgba(${tinted_color}, ${particle.alpha})`;
    context.beginPath();
    context.arc(particle.x * scene.width, y, particle.radius, 0, TAU);
    context.fill();
  }
  context.restore();
}

function draw_connections(context: CanvasRenderingContext2D, scene: Scene, time: number): void {
  context.save();
  context.lineWidth = 0.75;
  const parallax = scene.pointer.active ? scene.pointer.x * 6 : 0;
  for (const [start_index, end_index] of CONNECTIONS[scene.tier]) {
    const start = PROTOCOL_NODES[start_index];
    const end = PROTOCOL_NODES[end_index];
    if (!start || !end) {
      continue;
    }
    const start_depth = 1 - (1 - start.depth) * 0.15;
    const end_depth = 1 - (1 - end.depth) * 0.15;
    const start_x = start.x * scene.width * start_depth + parallax * start.depth;
    const start_y = start.y * scene.height * start_depth;
    const end_x = end.x * scene.width * end_depth + parallax * end.depth;
    const end_y = end.y * scene.height * end_depth;

    context.strokeStyle = NETWORK_LINE_COLOR;
    context.beginPath();
    context.moveTo(start_x, start_y);
    context.lineTo(end_x, end_y);
    context.stroke();

    const progress = (time * 0.000035 + start_index * 0.137) % 0.94;
    const tail = Math.min(progress + 0.045, 1);
    context.strokeStyle = DATA_LINE_COLOR;
    context.beginPath();
    context.moveTo(start_x + (end_x - start_x) * progress, start_y + (end_y - start_y) * progress);
    context.lineTo(start_x + (end_x - start_x) * tail, start_y + (end_y - start_y) * tail);
    context.stroke();
  }
  context.restore();
}

function node_color(kind: NodeKind): string {
  if (kind === "contract") {
    return "245, 196, 81";
  }
  return kind === "ai" ? "139, 92, 246" : "34, 211, 238";
}

function draw_nodes(context: CanvasRenderingContext2D, scene: Scene, time: number, reduced_motion: boolean): void {
  context.save();
  const parallax = scene.pointer.active ? scene.pointer.x * 6 : 0;
  for (const node of PROTOCOL_NODES) {
    const depth_scale = 1 - (1 - node.depth) * 0.25;
    const x = node.x * scene.width * depth_scale + parallax * node.depth;
    const y = node.y * scene.height * depth_scale;
    const pulse = reduced_motion ? 0.82 : 0.78 + Math.sin(time * 0.001 + node.phase) * 0.18;
    const color = node_color(node.kind);
    context.fillStyle = `rgba(${color}, ${0.42 * pulse})`;
    context.beginPath();
    context.arc(x, y, (node.kind === "network" ? 2.1 : 2.8) * depth_scale, 0, TAU);
    context.fill();
    context.strokeStyle = `rgba(${color}, ${0.15 * pulse})`;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(x, y, (6.5 + pulse * 2) * depth_scale, 0, TAU);
    context.stroke();
  }
  context.restore();
}

function draw_pointer_glow(context: CanvasRenderingContext2D, scene: Scene): void {
  if (scene.tier === "mobile" || !scene.pointer.active) {
    return;
  }
  const gradient = context.createRadialGradient(
    scene.pointer.x,
    scene.pointer.y,
    0,
    scene.pointer.x,
    scene.pointer.y,
    220,
  );
  gradient.addColorStop(0, "rgba(34, 211, 238, 0.055)");
  gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
  context.fillStyle = gradient;
  context.fillRect(scene.pointer.x - 220, scene.pointer.y - 220, 440, 440);
}

function draw_scene(
  context: CanvasRenderingContext2D,
  scene: Scene,
  time: number,
  reduced_motion: boolean,
): void {
  context.clearRect(0, 0, scene.width, scene.height);
  context.fillStyle = "#030509";
  context.fillRect(0, 0, scene.width, scene.height);
  draw_nebulas(context, scene);
  draw_grid(context, scene, time);
  draw_particles(context, scene, time);
  draw_hash_drift(context, scene, time);
  draw_connections(context, scene, time);
  draw_nodes(context, scene, time, reduced_motion);
  draw_pointer_glow(context, scene);
}

/** 渲染低功耗运行的摩羯契约深空协议网络背景。 */
export function CapricornProtocolBackground(): React.JSX.Element {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return undefined;
    }

    const mobile_query = window.matchMedia(MOBILE_QUERY);
    const tablet_query = window.matchMedia(TABLET_QUERY);
    const reduced_motion_query = window.matchMedia(REDUCED_MOTION_QUERY);

    const get_tier = (): ResponsiveTier => {
      if (mobile_query.matches) {
        return "mobile";
      }
      return tablet_query.matches ? "tablet" : "desktop";
    };

    const scene: Scene = {
      height: window.innerHeight,
      particles: [],
      pointer: { active: false, x: 0, y: 0 },
      tier: get_tier(),
      width: window.innerWidth,
    };
    scene.particles = create_particles(PARTICLE_COUNTS[scene.tier]);
    let animation_frame = 0;
    let pointer_listening = false;
    let reduced_motion = reduced_motion_query.matches;

    const update_pointer = (event: PointerEvent): void => {
      scene.pointer.active = true;
      scene.pointer.x = event.clientX;
      scene.pointer.y = event.clientY;
    };

    const sync_pointer_listener = (): void => {
      const should_listen = scene.tier !== "mobile" && !reduced_motion;
      if (should_listen && !pointer_listening) {
        window.addEventListener("pointermove", update_pointer, { passive: true });
        pointer_listening = true;
      } else if (!should_listen && pointer_listening) {
        window.removeEventListener("pointermove", update_pointer);
        pointer_listening = false;
        scene.pointer.active = false;
      }
    };

    const animate = (time: number): void => {
      draw_scene(context, scene, time, reduced_motion);
      animation_frame = window.requestAnimationFrame(animate);
    };

    const stop_animation = (): void => {
      if (animation_frame !== 0) {
        window.cancelAnimationFrame(animation_frame);
        animation_frame = 0;
      }
    };

    const start_animation = (): void => {
      if (animation_frame === 0) {
        animation_frame = window.requestAnimationFrame(animate);
      }
    };

    const rebuild_tier = (): void => {
      const next_tier = get_tier();
      if (next_tier !== scene.tier) {
        scene.tier = next_tier;
        scene.particles = create_particles(PARTICLE_COUNTS[next_tier]);
      }
    };

    const resize = (): void => {
      rebuild_tier();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      scene.width = window.innerWidth;
      scene.height = window.innerHeight;
      canvas.width = Math.round(scene.width * dpr);
      canvas.height = Math.round(scene.height * dpr);
      canvas.style.width = `${scene.width}px`;
      canvas.style.height = `${scene.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync_pointer_listener();
      if (reduced_motion) {
        draw_scene(context, scene, 0, true);
      }
    };

    const update_preferences = (): void => {
      const was_reduced = reduced_motion;
      reduced_motion = reduced_motion_query.matches;
      rebuild_tier();
      sync_pointer_listener();
      if (reduced_motion) {
        stop_animation();
        draw_scene(context, scene, 0, true);
      } else if (was_reduced) {
        start_animation();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    mobile_query.addEventListener("change", update_preferences);
    tablet_query.addEventListener("change", update_preferences);
    reduced_motion_query.addEventListener("change", update_preferences);
    if (!reduced_motion) {
      start_animation();
    }

    return (): void => {
      stop_animation();
      window.removeEventListener("resize", resize);
      if (pointer_listening) {
        window.removeEventListener("pointermove", update_pointer);
      }
      mobile_query.removeEventListener("change", update_preferences);
      tablet_query.removeEventListener("change", update_preferences);
      reduced_motion_query.removeEventListener("change", update_preferences);
    };
  }, []);

  return (
    <div className="protocol-background__wrapper" aria-hidden="true">
      <canvas ref={canvas_ref} className="protocol-background" aria-hidden="true" />
      <div className="protocol-background__foreground" />
      <div className="protocol-background__chromatic" />
    </div>
  );
}
