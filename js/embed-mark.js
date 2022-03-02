// Code to validate URL
var origin = window.location.origin;
axios.post('https://api.viubox.com:8000/portal/checkurl', { url: origin }).then((res) => {
  if (res.data.urlExists === true) {


    let html =
      '<iframe id="receiver" class="chatbox" allowtransparency=true style="height:100vh; position: fixed;z-index: 1310; right: -400px;overflow-x: hidden;top:0; border: 0px; width: 400px;" src = "https://api.viubox.com:8002"></iframe ><button id="iconbtn" style="display:none; cursor:pointer; border:none; overflow-x:hidden; background:none; position:fixed; right:-400px; top:46vh ; z-index:200;display:flex;align-items:center" ><p class="texthover" style="display:none; opacity:0;margin:0px 8px 0px 0px;line-height:20px;font-size:18px;font-weight:500;"><span style="display:none; padding-right:7px;font-Weight:500;opacity:0.5;">&lt;</span> Try <br/> Online</p><img src="https://widget.viubox.com/img/appicon.png" width="70px" draggable="false" alt="appicon" border="0" style="display:none;"></button>';
    document.body.innerHTML += html;
    // Main event loop

    $('#receiver').on('load', function () {
      // Redundant
      $(this).width('400px');
      $('#iconbtn').css('right', '10px');
      // This piece of code sends the postMessage when 'Check your fit' button is clicked with the sku
      var receiver = document.getElementById('receiver').contentWindow;
      if (localStorage.getItem('authToken')) {
        receiver.postMessage(
          {
            message: 'authFromParent',
            authToken: localStorage.getItem('authToken'),
          },
          '*'
        );
      }
      receiver.postMessage(
        {
          message: 'origin',
          origin: origin,
        },
        '*'
      );
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
      window.addEventListener('message', function (event) {
        event.preventDefault();

        // change the width based on state of the app
        if (event.data && event.data.message == 'Close App') {
          // $('#receiver').css('width', '0px');
          $('#receiver').css('right', '-400px');
          $('#receiver').css('height', '100vh');
          $('#receiver').css('transition', 'all 0.5s');
          // $('.measurments_btn').css('background-color', '#000000');
        } else if (event.data && event.data.message == 'virtual-dress-view-open') {
          // $('#receiver').css('width', '400px');
          $('#receiver').css('right', '0px');
          $('#receiver').css('height', '100vh');
          $('#receiver').css('transition', 'all 0.5s');
        } else if (event.data && event.data.message === 'addToken') {
          localStorage.setItem('authToken', event.data.authToken);
        } else if (event.data && event.data.message === 'removeToken') {
          localStorage.removeItem('authToken');
        }
      });
    });
  }
  else if (res.data.urlExists === false) {
    console.log('Viubox is not enabled for this domain. Please contact an administrator.')
  }
  else {
    console.log('ViuBox is having issues. Please try again later')
  }
}).catch(err => {
  console.log(err)
}).then(() => {
  console.log('ViuBox SYZ successfully initialised')
});
