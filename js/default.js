$(document).ready(function(){
  
  $('h1').remove();
  walking_dead_pixel();
  
});

var field_x = 500;
var field_y = 400;
var hard = 1;
var increase = false;
var deads = 0;
var walkers = 0;
var game = '';
var born = ''
var time_to_reborn = 3000;


function start(){
  deads = 0;
  set_level();
  zombies_create(20);
  game = random_zombies_run();
  born = walkers_reborn();
}

function stop(){
  game = clearInterval(game);
  born = clearInterval(born);
};

function clear_all(){
  $('.zombie').remove();
  $('.man').removeClass('dead');
  $('.space').removeClass('down');
}

function dead(){
  $('.stop').fadeOut('normal',function(){
    $('.start').fadeIn('normal')
  })
  stop();
  $('.zombie').animate({opacity:0},1000,function(){
    $('.zombies').remove();
  })
}

function walking_dead_pixel(){
  $('.start').tap(function(){
    $('.start').fadeOut('normal',function(){
      $('.stop').fadeIn('normal');
      clear_all();
      start();
    });
  })
  
  $('.stop').tap(function(){
    stop();
    $('.stop').fadeOut('normal',function(){
     $('.start').fadeIn('normal');
    })
  })
}

function zombies_create(numero){

  var n_zombies = numero;
  
  var l = 0;
  var t = 0;
  
  for(var i=0;i<n_zombies;i++){
    $('<div class="zombie">\
          <span class="zhead">head</span>\
          <span class="zbody">body</span>\
          <span class="zleg zleft">Left leg</span>\
          <span class="zleg zright">Right leg</span>\
        </div>').appendTo('#field');
    
        l = Math.floor(Math.random()*field_x)%field_x;
        t = Math.floor(Math.random()*field_y)%field_y;

       if((l<380 && l>120)&&(t > 100 && t < 310)){
          if(l>250){
            l=120;
          }else{
            l=380;
          }
          if(t<155){
            t=100;
          }else{
            t=310;
          }
        }
        
        $('#field .zombie:last').css({left:l+'px',top:t+'px'});
    
  }
  kill_zombies();
}

function random_zombies_run(){
  
  var run = setInterval(function(){
    
    var l = 0;
    var t = 0;
    var v = 0;
    var lt = 0;
    var tt = 0;
    
    $('.zombie').each(function(){
      
      lt = $(this).position().left;
      tt = $(this).position().top;
      
      
      
      if(lt < field_x/2){
        l=lt+5;
      }else{
        l=lt-5;
      }
      
      if(tt < field_y/2){
        t=tt+5;
      }else{
        t=tt-5;
      }
      
      if((lt>200 && lt <300) &&( tt>100 && tt<290)){
        $('.man .mhead').css('background-color','#000').addClass('dead');
        $('.space').addClass('down')
        $('.zhead').unbind('tap');
        $('.zleg').unbind('tap');
        dead();
      }
      
      if($(this).hasClass('slow')){
        $(this).animate({left:l,top:t},1800)
      }else{
        $(this).animate({left:l,top:t},1000)
      }
      
    });
  
  },1000)
  
  return run;
}

function walkers_reborn(){
  
  var reborn = setInterval(function(){
    zombies_create(hard);
  },time_to_reborn)
  
  return reborn;
  
}

function set_level(){
  var level = '';
  if(deads <= 20){
    level = "Cynthiana's Hospital City"
    hard = 5;
  }else if(deads > 20 && deads <= 80){
    level = "Streets of Cynthiana";
    hard = 8;
    time_to_reborn = 4000;
  }else if(deads > 80 && deads <= 200){
    level = "Hurshel's Farm";
    hard = 10;
    time_to_reborn = 5000;
  }else if(deads > 200 && deads <= 400){
    level = "Streets of Atlanta";
    hard = 12;
    time_to_reborn = 6000;
  }
  $('.level span').text(level);
}


function kill_zombies(){
  
  var l = 0;
  var t = 0;
  
  $('.zhead').tap(function(){
    $(this).css('background-color','#e00').parent('.zombie').animate({opacity:0},100,function(){
      $(this).remove();
      deads++;
      $('.score span').text(deads);
      set_level();
    });
    return false;
  });
  
  $('.zleg').tap(function(){
    $(this).css('background-color','#e00').parent('.zombie').addClass('slow');
    $(this).animate({opacity:0},100,function(){
      $(this).remove();
    });
    return false;
  });
  
  $('.zbody').tap(function(){
    l = Math.floor(Math.random()*10)+10;
    t = Math.floor(Math.random()*10)+5;
    $('<span class="shot" style="left:'+l+'px;top:'+t+'px"></span>').appendTo(this);
    return false;
  });
  
  $('')
}