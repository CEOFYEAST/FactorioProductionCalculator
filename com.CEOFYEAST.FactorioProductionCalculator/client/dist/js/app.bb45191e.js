(()=>{"use strict";var o={2121:(o,n,e)=>{e(3792),e(3362),e(9085),e(9391);var t=e(5130),a=e(6768),r={class:"root"};function i(o,n,e,t,i,l){var s=(0,a.g2)("TheNav"),u=(0,a.g2)("TheMain");return(0,a.uX)(),(0,a.CE)("div",r,[(0,a.bF)(s,{class:"flex center"},{default:(0,a.k6)((function(){return[(0,a.Lk)("button",{onClick:n[0]||(n[0]=function(){return l.toggleSignInModal&&l.toggleSignInModal.apply(l,arguments)})},"Sign In"),(0,a.Lk)("button",{onClick:n[1]||(n[1]=function(){return l.route&&l.route.apply(l,arguments)})},"Route")]})),_:1}),(0,a.bF)(u,{showSignInModal:i.showSignInModal,onToggleShowModal:l.toggleSignInModal},null,8,["showSignInModal","onToggleShowModal"])])}var l=e(4048),s=e(388),u={class:"root"};function d(o,n,e,t,r,i){return(0,a.uX)(),(0,a.CE)("div",u,[(0,a.Lk)("nav",null,[(0,a.RG)(o.$slots,"default",{},void 0,!0)])])}const c={name:"top nav"};var v=e(1241);const f=(0,v.A)(c,[["render",d],["__scopeId","data-v-1b19e62e"]]),p=f;var g={class:"root"};function h(o,n,e,t,r,i){var l=this,s=(0,a.g2)("SignInForm"),u=(0,a.g2)("ModalDialog");return(0,a.uX)(),(0,a.CE)("div",g,[(0,a.Lk)("main",null,[this.showSignInModal?((0,a.uX)(),(0,a.Wv)(u,{key:0,onToggleShowModal:n[0]||(n[0]=function(o){return l.$emit("toggleShowModal")})},{default:(0,a.k6)((function(){return[(0,a.bF)(s)]})),_:1})):(0,a.Q3)("",!0)])])}var m={class:"root"},b={align:"right"};function w(o,n,e,t,r,i){var l=this,s=(0,a.g2)("TopNav");return(0,a.uX)(),(0,a.CE)("div",m,[(0,a.Lk)("body",null,[(0,a.bF)(s,null,{default:(0,a.k6)((function(){return[(0,a.Lk)("div",b,[(0,a.Lk)("button",{id:"close-button",onClick:n[0]||(n[0]=function(o){return l.$emit("toggleShowModal")})},"X")])]})),_:1}),(0,a.Lk)("main",null,[(0,a.RG)(o.$slots,"default",{},void 0,!0)])])])}const y={name:"modal dialog",components:{TopNav:p}},S=(0,v.A)(y,[["render",w],["__scopeId","data-v-298e3d7b"]]),M=S;var k={class:"root"};function I(o,n,e,t,r,i){return(0,a.uX)(),(0,a.CE)("div",k,n[0]||(n[0]=[(0,a.Fv)('<form id="sign-in-form" class="flex column" data-v-45f08142><input type="email" placeholder="Email" id="user-email" name="userEmail" required data-v-45f08142><br data-v-45f08142><input type="password" placeholder="Password" id="user-password" name="userPassword" required data-v-45f08142><br data-v-45f08142><div id="submit-container" class="flex" data-v-45f08142><div class="x3" data-v-45f08142></div><button id="submit" type="submit" class="x2" data-v-45f08142>Submit</button><div class="x3" data-v-45f08142></div></div><div id="create-account-pointer-container" data-v-45f08142><p id="create-account-pointer-link" data-v-45f08142>Don&#39;t have an account? Create one.</p><p id="create-account-pointer" data-v-45f08142>Creating an account allows you to store production vals. for up to three factories across sessions.</p></div></form>',1)]))}const _={name:"sign in form",components:{TopNav:p}},x=(0,v.A)(_,[["render",I],["__scopeId","data-v-45f08142"]]),T=x,O={name:"the main",props:["showSignInModal"],components:{ModalDialog:M,SignInForm:T}},C=(0,v.A)(O,[["render",h],["__scopeId","data-v-a7edf0ea"]]),A=C;var E=e(1003);const j={name:"app",components:{TheNav:p,TheMain:A},data:function(){return{showSignInModal:!1}},methods:{toggleSignInModal:function(){this.showSignInModal=!this.showSignInModal},route:function(){return(0,s.A)((0,l.A)().mark((function o(){var n;return(0,l.A)().wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,E.A.get("http://localhost:5000/items");case 3:n=o.sent,console.log(n.data),o.next=10;break;case 7:o.prev=7,o.t0=o["catch"](0),console.error(o.t0);case 10:case"end":return o.stop()}}),o,null,[[0,7]])})))()}}},F=(0,v.A)(j,[["render",i]]),L=F;(0,t.Ef)(L).mount("#app")}},n={};function e(t){var a=n[t];if(void 0!==a)return a.exports;var r=n[t]={exports:{}};return o[t].call(r.exports,r,r.exports,e),r.exports}e.m=o,(()=>{var o=[];e.O=(n,t,a,r)=>{if(!t){var i=1/0;for(d=0;d<o.length;d++){for(var[t,a,r]=o[d],l=!0,s=0;s<t.length;s++)(!1&r||i>=r)&&Object.keys(e.O).every((o=>e.O[o](t[s])))?t.splice(s--,1):(l=!1,r<i&&(i=r));if(l){o.splice(d--,1);var u=a();void 0!==u&&(n=u)}}return n}r=r||0;for(var d=o.length;d>0&&o[d-1][2]>r;d--)o[d]=o[d-1];o[d]=[t,a,r]}})(),(()=>{e.n=o=>{var n=o&&o.__esModule?()=>o["default"]:()=>o;return e.d(n,{a:n}),n}})(),(()=>{e.d=(o,n)=>{for(var t in n)e.o(n,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:n[t]})}})(),(()=>{e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(o){if("object"===typeof window)return window}}()})(),(()=>{e.o=(o,n)=>Object.prototype.hasOwnProperty.call(o,n)})(),(()=>{e.r=o=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}})(),(()=>{var o={524:0};e.O.j=n=>0===o[n];var n=(n,t)=>{var a,r,[i,l,s]=t,u=0;if(i.some((n=>0!==o[n]))){for(a in l)e.o(l,a)&&(e.m[a]=l[a]);if(s)var d=s(e)}for(n&&n(t);u<i.length;u++)r=i[u],e.o(o,r)&&o[r]&&o[r][0](),o[r]=0;return e.O(d)},t=self["webpackChunkuser_system_prototype"]=self["webpackChunkuser_system_prototype"]||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var t=e.O(void 0,[504],(()=>e(2121)));t=e.O(t)})();
//# sourceMappingURL=app.bb45191e.js.map