/* eslint-disable no-new-func */

export interface SfcCompileSuccess {
  component: unknown
}

export interface SfcCompileFailure {
  error: string
}

export type CompileResult = SfcCompileSuccess | SfcCompileFailure

export function isCompileError(r: CompileResult): r is SfcCompileFailure {
  return 'error' in r
}

/**
 * Compiles a Vue SFC string in-browser.
 *
 * Handles both <script setup> SFCs and template-only SFCs.
 * Rewrites `import { ... } from 'vue'` to pull from the already-loaded Vue global
 * so the compiled component runs in the same Vue instance as the host.
 *
 * Returns the component definition on success, or an error string on failure.
 * Mounting is left to the caller so warnHandler / errorHandler can be wired up.
 */
export async function compileSfc(
  source: string,
  filename = 'Component.vue',
): Promise<CompileResult> {
  try {
    const Vue = await import('vue')
    const { parse, compileScript, compileTemplate } = await import('@vue/compiler-sfc')

    const sfc = parse(source, { filename })
    if (sfc.errors.length > 0)
      return { error: sfc.errors.map((e) => e.message ?? String(e)).join('\n') }

    let scripts: string

    if (sfc.descriptor.scriptSetup || sfc.descriptor.script) {
      const compiled = compileScript(sfc.descriptor, {
        id: filename,
        genDefaultAs: '__Component',
        inlineTemplate: true,
      })
      scripts = compiled.content.replace(
        /import (\{[^}]+\}) from ['"]vue['"]/g,
        (_, imports) => `const ${imports.replace(/\sas\s/g, ':')} = Vue`,
      )
    } else {
      const tpl = compileTemplate({
        source: sfc.descriptor.template?.content ?? '',
        filename,
        id: filename,
      })
      scripts = `${tpl.code.replace(
        /import \{([^}]+)\} from ['"]vue['"]/g,
        (_, i) => `const {${i}} = Vue`,
      )}\nconst __Component = { render }`
    }

    scripts += '\nreturn __Component'
    const component = new Function('Vue', `"use strict";\n${scripts}`)(Vue)
    return { component }
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) }
  }
}
