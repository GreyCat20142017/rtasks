(window.webpackJsonprtasks=window.webpackJsonprtasks||[]).push([[0],{10:function(e,t,n){e.exports=n(26)},15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},20:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(6),c=n.n(r),o=(n(15),n(16),n(17),n(1)),m=13,u=27,i={MAIN:{title:"\u0433\u043b\u0430\u0432\u043d\u0430\u044f",component:null,comment:"\u0422\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0430 \u043d\u0430 \u043a\u043e\u0442\u0438\u043a\u0430\u0445. React (CRA), hooks, react-paginate, lodash, MDB"},TABLE:{title:"\u0442\u0430\u0431\u043b\u0438\u0446\u0430 \u0441 \u0434\u0430\u043d\u043d\u044b\u043c\u0438",component:"AppTable",comment:"\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445, \u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0430, \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u0446\u0438\u044f, \u043f\u0430\u0433\u0438\u043d\u0430\u0446\u0438\u044f, \u0432\u044b\u0432\u043e\u0434 \u0434\u0435\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u043f\u043e \u0441\u0442\u0440\u043e\u043a\u0435 \u0442\u0430\u0431\u043b\u0438\u0446\u044b."},SOME:{title:"\u0447\u0442\u043e-\u0442\u043e \u0435\u0449\u0435",component:"AppSome",comment:"\u0427\u0442\u043e-\u0442\u043e \u0431\u0443\u0434\u0435\u0442 \u043a\u043e\u0433\u0434\u0430-\u0442\u043e"}},s=[i.MAIN,i.TABLE,i.SOME],b={SMALL:{name:"20 \u0441\u043b\u043e\u0432",url:"https://greycat20142017.github.io/pseudodb/rtasks20.json",title:"\u0414\u0430\u043d\u043d\u044b\u0435 \u0438\u0437 \u0443\u0434\u0430\u043b\u0435\u043d\u043d\u043e\u0433\u043e \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0430. \u041c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b."},BIG:{name:"200 \u0441\u043b\u043e\u0432",url:"https://greycat20142017.github.io/pseudodb/rtasks200.json",title:"\u0414\u0430\u043d\u043d\u044b\u0435 \u0438\u0437 \u0443\u0434\u0430\u043b\u0435\u043d\u043d\u043e\u0433\u043e \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0430. \u041c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b."},TEST:{name:"\u0442\u0435\u0441\u0442",url:"/data/test.json",title:"\u0422\u0435\u0441\u0442\u043e\u0432\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0438\u0437 \u043f\u0430\u043f\u043a\u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f."}},d="asc",E="desc",p=n(3),h=n(2),f=n(7),g=n.n(f),k=(n(20),function(){return l.a.createElement("div",{className:"mx-auto"},l.a.createElement("img",{className:"loader",src:g.a,witdh:"80",height:"80",alt:"logo"}),l.a.createElement("small",{className:"mdb-color-text"},"\u0414\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u044e\u0442\u0441\u044f..."))}),v=n(9),y=n(8),N=n.n(y),j=function(e){var t=e.currentColumn,n=e.sortField,a=e.sortDirection,r=e.onDirectionChange,c=a===d?l.a.createElement("h5",{className:"font-weight-bold d-inline ml-2","aria-hidden":"true",onClick:r},"\u2191"):l.a.createElement("h5",{className:"font-weight-bold d-inline ml-2","aria-hidden":"true",onClick:r},"\u2193");return t===n?c:null},O=function(e){var t=e.row,n=e.ind,a=e.columns,r=e.onRowClick;return l.a.createElement("tr",{className:"cursor-pointer",key:n,title:"\u041a\u043b\u0438\u043a - \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0434\u0435\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438",onClick:function(){return r(t)}},a.map(function(e){return l.a.createElement("td",{key:e+n},t[e])}))},C=function(e){var t=e.data,n=e.onTableSort,a=Object(v.a)(e,["data","onTableSort"]),r=Array.isArray(t)&&t.length>0?Object.keys(t[0]):[],c=!(r.length>0&&t.length>0);return c?l.a.createElement("p",{className:"text-mdb-color py-2"},l.a.createElement("small",null,"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u0432\u044b\u0432\u043e\u0434\u0430 \u0432 \u0442\u0430\u0431\u043b\u0438\u0446\u0443")):l.a.createElement(l.a.Fragment,null,l.a.createElement("table",{className:"table table-sm table-striped table-bordered my-3",cellSpacing:"1",width:"100%",id:"idTable"},l.a.createElement("thead",null,l.a.createElement("tr",null,r.map(function(e){return l.a.createElement("th",{className:"th-sm font-weight-bold mdb-color text-white cursor-pointer",key:e+"th",onClick:function(){return n(e)}},e,l.a.createElement(j,Object.assign({currentColumn:e},a)))}))),l.a.createElement("tbody",null,t.map(function(e,t){return l.a.createElement(O,{key:t,row:e,ind:t,columns:r,onRowClick:a.onRowClick})}))),c||a.pageCount<2?null:l.a.createElement(N.a,{previousLabel:l.a.createElement("span",null,"\u21d0"),nextLabel:l.a.createElement("span",null,"\u21d2"),breakLabel:l.a.createElement("span",{className:"gap"},"..."),pageCount:a.pageCount,onPageChange:function(e){return a.onPageChange(e.selected)},forcePage:a.currentPage,containerClassName:"pagination",pageClassName:"page-item",pageLinkClassName:"page-link",previousLinkClassName:"page-link mdb-color-text",nextLinkClassName:"page-link mdb-color-text",disabledClassName:"disabled",activeClassName:"active"}))},w=function(e){var t=e.onFilterApply,n=Object(a.useState)(""),r=Object(o.a)(n,2),c=r[0],u=r[1];return l.a.createElement("div",{className:"md-form d-flex align-items-baseline my-1"},l.a.createElement("label",{htmlFor:"idFilter"},""===c.trim()?"\u0422\u0435\u043a\u0441\u0442 \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430":""),l.a.createElement("input",{className:"form-control",value:c,type:"text",id:"idFilter",onChange:function(e){return u(e.target.value)},onKeyDown:function(e){e.keyCode===m&&(e.preventDefault(),t(e.target.value))}}),l.a.createElement("div",{className:"btn-group",role:"group","aria-label":"\u0433\u0440\u0443\u043f\u043f\u0430 \u043a\u043d\u043e\u043f\u043e\u043a"},l.a.createElement("button",{className:"btn btn-mdb-color btn-sm",type:"button",onClick:function(){return t(c)},title:"\u0432\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a \u043f\u043e\u0434\u0441\u0442\u0440\u043e\u043a\u0438 \u0432\u043e \u0432\u0441\u0435\u0445 \u043f\u043e\u043b\u044f\u0445 \u0442\u0430\u0431\u043b\u0438\u0446\u044b"},"\u043f\u043e\u0438\u0441\u043a"),l.a.createElement("button",{className:"btn btn-mdb-color btn-sm ml-1",type:"button",onClick:function(){return u("")},title:"\u0441\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u043e\u0438\u0441\u043a\u0430"},"\u2718",l.a.createElement("span",{className:"visually-hidden"},"\u0441\u0431\u0440\u043e\u0441\u0438\u0442\u044c"))))},S=function(e){var t=e.details,n=e.unsetDetails,r=Object.keys(t),c=function(e){e.keyCode===u&&(e.preventDefault(),n())};return Object(a.useEffect)(function(){return document.addEventListener("keydown",c),function(){return document.removeEventListener("keydown",c)}}),t?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"mt-4 p-3 shadow-lg"},l.a.createElement("h5",{className:"text-center my-3"},"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438:"),l.a.createElement("table",{className:"table table-sm table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"th-sm font-weight-bold mdb-color text-white "},"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u043b\u044f"),l.a.createElement("th",{className:"th-sm font-weight-bold mdb-color text-white "},"\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435"))),l.a.createElement("tbody",null,r.map(function(e,n){return l.a.createElement("tr",{key:n},l.a.createElement("td",null,e),l.a.createElement("td",null,t[e]))}))),l.a.createElement("button",{className:"btn btn-sm btn-mdb-color",onClick:n,type:"button"},"\u043d\u0430\u0437\u0430\u0434"))):null},x=function(e,t,n,a){return Object(h.chunk)(e.filter(function(e){return t=e,n=a,Object.keys(t).reduce(function(e,a){return e||t[a].toLowerCase().includes(n.toLowerCase())},!1);var t,n}),10)},A=function(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),r=n[0],c=n[1],m=Object(a.useState)([]),u=Object(o.a)(m,2),i=u[0],s=u[1],f=Object(a.useState)(!1),g=Object(o.a)(f,2),v=g[0],y=g[1],N=Object(a.useState)(""),j=Object(o.a)(N,2),O=j[0],A=j[1],L=Object(a.useState)(0),F=Object(o.a)(L,2),T=F[0],D=F[1],B=Object(a.useState)(""),R=Object(o.a)(B,2),M=R[0],P=R[1],I=Object(a.useState)(d),J=Object(o.a)(I,2),W=J[0],G=J[1],K=Object(a.useState)(null),$=Object(o.a)(K,2),q=$[0],z=$[1],H=x(Object(p.a)(i),0,0,O),Q=function(){D(0),z(null),A(""),c(!1)};return l.a.createElement("div",null,l.a.createElement("h4",{className:"py-3 mdb-color-text"},"\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0441 \u0434\u0430\u043d\u043d\u044b\u043c\u0438 (AppTable)"),l.a.createElement("div",{className:"btn-group",role:"group","aria-label":"\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445"},Object.keys(b).map(function(e){return l.a.createElement("button",{className:"btn btn-sm btn-outline-mdb-color",key:e,onClick:function(){return function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];c(!0),y(!1),fetch(e).then(function(e){return e.json()}).then(function(e){if(!t){var n=e.content.length>0&&Object.keys(e.content[0]).length>0?Object.keys(e.content[0])[0]:"";s(Object(h.orderBy)(Object(p.a)(e.content),n,W)),y(!1),P(n),Q()}}).catch(function(e){t||(y(!0),s([]),Q())})}(b[e].url)},title:b[e].title},b[e].name)})),v?l.a.createElement("p",{className:"p-2 text-danger"},"\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u0434\u0430\u043d\u043d\u044b\u0445."):null,r?l.a.createElement(k,null):q?l.a.createElement(S,{details:q,unsetDetails:function(){return z(null)}}):l.a.createElement(l.a.Fragment,null,i.length>0?l.a.createElement(w,{onFilterApply:function(e){A(e),D(0)}}):null,l.a.createElement(C,{data:H.length>0?Object(h.orderBy)(Object(p.a)(H[T]),M,W):[],currentPage:T,onPageChange:function(e){return D(e)},pageCount:H.length,sortField:M,sortDirection:W,onTableSort:function(e){return P(e)},onDirectionChange:function(){return G(W===d?E:d)},onRowClick:function(e){return z(e)}})))},L=function(e){return l.a.createElement("div",null,l.a.createElement("h3",null,"AppSome"))},F=function(e){var t=null;switch(e.component){case i.SOME:t=l.a.createElement(L,null);break;case i.TABLE:t=l.a.createElement(A,null);break;default:t=l.a.createElement(l.a.Fragment,null,l.a.createElement("p",{className:"mt-3"},"\u041f\u0440\u043e\u0441\u0442\u043e \u043d\u0430\u0439\u0434\u0435\u043d\u043d\u044b\u0435 \u043d\u0430 \u043f\u0440\u043e\u0441\u0442\u043e\u0440\u0430\u0445 \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0430 \u0437\u0430\u0434\u0430\u043d\u0438\u044f \u043f\u043e React. "),l.a.createElement("p",null,"\u0411\u0435\u0437 \u043a\u0430\u043a\u043e\u0439-\u043b\u0438\u0431\u043e \u043e\u0431\u0449\u0435\u0439 \u0438\u0434\u0435\u0438 \u0438 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0439 \u0446\u0435\u043b\u0438."),l.a.createElement("p",null,"\u0418\u0441\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0432\u043d\u0435\u0441\u0435\u043d\u0438\u044f \u0440\u0430\u0437\u043d\u043e\u043e\u0431\u0440\u0430\u0437\u0438\u044f \u0432 \u0443\u0447\u0435\u0431\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438."))}return t};var T=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1];return l.a.createElement("div",{className:"container py-3"},l.a.createElement("div",{className:"col-12 col-md-8 mx-auto text-center"},l.a.createElement("header",null,l.a.createElement("h3",{className:"text-center"},"\u0420\u0430\u0437\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435\u043c React"),s.map(function(e,t){return l.a.createElement("button",{className:"btn btn-mdb-color"+(t===n?"active":""),key:t,type:"button",title:s[t].comment,onClick:function(){return r(t)}},s[t].title)}),l.a.createElement("hr",null),l.a.createElement("p",null,l.a.createElement("small",null,s[n].comment)),l.a.createElement("hr",null)),l.a.createElement("main",null,l.a.createElement(F,{component:s[n]}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,t,n){e.exports=n.p+"static/media/logo.0d9b647f.svg"}},[[10,1,2]]]);
//# sourceMappingURL=main.e1dec422.chunk.js.map