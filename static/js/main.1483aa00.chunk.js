(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(32)},20:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),s=n.n(o),c=(n(20),n(2)),i=n(3),u=n(5),l=n(4),h=n(6),d=n(9),m=n(7),p=n.n(m),f=n(8),b=(n(24),n(13)),g=n(14),w=(n(26),/^\d+?\.media\.tumblr\.com$/),v=function(){var e;try{e=JSON.parse(localStorage.getItem("gfycatUrls")||"{}")}catch(n){e={}}var t=function(){var t=new Date;for(var n in e)e[n].expiresAt<=t&&delete e[n]};return{get:function(){var n=Object(f.a)(p.a.mark(function n(a){var r,o;return p.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t(),a in e){n.next=9;break}return n.next=4,fetch("https://api.gfycat.com/v1/gfycats/".concat(a));case 4:return r=n.sent,n.next=7,r.json();case 7:o=n.sent,e[a]={url:o.gfyItem.webmUrl||o.gfyItem.mp4Url||o.gfyItem.gifUrl,expiresAt:(new Date).getTime()+864e5};case 9:return localStorage.setItem("gfycatUrls",JSON.stringify(e)),n.abrupt("return",e[a].url);case 11:case"end":return n.stop()}},n,this)}));return function(e){return n.apply(this,arguments)}}()}}(),y=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={webmUrl:null},v.get(e.url.pathname.split("/").pop()).then(function(e){return n.setState({webmUrl:e})}).catch(function(e){return console.error(e)}),n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("video",{autoPlay:!0,loop:!0,controls:!0,src:this.state.webmUrl,muted:this.props.muted})}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).imgLoaded=function(){return n.setState({loading:!1})},n.state={loading:!0},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.src,n=e.title,a=Object(g.a)(e,["src","title"]);return r.a.createElement("iframe",Object.assign({className:this.state.loading?"iframe-loading":"",onLoad:this.imgLoaded,title:n,src:t,frameBorder:"0",scrolling:"no"},a))}}]),t}(a.Component),k=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).imgLoaded=function(){return n.setState({loading:!1})},n.imgErrored=function(){return n.setState({loading:!1,error:!0})},n.state={loading:!0,error:!1},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.loading?"loading":this.state.error?"error":"";return r.a.createElement("img",{className:e,alt:"",src:this.props.url.href,onLoad:this.imgLoaded,onError:this.imgErrored,style:{objectFit:"contain"}})}}]),t}(a.Component),O=function(e){var t,n,a=e.url,o=e.muted;switch(!0){case"i.imgur.com"===a.host||"imgur.com"===a.host:if("/a/"===a.pathname.slice(0,3)){t="imgur",n=a.protocol+"//imgur.com"+a.pathname.replace(".jpg","")+"/embed?pub=true";break}a.pathname.includes(".")||(a.pathname+=".jpg");case"i.redd.it"===a.host:case w.test(a.host):return r.a.createElement(k,{url:a});case"gfycat.com"===a.host:return r.a.createElement(y,{url:a,muted:o});case"www.xvideos.com"===a.host:t="xvideos",n=a.origin+"/embedframe/"+a.pathname.match(/\/video(\d+)\//)[1];break;case a.host.endsWith(".pornhub.com")||a.host.endsWith(".pornhub.org"):t="pornhub",n="https://www.pornhub.com/embed/"+a.searchParams.get("viewkey");break;case"xhamster.com"===a.host:t="xhamster",n=a.origin+"/embed/"+a.pathname.split("/")[2];break;case"www.hentai-foundry.com"===a.host:var s=a.pathname.match(/^\/pictures\/user\/(.*)\/(.*)\//).slice(1),c=Object(b.a)(s,2),i=c[0],u=c[1],l=["https://pictures.hentai-foundry.com",i[0].toLowerCase(),i,u].join("/");return r.a.createElement("div",{className:"img",style:{backgroundImage:["png","jpg"].map(function(e){return"url(".concat(l,".").concat(e,")")}).join(",")}});default:t="default",n=a.href}return r.a.createElement(j,{src:n,title:t})};function E(e){var t=e.post,n=e.style,a=e.muted,o=t.url,s=t.permalink;console.log(o);var c=new URL(o);return r.a.createElement("div",{key:o,className:"item-container",style:n},r.a.createElement("div",{style:{flexGrow:0,flexShrink:0,paddingTop:0,color:"white"}},r.a.createElement("a",{href:c,target:"_blank",rel:"noopener noreferrer"},"Source")," ",r.a.createElement("a",{href:"https://www.reddit.com"+s,target:"_blank",rel:"noopener noreferrer"},"Reddit")),r.a.createElement(O,{url:c,muted:a}))}n(28);var x,S=n(12),L=function(e){e&&(e.requestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullScreen||e.webkitEnterFullScreen||function(){return null}).bind(e)()},C=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={pos:0,muted:!0},n.handleKeys=function(e){if(!(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)){var t=document.querySelector(".item-container > video");switch(e.code){case"ArrowLeft":case"KeyA":return n.prev();case"ArrowRight":case"KeyD":return n.next();case"KeyF":return void(t&&L(t));case"Space":return void(t&&(t.paused?t.play():t.pause()));default:return}}},n.next=function(){n.state.pos<n.props.posts.length&&n.setState(function(e,t){var n=e.pos;return{pos:n<t.posts.length?n+1:n}},function(){n.state.pos===n.props.posts.length-1&&n.props.onLastReach()})},n.prev=function(){n.setState(function(e){var t=e.pos;return{pos:Math.max(t-1,0)}})},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.handleKeys)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.handleKeys)}},{key:"render",value:function(){var e=this,t=this.state.pos,n=this.props.posts;return r.a.createElement(S.a,{className:"viewer-container",onSwipedLeft:function(){e.next()},onSwipedRight:function(){e.prev()}},r.a.createElement("div",{className:"button-container"},r.a.createElement("button",{disabled:0===t,onClick:this.prev},"Previous"),r.a.createElement("input",{id:"mute",type:"checkbox",checked:!this.state.muted,onChange:function(t){e.setState({muted:!t.target.checked})}})," ",r.a.createElement("label",{for:"mute"},"Sound"),r.a.createElement("button",{disabled:t===n.length-1,onClick:this.next},"Next")),r.a.createElement(E,{post:n[t],muted:this.state.muted}))}}]),t}(a.Component),R=(x=C,function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={subreddit:null,sort:null,duration:null,posts:[],links:[],isHome:!0,loading:!0},n.handleHashChange=Object(f.a)(p.a.mark(function e(){var t,a,r,o,s,c,i,u;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.location.hash,a=t.match(/^#\/r\/([0-9a-zA-Z_\+]+)\/?(\/[a-z]+)?\/?(\/[a-z]+)?\/?$/)){e.next=9;break}if(n.setState({isHome:!0}),""===t){e.next=7;break}return window.location.hash="",e.abrupt("return");case 7:e.next=22;break;case 9:return n.setState({isHome:!1,loading:!0}),r=a[1],o=a[2]&&a[2].substr(1)||"hot",s=a[3]&&a[3].substr(1)||"day",e.next=15,fetch("https://www.reddit.com/r/".concat(r,"/").concat(o,".json?t=").concat(s));case 15:return c=e.sent,e.next=18,c.json();case 18:i=e.sent,u=i.data.children.map(function(e){return e.data}).filter(function(e){return!e.is_self}).filter(function(e){return!e.url.startsWith("https://www.reddit.com/")}),console.log(u),n.setState({subreddit:r,sort:o,duration:s,posts:u,loading:!1});case 22:case"end":return e.stop()}},e,this)})),n.handleLastReach=Object(f.a)(p.a.mark(function e(){var t,a,r,o,s,c,i,u,l;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.state,a=t.posts,r=t.subreddit,o=t.sort,s=t.duration,!(c=a&&a[a.length-1]&&a[a.length-1].name||null)){e.next=11;break}return e.next=5,fetch("https://www.reddit.com/r/".concat(r,"/").concat(o,".json?t=").concat(s,"?after=").concat(c));case 5:return i=e.sent,e.next=8,i.json();case 8:u=e.sent,l=u.data.children.map(function(e){return e.data}).filter(function(e){return!e.is_self}).filter(function(e){return!e.url.startsWith("https://www.reddit.com/")}),n.setState(function(e){var t=e.posts;return{posts:Object(d.a)(t).concat(Object(d.a)(l))}});case 11:case"end":return e.stop()}},e,this)})),n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.handleHashChange(),window.addEventListener("hashchange",this.handleHashChange)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("hashchange",this.handleHashChange)}},{key:"render",value:function(){return this.state.isHome?r.a.createElement("div",{style:{backgroundColor:"black",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("div",{style:{color:"white"}},"Welcome")):this.state.loading||0===this.state.posts.length?r.a.createElement("div",{style:{backgroundColor:"black",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("div",{style:{color:"white"}},"Loading, please wait...")):r.a.createElement(x,{onLastReach:this.handleLastReach.bind(this),posts:this.state.posts,subreddit:this.state.subreddit,sort:this.state.sort,duration:this.state.duration})}}]),t}(a.Component)),U=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(R,null)}}]),t}(a.Component);s.a.render(r.a.createElement(U,null),document.getElementById("root"))}},[[15,2,1]]]);
//# sourceMappingURL=main.1483aa00.chunk.js.map