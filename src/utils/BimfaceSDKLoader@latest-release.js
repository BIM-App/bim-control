"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}!function(){var e=window.hostConfig||{APIHost:"https://api.bimface.com",resourceHost:"https://m.bimface.com",staticHost:"https://static.bimface.com",dataEnvType:"BIMFACE"};void 0===Object.assign&&(Object.assign=function(e){if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),a=1;a<arguments.length;a++){var n=arguments[a];if(void 0!==n&&null!==n)for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t});var t=Object.freeze({Release:"Release",Debug:"Debug"}),a=Object.freeze({Normal:"Normal",DrawingView:"drawingView"}),n=Object.freeze({BIMFACE:"BIMFACE",Local:"Local"}),i=Object.freeze({zh_CN:"zh_CN",en_GB:"en_GB",sv_SE:"sv_SE"}),o=Object.freeze({Normal:"Normal",Bake:"Bake"}),r=function(){if(window.hostConfig)for(var n in window.hostConfig)e[n]=window.hostConfig[n];return{staticHost:e.staticHost+"/api",APIHost:e.APIHost,language:"zh_CN",viewToken:null,configuration:t.Release,dataEnvType:e.dataEnvType||"BIMFACE",viewType:a.Normal,visualStyle:o.Bake,version:""}};window.BimfaceSDKLoaderConfig=r,window.BimfaceEnvOption=n,window.BimfaceLanguageOption=i,window.BimfaceConfigrationOption=t,window.BimfaceViewTypeOption=a;var s=function(e){var t=e.split("/");return t.pop(),t.join("/")+"/"},c=function(e){var a=Object.assign({},e),i="/Glodon";return e.path?(a.dataEnvType=n.Local,a.url=a.path,a.staticHost=a.sdkPath||s(a.path),a.resourcePath=s(a.path),a.path=s(a.path),i=a.sdkPath?"":"/jssdk"):e.resourcePath?(a.dataEnvType=n.Local,a.url=a.resourcePath,a.resourcePath=s(a.resourcePath)):a.url=e.APIHost+"/inside/databag?viewToken="+e.viewToken,a.staticHost+=i,e.build!=t.Debug&&a.configuration!=t.Release||(a.configuration=""),a.configuration=a.configuration?"-"+a.configuration.toLowerCase():"",a},u=function(e,t){for(var a=0;a<t.length;a++)t[a]=e+t[a]},d=function(e,t){return"drawingView"==e.renderType||t.viewType==a.DrawingView},f=function(e){var t=e.sdkVersion,a=e.options,n=a.configuration,i=[],o=["/"+t+"/"+a.language+".js","/"+t+"/Application"+n+".js"];return i=d(e.metadata,e.options)?[].concat(_toConsumableArray(i),o,["/"+t+"/Drawing.css","/"+t+"/bimface.bufferfly.js","/"+t+"/Drawing"+n+".js"]):[].concat(_toConsumableArray(i),o,["/"+t+"/Bimface.css","/"+t+"/thirdparty.js","/"+t+"/lib/loaders/BimTilesLoader.js","/"+t+"/Bimface"+n+".js"])};window.postProcessing=function(e){var a=e.metadata,n=e.options,i=e.successCb,o=f(e);u(n.staticHost,o),a.databagId=""+a.databagId,n.path?(a.path=n.path,a.dataPath="./"):n.resourcePath&&(a.path=n.resourcePath.replace("viewToken","")),a.sdkPath=n.sdkPath,0==o.length?i(a):l(o,function(){if(n.build===t.Debug&&n.dataPath){var e=n.dataPath.split("/");i({databagId:e.pop(),path:e.join("/")})}i(a)})};var l=function e(a,n,i){var o=a.length,r=0,s=function s(c){if(c&&"error"==c.message&&c.element.indexOf("bimface.index")>-1){r=0;var d=i.options;d.build,t.Release;var l=f(i);return u(d.staticHost,l),void e(l,n)}r++,r==o?n():w(a[r],s)};w(a[r],s)},p=[],w=function(e,t){if(p.indexOf(e.split("/").pop())>-1)return void t();var a,n=document.getElementsByTagName("head")[0];return e.indexOf(".css")>-1?(a=document.createElement("link"),a.setAttribute("href",e),a.setAttribute("rel","stylesheet")):(a=document.createElement("script"),a.setAttribute("src",e)),a.url=e,n.appendChild(a),a.addEventListener("load",function(){p.push(this.url.split("/").pop()),t&&t({message:"success"})}),a.addEventListener("error",function(){t&&t({element:e,message:"error"})}),a};window.loadResource=l;var v=function(e){var t,a={type:"get",data:null,success:null,failure:null},n=Object.assign(a,e);t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.onreadystatechange=function(){if(4==t.readyState){var e=t.status;e>=200&&e<300||0==e?n.success&&n.success(t.responseText,t.responseXML):n.failure&&n.failure(e)}},t.open(n.type,n.url,n.async),t.send(n.data)},g=function(e,t,a){v({url:e,success:function(e){var t=JSON.parse(e);t=t.data||t,a&&a(t)},failure:function(e){t&&t(e)}})},h=function(e,t){var n=t.version,i=void 0;e.renderVersion;if(/\d+?\.\d+?\.\d+/.test(n)&&n.split(".")[0]>=3)n="Bimface@"+n;else if("Debug"==t.build)n="Bimface",i="Application";else if(t.viewType==a.DrawingView&&"drawingView"!=e.renderType){var o=e.subRenders;if(o&&0!=o.length)for(var r=0;r<o.length;r++)o[r].renderType==a.DrawingView&&(n=o[r].jsSDKVersion,i=o[r].jsSDKVersion)}else n=e.jsSDKVersion,i=e.jsSDKVersion;return{ui:i,sdk:n}},m=function(e,t,a){g(e.url,a,function(a){var n=h(a,e);window.BimfaceLoaderConfig.fullStaticHost="Local"==BimfaceLoaderConfig.dataEnvType?e.staticHost+"/bimface":e.staticHost+"/"+n.sdk;var i={metadata:a,options:e,successCb:t,sdkVersion:n.sdk,uiVersion:n.ui},o=window.BimfaceLoaderConfig.fullStaticHost+"/bimface.index.js";l([o],function(){postProcessing(i)},i)})},b=function(e,t){var a="bimView"==e.renderType?"3DView":e.renderType,n=(e.subRenders,{dataEnvType:t.dataEnvType,viewToken:t.viewToken,staticHost:t.staticHost,APIHost:t.APIHost,viewType:a});return Object.assign(n,e)},y={Version:"2021-2-24-19-51",load:function(e,a,n){window.BimfaceLoaderConfig=e,void 0==e.build&&(e.build=t.Release);var i=c(e);m(i,function(t){a(b(t,e))},n)}};window.BimfaceSDKLoader=y}();