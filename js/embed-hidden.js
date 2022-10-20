var origin = window.location.origin; let urlExists, itemExists, screenHeight = window.innerHeight; jQuery(".viubox-syz-measurments-button").ready((() => { axios.post("https://api.viubox.com:8000/portal/checkurl", { url: origin }).then((e => { if (urlExists = e.data.urlExists, !urlExists) throw "'Viubox is not enabled for this domain. Please contact an administrator.'"; var t = jQuery(".viubox-syz-measurments-button").data("syzsku"); axios.get("https://api.viubox.com:8000/ifItemExists", { params: { sku: t, origin: origin } }).then((e => { if (itemExists = e.data.itemExists, !itemExists) throw "This product is not available in ViuBox SYZ. ViuBox SYZ will not load unless the item is present in the system"; let t = `<iframe id="receiver" class="chatbox" allow="camera; microphone" allowtransparency=true style="height:${screenHeight}px; position: fixed;z-index: 1310; right: -400px;overflow-x: hidden;top:0; border: 0px; width: 400px;" src = "https://syz.viubox.com"></iframe ><button id="iconbtn" style="display:none; cursor:pointer; border:none; overflow-x:hidden; background:none; position:fixed; right:-400px; top:46vh ; z-index:200;display:flex;align-items:center" ><p class="texthover" style="display:none; opacity:0;margin:0px 8px 0px 0px;line-height:20px;font-size:18px;font-weight:500;color:#3d3d3d;"><span style="display:none; padding-right:7px;font-Weight:500;opacity:0.5;">&lt;</span> Try <br/> Online</p><img src="https://widget.viubox.com/img/appicon.png" width="70px" draggable="false" alt="appicon" border="0" style="display:none;"></button>`; jQuery("body").append(t); jQuery("body").append("<div class='viubox-syz-overlay'></div>"), document.querySelector(".viubox-syz-overlay").style.transition = "all 0.5s ease-in-out", document.querySelector(".viubox-syz-overlay").style.cursor = "url('https://widget.viubox.com/img/delete-cursor-32x32.png'), auto", jQuery("#receiver").on("load", (function () { console.log("ran"), jQuery(".viubox-syz-measurments-button").css("opacity", "1"); const e = () => { document.querySelector("body").style.overflow = "auto", jQuery(".viubox-syz-overlay").css("visibility", "hidden"), jQuery(".viubox-syz-overlay").css("opacity", 0) }, t = () => { document.querySelector("body").style.overflow = "hidden", jQuery(".viubox-syz-overlay").css("visibility", "visible"), jQuery(".viubox-syz-overlay").css("opacity", 1) }; jQuery(this).width("400px"), jQuery("#iconbtn").css("right", "10px"), window.innerWidth < 400 && jQuery("#receiver").css("background-color", "#ffffff"); var o = document.getElementById("receiver").contentWindow; o.postMessage({ message: "origin", origin: origin }, "*"); const s = e => { o.postMessage({ message: "orientation", orientation: { alpha: Math.round(e.alpha), beta: Math.round(e.beta), gamma: Math.round(e.gamma) } }, "*") }; localStorage.getItem("lang") && o.postMessage({ message: "langFromLocalStorage", lang: localStorage.getItem("lang") }, "*"); const a = (window.screen.availWidth / window.screen.availHeight).toFixed(2), i = navigator.cookieEnabled ? 1 : 0, r = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 16, n = navigator.userAgent ? navigator.userAgent.length : 50, c = navigator.maxTouchPoints ? navigator.maxTouchPoints : 0; $.getJSON("https://api.ipify.org?format=json").done((function (e) { const t = `${e.ip}.${a}.${n}.${c}.${i}.${r}`; console.log(`Unlimited Requests:${t}`), o.postMessage({ message: "userIp", publicIp: t }, "*") })).fail((function () { $.getJSON("https://api.ipgeolocation.io/ipgeo?apiKey=ea67a6de99ce41339e2c7c60f68be0d7").done((function (e) { const t = `${e.ip}.${a}.${n}.${c}.${i}.${r}`; console.log(`Limited Requests:${t}`), o.postMessage({ message: "userIp", publicIp: t }, "*") })).fail((function () { localStorage.getItem("authToken") && o.postMessage({ message: "authFromParent", authToken: localStorage.getItem("authToken") }, "*") })) })), jQuery(".viubox-syz-measurments-button").on("click", (function () { jQuery("#receiver").css("right", "0px"), jQuery("#receiver").css("transition", "all 0.5s"), t(); jQuery(this).data("sku"); var e = { message: "virtual-dress-view-open", productSku: jQuery(this).data("syzsku") }; o.postMessage(e, "*") })), jQuery("#iconbtn").on("click", (function () { jQuery("#receiver").css("right", "0px"), jQuery("#receiver").css("transition", "all 0.5s"), t(); jQuery(this).data("sku"); var e = { message: "virtual-dress-view-open", productSku: jQuery(this).data("syzsku") }; o.postMessage(e, "*") })), jQuery("#iconbtn").hover((function () { jQuery(".texthover").css("opacity", "1"), jQuery(".texthover").css("transition", "0.4s ease") }), (function () { jQuery(".texthover").css("opacity", "0"), jQuery(".texthover").css("transition", "0.4s ease") })), jQuery(".viubox-syz-overlay").on("click", (function () { jQuery("#receiver").css("right", "-400px"), jQuery("#receiver").css("transition", "all 0.5s"), e(); o.postMessage({ message: "virtual-dress-view-close" }, "*") })), window.addEventListener("message", (function (o) { o.preventDefault(), o.data && "Close App" == o.data.message ? (jQuery("#receiver").css("right", "-400px"), jQuery("#receiver").css("height", "100vh"), jQuery("#receiver").css("transition", "all 0.5s"), e()) : o.data && "virtual-dress-view-open" == o.data.message ? (jQuery("#receiver").css("right", "0px"), jQuery("#receiver").css("height", "100vh"), jQuery("#receiver").css("transition", "all 0.5s"), t()) : o.data && "addToken" === o.data.message ? localStorage.setItem("authToken", o.data.authToken) : o.data && "removeToken" === o.data.message ? localStorage.removeItem("authToken") : o.data && "authFromParent" === o.data.message ? localStorage.setItem("authToken", o.data.authFromParent) : o.data && "changeLang" === o.data.message ? localStorage.setItem("lang", o.data.flag) : o.data && "openWebcam" === o.data.message ? (localStorage.setItem("webcam", "true"), (async () => { "true" === localStorage.getItem("webcam") && ("function" == typeof DeviceOrientationEvent.requestPermission ? DeviceOrientationEvent.requestPermission().then((e => { "granted" === e && window.addEventListener("deviceorientation", s) })).catch((e => console.log("DeviceOrientationEvent.requestPermission error:", e))) : window.addEventListener("deviceorientation", s)) })()) : o.data && "closeWebcam" === o.data.message && (localStorage.setItem("webcam", "false"), window.removeEventListener("deviceorientation", s)) })) })) })).catch((e => { jQuery(".viubox-syz-measurments-button").css("display", "none"), console.log("This product is not available in ViuBox SYZ. ViuBox SYZ will not load unless the item is present in the system") })) })).catch((e => { jQuery(".viubox-syz-measurments-button").css("display", "none"), console.log("Viubox is not enabled for this domain. Please contact an administrator.") })) }));