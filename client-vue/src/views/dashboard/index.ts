import introJs from 'intro.js'
import { useStore } from '@/hooks/useStore'

/**
 * @description 引导页面
 */
export const useIntroduce = () => {
  
  const isIntroduced = useStore((s) => s.user.isIntroduced)
  if (isIntroduced) return
  introJs()
    .setOptions({
      steps: [
        {
          element: document.getElementById('site-name') as HTMLElement,
          intro: '这是站点名称',
        },
        {
          element: document.getElementById('header-search') as HTMLElement,
          intro: '这是搜索区域,所有组件可搜索',
        },
        {
          element: document.getElementById('theme-icon') as HTMLElement,
          intro: '这是主题更改',
        },
      ],
      nextLabel: '下一步', // 下一个的按钮文字
      prevLabel: '上一步', // 上一个按钮文字
      // skipLabel: '跳过', // 跳过指引的按钮文字
      doneLabel: '完成', // 完成按钮的文字
      hidePrev: false, // 是否在第一步中隐藏“上一步”按钮;不隐藏，将呈现为一个禁用的按钮
      hideNext: false, // 是否在最后一步中隐藏“下一步”按钮（同时会隐藏完成按钮);不隐藏，将呈现为一个禁用的按钮
      exitOnEsc: false, // 点击键盘的ESC按钮是否退出指引
      exitOnOverlayClick: false, // 点击遮罩层时是否退出介绍
      showStepNumbers: false, // 是否显示步骤编号
      disableInteraction: true, // 是否禁用高亮显示框内元素的交互
      showBullets: true, // 是否显示面板的指示点
      overlayOpacity: 0.3, // 遮罩层的透明度 0-1之间
      helperElementPadding: 10, // 选中的指引元素周围的填充距离
    })
    .onexit(() => {
      useStore((s) => (s.user.isIntroduced = true))
    })

    .start()
}
