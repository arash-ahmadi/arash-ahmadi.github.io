// There is a lot of legacy code still in this file, only the code commented by me is the code being used for the new app

// Raw html which gets added to client/demo site. The styles in this are the styles set when the website first loads (closed app)
// https://viubox-syz3.herokuapp.com
// Uploaded IconImage = https://i.ibb.co/jhwWSSs/appicon.png
let html =
  '<iframe id="receiver" class="chatbox" allowtransparency=true style="height:100vh; position: fixed;z-index: 1310; right: -400px;overflow-x: hidden;top:0; border: 0px; width: 400px;" src = "https://viubox-syz3.herokuapp.com/"></iframe ><button id="iconbtn" style="cursor:pointer; border:none; overflow-x:hidden; background:none; position:fixed; right:-400px; top:46vh ; z-index:200;display:flex;align-items:center" ><p class="texthover" style="opacity:0;margin:0px 8px 0px 0px;line-height:20px;font-size:18px;font-weight:500;"><span style="padding-right:7px;font-Weight:500;opacity:0.5;">&lt;</span> Try <br/> Online</p><img src="https://widget.viubox.com/img/appicon.png" width="70px" draggable="false" alt="appicon" border="0"></button>';
document.body.innerHTML += html;
// Main event loop

$('#receiver').on('load', function () {
  // Redundant
  $(this).width('400px');
  $('#iconbtn').css('right', '10px');
  // This piece of code sends the postMessage when 'Check your fit' button is clicked with the sku
  var receiver = document.getElementById('receiver').contentWindow;
  $('.measurments_btn').on('click', function () {
    // $('.measurments_btn').css('background-color', '#6f928a');
    $('#receiver').css('right', '0px');
    $('#receiver').css('transition', 'all 0.5s');
    var sku = $(this).data('sku');
    var syzsku = $(this).data('syzsku');
    // const myiframe = document.getElementById('receiver');
    var message = { message: 'virtual-dress-view-open', productSku: syzsku };
    receiver.postMessage(message, '*');
  });
  // Opening button
  $('#iconbtn').on('click', function () {
    $('#receiver').css('right', '0px');
    $('#receiver').css('transition', 'all 0.5s');
    var sku = $(this).data('sku');
    var syzsku = $(this).data('syzsku');
    // const myiframe = document.getElementById('receiver');
    var message = { message: 'virtual-dress-view-open', productSku: syzsku };
    receiver.postMessage(message, '*');
  });

  // Same code for the second button which is currently hidden
  // $('.three_d_viewer_btn').on('click', function () {
  //   var sku = $('.measurments_btn').data('sku');
  //   const myiframe = document.getElementById('receiver');
  //   var message = { message: 'open-three-d-viewer-box', productSku: sku };
  //   console.log('Open 3D  ---', message);
  //   receiver.postMessage(message, '*');
  // });

  //hover effect
  $('#iconbtn').hover(
    function () {
      $('.texthover').css('opacity', '1');
      $('.texthover').css('transition', '0.4s ease');
    },
    function () {
      $('.texthover').css('opacity', '0');
      $('.texthover').css('transition', '0.4s ease');
    }
  );

  // This loop runs when the client window receives a message
  window.onmessage = function (event) {
    event.preventDefault();

    // change the width based on state of the app
    if (event.data.message == 'Close App') {
      // $('#receiver').css('width', '0px');
      $('#receiver').css('right', '-400px');
      $('#receiver').css('height', '100vh');
      $('#receiver').css('transition', 'all 0.5s');
      $('.measurments_btn').css('background-color', '#000000');
    } else if (event.data.message == 'virtual-dress-view-open') {
      // $('#receiver').css('width', '400px');
      $('#receiver').css('right', '0px');
      $('#receiver').css('height', '100vh');
      $('#receiver').css('transition', 'all 0.5s');

      // $('#receiver').css('overflow-y', 'auto')
      // $('#receiver').width(145);
      // $('#receiver').height(85);
      // $('#receiver').bottom(450);

      // You can ignore code below this line
    }
    // else if (event.data == 'virtual-dress-view-clear-box') {
    //   $('.measurments_btn').css('background-color', '#6f928a');
    // } else if (event.data.message === 'viubox-recommended-size') {
    //   $('.measurments_btn').text('Recommended Size : ' + event.data.size);
    //   $('.measurments_btn').css('background-color', '#4CAF50');
    // } else if (event.data.message === 'viubox-three-d-viewer-item') {
    //   var itemId = event.data.itemId;
    //   localStorage.setItem('itemId', itemId);
    //   var loaded = localStorage.getItem('loaded');
    //   if (loaded) {
    //     var msg = { message: 'load-item', itemid: itemId };
    //     var receiver = document.getElementById('receiver').contentWindow;
    //     receiver.postMessage(msg, 'https://viubox-syz3.herokuapp.com/');
    //   }
    // } else if (event.data.message === 'viubox-login') {
    //   console.log('viubox-login called ');
    //   var id = event.data.id;
    //   localStorage.setItem('id', id);
    //   var msg = { message: 'login', id: id };
    //   var receiver = document.getElementById('receiver').contentWindow;
    //   receiver.postMessage(msg, 'https://viubox-syz3.herokuapp.com/');
    // } else if (event.data == 'loaded-threed-viewer') {
    //   var id = localStorage.getItem('id');
    //   console.log('loaded-threed-viewer called ..');
    //   var msg = { message: 'login', id: id };
    //   var receiver = document.getElementById('receiver').contentWindow;
    //   receiver.postMessage(msg, 'https://viubox-syz3.herokuapp.com/');
    // } else if (event.data == 'loaded-avatar') {
    //   var itemId = localStorage.getItem('itemId');
    //   var loaded = localStorage.getItem('loaded');
    //   localStorage.setItem('loaded', true);
    //   console.log('loaded avatar');
    //   if (itemId) {
    //     console.log('Calling cloth change for item id -->', itemId);
    //     var msg = { message: 'load-item', itemid: itemId };
    //     var receiver = document.getElementById('receiver').contentWindow;
    //     receiver.postMessage(msg, 'https://viubox-syz3.herokuapp.com/');
    //   }
    // } else if (event.data == 'loaded-app') {
    //   var id = localStorage.getItem('id');
    //   console.log(' loaded-app login called  called ..');
    //   if (id) {
    //     var msg = { message: 'login', id: id };
    //     var receiver = document.getElementById('receiver').contentWindow;
    //     receiver.postMessage(msg, 'https://viubox-syz3.herokuapp.com/');
    //   }
    // } else if (event.data == 'virtual-three-d-hide') {
    //   console.log('virtual-three-d-hide --> ', event.data);
    //   $('.three_d_viewer_btn').css({ display: 'none' });
    // } else if (event.data == 'clear-browser-query-params') {
    //   window.history.pushState({}, document.title, '');
    // } else if (event.data.message === 'open-three-d-app') {
    //   var app_url = event.data.url;
    //   console.log('Open 3d view app url', app_url);
    //   if (app_url) {
    //     window.location.href = app_url;
    //   }
    // } else {
    //   console.log('unknown msg received --> ', event.data);
    // }
  };
  // function getUrlParameter(sParam) {
  //   var sPageURL = window.location.search.substring(1),
  //     sURLVariables = sPageURL.split('&'),
  //     sParameterName,
  //     i;
  //   for (i = 0; i < sURLVariables.length; i++) {
  //     sParameterName = sURLVariables[i].split('=');

  //     if (sParameterName[0] === sParam) {
  //       return sParameterName[1] === undefined
  //         ? true
  //         : decodeURIComponent(sParameterName[1]);
  //     }
  //   }
  // }

  // /*Get current site url and post msg to ifram for loading widget theme*/
  // var url = window.location.origin;
  // var full_url = window.location.href.split('?')[0];
  // var width = $(window).width();
  // const myiframe = document.getElementById('receiver');
  // var message = {
  //   message: 'load-plugin-theme',
  //   url: url,
  //   width: width,
  //   full_url: full_url,
  // };
  // receiver.postMessage(message, '*');

  // var content = document.body.textContent || document.body.innerText;
  // var hasText = content.indexOf('woman') !== -1;
  // var product = '4541db';
  // if (hasText) {
  //   product = '54c23d';
  // }

  // // var receiver = document.getElementById('receiver').contentWindow;
  // // women dress : 54c23d
  // // men dress : 4541db
  // console.log('product---->', product);
  // receiver.postMessage(product, 'https://plugins.viubox.com:8020');

  // /*    var user_id = getUrlParameter('register_user');
  //           if(user_id){
  //               console.log('Urm from embaded js', url)
  //               var message = {message: 'open-image-upload-box' , url: full_url, user_id: user_id}
  //               receiver.postMessage(message, '*');
  //           }*/

  // var resetpasswordtoken = getUrlParameter('resetpassword');
  // if (resetpasswordtoken) {
  //   var message = {
  //     message: 'open-reset-password-box',
  //     url: full_url,
  //     resetpasswordtoken: resetpasswordtoken,
  //   };
  //   receiver.postMessage(message, '*');
  // }
});
console.log(12)