/*
 * compose-paths
 * v1.2.2
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
module.exports={composePaths:f,zip:h};const p=require("path").join,a="aliases";function f(n){const e=x(n).map(v),s=e.reduce(S,1/0),i=e.map(g(s)),o=b(i),r=_(o),c=o.map(u=>u==null?void 0:u.name).filter(Boolean),l=r;return o.forEach(j(l)),Object.defineProperty(l,a,{value:c,enumerable:!1})}function h(n,t,e){const{aliases:s=[],ignoreAliases:i=!1}=e||{};return(s.length&&!i?s:n[a]).reduce((r,c)=>(i&&s.includes(c)||r.push([n[c],t[c]]),r),[])}const m=/[\r\n]/,d=/(\s*\/\/[^\n\r]*)/,I=/^(\s*)([^$]*)/,A=/\s*=\s*([^$]+)/,P=/^\s*$/;function S(n,{indent:t}){return Math.min(n,t)}function g(n){return({indent:t,content:e})=>({indent:t-n,content:e})}function j(n){return({name:t,index:e})=>{if(!t)return n;const s=n[e];Object.defineProperty(n,t,{value:s,enumerable:!1})}}function _(n){const t=[],e=[];let s=-1,i=-1;return n.forEach(({indent:o,content:r})=>{if(i<=0)i=o;else if(o<=s){let c=1+(s-o)/i;for(;c--;)t.pop()}t.push(r),e.push(p(...t)),s=o}),e}function b(n){return n.map((t,e)=>{const{content:s,indent:i}=t,o=s.match(A);return o?{index:e,indent:i,content:s.slice(0,s.length-o[0].length),name:o[1]}:{index:e,indent:i,content:s}})}function v(n){var s;const t=[n,"",n],e=(s=n.match(I))!=null?s:t;return{indent:e[1].length,content:e[2]}}function x(n){return[n].flat().reduce((t,e)=>[...t,...e.split(m)],[]).filter(E).map(t=>t.replace(d,""))}function E(n){return!P.test(n)}
