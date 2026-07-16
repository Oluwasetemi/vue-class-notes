export interface ConsoleEntry {
  type: 'log' | 'error' | 'warn'
  text: string
}

function formatValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

/**
 * Monkey-patches log/error/warn on the given console object, calling onEntry
 * for each intercepted call. Returns a cleanup function that restores the
 * original methods.
 *
 * Pass window.console to capture the main-window console.
 * Pass iframeEl.contentWindow.console to capture an iframe's console.
 */
export function captureConsole(
  target: Console,
  onEntry: (entry: ConsoleEntry) => void,
): () => void {
  const orig = {
    log: target.log,
    error: target.error,
    warn: target.warn,
  }

  const emit = (type: ConsoleEntry['type'], args: unknown[]) =>
    onEntry({ type, text: args.map(formatValue).join(' ') })

  target.log = (...args: unknown[]) => {
    orig.log.apply(target, args)
    emit('log', args)
  }
  target.error = (...args: unknown[]) => {
    orig.error.apply(target, args)
    emit('error', args)
  }
  target.warn = (...args: unknown[]) => {
    orig.warn.apply(target, args)
    emit('warn', args)
  }

  return () => {
    target.log = orig.log
    target.error = orig.error
    target.warn = orig.warn
  }
}
