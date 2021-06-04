/*
 * compose-paths
 * v1.0.7
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
module.exports={composePaths:h,zip:p};var f=require("path").join,u="aliases";function h(t){let e=v(t).map(b),s=e.reduce(S,Infinity),i=e.map(g(s)),o=_(i),r=O(o);o.forEach(j(r));let l=o.filter(a=>!!(a==null?void 0:a.name)).map(a=>a.name);return Object.defineProperty(r,u,{value:l,enumerable:!1})}function p(t,n,e){let{aliases:s=[],ignoreAliases:i=!1}=e||{};return(s.length&&!i?s:t[u]).reduce((c,r)=>i&&s.includes(r)?c:[...c,[t[r],n[r]]],[])}var m=/[\r\n]/,d=/(\s*\/\/[^\n\r]*)/,I=/^(\s*)([^$]*)/,A=/\s*=\s*([^$]+)/,P=/^\s*$/;function S(t,{indent:n}){return Math.min(t,n)}function g(t){return({indent:n,content:e})=>({indent:n-t,content:e})}function j(t){return({name:n,index:e})=>{if(!n)return t;let s=t[e];Object.defineProperty(t,n,{value:s,enumerable:!1})}}function O(t){let n=[],e=[],s=-1,i=-1;return t.forEach(({indent:o,content:c})=>{if(i<=0)i=o;else if(o<=s){let r=1+(s-o)/i;for(;r--;)n.pop()}n.push(c),e.push(f(...n)),s=o}),e}function _(t){return t.map((n,e)=>{let{content:s,indent:i}=n,o=s.match(A);return o?{index:e,indent:i,content:s.slice(0,s.length-o[0].length),name:o[1]}:{index:e,indent:i,content:s}})}function b(t){var s;let n=[t,"",t],e=(s=t.match(I))!=null?s:n;return{indent:e[1].length,content:e[2]}}function v(t){return[t].flat().reduce((n,e)=>[...n,...e.split(m)],[]).filter(x).map(n=>n.replace(d,""))}function x(t){return!P.test(t)}
