/*
 * compose-paths
 * v1.0.4
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
module.exports={composePaths:h,zip:p};var d=require("path").join,u="aliases";function h(e){let n=I(e).map(P),t=n.reduce((i,{indent:l})=>Math.min(i,l),Infinity),r=n.map(({indent:i,content:l})=>({indent:i-t,content:l})),o=A(r),c=m(o);o.forEach(({name:i,index:l})=>{if(!i)return c;let f=c[l];Object.defineProperty(c,i,{value:f,enumerable:!1})});let a=o.filter(i=>!!(i==null?void 0:i.name)).map(i=>i.name);return Object.defineProperty(c,u,{value:a,enumerable:!1})}function p(e,s,n){let{aliases:t=[],ignoreAliases:r=!1}=n||{};return(t.length&&!r?t:e[u]).reduce((c,a)=>r&&t.includes(a)?c:[...c,[e[a],s[a]]],[])}var S=/[\r\n]/,O=/(\s*\/\/[^\n\r]*)/,g=/^( *)([^$]*)/,j=/\s*=\s*([^$]+)/,x=/^\s*$/;function m(e){let s=[],n=[],t=-1,r=-1;return e.forEach(({indent:o,content:c})=>{if(o<=t){let a=1+(t-o)/r;for(;a--;)s.pop()}else r<=0&&(r=o);s.push(c),n.push(d(...s)),t=o}),n}function A(e){return e.map((s,n)=>{let{content:t,indent:r}=s,o=t.match(j);return o?{index:n,indent:r,content:t.slice(0,t.length-o[0].length),name:o[1]}:{index:n,indent:r,content:t}})}function P(e){var t;let s=[e,"",e],n=(t=e.match(g))!=null?t:s;return{indent:n[1].length,content:n[2]}}function I(e){return[e].flat().reduce((s,n)=>[...s,...n.split(S)],[]).filter(y).map(s=>s.replace(O,""))}function y(e){return!x.test(e)}
