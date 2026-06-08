/* jsdom polyfills for browser APIs the app uses but jsdom doesn't implement. */

// ResizeObserver — used by the constellation's fit-to-viewport hook.
if (!global.ResizeObserver) {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// scrollIntoView — used by the inline-citation jump.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
