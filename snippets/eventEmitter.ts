class SimpleEventEmitter {
  private events: Record<string, ((...args: unknown[]) => void)[]>;

  constructor() {
    this.events = {};
  }

  on(event: string, listener: (...args: unknown[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: (...args: unknown[]) => void) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

export default SimpleEventEmitter;
