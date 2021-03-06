import { Plugin } from 'vite'
import { createVuedocBuildPlugin } from './build'
import { createResolver } from './resolver'
import { createVuedocServerPlugin } from './server'

export type VueDocPluginOptions = {
  wrapperClass: string
  previewClass: string
  markdownPlugins: any[]
}

export default function createVueDocPlugin(options: Partial<VueDocPluginOptions> = {}): Plugin {
  const { wrapperClass = '', previewClass = '', markdownPlugins = [] } = options
  const _options: VueDocPluginOptions = {
    wrapperClass,
    previewClass,
    markdownPlugins
  }
  return {
    resolvers: [createResolver()],
    configureServer: [createVuedocServerPlugin(_options)],
    // @ts-ignore
    rollupPluginVueOptions: {
      include: /\.(vue|md)$/
    },
    rollupInputOptions: {
      // @ts-ignore
      plugins: [createVuedocBuildPlugin(_options)]
    }
  }
}
