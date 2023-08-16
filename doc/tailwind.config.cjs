/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-11 10:47:43
 */
/**@type {import('tailwindcss').Config} */
// tailwind.config.ts
import colors from 'tailwindcss/colors'
import { createVariableColors, variableColorsPlugin } from 'tailwindcss-variable-colors'
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts,tsx}', './index.html'],
  plugins: [variableColorsPlugin(colors)],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "primary": "#570df8",
        "secondary": "#f000b8",
        "accent": "#1dcdbc",
        "info": "#3abff8",
        "success": "#36d399",
        "warning": "#fbbd23",
        "error": "#f87272",
        ...createVariableColors(colors)
      }
    }
  },
};
