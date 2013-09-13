!function(e,t){"use strict";function n(e,t){for(var n,r=[],i=0;i<e.length;++i){if(n=s[e[i]]||o(e[i]),!n)throw"module definition dependecy not found: "+e[i];r.push(n)}t.apply(null,r)}function r(e,r,i){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(r===t)throw"invalid module definition, dependencies must be specified";if(i===t)throw"invalid module definition, definition function must be specified";n(r,function(){s[e]=i.apply(null,arguments)})}function i(e){return!!s[e]}function o(t){for(var n=e,r=t.split(/[.\/]/),i=0;i<r.length;++i){if(!n[r[i]])return;n=n[r[i]]}return n}function a(n){for(var r=0;r<n.length;r++){for(var i=e,o=n[r],a=o.split(/[.\/]/),l=0;l<a.length-1;++l)i[a[l]]===t&&(i[a[l]]={}),i=i[a[l]];i[a[a.length-1]]=s[o]}}var s={},l="tinymce/tableplugin/TableGrid",c="tinymce/util/Tools",d="tinymce/Env",u="tinymce/tableplugin/Quirks",f="tinymce/util/VK",p="tinymce/tableplugin/CellSelection",m="tinymce/dom/TreeWalker",h="tinymce/tableplugin/Plugin",g="tinymce/PluginManager";r(l,[c,d],function(e,t){function n(e,t){return parseInt(e.getAttribute(t)||1,10)}var r=e.each;return function(i,o){function a(){var e=0;R=[],r(["thead","tbody","tfoot"],function(t){var i=H.select("> "+t+" tr",o);r(i,function(i,o){o+=e,r(H.select("> td, > th",i),function(e,r){var i,a,s,l;if(R[o])for(;R[o][r];)r++;for(s=n(e,"rowspan"),l=n(e,"colspan"),a=o;o+s>a;a++)for(R[a]||(R[a]=[]),i=r;r+l>i;i++)R[a][i]={part:t,real:a==o&&i==r,elm:e,rowspan:s,colspan:l}})}),e+=i.length})}function s(e,t){return e=e.cloneNode(t),e.removeAttribute("id"),e}function l(e,t){var n;return n=R[t],n?n[e]:void 0}function c(e,t,n){e&&(n=parseInt(n,10),1===n?e.removeAttribute(t,1):e.setAttribute(t,n,1))}function d(e){return e&&(H.hasClass(e.elm,"mce-item-selected")||e==P)}function u(){var e=[];return r(o.rows,function(t){r(t.cells,function(n){return H.hasClass(n,"mce-item-selected")||n==P.elm?(e.push(t),!1):void 0})}),e}function f(){var e=H.createRng();e.setStartAfter(o),e.setEndAfter(o),M.setRng(e),H.remove(o)}function p(n){var o,a={};return i.settings.table_clone_elements!==!1&&(a=e.makeMap((i.settings.table_clone_elements||"strong em b i span font h1 h2 h3 h4 h5 h6 p div").toUpperCase(),/[ ,]/)),e.walk(n,function(e){var i;return 3==e.nodeType?(r(H.getParents(e.parentNode,null,n).reverse(),function(e){a[e.nodeName]&&(e=s(e,!1),o?i&&i.appendChild(e):o=i=e,i=e)}),i&&(i.innerHTML=t.ie?"&nbsp;":'<br data-mce-bogus="1" />'),!1):void 0},"childNodes"),n=s(n,!1),c(n,"rowSpan",1),c(n,"colSpan",1),o?n.appendChild(o):t.ie||(n.innerHTML='<br data-mce-bogus="1" />'),n}function m(){var e=H.createRng(),t;return r(H.select("tr",o),function(e){0===e.cells.length&&H.remove(e)}),0===H.select("tr",o).length?(e.setStartBefore(o),e.setEndBefore(o),M.setRng(e),H.remove(o),void 0):(r(H.select("thead,tbody,tfoot",o),function(e){0===e.rows.length&&H.remove(e)}),a(),t=R[Math.min(R.length-1,A.y)],t&&(M.select(t[Math.min(t.length-1,A.x)].elm,!0),M.collapse(!0)),void 0)}function h(e,t,n,r){var i,o,a,s,l;for(i=R[t][e].elm.parentNode,a=1;n>=a;a++)if(i=H.getNext(i,"tr")){for(o=e;o>=0;o--)if(l=R[t+a][o].elm,l.parentNode==i){for(s=1;r>=s;s++)H.insertAfter(p(l),l);break}if(-1==o)for(s=1;r>=s;s++)i.insertBefore(p(i.cells[0]),i.cells[0])}}function g(){r(R,function(e,t){r(e,function(e,r){var i,o,a;if(d(e)&&(e=e.elm,i=n(e,"colspan"),o=n(e,"rowspan"),i>1||o>1)){for(c(e,"rowSpan",1),c(e,"colSpan",1),a=0;i-1>a;a++)H.insertAfter(p(e),e);h(r,t,o-1,i)}})})}function v(t,n,i){var o,s,u,f,p,h,v,y,b,C,x;if(t?(o=S(t),s=o.x,u=o.y,f=s+(n-1),p=u+(i-1)):(A=B=null,r(R,function(e,t){r(e,function(e,n){d(e)&&(A||(A={x:n,y:t}),B={x:n,y:t})})}),s=A.x,u=A.y,f=B.x,p=B.y),y=l(s,u),b=l(f,p),y&&b&&y.part==b.part){for(g(),a(),y=l(s,u).elm,c(y,"colSpan",f-s+1),c(y,"rowSpan",p-u+1),v=u;p>=v;v++)for(h=s;f>=h;h++)R[v]&&R[v][h]&&(t=R[v][h].elm,t!=y&&(C=e.grep(t.childNodes),r(C,function(e){y.appendChild(e)}),C.length&&(C=e.grep(y.childNodes),x=0,r(C,function(e){"BR"==e.nodeName&&H.getAttrib(e,"data-mce-bogus")&&x++<C.length-1&&y.removeChild(e)})),H.remove(t)));m()}}function y(e){var t,i,o,a,l,u,f,m,h;for(r(R,function(n,i){return r(n,function(n){return d(n)&&(n=n.elm,l=n.parentNode,u=s(l,!1),t=i,e)?!1:void 0}),e?!t:void 0}),a=0;a<R[0].length;a++)if(R[t][a]&&(i=R[t][a].elm,i!=o)){if(e){if(t>0&&R[t-1][a]&&(m=R[t-1][a].elm,h=n(m,"rowSpan"),h>1)){c(m,"rowSpan",h+1);continue}}else if(h=n(i,"rowspan"),h>1){c(i,"rowSpan",h+1);continue}f=p(i),c(f,"colSpan",i.colSpan),u.appendChild(f),o=i}u.hasChildNodes()&&(e?l.parentNode.insertBefore(u,l):H.insertAfter(u,l))}function b(e){var t,i;r(R,function(n){return r(n,function(n,r){return d(n)&&(t=r,e)?!1:void 0}),e?!t:void 0}),r(R,function(r,o){var a,s,l;r[t]&&(a=r[t].elm,a!=i&&(l=n(a,"colspan"),s=n(a,"rowspan"),1==l?e?(a.parentNode.insertBefore(p(a),a),h(t,o,s-1,l)):(H.insertAfter(p(a),a),h(t,o,s-1,l)):c(a,"colSpan",a.colSpan+1),i=a))})}function C(){var t=[];r(R,function(i){r(i,function(i,o){d(i)&&-1===e.inArray(t,o)&&(r(R,function(e){var t=e[o].elm,r;r=n(t,"colSpan"),r>1?c(t,"colSpan",r-1):H.remove(t)}),t.push(o))})}),m()}function x(){function e(e){var t,i,o;t=H.getNext(e,"tr"),r(e.cells,function(e){var t=n(e,"rowSpan");t>1&&(c(e,"rowSpan",t-1),i=S(e),h(i.x,i.y,1,1))}),i=S(e.cells[0]),r(R[i.y],function(e){var t;e=e.elm,e!=o&&(t=n(e,"rowSpan"),1>=t?H.remove(e):c(e,"rowSpan",t-1),o=e)})}var t;t=u(),r(t.reverse(),function(t){e(t)}),m()}function w(){var e=u();return H.remove(e),m(),e}function _(){var e=u();return r(e,function(t,n){e[n]=s(t,!0)}),e}function N(e,t){var n=u(),i=n[t?0:n.length-1],o=i.cells.length;e&&(r(R,function(e){var t;return o=0,r(e,function(e){e.real&&(o+=e.colspan),e.elm.parentNode==i&&(t=1)}),t?!1:void 0}),t||e.reverse(),r(e,function(e){var n,r=e.cells.length,a;for(n=0;r>n;n++)a=e.cells[n],c(a,"colSpan",1),c(a,"rowSpan",1);for(n=r;o>n;n++)e.appendChild(p(e.cells[r-1]));for(n=o;r>n;n++)H.remove(e.cells[n]);t?i.parentNode.insertBefore(e,i):H.insertAfter(e,i)}),H.removeClass(H.select("td.mce-item-selected,th.mce-item-selected"),"mce-item-selected"))}function S(e){var t;return r(R,function(n,i){return r(n,function(n,r){return n.elm==e?(t={x:r,y:i},!1):void 0}),!t}),t}function E(e){A=S(e)}function k(){var e,t;return e=t=0,r(R,function(n,i){r(n,function(n,r){var o,a;d(n)&&(n=R[i][r],r>e&&(e=r),i>t&&(t=i),n.real&&(o=n.colspan-1,a=n.rowspan-1,o&&r+o>e&&(e=r+o),a&&i+a>t&&(t=i+a)))})}),{x:e,y:t}}function T(e){var t,n,r,i,o,a,s,l,c,d;if(B=S(e),A&&B){for(t=Math.min(A.x,B.x),n=Math.min(A.y,B.y),r=Math.max(A.x,B.x),i=Math.max(A.y,B.y),o=r,a=i,d=n;a>=d;d++)e=R[d][t],e.real||t-(e.colspan-1)<t&&(t-=e.colspan-1);for(c=t;o>=c;c++)e=R[n][c],e.real||n-(e.rowspan-1)<n&&(n-=e.rowspan-1);for(d=n;i>=d;d++)for(c=t;r>=c;c++)e=R[d][c],e.real&&(s=e.colspan-1,l=e.rowspan-1,s&&c+s>o&&(o=c+s),l&&d+l>a&&(a=d+l));for(H.removeClass(H.select("td.mce-item-selected,th.mce-item-selected"),"mce-item-selected"),d=n;a>=d;d++)for(c=t;o>=c;c++)R[d][c]&&H.addClass(R[d][c].elm,"mce-item-selected")}}var R,A,B,P,M=i.selection,H=M.dom;o=o||H.getParent(M.getStart(),"table"),a(),P=H.getParent(M.getStart(),"th,td"),P&&(A=S(P),B=k(),P=l(A.x,A.y)),e.extend(this,{deleteTable:f,split:g,merge:v,insertRow:y,insertCol:b,deleteCols:C,deleteRows:x,cutRows:w,copyRows:_,pasteRows:N,getPos:S,setStartCell:E,setEndCell:T})}}),r(u,[f,d,c],function(e,t,n){function r(e,t){return parseInt(e.getAttribute(t)||1,10)}var i=n.each;return function(n){function o(){function t(t){function o(e,r){var i=e?"previousSibling":"nextSibling",o=n.dom.getParent(r,"tr"),s=o[i];if(s)return g(n,r,s,e),t.preventDefault(),!0;var d=n.dom.getParent(o,"table"),u=o.parentNode,f=u.nodeName.toLowerCase();if("tbody"===f||f===(e?"tfoot":"thead")){var p=a(e,d,u,"tbody");if(null!==p)return l(e,p,r)}return c(e,o,i,d)}function a(e,t,r,i){var o=n.dom.select(">"+i,t),a=o.indexOf(r);if(e&&0===a||!e&&a===o.length-1)return s(e,t);if(-1===a){var l="thead"===r.tagName.toLowerCase()?0:o.length-1;return o[l]}return o[a+(e?-1:1)]}function s(e,t){var r=e?"thead":"tfoot",i=n.dom.select(">"+r,t);return 0!==i.length?i[0]:null}function l(e,r,i){var o=d(r,e);return o&&g(n,i,o,e),t.preventDefault(),!0}function c(e,r,i,a){var s=a[i];if(s)return u(s),!0;var l=n.dom.getParent(a,"td,th");if(l)return o(e,l,t);var c=d(r,!e);return u(c),t.preventDefault(),!1}function d(e,t){var r=e&&e[t?"lastChild":"firstChild"];return r&&"BR"===r.nodeName?n.dom.getParent(r,"td,th"):r}function u(e){n.selection.setCursorLocation(e,0)}function f(){return b==e.UP||b==e.DOWN}function p(e){var t=e.selection.getNode(),n=e.dom.getParent(t,"tr");return null!==n}function m(e){for(var t=0,n=e;n.previousSibling;)n=n.previousSibling,t+=r(n,"colspan");return t}function h(e,t){var n=0,o=0;return i(e.children,function(e,i){return n+=r(e,"colspan"),o=i,n>t?!1:void 0}),o}function g(e,t,r,i){var o=m(n.dom.getParent(t,"td,th")),a=h(r,o),s=r.childNodes[a],l=d(s,i);u(l||s)}function v(e){var t=n.selection.getNode(),r=n.dom.getParent(t,"td,th"),i=n.dom.getParent(e,"td,th");return r&&r!==i&&y(r,i)}function y(e,t){return n.dom.getParent(e,"TABLE")===n.dom.getParent(t,"TABLE")}var b=t.keyCode;if(f()&&p(n)){var C=n.selection.getNode();setTimeout(function(){v(C)&&o(!t.shiftKey&&b===e.UP,C,t)},0)}}n.on("KeyDown",function(e){t(e)})}function a(){function e(e,t){var n=t.ownerDocument,r=n.createRange(),i;return r.setStartBefore(t),r.setEnd(e.endContainer,e.endOffset),i=n.createElement("body"),i.appendChild(r.cloneContents()),0===i.innerHTML.replace(/<(br|img|object|embed|input|textarea)[^>]*>/gi,"-").replace(/<[^>]+>/g,"").length}n.on("KeyDown",function(t){var r,i,o=n.dom;(37==t.keyCode||38==t.keyCode)&&(r=n.selection.getRng(),i=o.getParent(r.startContainer,"table"),i&&n.getBody().firstChild==i&&e(r,i)&&(r=o.createRng(),r.setStartBefore(i),r.setEndBefore(i),n.selection.setRng(r),t.preventDefault()))})}function s(){n.on("KeyDown SetContent VisualAid",function(){var e;for(e=n.getBody().lastChild;e;e=e.previousSibling)if(3==e.nodeType){if(e.nodeValue.length>0)break}else if(1==e.nodeType&&!e.getAttribute("data-mce-bogus"))break;e&&"TABLE"==e.nodeName&&(n.settings.forced_root_block?n.dom.add(n.getBody(),n.settings.forced_root_block,null,t.ie?"&nbsp;":'<br data-mce-bogus="1" />'):n.dom.add(n.getBody(),"br",{"data-mce-bogus":"1"}))}),n.on("PreProcess",function(e){var t=e.node.lastChild;t&&("BR"==t.nodeName||1==t.childNodes.length&&("BR"==t.firstChild.nodeName||"\xa0"==t.firstChild.nodeValue))&&t.previousSibling&&"TABLE"==t.previousSibling.nodeName&&n.dom.remove(t)})}function l(){function e(e,t,n,r){var i=3,o=e.dom.getParent(t.startContainer,"TABLE"),a,s,l;return o&&(a=o.parentNode),s=t.startContainer.nodeType==i&&0===t.startOffset&&0===t.endOffset&&r&&("TR"==n.nodeName||n==a),l=("TD"==n.nodeName||"TH"==n.nodeName)&&!r,s||l}function t(){var t=n.selection.getRng(),r=n.selection.getNode(),i=n.dom.getParent(t.startContainer,"TD,TH");if(e(n,t,r,i)){i||(i=r);for(var o=i.lastChild;o.lastChild;)o=o.lastChild;t.setEnd(o,o.nodeValue.length),n.selection.setRng(t)}}n.on("KeyDown",function(){t()}),n.on("MouseDown",function(e){2!=e.button&&t()})}t.webkit&&(o(),l()),t.gecko&&(a(),s())}}),r(p,[l,m,c],function(e,t,n){return function(r){function i(){r.getBody().style.webkitUserSelect="",c&&(r.dom.removeClass(r.dom.select("td.mce-item-selected,th.mce-item-selected"),"mce-item-selected"),c=!1)}var o=r.dom,a,s,l,c=!0;return r.on("MouseDown",function(e){2!=e.button&&(i(),s=o.getParent(e.target,"td,th"),l=o.getParent(s,"table"))}),o.bind(r.getDoc(),"mouseover",function(t){var n,i,d=t.target;if(s&&(a||d!=s)&&("TD"==d.nodeName||"TH"==d.nodeName)){i=o.getParent(d,"table"),i==l&&(a||(a=new e(r,i),a.setStartCell(s),r.getBody().style.webkitUserSelect="none"),a.setEndCell(d),c=!0),n=r.selection.getSel();try{n.removeAllRanges?n.removeAllRanges():n.empty()}catch(u){}t.preventDefault()}}),r.on("MouseUp",function(){function e(e,r){var o=new t(e,e);do{if(3==e.nodeType&&0!==n.trim(e.nodeValue).length)return r?i.setStart(e,0):i.setEnd(e,e.nodeValue.length),void 0;if("BR"==e.nodeName)return r?i.setStartBefore(e):i.setEndBefore(e),void 0}while(e=r?o.next():o.prev())}var i,c=r.selection,d,u,f,p,m;if(s){if(a&&(r.getBody().style.webkitUserSelect=""),d=o.select("td.mce-item-selected,th.mce-item-selected"),d.length>0){i=o.createRng(),f=d[0],m=d[d.length-1],i.setStartBefore(f),i.setEndAfter(f),e(f,1),u=new t(f,o.getParent(d[0],"table"));do if("TD"==f.nodeName||"TH"==f.nodeName){if(!o.hasClass(f,"mce-item-selected"))break;p=f}while(f=u.next());e(p),c.setRng(i)}r.nodeChanged(),s=a=l=null}}),r.on("KeyUp",function(){i()}),{clear:i}}}),r(h,[l,u,p,c,m,d,g],function(e,t,n,r,i,o,a){function s(r){function i(e){return e?e.replace(/px$/,""):""}function a(e){return/^[0-9]+$/.test(e)&&(e+="px"),e}function s(e){l("left center right".split(" "),function(t){r.formatter.remove("align"+t,{},e)})}function c(){var e=r.dom,t,n,c;t=r.dom.getParent(r.selection.getStart(),"table"),c=!1,n={width:i(e.getStyle(t,"width")||e.getAttrib(t,"width")),height:i(e.getStyle(t,"height")||e.getAttrib(t,"height")),cellspacing:e.getAttrib(t,"cellspacing"),cellpadding:e.getAttrib(t,"cellpadding"),border:e.getAttrib(t,"border"),caption:!!e.select("caption",t)[0]},l("left center right".split(" "),function(e){r.formatter.matchNode(t,"align"+e)&&(n.align=e)}),r.windowManager.open({title:"Table properties",items:{type:"form",layout:"grid",columns:2,data:n,defaults:{type:"textbox",maxWidth:50},items:[c?{label:"Cols",name:"cols",disabled:!0}:null,c?{label:"Rows",name:"rows",disabled:!0}:null,{label:"Width",name:"width"},{label:"Height",name:"height"},{label:"Cell spacing",name:"cellspacing"},{label:"Cell padding",name:"cellpadding"},{label:"Border",name:"border"},{label:"Caption",name:"caption",type:"checkbox"},{label:"Alignment",minWidth:90,name:"align",type:"listbox",text:"None",maxWidth:null,values:[{text:"None",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]}]},onsubmit:function(){var n=this.toJSON(),i;r.undoManager.transact(function(){r.dom.setAttribs(t,{cellspacing:n.cellspacing,cellpadding:n.cellpadding,border:n.border}),r.dom.setStyles(t,{width:a(n.width),height:a(n.height)}),i=e.select("caption",t)[0],i&&!n.caption&&e.remove(i),!i&&n.caption&&(i=e.create("caption"),o.ie||(i.innerHTML='<br data-mce-bogus="1"/>'),t.insertBefore(i,t.firstChild)),s(t),n.align&&r.formatter.apply("align"+n.align,{},t),r.focus(),r.addVisual()})}})}function d(e,t){r.windowManager.open({title:"Merge cells",body:[{label:"Cols",name:"cols",type:"textbox",size:10},{label:"Rows",name:"rows",type:"textbox",size:10}],onsubmit:function(){var n=this.toJSON();r.undoManager.transact(function(){e.merge(t,n.cols,n.rows)})}})}function u(){var e=r.dom,t,n,o=[];o=r.dom.select("td.mce-item-selected,th.mce-item-selected"),t=r.dom.getParent(r.selection.getStart(),"td,th"),!o.length&&t&&o.push(t),t=t||o[0],n={width:i(e.getStyle(t,"width")||e.getAttrib(t,"width")),height:i(e.getStyle(t,"height")||e.getAttrib(t,"height")),scope:e.getAttrib(t,"scope")},n.type=t.nodeName.toLowerCase(),l("left center right".split(" "),function(e){r.formatter.matchNode(t,"align"+e)&&(n.align=e)}),r.windowManager.open({title:"Cell properties",items:{type:"form",data:n,layout:"grid",columns:2,defaults:{type:"textbox",maxWidth:50},items:[{label:"Width",name:"width"},{label:"Height",name:"height"},{label:"Cell type",name:"type",type:"listbox",text:"None",minWidth:90,maxWidth:null,menu:[{text:"Cell",value:"td"},{text:"Header cell",value:"th"}]},{label:"Scope",name:"scope",type:"listbox",text:"None",minWidth:90,maxWidth:null,menu:[{text:"None",value:""},{text:"Row",value:"row"},{text:"Column",value:"col"},{text:"Row group",value:"rowgroup"},{text:"Column group",value:"colgroup"}]},{label:"Alignment",name:"align",type:"listbox",text:"None",minWidth:90,maxWidth:null,values:[{text:"None",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]}]},onsubmit:function(){var t=this.toJSON();r.undoManager.transact(function(){l(o,function(n){r.dom.setAttrib(n,"scope",t.scope),r.dom.setStyles(n,{width:a(t.width),height:a(t.height)}),t.type&&n.nodeName.toLowerCase()!=t.type&&(n=e.rename(n,t.type)),s(n),t.align&&r.formatter.apply("align"+t.align,{},n)}),r.focus()})}})}function f(){var e=r.dom,t,n,o,c,d=[];t=r.dom.getParent(r.selection.getStart(),"table"),n=r.dom.getParent(r.selection.getStart(),"td,th"),l(t.rows,function(t){l(t.cells,function(r){return e.hasClass(r,"mce-item-selected")||r==n?(d.push(t),!1):void 0})}),o=d[0],c={height:i(e.getStyle(o,"height")||e.getAttrib(o,"height")),scope:e.getAttrib(o,"scope")},c.type=o.parentNode.nodeName.toLowerCase(),l("left center right".split(" "),function(e){r.formatter.matchNode(o,"align"+e)&&(c.align=e)}),r.windowManager.open({title:"Row properties",items:{type:"form",data:c,columns:2,defaults:{type:"textbox"},items:[{type:"listbox",name:"type",label:"Row type",text:"None",maxWidth:null,menu:[{text:"Header",value:"thead"},{text:"Body",value:"tbody"},{text:"Footer",value:"tfoot"}]},{type:"listbox",name:"align",label:"Alignment",text:"None",maxWidth:null,menu:[{text:"None",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]},{label:"Height",name:"height"}]},onsubmit:function(){var t=this.toJSON(),n,i,o;r.undoManager.transact(function(){var c=t.type;l(d,function(l){r.dom.setAttrib(l,"scope",t.scope),r.dom.setStyles(l,{height:a(t.height)}),c!=l.parentNode.nodeName.toLowerCase()&&(n=e.getParent(l,"table"),i=l.parentNode,o=e.select(c,n)[0],o||(o=e.create(c),n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o)),o.appendChild(l),i.hasChildNodes()||e.remove(i)),s(l),t.align&&r.formatter.apply("align"+t.align,{},l)}),r.focus()})}})}function p(e){return function(){r.execCommand(e)}}function m(e,t){var n,i,a;for(a="<table><tbody>",n=0;t>n;n++){for(a+="<tr>",i=0;e>i;i++)a+="<td>"+(o.ie?" ":"<br>")+"</td>";a+="</tr>"}a+="</tbody></table>",r.insertContent(a)}function h(e,t){function n(){e.disabled(!r.dom.getParent(r.selection.getStart(),t)),r.selection.selectorChanged(t,function(t){e.disabled(!t)})}r.initialized?n():r.on("init",n)}function g(){h(this,"table")}function v(){h(this,"td,th")}function y(){var e="";e='<table role="presentation" class="mce-grid mce-grid-border">';for(var t=0;10>t;t++){e+="<tr>";for(var n=0;10>n;n++)e+='<td><a href="#" data-mce-index="'+n+","+t+'"></a></td>';e+="</tr>"}return e+="</table>",e+='<div class="mce-text-center">0 x 0</div>'}var b,C,x=this;r.addMenuItem("inserttable",{text:"Insert table",icon:"table",context:"table",onhide:function(){r.dom.removeClass(this.menu.items()[0].getEl().getElementsByTagName("a"),"mce-active")},menu:[{type:"container",html:y(),onmousemove:function(e){var t=e.target;if("A"==t.nodeName){var n=r.dom.getParent(t,"table"),i=t.getAttribute("data-mce-index");if(i!=this.lastPos){i=i.split(","),i[0]=parseInt(i[0],10),i[1]=parseInt(i[1],10);for(var o=0;10>o;o++)for(var a=0;10>a;a++)r.dom.toggleClass(n.rows[o].childNodes[a].firstChild,"mce-active",a<=i[0]&&o<=i[1]);n.nextSibling.innerHTML=i[0]+1+" x "+(i[1]+1),this.lastPos=i}}},onclick:function(e){"A"==e.target.nodeName&&this.lastPos&&(e.preventDefault(),m(this.lastPos[0]+1,this.lastPos[1]+1),this.parent().cancel())}}]}),r.addMenuItem("tableprops",{text:"Table properties",context:"table",onPostRender:g,onclick:c}),r.addMenuItem("deletetable",{text:"Delete table",context:"table",onPostRender:g,cmd:"mceTableDelete"}),r.addMenuItem("cell",{separator:"before",text:"Cell",context:"table",menu:[{text:"Cell properties",onclick:p("mceTableCellProps"),onPostRender:v},{text:"Merge cells",onclick:p("mceTableMergeCells"),onPostRender:v},{text:"Split cell",onclick:p("mceTableSplitCells"),onPostRender:v}]}),r.addMenuItem("row",{text:"Row",context:"table",menu:[{text:"Insert row before",onclick:p("mceTableInsertRowBefore"),onPostRender:v},{text:"Insert row after",onclick:p("mceTableInsertRowAfter"),onPostRender:v},{text:"Delete row",onclick:p("mceTableDeleteRow"),onPostRender:v},{text:"Row properties",onclick:p("mceTableRowProps"),onPostRender:v},{text:"-"},{text:"Cut row",onclick:p("mceTableCutRow"),onPostRender:v},{text:"Copy row",onclick:p("mceTableCopyRow"),onPostRender:v},{text:"Paste row before",onclick:p("mceTablePasteRowBefore"),onPostRender:v},{text:"Paste row after",onclick:p("mceTablePasteRowAfter"),onPostRender:v}]}),r.addMenuItem("column",{text:"Column",context:"table",menu:[{text:"Insert column before",onclick:p("mceTableInsertColBefore"),onPostRender:v},{text:"Insert column after",onclick:p("mceTableInsertColAfter"),onPostRender:v},{text:"Delete column",onclick:p("mceTableDeleteCol"),onPostRender:v}]});var w=[];l("inserttable tableprops deletetable | cell row column".split(" "),function(e){"|"==e?w.push({text:"-"}):w.push(r.menuItems[e])}),r.addButton("table",{type:"menubutton",title:"Table",menu:w}),o.isIE||r.on("click",function(e){e=e.target,"TABLE"===e.nodeName&&(r.selection.select(e),r.nodeChanged())}),x.quirks=new t(r),r.on("Init",function(){b=r.windowManager,x.cellSelection=new n(r)}),l({mceTableSplitCells:function(e){e.split()},mceTableMergeCells:function(e){var t,n,i;i=r.dom.getParent(r.selection.getStart(),"th,td"),i&&(t=i.rowSpan,n=i.colSpan),r.dom.select("td.mce-item-selected,th.mce-item-selected").length?e.merge():d(e,i)},mceTableInsertRowBefore:function(e){e.insertRow(!0)},mceTableInsertRowAfter:function(e){e.insertRow()},mceTableInsertColBefore:function(e){e.insertCol(!0)},mceTableInsertColAfter:function(e){e.insertCol()},mceTableDeleteCol:function(e){e.deleteCols()},mceTableDeleteRow:function(e){e.deleteRows()},mceTableCutRow:function(e){C=e.cutRows()},mceTableCopyRow:function(e){C=e.copyRows()},mceTablePasteRowBefore:function(e){e.pasteRows(C,!0)},mceTablePasteRowAfter:function(e){e.pasteRows(C)},mceTableDelete:function(e){e.deleteTable()}},function(t,n){r.addCommand(n,function(){var n=new e(r);n&&(t(n),r.execCommand("mceRepaint"),x.cellSelection.clear())})}),l({mceInsertTable:function(){c()},mceTableRowProps:f,mceTableCellProps:u},function(e,t){r.addCommand(t,function(t,n){e(n)})})}var l=r.each;a.add("table",s)}),a([l,u,p,h])}(this);