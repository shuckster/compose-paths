/*
 * compose-paths
 * v1.0.8
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
module.exports={composePaths:p,zip:h};var f=require("path").join,a="aliases";function p(n){let e=x(n).map(v),s=e.reduce(S,1/0),i=e.map(g(s)),o=b(i),c=_(o),r=o.map(u=>u==null?void 0:u.name).filter(Boolean),l=c;return o.forEach(j(l)),Object.defineProperty(l,a,{value:r,enumerable:!1})}function h(n,t,e){let{aliases:s=[],ignoreAliases:i=!1}=e||{};return(s.length&&!i?s:n[a]).reduce((c,r)=>i&&s.includes(r)?c:[...c,[n[r],t[r]]],[])}var m=/[\r\n]/,d=/(\s*\/\/[^\n\r]*)/,I=/^(\s*)([^$]*)/,A=/\s*=\s*([^$]+)/,P=/^\s*$/;function S(n,{indent:t}){return Math.min(n,t)}function g(n){return({indent:t,content:e})=>({indent:t-n,content:e})}function j(n){return({name:t,index:e})=>{if(!t)return n;let s=n[e];Object.defineProperty(n,t,{value:s,enumerable:!1})}}function _(n){let t=[],e=[],s=-1,i=-1;return n.forEach(({indent:o,content:c})=>{if(i<=0)i=o;else if(o<=s){let r=1+(s-o)/i;for(;r--;)t.pop()}t.push(c),e.push(f(...t)),s=o}),e}function b(n){return n.map((t,e)=>{let{content:s,indent:i}=t,o=s.match(A);return o?{index:e,indent:i,content:s.slice(0,s.length-o[0].length),name:o[1]}:{index:e,indent:i,content:s}})}function v(n){var s;let t=[n,"",n],e=(s=n.match(I))!=null?s:t;return{indent:e[1].length,content:e[2]}}function x(n){return[n].flat().reduce((t,e)=>[...t,...e.split(m)],[]).filter(E).map(t=>t.replace(d,""))}function E(n){return!P.test(n)}
