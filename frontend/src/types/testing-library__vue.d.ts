declare module '@testing-library/vue' {
    import { ComponentPublicInstance } from 'vue'
    import { RenderOptions, RenderResult } from '@testing-library/vue'
    
    export * from '@testing-library/vue'
    
    export function render<V extends ComponentPublicInstance>(
      component: any,
      options?: RenderOptions
    ): RenderResult<V>
  }