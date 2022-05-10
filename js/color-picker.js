jQuery(document).ready(function($){
    
    $color_list = [
// '<iframe id="receiver" class="chatbox" allowtransparency=true style="height:100vh; position: fixed;z-index: 1310; right: -400px;overflow-x: hidden;top:0; border: 0px; width: 400px;" src = "https://api.viubox.com:8002"></iframe ><button id="iconbtn" style="display:none; cursor:pointer; border:none; overflow-x:hidden; background:none; position:fixed; right:-400px; top:46vh ; z-index:200;display:flex;align-items:center" ><p class="texthover" style="display:none; opacity:0;margin:0px 8px 0px 0px;line-height:20px;font-size:18px;font-weight:500;color:#3d3d3d;"><span style="display:none; padding-right:7px;font-Weight:500;opacity:0.5;">&lt;</span> Try <br/> Online</p><img src="https://widget.viubox.com/img/appicon.png" width="70px" draggable="false" alt="appicon" border="0" style="display:none;"></button>';
        {color:'#FAE7D0',value:'FAE7D0',title:''},

        {color:'#DFC183',value:'DFC183',title:''},

        {color:'#AA724B',value:'AA724B',title:''},

        {color:'#CEAB69',value:'CEAB69',title:''},

        {color:'#935D37',value:'935D37',title:''},

        {color:'#FEB186',value:'FEB186',title:''},

        {color:'#B98865',value:'B98865',title:''},

        {color:'#7B4B2A',value:'7B4B2A',title:''},

        {color:'#C8ACA3',value:'C8ACA3',title:''},

        {color:'#E8CDA8',value:'E8CDA8',title:''},

        {color:'#7B4B2A',value:'7B4B2A',title:''},

        {color:'#C0A183',value:'C0A183',title:''},

        {color:'#CAA661',value:'CAA661',title:''},

        {color:'#573719',value:'573719',title:''},

        {color:'#C18E74',value:'C18E74',title:''},

        {color:'#B58A3F',value:'B58A3F',title:''},

        {color:'#483728',value:'483728',title:''}
    ];
    
    $('.color-picker').wrap('<div class="color-picker-wrap"></div>');

     $('.color-picker-wrap').each(function(){

            var self = $(this);

            if(self.children('.color-picker').hasClass('cp-sm')){

                self.addClass('cp-sm');

            }else if(self.children('.color-picker').hasClass('cp-lg')){

                self.addClass('cp-lg');

            }

            self.append('<ul></ul><input type="color" style="display:none;" />');

            var $foundactive = false;

            for(var i = 0; i <  $color_list.length; i++){

            var $active = '';

            if(self.children(".color-picker").val()==$color_list[i].color){

                    $active = 'class="active"';

                    $foundactive = true;

                    if(self.children(".color-picker").hasClass('cp-show')){

                        self.children('small').remove();    

                        // self.append('<small>Selected Color: <code>'+$color_list[i].color+'</code></small>');
                        
                    }
            }

                self.children('ul').append('<li '+ $active+' style="background-color:'+$color_list[i].color+'" title="'+ $color_list[i].title+'" data-value="'+$color_list[i].value+'"></li>');
            }

            if(!$foundactive && self.children(".color-picker").val()!='' ){

                    self.children('ul').append('<li class="active" title="Custom Color '+self.children(".color-picker").val()+'" style="background-color:'+self.children(".color-picker").val()+'" data-value="'+$color_list[i].value+'"></li>');
                    
                    if(self.children(".color-picker").hasClass('cp-show')){

                        self.children('small').remove();    

                       // self.append('<small>Selected Color: <code>'+self.children(".color-picker").val()+'</code></small>');
                        
                    }

            }

          //  self.children('ul').append('<li class="add_new" title="Add New">+</li>');

     });

  $('.color-picker-wrap ul').on('click','li', function() {

        var self = $(this);

          if (!self.hasClass('add_new')) {   

                  if (!self.hasClass('active')) {

                      self.siblings().removeClass('active');

                        var color =rgb2hex(self.css("backgroundColor"));
                        var value = self.data('value');

                        self.parents('.color-picker-wrap').children(".color-picker").val(value);

                        self.addClass('active');
                        
                        if(self.parents('.color-picker-wrap').children(".color-picker").hasClass('cp-show')){

                            self.parents('.color-picker-wrap').children('small').remove();    

                         //   self.parents('.color-picker-wrap').append('<small>Selected Color: <code>'+color+'</code></small>');

                        }

                  }
          }else{
              self.parents('.color-picker-wrap').children("input[type='color']").trigger('click');
          }

      });

  $(".color-picker-wrap input[type='color']").on("change",function(){

      var self = $(this);

      self.parents('.color-picker-wrap').children('ul').children('li').removeClass('active');

      self.parents('.color-picker-wrap').children('ul').children('li.add_new').remove();

      self.parents('.color-picker-wrap').children('ul').append('<li class="active" title="Custom Color '+self.val()+'" style="background-color:'+self.val()+'"></li>');

      self.parents('.color-picker-wrap').children(".color-picker").val(self.val());

      self.parents('.color-picker-wrap').children('ul').append('<li class="add_new" title="Add New">+</li>');
                              
    if(self.parents('.color-picker-wrap').children(".color-picker").hasClass('cp-show')){

        self.parents('.color-picker-wrap').children('small').remove();    

       // self.parents('.color-picker-wrap').append('<small>Selected Color: <code>'+self.val()+'</code></small>');
        
    }

  });

    var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

    function rgb2hex(rgb) {

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {

        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];

    }

});    
