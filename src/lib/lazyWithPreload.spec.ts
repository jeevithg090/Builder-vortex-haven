import { describe, expect, it, vi } from "vitest";
import { lazyWithPreload } from "./lazyWithPreload";

const Dummy = () => null;

describe("lazyWithPreload", () => {
  it("only calls the factory once however often it is preloaded", async () => {
    const factory = vi.fn(() => Promise.resolve({ default: Dummy }));
    const Lazy = lazyWithPreload(factory);

    expect(factory).not.toHaveBeenCalled();
    const [a, b] = await Promise.all([Lazy.preload(), Lazy.preload()]);

    expect(factory).toHaveBeenCalledTimes(1);
    expect(a.default).toBe(Dummy);
    expect(b).toBe(a);
  });
});
