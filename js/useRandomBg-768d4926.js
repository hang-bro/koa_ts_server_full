const l=()=>{function o(){let t=`#${Math.floor(Math.random()*16777215).toString(16)}`,a=`#${Math.floor(Math.random()*16777215).toString(16)}`,e=Math.floor(Math.random()*360),r=()=>(Math.random()*.7).toFixed(1);return`background-image:linear-gradient(${e}deg, 
  rgba(${n(t)}, ${r()}), 
  rgba(${n(a)}, ${r()}))`}function n(t){let a=parseInt(t.slice(1,3),16),e=parseInt(t.slice(3,5),16),r=parseInt(t.slice(5,7),16);return`${a}, ${e}, ${r}`}return o()};export{l as u};
