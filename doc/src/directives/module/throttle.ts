/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 11:27:23
 */
/*
  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。

  思路：
    1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
    2、将需要触发的方法绑定在指令上
  
  使用：给 Dom 加上 v-throttle 及回调函数即可
  <button v-throttle="debounceClick">节流提交</button>
*/
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
	click: () => any;
	disabled: boolean;
}
interface bindingValue{
	value:{
		callback:()=>void,
		delay:number
	}
}
const throttle: Directive = {
	mounted(el: ElType, binding: bindingValue) {
		
		let timer:any = null;
		el.click = function () {
			if (timer) {
				clearTimeout(timer);
			}
			if (!el.disabled) {
				el.disabled = true;
				binding.value.callback();
				timer = setTimeout(() => {
					el.disabled = false;
				}, 	binding.value.delay|| 1000);
			}
		};
		el.addEventListener("click", el.click);
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.click);
	}
};

export default throttle;
