!function(){refs={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};var t=!1,e=null;refs.btnStart.addEventListener("click",(function(){if(t)return;e=setInterval((function(){refs.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t=!0})),refs.btnStop.addEventListener("click",(function(){clearInterval(e),t=!1}))}();
//# sourceMappingURL=01-color-switcher.65550140.js.map