import { useEffect, useRef } from "react";

/**
 * Calls `onEscape` when the Escape key is pressed while `active` is true.
 * Used to make every modal dismissible from the keyboard.
 */
export function useEscapeKey(active: boolean, onEscape: () => void) {
  const callbackRef = useRef(onEscape);

  useEffect(() => {
    callbackRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);
}
