let html = '<iframe id="receiver" class="chatbox" allowtransparency: true; style = "position: fixed; z-index: 1310; bottom: 0px; right: 0px; border: 0px; width: 400px; height: 100vh; overflow-x: hidden; overflow-y: auto;" src = "https://viubox.herokuapp.com"></iframe >';
    document.body.innerHTML += html;
    console.log('started')
    localStorage.setItem('clicked', 'false')
    localStorage.setItem
    $("#receiver").on("load",function(){
        console.log('receiver load')
        $(this).width(400);
        var receiver = document.getElementById('receiver').contentWindow;
        $(".measurments_btn").on("click",function(){
            console.log('clicked started')
            if(localStorage.getItem('clicked')=='false'){
                console.log('clicked false')
                console.log(localStorage.getItem('clicked'))
                $(".measurments_btn").css('background-color', '#6f928a');
                localStorage.setItem('clicked', 'true')
                window.top.postMessage('Open App', '*')
            }
            else if(localStorage.getItem('clicked')=='true'){
                console.log('clicked true')
                console.log(localStorage.getItem('clicked'))
                $(".measurments_btn").css('background-color', '#000000');
                localStorage.setItem('clicked', 'false')
                window.top.postMessage('Close App', '*')
            }
            else if(localStorage.getItem('clicked')==null){
                console.log('clicked null')
            }
            var sku = $(this).data('sku');
            const myiframe = document.getElementById('receiver')
            var message = { message: 'virtual-dress-view-open', productSku: sku }
            receiver.postMessage(message, '*');
        })
        $(".three_d_viewer_btn").on("click",function(){
            var sku = $('.measurments_btn').data('sku');
            const myiframe = document.getElementById('receiver')
            var message = {message: 'open-three-d-viewer-box' , productSku: sku}
            console.log('Open 3D  ---', message)
            receiver.postMessage(message, '*');
        })
        console.log('onmessage b4')
        window.onmessage = function(event){
            event.preventDefault()
            console.log('onmessage started')
            if (event.data == 'Open App') {
                console.log('open')
                $('#receiver').width(400);
            } else if (event.data == 'Close App') {
                console.log('close')
                $('#receiver').width(100);
            } else if (event.data == 'virtual-dress-view-clear-box') {
               // $(".measurments_btn").text('Viubox check measurments ');
                $(".measurments_btn").css('background-color', '#6f928a');
            } else if (event.data.message === 'viubox-recommended-size'){
                $(".measurments_btn").text('Recommended Size : ' + event.data.size);
                $(".measurments_btn").css('background-color', '#4CAF50');
            }else if (event.data.message === 'viubox-three-d-viewer-item'){
                var itemId = event.data.itemId;
                localStorage.setItem("itemId", itemId);
                var loaded = localStorage.getItem("loaded");
                if(loaded) {
                    var msg = {message: 'load-item', itemid : itemId};
                    var receiver = document.getElementById('receiver').contentWindow;
                    receiver.postMessage(msg, 'https://viubox.herokuapp.com/');
                }
            } else if (event.data.message === 'viubox-login'){
                console.log('viubox-login called ' )
                var id = event.data.id;
                localStorage.setItem("id", id)
                var msg = { message: 'login', id : id };
                var receiver = document.getElementById('receiver').contentWindow;
                receiver.postMessage(msg, 'https://viubox.herokuapp.com/');
            } else if (event.data == 'loaded-threed-viewer') {
                var id = localStorage.getItem("id");
                console.log('loaded-threed-viewer called ..')
                var msg = { message: 'login', id : id };
                var receiver = document.getElementById('receiver').contentWindow;
                receiver.postMessage(msg, 'https://viubox.herokuapp.com/');
            }else if (event.data == 'loaded-avatar') {
                var itemId = localStorage.getItem("itemId");
                var loaded = localStorage.getItem("loaded");
                   localStorage.setItem("loaded", true);
                console.log('loaded avatar');
                if (itemId) {
                    console.log('Calling cloth change for item id -->', itemId);
                    var msg = {message: 'load-item', itemid : itemId};
                    var receiver = document.getElementById('receiver').contentWindow;
                    receiver.postMessage(msg, 'https://viubox.herokuapp.com/');
                }
            } else if (event.data == 'loaded-app') {
                var id = localStorage.getItem("id");
                console.log(' loaded-app login called  called ..')
                if (id) {
                    var msg = { message: 'login', id : id };
                    var receiver = document.getElementById('receiver').contentWindow;
                    receiver.postMessage(msg, 'https://viubox.herokuapp.com/');
                }

            }else if (event.data == 'virtual-three-d-hide') {
                console.log('virtual-three-d-hide --> ', event.data )
                $(".three_d_viewer_btn").css({"display": 'none'});

            }else if (event.data == 'clear-browser-query-params') {
                window.history.pushState({}, document.title,"" );
            } else if (event.data.message === 'open-three-d-app'){
                var app_url = event.data.url;
                console.log('Open 3d view app url', app_url);
                if (app_url) {
                    window.location.href = app_url;
                }
            } else {
                console.log('unknown msg received --> ', event.data )
            }
        }
        console.log('onmessage end')
        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        };

        /*Get current site url and post msg to ifram for loading widget theme*/
        var url = window.location.origin;
        var full_url = window.location.href.split('?')[0]
        var width = $(window).width();
        const myiframe = document.getElementById('receiver')
        var message = {message: 'load-plugin-theme' , url: url, width: width, full_url : full_url}
        receiver.postMessage(message, '*');

        var content = document.body.textContent || document.body.innerText;
        var hasText = content.indexOf("woman")!==-1;
        var product = "4541db";
        if(hasText){
            product = "54c23d";
        }

        // var receiver = document.getElementById('receiver').contentWindow;
        // women dress : 54c23d
        // men dress : 4541db
        console.log('product---->', product)
        receiver.postMessage(product, 'https://plugins.viubox.com:8020');

        /*    var user_id = getUrlParameter('register_user');
            if(user_id){
                console.log('Urm from embaded js', url)
                var message = {message: 'open-image-upload-box' , url: full_url, user_id: user_id}
                receiver.postMessage(message, '*');
            }*/

        var resetpasswordtoken = getUrlParameter('resetpassword');
        if(resetpasswordtoken){
            var message = {message: 'open-reset-password-box' , url: full_url, resetpasswordtoken: resetpasswordtoken}
            receiver.postMessage(message, '*');
        }
        console.log('load ended')
    });
console.log('before click')
$('receiver').on('click', function(e){
    console.log('click started')
    localStorage.setItem('outfunc', 'outfunc')
})
console.log('click ended')
