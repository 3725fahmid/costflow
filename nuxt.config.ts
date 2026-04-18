import { fileURLToPath } from "url";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    public: fileURLToPath(new URL("./public/", import.meta.url)),
    constants: fileURLToPath(new URL("./constants/", import.meta.url)),
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    srcDir: "src/",
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
   ssr: true,
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function() {
              const theme = localStorage.getItem('vite-ui-theme') || 'system';
              const root = document.documentElement;
              root.classList.remove('light', 'dark');
              if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                root.classList.add(systemTheme);
              } else {
                root.classList.add(theme);
              }
            })()
          `,
          type: "text/javascript",
        },
      ],
    },
  },
})