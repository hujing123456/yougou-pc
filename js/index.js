$(function(){
    // ****************************banner**************************
    $.ajax({
        url:"http://127.0.0.1:3000/index/banner",
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(result=>{
        var iid=0;
        for(var key of result){
            iid++;
          var html=`<a href="" id=${iid}><img src="${key.src}"></a>`;
          $(".banner-img").append(html);
        }
        $(".banner-img>a:first").addClass("show");
        function banner(){
            var active=$(".banner-toggle>ul>li.active");
            var ashow=$(".banner-img>a.show")
            if(ashow.next().length==1){
                ashow.removeClass("show");
                ashow.next().addClass("show");
                active.removeClass("active");
                active.next().addClass("active");
            }else{
                ashow.removeClass("show");
                ashow.parent().children(":first").addClass("show");
                active.removeClass("active");
                active.parent().children(":first").addClass("active");
            }
        }
        var timer=setInterval(banner,5000);
        $(".banner-img").mouseover(function(){
            clearInterval(timer)
        }).mouseout(function(){
            timer=setInterval(banner,5000);
        })

        $(".banner-toggle>ul>li").on("mouseover",function(){
            var btn=$(this);
            clearInterval(timer);
            btn.addClass("active").siblings().removeClass("active");
            var id=btn.attr("data-toggle");
            $(id).addClass("show").siblings().removeClass("show");
        })
    })
                            
        //************** new product**************************
    $.ajax({
        url:"http://127.0.0.1:3000/index/getNews",
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(result=>{
        for(var item of result){
            if(item.packet==1){
                 var img=item.img;
                var logo=item.logo;
                var title=item.title;
                var price=item.price;
                var nid=parseInt(item.nid);
                 var html=`<div>
                            <div><a href="details.html?nid=${nid}" target="_blank"><img src="${img}" alt="#"></a></div>
                            <div>
                                <div><img src="${logo}" alt=""></div>
                                <div><a href="">${title}</a></div>
                                <div><span>￥ ${price}</span></div>
                            </div>
                         </div>`;
                $("#faShoot>div").append(html);
                $("#faShoot>div").css("width",230*(result.length/2)+"px");
            }
            if(item.packet==2){
                var img=item.img;
                var logo=item.logo;
                var title=item.title;
                var price=item.price;
                var nid=item.nid;
                var html=`<div>
                            <div><a href="details.html?nid=${nid}" target="_blank"><img src="${img}" alt="#"></a></div>
                            <div>
                                <div><img src="${logo}" alt=""></div>
                                <div><a href="">${title}</a></div>
                                <div><span>￥ ${price}</span></div>
                            </div>
                         </div>`;
                $("#spoShoot>div").append(html);
                $("#spoShoot>div").css("width",230*(result.length/2)+"px");
            }
            
         }
         
        var num=0;
        $(".new-details>a:last-child").click(function(e){
            e.preventDefault();
            var $btn=$(this);
            if(num!= -(result.length/12)){
                num--;
                $(".comStyle>div:first-child").css("margin-left",num*230*4+"px");
             }
        })
        $(".new-details>a:first-child").click(function(e){
            e.preventDefault();
            var $btn=$(this);
            if(num!=0){
                num++;
                $(".comStyle>div:first-child").css("margin-left",num*230*4+"px");
            }
          })
         $(".new-title>div:last-child>span").click(function(){
            if(!$(this).hasClass("hover")){
                $(this).addClass("hover").siblings().removeClass("hover");
                var id=$(this).attr("data-trigger");
                if($(id).css("display")=="none"){
                    $(id).css("display","block").siblings("div").css("display","none");
                    $(id).children(":first").css("margin-left","0px");
                    num=0;
                }
            }
        })
        
    })
    
    //************** index-paster**************************
    $.ajax({
        url:"http://127.0.0.1:3000/index/getPaster",
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(result=>{
        for(var item of result){
            var {img,bigLogo}=item;
            if(item.packet==1){
            var html=`<div>
            <img src="${img}" alt="" class="mouseover">
            <div>
                <img src="${bigLogo}" alt="" >
            </div>
        </div>`
         $("#model-left").prepend(html);
        }
        if(item.packet==2){
            var html=`<div>
            <img src="${img}" alt="" class="mouseover">
            <div>
                <img src="${bigLogo}" alt="" >
            </div>
        </div>`
            $("#model-right").prepend(html);
            }
        }
    //    $(".model-style>div>img").on("mouseenter",function(){
    //         var $btn=$(this);
    //         console.log($btn);
    //         $btn.removeClass("mouseover").next().addClass("mouseover");
    //     })
    //     $(".model-style>div>img").mouseleave(function(){
    //        var $btn=$(this);
    //        $btn.addClass("mouseover").next().removeClass("mouseover");
    //     })
         
    $.ajax({
        url:"http://127.0.0.1:3000/index/getBrand",
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(result=>{
        var obj1=[];
        var obj2=[];
       for(var item of result){
            var img=item.img
        if(item.packet==1){
            obj1.push(item);
            var html=`<a href=""><img src="${img}" alt=""></a>`
            $("#model-left .center-logo>div").append(html);
        }
        if(item.packet==2){
            obj2.push(item);
            var html=`<a href=""><img src="${img}" alt=""></a>`
            $("#model-right .center-logo>div").append(html);
        }
       }
       var num=0;
       $(".brand-logo>a:first-child").click(function(e){
           var $btn=$(this);
           e.preventDefault();
            if(num!=0){
                num++;
                $(".center-logo>div>a:first-child").css("margin-left",90*num*10+"px");
            }
       })
       $(".brand-logo>a:last-child").click(function(e){
        var $btn=$(this);
        e.preventDefault();
         if(num!= -1){
             num--;
             $(".center-logo>div>a:first-child").css("margin-left",90*num*10+"px");
          }
        });
        $(".paster-title>div:last-child>span").click(function(){
            if(!$(this).hasClass("hover")){
                $(this).addClass("hover").siblings().removeClass("hover");
                var id=$(this).attr("data-trigger");
                $(id).css("display","block").siblings().css("display","none");
                $(id).find(".center-logo>div>a:first-child").css("margin-left",0);
                num=0;
            }
        })
        });
    })
    //************** brand-msg**************************
    var v1=document.getElementById("v1");
    v1.onclick=function(){
        var v1=this;
        v1.poster="";
        if(v1.paused){
            v1.play();
        }else{
        v1.pause();
        }
        v1.controls=true;
    }
    var v2=document.getElementById("v2");
    v2.onclick=function(){
        var v2=this;
        v2.poster="";
        v2.controls=true;
        if(v2.paused){
            v2.play();
        }else{
            v2.pause();
        }
    }
})