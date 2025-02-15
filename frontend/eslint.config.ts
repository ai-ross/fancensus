import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import type { Linter } from 'eslint'

// Get the recommended rules from Vue plugin
const vueRules = (pluginVue.configs['flat/recommended'] as Linter.FlatConfig).rules || {}

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'node_modules/**'],
  },

  // Vue rules
  {
    name: 'app/vue-rules',
    rules: {
      ...vueRules,
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'none',
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          vueIndentScriptAndStyle: true
        },
      ],
    },
  } as Linter.FlatConfig,

  // TypeScript rules
  vueTsConfigs.recommended,

  skipFormatting,
)