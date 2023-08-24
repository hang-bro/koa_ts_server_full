/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-17 16:23:45
 */
/**获取文件 */
export const useViteFile = (filePath: string) => {
  const url = import.meta.env.VITE_BASE_URL + `/` + filePath
  return url
}
export const devPages = [
  {
    name: 'daisyui',
    url: 'https://daisyui.com/components/',
    des: 'Use Tailwind CSS but write fewer class names',
    icon: useViteFile('dev/daysyUI.svg'),
  },
  {
    name: 'tailwind.css',
    url: 'https://tailwindui.com/',
    des: 'Build your next idea even faster.',
    icon: useViteFile('dev/tailwind.png'),
  },
  {
    name: 'elementPlus',
    url: 'https://element-plus.gitee.io/zh-CN/component/button.html',
    des: '一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库',
    icon: useViteFile('dev/element-plus.svg'),
  },
  {
    name: 'antd',
    url: 'https://ant.design/index-cn',
    des: '助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～  ',
    icon: useViteFile('dev/antd.svg'),
  },
  {
    name: 'vite',
    url: 'https://cn.vitejs.dev/',
    des: '下一代的前端工具链',
    icon: useViteFile('dev/vite.svg'),
  },
  {
    name: 'skill-icon',
    url: 'https://github.com/tandpfun/skill-icons',
    des: 'Showcase your skills on your GitHub or resumé with ease!',
    icon: useViteFile('dev/skill-icon.png'),
  },
  {
    name: '即时工具',
    des: '致力打造安全、快捷、好用的在线工具箱~',
    url: 'https://www.67tool.com/',
    icon: useViteFile('dev/js-utils.svg'),
  },
  {
    name: 'vue',
    des: '渐进式JavaScript 框架',
    url: 'https://cn.vuejs.org/',
    icon: useViteFile('dev/vue.svg'),
  },
  {
    name: 'pinia',
    des: '您将喜欢使用的 Vue 存储库',
    url: 'https://pinia.vuejs.org/zh/',
    icon: useViteFile('dev/pinia.svg'),
  },
  {
    name: 'iconpark',
    des: '丰富多彩的资源库免费使用',
    url: 'http://iconpark.oceanengine.com/official',
    icon: useViteFile('dev/icon-park.svg'),
  },
  {
    name: 'prisma',
    des: 'Next-generation Node.js and TypeScript ORM',
    url: 'https://www.prisma.io/client',
    icon: useViteFile('dev/prisma.svg'),
  },
  {
    name: 'animate.css',
    des: '🍿 A cross-browser library of CSS animations. As easy to use as an easy thing.',
    url: 'https://animate.style/',
    icon: useViteFile('dev/animate.png'),
  },
  {
    name: 'canvas-confetti',
    des: '🎉 on-demand confetti gun',
    url: 'https://www.kirilv.com/canvas-confetti/',
    icon: useViteFile(''),
  },
  {
    name: 'intro.js',
    des: 'Lightweight, user-friendly onboarding tour library',
    url: 'http://introjs.com/',
    icon: useViteFile(''),
  },
  {
    name: 'greensock',
    des: 'GSAP (GreenSock Animation Platform)',
    url: 'https://greensock.com/',
    icon: useViteFile('dev/greensock.svg'),
  },
]
