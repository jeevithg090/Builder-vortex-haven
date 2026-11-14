import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type PreloadableComponent<T extends ComponentType> =
  LazyExoticComponent<T> & { preload: () => Promise<{ default: T }> };

/**
 * `React.lazy` with a `preload()` hook, so a chunk can be fetched ahead of
 * time (e.g. while the intro loader is still on screen) and render instantly
 * once it is needed. The import is only ever started once.
 */
export function lazyWithPreload<T extends ComponentType>(
  factory: () => Promise<{ default: T }>,
): PreloadableComponent<T> {
  let pending: Promise<{ default: T }> | undefined;
  const load = () => {
    pending ??= factory();
    return pending;
  };
  const component = lazy(load) as PreloadableComponent<T>;
  component.preload = load;
  return component;
}
