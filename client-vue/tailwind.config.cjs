/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-11 10:47:43
 */
/**@type {import('tailwindcss').Config} */
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts,tsx}', './index.html'],
  // plugins: [variableColorsPlugin(colors)],
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('daisyui'),
  ],
  theme: {
    daisyui: {
      themes: ["light", "cyberpunk", "dark", "cupcake"],
    },
    extend: {
      colors: {

      }
    }
  },
}
