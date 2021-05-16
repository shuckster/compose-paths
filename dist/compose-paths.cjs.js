/*
 * compose-paths
 * v1.0.7
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
module.exports={composePaths:p,zip:m};var h=require("path").join,u="aliases";function p(e){let n=_(e).map(g),t=n.reduce((i,{indent:l})=>Math.min(i,l),Infinity),r=n.map(({indent:i,content:l})=>({indent:i-t,content:l})),o=O(r),c=j(o);o.forEach(({name:i,index:l})=>{if(!i)return c;let f=c[l];Object.defineProperty(c,i,{value:f,enumerable:!1})});let a=o.filter(i=>!!(i==null?void 0:i.name)).map(i=>i.name);return Object.defineProperty(c,u,{value:a,enumerable:!1})}function m(e,s,n){let{aliases:t=[],ignoreAliases:r=!1}=n||{};return(t.length&&!r?t:e[u]).reduce((c,a)=>r&&t.includes(a)?c:[...c,[e[a],s[a]]],[])}var d=/[\r\n]/,P=/(\s*\/\/[^\n\r]*)/,A=/^(\s*)([^$]*)/,I=/\s*=\s*([^$]+)/,S=/^\s*$/;function j(e){let s=[],n=[],t=-1,r=-1;return e.forEach(({indent:o,content:c})=>{if(r<=0)r=o;else if(o<=t){let a=1+(t-o)/r;for(;a--;)s.pop()}s.push(c),n.push(h(...s)),t=o}),n}function O(e){return e.map((s,n)=>{let{content:t,indent:r}=s,o=t.match(I);return o?{index:n,indent:r,content:t.slice(0,t.length-o[0].length),name:o[1]}:{index:n,indent:r,content:t}})}function g(e){var t;let s=[e,"",e],n=(t=e.match(A))!=null?t:s;return{indent:n[1].length,content:n[2]}}function _(e){return[e].flat().reduce((s,n)=>[...s,...n.split(d)],[]).filter(b).map(s=>s.replace(P,""))}function b(e){return!S.test(e)}
