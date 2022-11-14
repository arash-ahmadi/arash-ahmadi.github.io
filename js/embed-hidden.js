var origin = window.location.origin; let urlExists, itemExists, screenHeight = window.innerHeight; jQuery(".viubox-syz-measurments-button").ready((() => { jQuery("#viubox-syz-text").addClass("viubox-loader"); var e = jQuery("#viubox-syz-text").text(); jQuery("#viubox-syz-text").text(""), axios.post("https://api.viubox.com:8000/portal/checkurl", { url: origin }).then((t => { if (urlExists = t.data.urlExists, !urlExists) throw "'Viubox is not enabled for this domain. Please contact an administrator.'"; var a = jQuery(".viubox-syz-measurments-button").data("syzsku"); jQuery("#viubox-syz-text").removeClass("display-n"), axios.get("https://api.viubox.com:8000/ifItemExists", { params: { sku: a, origin: origin } }).then((t => { if (itemExists = t.data.itemExists, !itemExists) throw "This product is not available in ViuBox SYZ. ViuBox SYZ will not load unless the item is present in the system"; jQuery(".viubox-syz-contain-button").removeClass("display-n"); let a = `<iframe id="receiver" class="chatbox" allow="camera; microphone" allowtransparency=false height=${screenHeight}px src = "https://syz.viubox.com" style="position: fixed; z-index: 1310; right: -400px; overflow-x: hidden; top:0; border: 0px; width: 400px;"></iframe >`; jQuery("body").append(a); jQuery("body").append("<div class='viubox-syz-overlay'></div>"), document.querySelector(".viubox-syz-overlay").style.transition = "all 0.5s ease-in-out", document.querySelector(".viubox-syz-overlay").style.cursor = "url('https://widget.viubox.com/img/delete-cursor-32x32.png'), auto", jQuery("#receiver").on("load", (function () { setTimeout((() => { jQuery("#viubox-syz-text").removeClass("viubox-loader"), jQuery("#viubox-syz-text").text(e), jQuery(".viubox-syz-measurments-button").css("opacity", "1") }), 1e3); const t = () => { document.querySelector("body").style.overflow = "auto", jQuery(".viubox-syz-overlay").css("visibility", "hidden"), jQuery(".viubox-syz-overlay").css("opacity", 0) }, a = () => { document.querySelector("body").style.overflow = "hidden", jQuery(".viubox-syz-overlay").css("visibility", "visible"), jQuery(".viubox-syz-overlay").css("opacity", 1) }; var s = document.getElementById("receiver").contentWindow; s.postMessage({ message: "origin", origin: origin }, "*"); const o = e => { s.postMessage({ message: "orientation", orientation: { alpha: Math.round(e.alpha), beta: Math.round(e.beta), gamma: Math.round(e.gamma) } }, "*") }; localStorage.getItem("lang") && s.postMessage({ message: "langFromLocalStorage", lang: localStorage.getItem("lang") }, "*"); const i = (window.screen.availWidth / window.screen.availHeight).toFixed(2), r = navigator.cookieEnabled ? 1 : 0, n = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 16, u = navigator.userAgent ? navigator.userAgent.length : 50, l = navigator.maxTouchPoints ? navigator.maxTouchPoints : 0; jQuery.getJSON("https://api.ipify.org?format=json").done((function (e) { const t = `${e.ip}.${i}.${u}.${l}.${r}.${n}`; console.log(`Unlimited Requests:${t}`), s.postMessage({ message: "userIp", publicIp: t }, "*") })).fail((function () { jQuery.getJSON("https://api.ipgeolocation.io/ipgeo?apiKey=ea67a6de99ce41339e2c7c60f68be0d7").done((function (e) { const t = `${e.ip}.${i}.${u}.${l}.${r}.${n}`; console.log(`Limited Requests:${t}`), s.postMessage({ message: "userIp", publicIp: t }, "*") })).fail((function () { localStorage.getItem("authToken") && s.postMessage({ message: "authFromParent", authToken: localStorage.getItem("authToken") }, "*") })) })), jQuery(".viubox-syz-measurments-button").on("click", (function () { jQuery("#receiver").css("right", "0px"), jQuery("#receiver").css("transition", "all 0.55s cubic-bezier(0.76, 0, 0.24, 1)"), a(); jQuery(this).data("sku"); var e = { message: "virtual-dress-view-open", productSku: jQuery(this).data("syzsku") }; s.postMessage(e, "*") })), jQuery(".viubox-syz-overlay").on("click", (function () { jQuery("#receiver").css("right", "-400px"), jQuery("#receiver").css("transition", "all 0.55s cubic-bezier(0.76, 0, 0.24, 1)"), t(); s.postMessage({ message: "virtual-dress-view-close" }, "*") })), window.addEventListener("message", (function (e) { e.preventDefault(), e.data && "Close App" == e.data.message ? (jQuery("#receiver").css("right", "-400px"), jQuery("#receiver").css("height", "100vh"), jQuery("#receiver").css("transition", "all 0.55s cubic-bezier(0.76, 0, 0.24, 1)"), t()) : e.data && "virtual-dress-view-open" == e.data.message ? (jQuery("#receiver").css("right", "0px"), jQuery("#receiver").css("height", "100vh"), jQuery("#receiver").css("transition", "all 0.55s cubic-bezier(0.76, 0, 0.24, 1)"), a()) : e.data && "addToken" === e.data.message ? localStorage.setItem("authToken", e.data.authToken) : e.data && "removeToken" === e.data.message ? localStorage.removeItem("authToken") : e.data && "authFromParent" === e.data.message ? localStorage.setItem("authToken", e.data.authFromParent) : e.data && "changeLang" === e.data.message ? localStorage.setItem("lang", e.data.flag) : e.data && "openWebcam" === e.data.message ? (localStorage.setItem("webcam", "true"), (async () => { "true" === localStorage.getItem("webcam") && ("function" == typeof DeviceOrientationEvent.requestPermission ? DeviceOrientationEvent.requestPermission().then((e => { "granted" === e && window.addEventListener("deviceorientation", o) })).catch((e => console.log("DeviceOrientationEvent.requestPermission error:", e))) : window.addEventListener("deviceorientation", o)) })()) : e.data && "closeWebcam" === e.data.message && (localStorage.setItem("webcam", "false"), window.removeEventListener("deviceorientation", o)) })) })) })).catch((e => { jQuery(".viubox-syz-measurments-button").css("display", "none"), console.log("This product is not available in ViuBox SYZ. ViuBox SYZ will not load unless the item is present in the system") })) })).catch((e => { jQuery(".viubox-syz-measurments-button").css("display", "none"), console.log("Viubox is not enabled for this domain. Please contact an administrator.") })) }));