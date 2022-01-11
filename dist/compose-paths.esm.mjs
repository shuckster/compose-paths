/*
 * compose-paths
 * v1.1.3
 * https://github.com/shuckster/compose-paths
 * License: MIT
 */
var a=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var h=a((p,u)=>{(function(n,e,t){typeof u!="undefined"&&u.exports?u.exports=t():typeof define=="function"&&define.amd?define(t):e[n]=t()})("urljoin",p,function(){function n(e){var t=[];if(e.length===0)return"";if(typeof e[0]!="string")throw new TypeError("Url must be a string. Received "+e[0]);if(e[0].match(/^[^/:]+:\/*$/)&&e.length>1){var i=e.shift();e[0]=i+e[0]}e[0].match(/^file:\/\/\//)?e[0]=e[0].replace(/^([^/:]+):\/*/,"$1:///"):e[0]=e[0].replace(/^([^/:]+):\/*/,"$1://");for(var o=0;o<e.length;o++){var s=e[o];if(typeof s!="string")throw new TypeError("Url must be a string. Received "+s);s!==""&&(o>0&&(s=s.replace(/^[\/]+/,"")),o<e.length-1?s=s.replace(/[\/]+$/,""):s=s.replace(/[\/]+$/,"/"),t.push(s))}var l=t.join("/");l=l.replace(/\/(\?|&|#[^!])/g,"$1");var c=l.split("?");return l=c.shift()+(c.length>0?"?":"")+c.join("&"),l}return function(){var e;return typeof arguments[0]=="object"?e=arguments[0]:e=[].slice.call(arguments),n(e)}})});var B=a((N,m)=>{m.exports={composePaths:v,zip:I};var g=h(),d="aliases";function v(n){let t=O(n).map(L),i=t.reduce(E,1/0),o=t.map(R(i)),s=_(o),l=x(s),c=s.map(r=>r==null?void 0:r.name).filter(Boolean),f=l;return s.forEach(w(f)),Object.defineProperty(f,d,{value:c,enumerable:!1})}function I(n,e,t){let{aliases:i=[],ignoreAliases:o=!1}=t||{};return(i.length&&!o?i:n[d]).reduce((l,c)=>(o&&i.includes(c)||l.push([n[c],e[c]]),l),[])}var j=/[\r\n]/,P=/(\s*\/\/[^\n\r]*)/,S=/^(\s*)([^$]*)/,$=/\s*=\s*([^$]+)/,b=/^\s*$/;function E(n,{indent:e}){return Math.min(n,e)}function R(n){return({indent:e,content:t})=>({indent:e-n,content:t})}function w(n){return({name:e,index:t})=>{if(!e)return n;let i=n[t];Object.defineProperty(n,e,{value:i,enumerable:!1})}}function x(n){let e=[],t=[],i=-1,o=-1;return n.forEach(({indent:s,content:l})=>{if(o<=0)o=s;else if(s<=i){let c=1+(i-s)/o;for(;c--;)e.pop()}e.push(l),t.push(g(...e)),i=s}),t}function _(n){return n.map((e,t)=>{let{content:i,indent:o}=e,s=i.match($);return s?{index:t,indent:o,content:i.slice(0,i.length-s[0].length),name:s[1]}:{index:t,indent:o,content:i}})}function L(n){var i;let e=[n,"",n],t=(i=n.match(S))!=null?i:e;return{indent:t[1].length,content:t[2]}}function O(n){return[n].flat().reduce((e,t)=>[...e,...t.split(j)],[]).filter(z).map(e=>e.replace(P,""))}function z(n){return!b.test(n)}});export default B();
