import{y as W,z as b,d as N,P as I,A as P,bo as Ee,bn as de,bp as Se,bq as ce,bf as pe,ab as _e,aj as ee,o as y,c as E,n as v,u as e,e as B,Y as A,m as F,t as K,k as $,I as T,j as L,W as Ce,N as q,_ as H,Z as fe,aE as J,br as _,Q as Pe,h as me,F as Fe,b as Le,a3 as ve,X as M,i as O,bs as Re,bh as Te,bt as Ue,bu as De,V as Oe,s as Be,b9 as Q,aN as te,bv as Ne,bw as je,D as se,bx as Ae,x as qe,q as Ie,C as Me,S as ae,T as oe}from"./index-b92ab863.js";import{t as x,d as We}from"./error-78e43d3e.js";import{i as ye}from"./isNil-c75b1b34.js";import{c as V}from"./use-form-item-106f16de.js";import{e as ze}from"./baseClone-bbd624c2.js";import{i as He}from"./isEqual-fc81d51d.js";var Ke=1,Ve=4;function ne(n){return ze(n,Ke|Ve)}const Xe=W({type:{type:String,default:"line",values:["line","circle","dashboard"]},percentage:{type:Number,default:0,validator:n=>n>=0&&n<=100},status:{type:String,default:"",values:["","success","exception","warning"]},indeterminate:{type:Boolean,default:!1},duration:{type:Number,default:3},strokeWidth:{type:Number,default:6},strokeLinecap:{type:b(String),default:"round"},textInside:{type:Boolean,default:!1},width:{type:Number,default:126},showText:{type:Boolean,default:!0},color:{type:b([String,Array,Function]),default:""},striped:Boolean,stripedFlow:Boolean,format:{type:b(Function),default:n=>`${n}%`}}),Ge=["aria-valuenow"],Ye={viewBox:"0 0 100 100"},Je=["d","stroke","stroke-width"],Qe=["d","stroke","opacity","stroke-linecap","stroke-width"],Ze={key:0},xe=N({name:"ElProgress"}),et=N({...xe,props:Xe,setup(n){const s=n,o={success:"#13ce66",exception:"#ff4949",warning:"#e6a23c",default:"#20a0ff"},a=I("progress"),f=P(()=>({width:`${s.percentage}%`,animationDuration:`${s.duration}s`,backgroundColor:U(s.percentage)})),p=P(()=>(s.strokeWidth/s.width*100).toFixed(1)),m=P(()=>["circle","dashboard"].includes(s.type)?Number.parseInt(`${50-Number.parseFloat(p.value)/2}`,10):0),S=P(()=>{const l=m.value,R=s.type==="dashboard";return`
          M 50 50
          m 0 ${R?"":"-"}${l}
          a ${l} ${l} 0 1 1 0 ${R?"-":""}${l*2}
          a ${l} ${l} 0 1 1 0 ${R?"":"-"}${l*2}
          `}),k=P(()=>2*Math.PI*m.value),d=P(()=>s.type==="dashboard"?.75:1),w=P(()=>`${-1*k.value*(1-d.value)/2}px`),g=P(()=>({strokeDasharray:`${k.value*d.value}px, ${k.value}px`,strokeDashoffset:w.value})),r=P(()=>({strokeDasharray:`${k.value*d.value*(s.percentage/100)}px, ${k.value}px`,strokeDashoffset:w.value,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"})),u=P(()=>{let l;return s.color?l=U(s.percentage):l=o[s.status]||o.default,l}),t=P(()=>s.status==="warning"?Ee:s.type==="line"?s.status==="success"?de:Se:s.status==="success"?ce:pe),c=P(()=>s.type==="line"?12+s.strokeWidth*.4:s.width*.111111+2),h=P(()=>s.format(s.percentage));function i(l){const R=100/l.length;return l.map((C,j)=>ee(C)?{color:C,percentage:(j+1)*R}:C).sort((C,j)=>C.percentage-j.percentage)}const U=l=>{var R;const{color:D}=s;if(_e(D))return D(l);if(ee(D))return D;{const C=i(D);for(const j of C)if(j.percentage>l)return j.color;return(R=C[C.length-1])==null?void 0:R.color}};return(l,R)=>(y(),E("div",{class:v([e(a).b(),e(a).m(l.type),e(a).is(l.status),{[e(a).m("without-text")]:!l.showText,[e(a).m("text-inside")]:l.textInside}]),role:"progressbar","aria-valuenow":l.percentage,"aria-valuemin":"0","aria-valuemax":"100"},[l.type==="line"?(y(),E("div",{key:0,class:v(e(a).b("bar"))},[B("div",{class:v(e(a).be("bar","outer")),style:A({height:`${l.strokeWidth}px`})},[B("div",{class:v([e(a).be("bar","inner"),{[e(a).bem("bar","inner","indeterminate")]:l.indeterminate},{[e(a).bem("bar","inner","striped")]:l.striped},{[e(a).bem("bar","inner","striped-flow")]:l.stripedFlow}]),style:A(e(f))},[(l.showText||l.$slots.default)&&l.textInside?(y(),E("div",{key:0,class:v(e(a).be("bar","innerText"))},[F(l.$slots,"default",{percentage:l.percentage},()=>[B("span",null,K(e(h)),1)])],2)):$("v-if",!0)],6)],6)],2)):(y(),E("div",{key:1,class:v(e(a).b("circle")),style:A({height:`${l.width}px`,width:`${l.width}px`})},[(y(),E("svg",Ye,[B("path",{class:v(e(a).be("circle","track")),d:e(S),stroke:`var(${e(a).cssVarName("fill-color-light")}, #e5e9f2)`,"stroke-width":e(p),fill:"none",style:A(e(g))},null,14,Je),B("path",{class:v(e(a).be("circle","path")),d:e(S),stroke:e(u),fill:"none",opacity:l.percentage?1:0,"stroke-linecap":l.strokeLinecap,"stroke-width":e(p),style:A(e(r))},null,14,Qe)]))],6)),(l.showText||l.$slots.default)&&!l.textInside?(y(),E("div",{key:2,class:v(e(a).e("text")),style:A({fontSize:`${e(c)}px`})},[F(l.$slots,"default",{percentage:l.percentage},()=>[l.status?(y(),T(e(q),{key:1},{default:L(()=>[(y(),T(Ce(e(t))))]),_:1})):(y(),E("span",Ze,K(e(h)),1))])],6)):$("v-if",!0)],10,Ge))}});var tt=H(et,[["__file","/home/runner/work/element-plus/element-plus/packages/components/progress/src/progress.vue"]]);const st=fe(tt),ge=Symbol("uploadContextKey"),at="ElUpload";class ot extends Error{constructor(s,o,a,f){super(s),this.name="UploadAjaxError",this.status=o,this.method=a,this.url=f}}function re(n,s,o){let a;return o.response?a=`${o.response.error||o.response}`:o.responseText?a=`${o.responseText}`:a=`fail to ${s.method} ${n} ${o.status}`,new ot(a,o.status,s.method,n)}function nt(n){const s=n.responseText||n.response;if(!s)return s;try{return JSON.parse(s)}catch{return s}}const rt=n=>{typeof XMLHttpRequest>"u"&&x(at,"XMLHttpRequest is undefined");const s=new XMLHttpRequest,o=n.action;s.upload&&s.upload.addEventListener("progress",p=>{const m=p;m.percent=p.total>0?p.loaded/p.total*100:0,n.onProgress(m)});const a=new FormData;if(n.data)for(const[p,m]of Object.entries(n.data))Array.isArray(m)?a.append(p,...m):a.append(p,m);a.append(n.filename,n.file,n.file.name),s.addEventListener("error",()=>{n.onError(re(o,n,s))}),s.addEventListener("load",()=>{if(s.status<200||s.status>=300)return n.onError(re(o,n,s));n.onSuccess(nt(s))}),s.open(n.method,o,!0),n.withCredentials&&"withCredentials"in s&&(s.withCredentials=!0);const f=n.headers||{};if(f instanceof Headers)f.forEach((p,m)=>s.setRequestHeader(m,p));else for(const[p,m]of Object.entries(f))ye(m)||s.setRequestHeader(p,String(m));return s.send(a),s},he=["text","picture","picture-card"];let lt=1;const Z=()=>Date.now()+lt++,be=W({action:{type:String,default:"#"},headers:{type:b(Object)},method:{type:String,default:"post"},data:{type:Object,default:()=>J({})},multiple:{type:Boolean,default:!1},name:{type:String,default:"file"},drag:{type:Boolean,default:!1},withCredentials:Boolean,showFileList:{type:Boolean,default:!0},accept:{type:String,default:""},type:{type:String,default:"select"},fileList:{type:b(Array),default:()=>J([])},autoUpload:{type:Boolean,default:!0},listType:{type:String,values:he,default:"text"},httpRequest:{type:b(Function),default:rt},disabled:Boolean,limit:Number}),it=W({...be,beforeUpload:{type:b(Function),default:_},beforeRemove:{type:b(Function)},onRemove:{type:b(Function),default:_},onChange:{type:b(Function),default:_},onPreview:{type:b(Function),default:_},onSuccess:{type:b(Function),default:_},onProgress:{type:b(Function),default:_},onError:{type:b(Function),default:_},onExceed:{type:b(Function),default:_}}),ut=W({files:{type:b(Array),default:()=>J([])},disabled:{type:Boolean,default:!1},handlePreview:{type:b(Function),default:_},listType:{type:String,values:he,default:"text"}}),dt={remove:n=>!!n},ct=["onKeydown"],pt=["src"],ft=["onClick"],mt=["title"],vt=["onClick"],yt=["onClick"],gt=N({name:"ElUploadList"}),ht=N({...gt,props:ut,emits:dt,setup(n,{emit:s}){const{t:o}=Pe(),a=I("upload"),f=I("icon"),p=I("list"),m=V(),S=me(!1),k=d=>{s("remove",d)};return(d,w)=>(y(),T(De,{tag:"ul",class:v([e(a).b("list"),e(a).bm("list",d.listType),e(a).is("disabled",e(m))]),name:e(p).b()},{default:L(()=>[(y(!0),E(Fe,null,Le(d.files,g=>(y(),E("li",{key:g.uid||g.name,class:v([e(a).be("list","item"),e(a).is(g.status),{focusing:S.value}]),tabindex:"0",onKeydown:ve(r=>!e(m)&&k(g),["delete"]),onFocus:w[0]||(w[0]=r=>S.value=!0),onBlur:w[1]||(w[1]=r=>S.value=!1),onClick:w[2]||(w[2]=r=>S.value=!1)},[F(d.$slots,"default",{file:g},()=>[d.listType==="picture"||g.status!=="uploading"&&d.listType==="picture-card"?(y(),E("img",{key:0,class:v(e(a).be("list","item-thumbnail")),src:g.url,alt:""},null,10,pt)):$("v-if",!0),g.status==="uploading"||d.listType!=="picture-card"?(y(),E("div",{key:1,class:v(e(a).be("list","item-info"))},[B("a",{class:v(e(a).be("list","item-name")),onClick:M(r=>d.handlePreview(g),["prevent"])},[O(e(q),{class:v(e(f).m("document"))},{default:L(()=>[O(e(Re))]),_:1},8,["class"]),B("span",{class:v(e(a).be("list","item-file-name")),title:g.name},K(g.name),11,mt)],10,ft),g.status==="uploading"?(y(),T(e(st),{key:0,type:d.listType==="picture-card"?"circle":"line","stroke-width":d.listType==="picture-card"?6:2,percentage:Number(g.percentage),style:A(d.listType==="picture-card"?"":"margin-top: 0.5rem")},null,8,["type","stroke-width","percentage","style"])):$("v-if",!0)],2)):$("v-if",!0),B("label",{class:v(e(a).be("list","item-status-label"))},[d.listType==="text"?(y(),T(e(q),{key:0,class:v([e(f).m("upload-success"),e(f).m("circle-check")])},{default:L(()=>[O(e(de))]),_:1},8,["class"])):["picture-card","picture"].includes(d.listType)?(y(),T(e(q),{key:1,class:v([e(f).m("upload-success"),e(f).m("check")])},{default:L(()=>[O(e(ce))]),_:1},8,["class"])):$("v-if",!0)],2),e(m)?$("v-if",!0):(y(),T(e(q),{key:2,class:v(e(f).m("close")),onClick:r=>k(g)},{default:L(()=>[O(e(pe))]),_:2},1032,["class","onClick"])),$(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),$(" This is a bug which needs to be fixed "),$(" TODO: Fix the incorrect navigation interaction "),e(m)?$("v-if",!0):(y(),E("i",{key:3,class:v(e(f).m("close-tip"))},K(e(o)("el.upload.deleteTip")),3)),d.listType==="picture-card"?(y(),E("span",{key:4,class:v(e(a).be("list","item-actions"))},[B("span",{class:v(e(a).be("list","item-preview")),onClick:r=>d.handlePreview(g)},[O(e(q),{class:v(e(f).m("zoom-in"))},{default:L(()=>[O(e(Te))]),_:1},8,["class"])],10,vt),e(m)?$("v-if",!0):(y(),E("span",{key:0,class:v(e(a).be("list","item-delete")),onClick:r=>k(g)},[O(e(q),{class:v(e(f).m("delete"))},{default:L(()=>[O(e(Ue))]),_:1},8,["class"])],10,yt))],2)):$("v-if",!0)])],42,ct))),128)),F(d.$slots,"append")]),_:3},8,["class","name"]))}});var le=H(ht,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-list.vue"]]);const bt=W({disabled:{type:Boolean,default:!1}}),kt={file:n=>Oe(n)},$t=["onDrop","onDragover"],ke="ElUploadDrag",wt=N({name:ke}),Et=N({...wt,props:bt,emits:kt,setup(n,{emit:s}){const o=Be(ge);o||x(ke,"usage: <el-upload><el-upload-dragger /></el-upload>");const a=I("upload"),f=me(!1),p=V(),m=k=>{if(p.value)return;f.value=!1,k.stopPropagation();const d=Array.from(k.dataTransfer.files),w=o.accept.value;if(!w){s("file",d);return}const g=d.filter(r=>{const{type:u,name:t}=r,c=t.includes(".")?`.${t.split(".").pop()}`:"",h=u.replace(/\/.*$/,"");return w.split(",").map(i=>i.trim()).filter(i=>i).some(i=>i.startsWith(".")?c===i:/\/\*$/.test(i)?h===i.replace(/\/\*$/,""):/^[^/]+\/[^/]+$/.test(i)?u===i:!1)});s("file",g)},S=()=>{p.value||(f.value=!0)};return(k,d)=>(y(),E("div",{class:v([e(a).b("dragger"),e(a).is("dragover",f.value)]),onDrop:M(m,["prevent"]),onDragover:M(S,["prevent"]),onDragleave:d[0]||(d[0]=M(w=>f.value=!1,["prevent"]))},[F(k.$slots,"default")],42,$t))}});var St=H(Et,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-dragger.vue"]]);const _t=W({...be,beforeUpload:{type:b(Function),default:_},onRemove:{type:b(Function),default:_},onStart:{type:b(Function),default:_},onSuccess:{type:b(Function),default:_},onProgress:{type:b(Function),default:_},onError:{type:b(Function),default:_},onExceed:{type:b(Function),default:_}}),Ct=["onKeydown"],Pt=["name","multiple","accept"],Ft=N({name:"ElUploadContent",inheritAttrs:!1}),Lt=N({...Ft,props:_t,setup(n,{expose:s}){const o=n,a=I("upload"),f=V(),p=Q({}),m=Q(),S=t=>{if(t.length===0)return;const{autoUpload:c,limit:h,fileList:i,multiple:U,onStart:l,onExceed:R}=o;if(h&&i.length+t.length>h){R(t,i);return}U||(t=t.slice(0,1));for(const D of t){const C=D;C.uid=Z(),l(C),c&&k(C)}},k=async t=>{if(m.value.value="",!o.beforeUpload)return d(t);let c,h={};try{const U=o.data,l=o.beforeUpload(t);h=te(o.data)?ne(o.data):o.data,c=await l,te(o.data)&&He(U,h)&&(h=ne(o.data))}catch{c=!1}if(c===!1){o.onRemove(t);return}let i=t;c instanceof Blob&&(c instanceof File?i=c:i=new File([c],t.name,{type:t.type})),d(Object.assign(i,{uid:t.uid}),h)},d=(t,c)=>{const{headers:h,data:i,method:U,withCredentials:l,name:R,action:D,onProgress:C,onSuccess:j,onError:$e,httpRequest:we}=o,{uid:X}=t,G={headers:h||{},withCredentials:l,file:t,data:c??i,method:U,filename:R,action:D,onProgress:z=>{C(z,t)},onSuccess:z=>{j(z,t),delete p.value[X]},onError:z=>{$e(z,t),delete p.value[X]}},Y=we(G);p.value[X]=Y,Y instanceof Promise&&Y.then(G.onSuccess,G.onError)},w=t=>{const c=t.target.files;c&&S(Array.from(c))},g=()=>{f.value||(m.value.value="",m.value.click())},r=()=>{g()};return s({abort:t=>{Ne(p.value).filter(t?([h])=>String(t.uid)===h:()=>!0).forEach(([h,i])=>{i instanceof XMLHttpRequest&&i.abort(),delete p.value[h]})},upload:k}),(t,c)=>(y(),E("div",{class:v([e(a).b(),e(a).m(t.listType),e(a).is("drag",t.drag)]),tabindex:"0",onClick:g,onKeydown:ve(M(r,["self"]),["enter","space"])},[t.drag?(y(),T(St,{key:0,disabled:e(f),onFile:S},{default:L(()=>[F(t.$slots,"default")]),_:3},8,["disabled"])):F(t.$slots,"default",{key:1}),B("input",{ref_key:"inputRef",ref:m,class:v(e(a).e("input")),name:t.name,multiple:t.multiple,accept:t.accept,type:"file",onChange:w,onClick:c[0]||(c[0]=M(()=>{},["stop"]))},null,42,Pt)],42,Ct))}});var ie=H(Lt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-content.vue"]]);const ue="ElUpload",Rt=n=>{var s;(s=n.url)!=null&&s.startsWith("blob:")&&URL.revokeObjectURL(n.url)},Tt=(n,s)=>{const o=je(n,"fileList",void 0,{passive:!0}),a=r=>o.value.find(u=>u.uid===r.uid);function f(r){var u;(u=s.value)==null||u.abort(r)}function p(r=["ready","uploading","success","fail"]){o.value=o.value.filter(u=>!r.includes(u.status))}const m=(r,u)=>{const t=a(u);t&&(console.error(r),t.status="fail",o.value.splice(o.value.indexOf(t),1),n.onError(r,t,o.value),n.onChange(t,o.value))},S=(r,u)=>{const t=a(u);t&&(n.onProgress(r,t,o.value),t.status="uploading",t.percentage=Math.round(r.percent))},k=(r,u)=>{const t=a(u);t&&(t.status="success",t.response=r,n.onSuccess(r,t,o.value),n.onChange(t,o.value))},d=r=>{ye(r.uid)&&(r.uid=Z());const u={name:r.name,percentage:0,status:"ready",size:r.size,raw:r,uid:r.uid};if(n.listType==="picture-card"||n.listType==="picture")try{u.url=URL.createObjectURL(r)}catch(t){We(ue,t.message),n.onError(t,u,o.value)}o.value=[...o.value,u],n.onChange(u,o.value)},w=async r=>{const u=r instanceof File?a(r):r;u||x(ue,"file to be removed not found");const t=c=>{f(c);const h=o.value;h.splice(h.indexOf(c),1),n.onRemove(c,h),Rt(c)};n.beforeRemove?await n.beforeRemove(u,o.value)!==!1&&t(u):t(u)};function g(){o.value.filter(({status:r})=>r==="ready").forEach(({raw:r})=>{var u;return r&&((u=s.value)==null?void 0:u.upload(r))})}return se(()=>n.listType,r=>{r!=="picture-card"&&r!=="picture"||(o.value=o.value.map(u=>{const{raw:t,url:c}=u;if(!c&&t)try{u.url=URL.createObjectURL(t)}catch(h){n.onError(h,u,o.value)}return u}))}),se(o,r=>{for(const u of r)u.uid||(u.uid=Z()),u.status||(u.status="success")},{immediate:!0,deep:!0}),{uploadFiles:o,abort:f,clearFiles:p,handleError:m,handleProgress:S,handleStart:d,handleSuccess:k,handleRemove:w,submit:g}},Ut=N({name:"ElUpload"}),Dt=N({...Ut,props:it,setup(n,{expose:s}){const o=n,a=Ae(),f=V(),p=Q(),{abort:m,submit:S,clearFiles:k,uploadFiles:d,handleStart:w,handleError:g,handleRemove:r,handleSuccess:u,handleProgress:t}=Tt(o,p),c=P(()=>o.listType==="picture-card"),h=P(()=>({...o,fileList:d.value,onStart:w,onProgress:t,onSuccess:u,onError:g,onRemove:r}));return qe(()=>{d.value.forEach(({url:i})=>{i!=null&&i.startsWith("blob:")&&URL.revokeObjectURL(i)})}),Ie(ge,{accept:Me(o,"accept")}),s({abort:m,submit:S,clearFiles:k,handleStart:w,handleRemove:r}),(i,U)=>(y(),E("div",null,[e(c)&&i.showFileList?(y(),T(le,{key:0,disabled:e(f),"list-type":i.listType,files:e(d),"handle-preview":i.onPreview,onRemove:e(r)},ae({append:L(()=>[O(ie,oe({ref_key:"uploadRef",ref:p},e(h)),{default:L(()=>[e(a).trigger?F(i.$slots,"trigger",{key:0}):$("v-if",!0),!e(a).trigger&&e(a).default?F(i.$slots,"default",{key:1}):$("v-if",!0)]),_:3},16)]),_:2},[i.$slots.file?{name:"default",fn:L(({file:l})=>[F(i.$slots,"file",{file:l})])}:void 0]),1032,["disabled","list-type","files","handle-preview","onRemove"])):$("v-if",!0),!e(c)||e(c)&&!i.showFileList?(y(),T(ie,oe({key:1,ref_key:"uploadRef",ref:p},e(h)),{default:L(()=>[e(a).trigger?F(i.$slots,"trigger",{key:0}):$("v-if",!0),!e(a).trigger&&e(a).default?F(i.$slots,"default",{key:1}):$("v-if",!0)]),_:3},16)):$("v-if",!0),i.$slots.trigger?F(i.$slots,"default",{key:2}):$("v-if",!0),F(i.$slots,"tip"),!e(c)&&i.showFileList?(y(),T(le,{key:3,disabled:e(f),"list-type":i.listType,files:e(d),"handle-preview":i.onPreview,onRemove:e(r)},ae({_:2},[i.$slots.file?{name:"default",fn:L(({file:l})=>[F(i.$slots,"file",{file:l})])}:void 0]),1032,["disabled","list-type","files","handle-preview","onRemove"])):$("v-if",!0)]))}});var Ot=H(Dt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload.vue"]]);const Mt=fe(Ot);export{Mt as E,st as a};
