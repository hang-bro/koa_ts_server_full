import{d as L,i as J,e as Q,o as X,k as B,g as M,s as V,f as z,h as k,U as v,j as T,n as b,l as D,a as ee,S as re,m as te}from"./Uint8Array-55cee21c.js";import{ar as d,aB as ne,bY as G,bD as ae,bZ as w,au as K,aA as oe}from"./index-b92ab863.js";var S=Object.create,se=function(){function e(){}return function(r){if(!d(r))return{};if(S)return S(r);e.prototype=r;var t=new e;return e.prototype=void 0,t}}();const ie=se;function ce(e,r){var t=-1,a=e.length;for(r||(r=Array(a));++t<a;)r[t]=e[t];return r}function fe(e,r){for(var t=-1,a=e==null?0:e.length;++t<a&&r(e[t],t,e)!==!1;);return e}function y(e,r,t,a){var g=!t;t||(t={});for(var s=-1,o=r.length;++s<o;){var i=r[s],c=a?a(t[i],e[i],i,t,e):void 0;c===void 0&&(c=e[i]),g?ne(t,i,c):G(t,i,c)}return t}function ue(e){var r=[];if(e!=null)for(var t in Object(e))r.push(t);return r}var ge=Object.prototype,le=ge.hasOwnProperty;function be(e){if(!d(e))return ue(e);var r=L(e),t=[];for(var a in e)a=="constructor"&&(r||!le.call(e,a))||t.push(a);return t}function A(e){return J(e)?Q(e,!0):be(e)}var ye=X(Object.getPrototypeOf,Object);const N=ye;function pe(e,r){return e&&y(r,B(r),e)}function Te(e,r){return e&&y(r,A(r),e)}var _=typeof exports=="object"&&exports&&!exports.nodeType&&exports,I=_&&typeof module=="object"&&module&&!module.nodeType&&module,de=I&&I.exports===_,x=de?ae.Buffer:void 0,C=x?x.allocUnsafe:void 0;function Ae(e,r){if(r)return e.slice();var t=e.length,a=C?C(t):new e.constructor(t);return e.copy(a),a}function je(e,r){return y(e,M(e),r)}var $e=Object.getOwnPropertySymbols,he=$e?function(e){for(var r=[];e;)z(r,M(e)),e=N(e);return r}:V;const R=he;function Oe(e,r){return y(e,R(e),r)}function me(e){return k(e,A,R)}var ve=Object.prototype,we=ve.hasOwnProperty;function Se(e){var r=e.length,t=new e.constructor(r);return r&&typeof e[0]=="string"&&we.call(e,"index")&&(t.index=e.index,t.input=e.input),t}function j(e){var r=new e.constructor(e.byteLength);return new v(r).set(new v(e)),r}function Ie(e,r){var t=r?j(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.byteLength)}var xe=/\w*$/;function Ce(e){var r=new e.constructor(e.source,xe.exec(e));return r.lastIndex=e.lastIndex,r}var P=w?w.prototype:void 0,E=P?P.valueOf:void 0;function Pe(e){return E?Object(E.call(e)):{}}function Ee(e,r){var t=r?j(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)}var Ue="[object Boolean]",Fe="[object Date]",Le="[object Map]",Be="[object Number]",Me="[object RegExp]",De="[object Set]",Ge="[object String]",Ke="[object Symbol]",Ne="[object ArrayBuffer]",_e="[object DataView]",Re="[object Float32Array]",Ye="[object Float64Array]",We="[object Int8Array]",Ze="[object Int16Array]",qe="[object Int32Array]",He="[object Uint8Array]",Je="[object Uint8ClampedArray]",Qe="[object Uint16Array]",Xe="[object Uint32Array]";function Ve(e,r,t){var a=e.constructor;switch(r){case Ne:return j(e);case Ue:case Fe:return new a(+e);case _e:return Ie(e,t);case Re:case Ye:case We:case Ze:case qe:case He:case Je:case Qe:case Xe:return Ee(e,t);case Le:return new a;case Be:case Ge:return new a(e);case Me:return Ce(e);case De:return new a;case Ke:return Pe(e)}}function ze(e){return typeof e.constructor=="function"&&!L(e)?ie(N(e)):{}}var ke="[object Map]";function er(e){return K(e)&&T(e)==ke}var U=b&&b.isMap,rr=U?D(U):er;const tr=rr;var nr="[object Set]";function ar(e){return K(e)&&T(e)==nr}var F=b&&b.isSet,or=F?D(F):ar;const sr=or;var ir=1,cr=2,fr=4,Y="[object Arguments]",ur="[object Array]",gr="[object Boolean]",lr="[object Date]",br="[object Error]",W="[object Function]",yr="[object GeneratorFunction]",pr="[object Map]",Tr="[object Number]",Z="[object Object]",dr="[object RegExp]",Ar="[object Set]",jr="[object String]",$r="[object Symbol]",hr="[object WeakMap]",Or="[object ArrayBuffer]",mr="[object DataView]",vr="[object Float32Array]",wr="[object Float64Array]",Sr="[object Int8Array]",Ir="[object Int16Array]",xr="[object Int32Array]",Cr="[object Uint8Array]",Pr="[object Uint8ClampedArray]",Er="[object Uint16Array]",Ur="[object Uint32Array]",n={};n[Y]=n[ur]=n[Or]=n[mr]=n[gr]=n[lr]=n[vr]=n[wr]=n[Sr]=n[Ir]=n[xr]=n[pr]=n[Tr]=n[Z]=n[dr]=n[Ar]=n[jr]=n[$r]=n[Cr]=n[Pr]=n[Er]=n[Ur]=!0;n[br]=n[W]=n[hr]=!1;function p(e,r,t,a,g,s){var o,i=r&ir,c=r&cr,q=r&fr;if(t&&(o=g?t(e,a,g,s):t(e)),o!==void 0)return o;if(!d(e))return e;var $=oe(e);if($){if(o=Se(e),!i)return ce(e,o)}else{var l=T(e),h=l==W||l==yr;if(ee(e))return Ae(e,i);if(l==Z||l==Y||h&&!g){if(o=c||h?{}:ze(e),!i)return c?Oe(e,Te(o,e)):je(e,pe(o,e))}else{if(!n[l])return g?e:{};o=Ve(e,l,i)}}s||(s=new re);var O=s.get(e);if(O)return O;s.set(e,o),sr(e)?e.forEach(function(f){o.add(p(f,r,t,f,e,s))}):tr(e)&&e.forEach(function(f,u){o.set(u,p(f,r,t,u,e,s))});var H=q?c?me:te:c?A:B,m=$?void 0:H(e);return fe(m||e,function(f,u){m&&(u=f,f=e[u]),G(o,u,p(f,r,t,u,e,s))}),o}export{ce as a,Ae as b,y as c,Ee as d,p as e,N as g,ze as i,A as k};
