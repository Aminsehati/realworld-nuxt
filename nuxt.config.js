export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'realworld-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
        integrity: "sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==",
        crossorigin:"anonymous",
        referrerpolicy:"no-referrer"
      }
    ]
  },

css: [
  '@/assets/css/app.scss'
],

  plugins: [
    {
      src: "@/plugins/axios-accessor",
    },
    {
      src: "@/plugins/axios",
    },
    {
      src: "@/plugins/utils",
    },
    {
      src: "@/plugins/vee-validate.js",
      mode: "client"
    },
    {
      src: "@/plugins/paginate.js",
      mode: "client"
    },
  ],

    components: true,

      buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/tailwindcss',
      ],

        modules: [
          // https://go.nuxtjs.dev/axios
          '@nuxtjs/axios',
          '@nuxtjs/auth-next'
        ],



          publicRuntimeConfig: {
  recaptcha: {
    siteKey: '6LfGW90iAAAAAGROH2qDDobOs1GMJ8JA0cQnbqhS',
      version: 2
  },
  axios: {
    browserBaseURL: "",
      proxy: true,
    }
},
privateRuntimeConfig: {
  axios: {
    baseURL: '',
    }
},
axios: {
  proxy: true,
    browserBaseURL: ''
},
proxy: {
  '/site_api_url/': {
    target: process.env.site_api_url || 'https://api.realworld.io/api/',
      pathRewrite: { '^/site_api_url/': '' },
    changeOrigin: true,
    },
},
pwa: {
  manifest: {
    lang: 'en',
    },
},
auth: {
  resetOnError: true,
    redirect: {
    login: "/auth/login",
      logout: "/",
        callback: "/auth/login",
          home: "",
    },
  strategies: {
    local: {
      token: {
        property: 'user.token',
          global: true,
        },
      user: {
        property: 'user'
      },
      endpoints: {
        login: { url: '/site_api_url/users/login', method: 'post', propertyName: "data.token" },
        logout: false,
          user: { url: '/site_api_url/user', method: 'get' }
      }
    }
  }
},
render: {
  bundleRenderer: {
    runInNewContext: false,
    },
},
typescript: {
  typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
build: {
  transpile: ["vee-validate/dist/rules"],
  },
}
