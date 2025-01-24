(()=>{"use strict";var e={62702:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>r});var s=a(83510),o=e([s]);s=(o.then?(await o)():o)[0];const r={name:"app",components:{TheBody:s.A}};n()}catch(r){n(r)}}))},56272:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>c});var s=a(56768),o=a(15937),r=a(30593),u=e([o,r]);[o,r]=u.then?(await u)():u;var i={id:"TheBody-root",class:"root"};const c={__name:"TheBody",setup:function(e){return function(e,t){return(0,s.uX)(),(0,s.CE)("div",i,[(0,s.bF)(o.A),(0,s.bF)(r.A)])}}};n()}catch(c){n(c)}}))},81945:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>r});a(50113),a(26099);var s=a(73651),o=e([s]);s=(o.then?(await o)():o)[0];const r={name:"the main",data:function(){return{sizeControllers:{isSmall:!1,isMedium:!1,isLarge:!1},smallRoutes:[s.q.aboutViewRoute,s.q.accountAccessRoute,s.q.accountCreationRoute],mediumRoutes:[],largeRoutes:[s.q.widgetsRoute]}},methods:{setSize:function(e){this.disableSizeClasses(),void 0!=this.smallRoutes.find((function(t){return t==e}))?(console.log("--------------\n Small Route \n--------------"),this.sizeControllers.isSmall=!0):void 0!=this.mediumRoutes.find((function(t){return t==e}))?(console.log("--------------\n Medium Route \n--------------"),this.sizeControllers.isMedium=!0):void 0!=this.largeRoutes.find((function(t){return t==e}))&&(console.log("--------------\n Large Route \n--------------"),this.sizeControllers.isLarge=!0)},disableSizeClasses:function(){this.sizeControllers.isSmall=!1,this.sizeControllers.isMedium=!1,this.sizeControllers.isLarge=!1}},mounted:function(){var e=this;s.A.afterEach((function(t,a){e.setSize(t.fullPath)}))}};n()}catch(r){n(r)}}))},25747:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>v});var s=a(56768),o=a(90144),r=a(24232),u=a(73651),i=a(64783),c=a(2319),d=e([u]);u=(d.then?(await d)():d)[0];var l={id:"TheNav-root",class:"root"},h={class:"flex row center"},f=["href"],p={class:"flex row center",v:""};const v={__name:"TheNav",setup:function(e){var t=(0,i.k)(),a=(0,c.bP)(t),n=a.signedIn;return function(e,a){var i=(0,s.g2)("RouterLink");return(0,s.uX)(),(0,s.CE)("div",l,[a[6]||(a[6]=(0,s.Lk)("div",null,null,-1)),(0,s.Lk)("div",h,[(0,s.bF)(i,{class:"link",to:(0,o.R1)(u.q).widgetsRoute},{default:(0,s.k6)((function(){return a[2]||(a[2]=[(0,s.eW)("Widgets")])})),_:1},8,["to"]),(0,s.bF)(i,{class:"link",to:(0,o.R1)(u.q).accountAccessRoute},{default:(0,s.k6)((function(){return a[3]||(a[3]=[(0,s.eW)("Sign In")])})),_:1},8,["to"]),(0,s.bF)(i,{class:"link",to:(0,o.R1)(u.q).accountCreationRoute},{default:(0,s.k6)((function(){return a[4]||(a[4]=[(0,s.eW)("Create Account")])})),_:1},8,["to"]),(0,s.bF)(i,{class:"link",to:(0,o.R1)(u.q).aboutViewRoute},{default:(0,s.k6)((function(){return a[5]||(a[5]=[(0,s.eW)("About")])})),_:1},8,["to"]),(0,s.Lk)("a",{href:(0,o.R1)(u.q).documentationRoute},"Documentation",8,f),(0,s.Lk)("button",{onClick:a[0]||(a[0]=function(e){return(0,o.R1)(t).toggleSignedIn()}),id:"test-sign-in-toggle"},"Toggle")]),(0,s.Lk)("div",p,[(0,o.R1)(n)?((0,s.uX)(),(0,s.CE)("button",{key:0,onClick:a[1]||(a[1]=function(e){return(0,o.R1)(t).toggleSignedIn()}),id:"user-widget"},(0,r.v_)((0,o.R1)(t).username),1)):(0,s.Q3)("",!0)])])}}};n()}catch(v){n(v)}}))},53631:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>c});a(79432),a(26099);var s=a(15937),o=a(73651),r=a(85818),u=a(64783),i=e([s,o]);[s,o]=i.then?(await i)():i;const c={name:"account access form",components:{TopNav:s.A},data:function(){return{userData:{},showStatusMessage:!1,submissionSuccess:!1,accountCreationRoute:o.q.accountCreationRoute,userStore:{}}},methods:{accessUser:function(){var e=this;this.showStatusMessage=!0;var t=new FormData;t.append("username",this.username),t.append("userPassword",this.userPassword),r.A.post(o.q.accountAccessRoute,{username:this.username,userPassword:this.userPassword},{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.submissionSuccess=!0,e.$refs.statusMessage.innerHTML=t.data.statusMessage,200==t.status&&(e.userData=t.data.userData,e.showStatusMessage=!1,e.userStore.toggleSignedIn(),e.userStore.addUserData(e.userData))}))["catch"]((function(t){void 0!=t&&(console.log("Error keys: "+Object.keys(t)),404==t.status?e.$refs.statusMessage.innerHTML="Failed to connect to the server":e.$refs.statusMessage.innerHTML=t.response.data.statusMessage,e.submissionSuccess=!1)}))["finally"]()}},created:function(){this.userStore=(0,u.k)()}};n()}catch(c){n(c)}}))},12562:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>i});a(26099);var s=a(15937),o=a(73651),r=a(85818),u=e([s,o]);[s,o]=u.then?(await u)():u;const i={name:"account creation form",components:{TopNav:s.A},data:function(){return{submitted:!1,LOADING_MESSAGE:"Loading...",accountAccessRoute:o.q.accountAccessRoute}},methods:{createUser:function(){var e=this;this.submitted=!0;var t=new FormData;t.append("username",this.username),t.append("userPassword",this.userPassword),r.A.post(o.q.accountCreationRoute,{username:this.username,userPassword:this.userPassword},{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.$refs.statusMessage.innerHTML=t.data.statusMessage}))["catch"]((function(t){e.$refs.statusMessage.innerHTML=t.response.data.statusMessage}))["finally"]()}}};n()}catch(i){n(i)}}))},95826:(e,t,a)=>{a.d(t,{X:()=>o});var n=a(56768),s=a(24232);function o(e,t,a,o,r,u){var i=(0,n.g2)("RouterView");return(0,n.uX)(),(0,n.CE)("div",{id:"TheMain-root",class:(0,s.C4)({small:r.sizeControllers.isSmall,medium:r.sizeControllers.isMedium,large:r.sizeControllers.isLarge})},[(0,n.bF)(i)],2)}},85818:(e,t,a)=>{a.d(t,{A:()=>s});var n=a(51003);const s=n.A.create({baseURL:"http://localhost:3000"})},76751:(e,t,a)=>{a.a(e,(async(e,t)=>{try{a(23792),a(3362),a(69085),a(9391);var n=a(45130),s=a(2319),o=a(73651),r=a(59346),u=e([o,r]);[o,r]=u.then?(await u)():u;var i=(0,s.Ey)();(0,n.Ef)(r.A).use(o.A).use(i).mount("#app"),t()}catch(c){t(c)}}))},73651:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>f,q:()=>d});var s=a(81387),o=a(69757),r=a(43120),u=a(77692),i=a(80039),c=e([o,r]);[o,r]=c.then?(await c)():c;var d=await{accountAccessRoute:"/users/access",accountCreationRoute:"/users/create",aboutViewRoute:"/",widgetsRoute:"/widgets",documentationRoute:"/documentation"},l=[{path:d.widgetsRoute,component:i.A},{path:d.accountAccessRoute,component:o.A},{path:d.accountCreationRoute,component:r.A},{path:d.aboutViewRoute,component:u.A}],h=(0,s.aE)({history:(0,s.LA)(),routes:l});const f=h;n()}catch(f){n(f)}}),1)},64783:(e,t,a)=>{a.d(t,{k:()=>o});var n=a(54119),s=(a(79432),a(2319)),o=(0,s.nY)("user",{state:function(){return{signedIn:!1,data:void 0}},actions:{toggleSignedIn:function(){this.signedIn=!this.signedIn},addUserData:function(e){"object"==(0,n.A)(e)&&(this.data=e),console.log("New Data Keys: "+Object.keys(this.data))},removeUserData:function(){this.data=void 0}},getters:{username:function(e){return void 0!=e.data?e.data.username:void 0}}})},59346:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>c});var s=a(43699),o=a(12687),r=(a(36585),a(71241)),u=e([o]);o=(u.then?(await u)():u)[0];const i=(0,r.A)(o.A,[["render",s.X],["__scopeId","data-v-58486740"]]),c=i;n()}catch(i){n(i)}}))},83510:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>i});var s=a(27299),o=(a(3595),a(71241)),r=e([s]);s=(r.then?(await r)():r)[0];const u=(0,o.A)(s.A,[["__scopeId","data-v-2308261f"]]),i=u;n()}catch(u){n(u)}}))},30593:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>c});var s=a(95826),o=a(41184),r=(a(53145),a(71241)),u=e([o]);o=(u.then?(await u)():u)[0];const i=(0,r.A)(o.A,[["render",s.X],["__scopeId","data-v-70718114"]]),c=i;n()}catch(i){n(i)}}))},15937:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>i});var s=a(28634),o=(a(67337),a(71241)),r=e([s]);s=(r.then?(await r)():r)[0];const u=(0,o.A)(s.A,[["__scopeId","data-v-63d6697f"]]),i=u;n()}catch(u){n(u)}}))},77692:(e,t,a)=>{a.d(t,{A:()=>c});var n=a(56768),s={id:"HomeView-root",class:"root"};function o(e,t,a,o,r,u){return(0,n.uX)(),(0,n.CE)("div",s,t[0]||(t[0]=[(0,n.Lk)("div",{class:"flex column"},[(0,n.Lk)("h1",null,"Factorio Production Calculator"),(0,n.Lk)("h2",null,"(User System Release)"),(0,n.Lk)("hr"),(0,n.Lk)("h3",null,"A web app created to aid users in designing their Factorio factories.")],-1)]))}const r={name:"home"};var u=a(71241);const i=(0,u.A)(r,[["render",o],["__scopeId","data-v-a6b8d05c"]]),c=i},69757:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>c});var s=a(3521),o=a(924),r=(a(19580),a(71241)),u=e([o]);o=(u.then?(await u)():u)[0];const i=(0,r.A)(o.A,[["render",s.X],["__scopeId","data-v-348de1f8"]]),c=i;n()}catch(i){n(i)}}))},43120:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>c});var s=a(75098),o=a(59449),r=(a(73528),a(71241)),u=e([o]);o=(u.then?(await u)():u)[0];const i=(0,r.A)(o.A,[["render",s.X],["__scopeId","data-v-5ccb508b"]]),c=i;n()}catch(i){n(i)}}))},80039:(e,t,a)=>{function n(e,t,a,n,s,o){return null}a.d(t,{A:()=>u});const s={};var o=a(71241);const r=(0,o.A)(s,[["render",n]]),u=r},36585:()=>{},3595:()=>{},53145:()=>{},67337:()=>{},19580:()=>{},73528:()=>{},12687:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>s.A});var s=a(62702),o=e([s]);s=(o.then?(await o)():o)[0],n()}catch(r){n(r)}}))},27299:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>s.A});var s=a(56272),o=e([s]);s=(o.then?(await o)():o)[0],n()}catch(r){n(r)}}))},41184:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>s.A});var s=a(81945),o=e([s]);s=(o.then?(await o)():o)[0],n()}catch(r){n(r)}}))},28634:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>s.A});var s=a(25747),o=e([s]);s=(o.then?(await o)():o)[0],n()}catch(r){n(r)}}))},924:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>s.A});var s=a(53631),o=e([s]);s=(o.then?(await o)():o)[0],n()}catch(r){n(r)}}))},59449:(e,t,a)=>{a.a(e,(async(e,n)=>{try{a.d(t,{A:()=>s.A});var s=a(12562),o=e([s]);s=(o.then?(await o)():o)[0],n()}catch(r){n(r)}}))},43699:(e,t,a)=>{a.d(t,{X:()=>o});var n=a(56768),s={id:"App-root",class:"root"};function o(e,t,a,o,r,u){var i=(0,n.g2)("TheBody");return(0,n.uX)(),(0,n.CE)("div",s,[(0,n.bF)(i)])}},3521:(e,t,a)=>{a.d(t,{X:()=>v});var n=a(56768),s=a(45130),o=a(24232),r={id:"AccountAccessView-root",class:"root"},u=["disabled"],i=["disabled"],c={id:"submit-container",class:"flex"},d={key:0,id:"submit",type:"submit",class:"x2"},l={ref:"statusMessage"},h={key:0,id:"create-account-pointer-container"},f={id:"create-account-pointer-link"},p={key:1,id:"current-user-pointer-container"};function v(e,t,a,v,m,b){var y=(0,n.g2)("RouterLink");return(0,n.uX)(),(0,n.CE)("div",r,[t[11]||(t[11]=(0,n.Lk)("h1",null,"Account Stuff",-1)),(0,n.Lk)("form",{id:"sign-in-form",onSubmit:t[3]||(t[3]=(0,s.D$)((function(){return b.accessUser&&b.accessUser.apply(b,arguments)}),["prevent"])),class:"flex column"},[(0,n.bo)((0,n.Lk)("input",{disabled:m.userStore.signedIn,type:"text",placeholder:"Username",id:"user-name","onUpdate:modelValue":t[0]||(t[0]=function(t){return e.username=t}),required:""},null,8,u),[[s.Jo,e.username]]),t[9]||(t[9]=(0,n.Lk)("br",null,null,-1)),(0,n.bo)((0,n.Lk)("input",{disabled:m.userStore.signedIn,type:"password",placeholder:"Password",id:"user-password","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.userPassword=t}),required:""},null,8,i),[[s.Jo,e.userPassword]]),t[10]||(t[10]=(0,n.Lk)("br",null,null,-1)),(0,n.Lk)("div",c,[t[4]||(t[4]=(0,n.Lk)("div",{class:"x3"},null,-1)),m.userStore.signedIn?(0,n.Q3)("",!0):((0,n.uX)(),(0,n.CE)("button",d,"Submit")),m.userStore.signedIn?((0,n.uX)(),(0,n.CE)("button",{key:1,onClick:t[2]||(t[2]=function(e){return m.userStore.toggleSignedIn()}),id:"logout-button"},"Log Out")):(0,n.Q3)("",!0),t[5]||(t[5]=(0,n.Lk)("div",{class:"x3"},null,-1))]),(0,n.bo)((0,n.Lk)("div",null,[(0,n.Lk)("p",l,"Loading...",512)],512),[[s.aG,m.showStatusMessage]]),m.userStore.signedIn?(0,n.Q3)("",!0):((0,n.uX)(),(0,n.CE)("div",h,[(0,n.Lk)("p",f,[t[7]||(t[7]=(0,n.eW)("Don't have an account? ")),(0,n.bF)(y,{to:m.accountCreationRoute},{default:(0,n.k6)((function(){return t[6]||(t[6]=[(0,n.eW)("Create One.")])})),_:1},8,["to"])]),t[8]||(t[8]=(0,n.Lk)("p",{id:"create-account-pointer"},"Creating an account allows you to store production vals. for up to three factories across sessions.",-1))])),m.userStore.signedIn?((0,n.uX)(),(0,n.CE)("div",p,[(0,n.Lk)("p",null,"User currently signed in: "+(0,o.v_)(m.userStore.username),1)])):(0,n.Q3)("",!0)],32),(0,n.bo)((0,n.Lk)("h2",null,"User Data:",512),[[s.aG,m.submissionSuccess]]),(0,n.bo)((0,n.Lk)("div",{style:{border:"solid black 2px"}},(0,o.v_)(m.userData),513),[[s.aG,m.submissionSuccess]])])}},75098:(e,t,a)=>{a.d(t,{X:()=>u});var n=a(56768),s=a(45130),o={id:"AccountCreationView-root",class:"root"},r={ref:"statusMessage"};function u(e,t,a,u,i,c){var d=(0,n.g2)("RouterLink");return(0,n.uX)(),(0,n.CE)("div",o,[t[9]||(t[9]=(0,n.Lk)("h1",null,"Account Stuff",-1)),(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,s.D$)((function(){return c.createUser&&c.createUser.apply(c,arguments)}),["prevent"])),class:"flex column"},[t[5]||(t[5]=(0,n.Lk)("p",null,"Creating an account allows you to store production values for up to three factories across sessions.",-1)),(0,n.bo)((0,n.Lk)("input",{type:"text",placeholder:"Username",id:"user-name","onUpdate:modelValue":t[0]||(t[0]=function(t){return e.username=t}),required:""},null,512),[[s.Jo,e.username]]),t[6]||(t[6]=(0,n.Lk)("br",null,null,-1)),(0,n.bo)((0,n.Lk)("input",{type:"password",placeholder:"Password",id:"user-password","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.userPassword=t}),required:""},null,512),[[s.Jo,e.userPassword]]),t[7]||(t[7]=(0,n.Lk)("br",null,null,-1)),t[8]||(t[8]=(0,n.Lk)("div",{class:"flex"},[(0,n.Lk)("div",{class:"x3"}),(0,n.Lk)("button",{id:"submit",type:"submit",class:"x2"},"Submit"),(0,n.Lk)("div",{class:"x3"})],-1)),(0,n.bo)((0,n.Lk)("div",null,[(0,n.Lk)("p",r,"Loading...",512)],512),[[s.aG,i.submitted]]),(0,n.Lk)("div",null,[(0,n.Lk)("p",null,[t[4]||(t[4]=(0,n.eW)("Already have an account? ")),(0,n.bF)(d,{to:i.accountAccessRoute},{default:(0,n.k6)((function(){return t[3]||(t[3]=[(0,n.eW)("Log In.")])})),_:1},8,["to"])])])],32)])}}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,a),o.exports}a.m=e,(()=>{var e="function"===typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"===typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"===typeof Symbol?Symbol("webpack error"):"__webpack_error__",s=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o=a=>a.map((a=>{if(null!==a&&"object"===typeof a){if(a[e])return a;if(a.then){var o=[];o.d=0,a.then((e=>{r[t]=e,s(o)}),(e=>{r[n]=e,s(o)}));var r={};return r[e]=e=>e(o),r}}var u={};return u[e]=e=>{},u[t]=a,u}));a.a=(a,r,u)=>{var i;u&&((i=[]).d=-1);var c,d,l,h=new Set,f=a.exports,p=new Promise(((e,t)=>{l=t,d=e}));p[t]=f,p[e]=e=>(i&&e(i),h.forEach(e),p["catch"]((e=>{}))),a.exports=p,r((a=>{var s;c=o(a);var r=()=>c.map((e=>{if(e[n])throw e[n];return e[t]})),u=new Promise((t=>{s=()=>t(r),s.r=0;var a=e=>e!==i&&!h.has(e)&&(h.add(e),e&&!e.d&&(s.r++,e.push(s)));c.map((t=>t[e](a)))}));return s.r?u:r()}),(e=>(e?l(p[n]=e):d(f),s(i)))),i&&i.d<0&&(i.d=0)}})(),(()=>{var e=[];a.O=(t,n,s,o)=>{if(!n){var r=1/0;for(d=0;d<e.length;d++){for(var[n,s,o]=e[d],u=!0,i=0;i<n.length;i++)(!1&o||r>=o)&&Object.keys(a.O).every((e=>a.O[e](n[i])))?n.splice(i--,1):(u=!1,o<r&&(r=o));if(u){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,s,o]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{a.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{var e={524:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var s,o,[r,u,i]=n,c=0;if(r.some((t=>0!==e[t]))){for(s in u)a.o(u,s)&&(a.m[s]=u[s]);if(i)var d=i(a)}for(t&&t(n);c<r.length;c++)o=r[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},n=self["webpackChunkclient"]=self["webpackChunkclient"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=a.O(void 0,[504],(()=>a(76751)));n=a.O(n)})();
//# sourceMappingURL=app.0b20748d.js.map