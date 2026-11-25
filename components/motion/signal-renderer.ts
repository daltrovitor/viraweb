import { effect, frame, init, surface } from 'vgpu';
import signalShader from './signal.wgsl';

let context: ReturnType<typeof init> | undefined;

export async function createSignalRenderer(
  canvas: HTMLCanvasElement,
  assembly: boolean,
  onLost: () => void,
  signal: AbortSignal,
) {
  const gpu = await (context ??= init({ powerPreference: 'low-power' }));
  if (signal.aborted) return;

  const target = surface(gpu, canvas, { dpr: assembly ? 0.75 : 1, clearColor: [0, 0, 0, 0] });
  const shader = effect(gpu, signalShader);
  const dispose = () => {
    shader.dispose();
    target.dispose();
  };

  try {
    await shader.compile(target);
  } catch (error) {
    dispose();
    throw error;
  }

  if (signal.aborted) {
    dispose();
    return;
  }

  // Remove the callback on disposal so a shared device never retains old canvases.
  let handleLoss: (() => void) | undefined = onLost;
  void gpu.lost.then(() => {
    context = undefined;
    handleLoss?.();
  });

  return {
    draw(time: number, origin: [number, number], strength: number) {
      frame(gpu, (currentFrame) => {
        shader.set({
          signal: { size: target.size, origin, time, strength, assembly: Number(assembly) },
        });
        currentFrame.pass(target, shader);
      });
    },
    dispose() {
      handleLoss = undefined;
      dispose();
    },
  };
}
