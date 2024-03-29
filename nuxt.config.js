export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - くろぷら',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'none,noindex,nofollow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/nicoicon_fonts/nicoicon.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/date-fns'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.fb_apiKey,
          authDomain: process.env.fb_authDomain,
          projectId: process.env.fb_projectId,
          storageBucket: process.env.fb_storageBucket,
          messagingSenderId: process.env.fb_messagingSenderId,
          appId: process.env.fb_appId,
          measurementId: process.env.fb_measurementId,
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: true, // default
          },
          firestore: true,
        }
      }
    ],
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
  ],

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
  },

  webfontloader: {
    google: {
      families: [
        'Noto+Sans+JP:400,700',
        'M+PLUS+Rounded+1c:100,300,400,500,700,800,900'
      ]
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    prefix: '/',
    proxy: true,
  },
  proxy: {
    '/api_extnico/': {
      target: 'https://ext.nicovideo.jp',
      pathRewrite: {
        '^/api_extnico/': '/api/'
      }
    },
    '/api_nicoad/': {
      target: 'https://api.nicoad.nicovideo.jp',
      pathRewrite: {
        '^/api_nicoad/': '/v1/contents/'
      }
    },
    '/api_nico/': {
      target: 'https://www.nicovideo.jp',
      pathRewrite: {
        '^/api_nico/': ''
      }
    },
    '/api_yt/': {
      target: 'https://www.youtube.com',
      pathRewrite: {
        '^/api_yt/': ''
      }
    },
    '/api_microcms/': {
      target: 'https://ayumunekozuki.microcms.io',
      pathRewrite: {
        '^/api_microcms/': '/api/'
      },
      headers: { "X-MICROCMS-API-KEY": process.env.microcms_apikey },
    },
  },

  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      }
    }
  },
  buildDir: 'dist',

}
