/*
 * compose-paths
 * v1.0.7
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
module.exports={composePaths:h,zip:p};var m=require("path").join,u="aliases";function h(e){let n=I(e).map(A),t=n.reduce((i,{indent:l})=>Math.min(i,l),Infinity),r=n.map(({indent:i,content:l})=>({indent:i-t,content:l})),o=P(r),c=d(o);o.forEach(({name:i,index:l})=>{if(!i)return c;let f=c[l];Object.defineProperty(c,i,{value:f,enumerable:!1})});let a=o.filter(i=>!!(i==null?void 0:i.name)).map(i=>i.name);return Object.defineProperty(c,u,{value:a,enumerable:!1})}function p(e,s,n){let{aliases:t=[],ignoreAliases:r=!1}=n||{};return(t.length&&!r?t:e[u]).reduce((c,a)=>r&&t.includes(a)?c:[...c,[e[a],s[a]]],[])}var S=/[\r\n]/,j=/(\s*\/\/[^\n\r]*)/,O=/^(\s*)([^$]*)/,g=/\s*=\s*([^$]+)/,_=/^\s*$/;function d(e){let s=[],n=[],t=-1,r=-1;return e.forEach(({indent:o,content:c})=>{if(r<=0)r=o;else if(o<=t){let a=1+(t-o)/r;for(;a--;)s.pop()}s.push(c),n.push(m(...s)),t=o}),n}function P(e){return e.map((s,n)=>{let{content:t,indent:r}=s,o=t.match(g);return o?{index:n,indent:r,content:t.slice(0,t.length-o[0].length),name:o[1]}:{index:n,indent:r,content:t}})}function A(e){var t;let s=[e,"",e],n=(t=e.match(O))!=null?t:s;return{indent:n[1].length,content:n[2]}}function I(e){return[e].flat().reduce((s,n)=>[...s,...n.split(S)],[]).filter(b).map(s=>s.replace(j,""))}function b(e){return!_.test(e)}
