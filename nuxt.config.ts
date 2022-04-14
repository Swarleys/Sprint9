import { defineNuxtConfig } from 'nuxt3'

const buildModules = [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
];
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    buildModules,
    publicRuntimeConfig: {
        secret: process.env.API_URL
    }
})



// export default {
//     buildModules: [
//         '@nuxtjs/tailwindcss',
//         '@pinia/nuxt',
//     ],
// }
