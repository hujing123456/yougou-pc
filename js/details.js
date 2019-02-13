$(function(){
   var nid=location.search.slice(5);
   if(nid==1||nid==2||nid==25||nid==26||nid==13||nid==14||nid==15||nid==27||nid==28){
     $.ajax({
        url:"http://127.0.0.1:3000/details",
        data:{nid:nid},
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(result=>{
        var {colorUrl,pics,product} =result;
        var html="";
        for(var p of pics){
            var {nid,imgs,imgm,imgl} =p;
            html+=`<li><img src="${imgs}" data-m="${imgm}" data-l="${imgl}"></li>`;
        }
        $(".img-t>ul").append(html);
        $(".img-m>img").prop("src",pics[0].imgm);
        $(".img-l").css("background-image",`url(${pics[0].imgl})`);
        $(".img-t>ul").on("mouseover","li",function(){
            var $li=$(this);
            if($li.has("i").length==0){
                $li.append("<i></i>").siblings().children("i").remove();
                $li.children("img").css("border","1px solid #333");
                $li.siblings().children("img").css("border","1px solid #ccc");
                var imgm=$li.children("img").attr("data-m");
                var imgl=$li.children("img").attr("data-l");
                $(".img-m>img").prop("src",imgm);
                $(".img-l").css("background-image",`url(${imgl})`);
            };
        });
        $(".cover").mouseover(function(){
            $(".chose").css("display","block");
            $(".img-l").css("display","block");
        })
        $(".cover").mouseout(function(){
            $(".chose").css("display","none");
            $(".img-l").css("display","none");
        })
        $(".cover").mousemove(function(e){
            var left=e.offsetX-224.3/2;
            if(left<0){left=0};
            if(left>260.7){left=260.7}
            var top=e.offsetY-210/2;
            if(top<0){top=0};
            if(top>275){top=275};
            $(".chose").css({"left":left+'px',"top":top+'px'});
            $(".img-l").css("background-position",`-${left*2.0833}px -${top*2.08333}px`)
        });
        $(".content-right>a>img").prop("src",product.logo);
        $(".content-right>h1").text(product.title);
        $(".content-right>p>strong").text(product.newPrice);
        $(".content-right>p>del").text(`¥${product.oldPrice}`);
        var html="";
        for(var c of colorUrl){
            html+=`<a href="details.html?nid=${c.nid}" class="${nid==c.nid?'color-active active-border':''}"><img src=${c.colorImg} alt=""></a>`
        }
        $(".color").append(html);
        $(".size-num").append(product.size);
        var size="";
        $(".size-num").on("click","a",function(e){
            e.preventDefault();
            var $a=$(this);
            if($a.has("i").length==0){
                $a.append("<i></i>").siblings().children("i").remove();
                $a.css("border","1px solid #333").siblings().css("border","1px solid #ccc");
            }
            size=parseFloat($a.html());
        })
        var num=1;
        var count=1;
        $(".data-up").click(function(e){
            e.preventDefault();
            var $btn=$(this);
            num++;
            if(num>99){num=99};
            $(".count>input").val(num);
            count=$(".count>input").val();
        });
        $(".data-down").click(function(e){
            e.preventDefault();
            var $btn=$(this);
            num--;
            if(num<1){num=1};
            $(".count>input").val(num);
            count=$(".count>input").val();
        })
        if(product.isSale==1){
            var html=`<div class="sale">
            <i>限时抢</i>
            <span></span>
            </div>`;
            $(".line").before(html);
        function timer(){
        var now=new Date();
        var later=new Date("2019/2/4 00:00:00")
        var s=parseInt((later-now)/1000);
        if(s>0){
            var d=Math.floor(s/(3600*24));
            if(d<10){d="0"+d};
            var h=Math.floor((s%(3600*24))/3600);
            if(h<10){h="0"+h};
            var m=Math.floor(s%3600/60);
            if(m<10){m="0"+m};
            var ns=Math.floor(s%60);
            if(ns<10){ns="0"+ns};
           $(".sale>span").html(`还剩${d}天${h}小时${m}分钟${ns}秒`);
         }else{
            $(".sale>span").html(`活动已结束`);
            } 
         }
        setInterval(timer,1000);
        }
        $(".qr-code>img").prop("src",product.qrCode);
        var color=product.color;
        $(".addShopcar>a:first-child").click(function(e){
            e.preventDefault();
            $btn=$(this);
            if(size==""){alert("请选择尺码")}else{
                $.ajax({
                    url:"http://127.0.0.1:3000/cart/addCart",
                    data:{nid,count,color,size},
                    type:"post",
                    xhrFields:{
                        withCredentials:true
                    }
                }).then(res=>{
                    alert(res.msg);
                    if(res.code==1){
                    location.href="shopcar.html";
                    }else{
                        location.href="login.html";
                    }
                })
            }
           
        })
    })
    $.ajax({
        url:"http://127.0.0.1:3000/details/getDetails",
        data:{nid:nid},
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(result=>{
        $(".desc").html(result.detail.desc1);
        $(".details-size").html(result.detail.size);
        $('.details-img').html(result.detail.detail_img);
        $(".details-brand>img").prop("src",result.brand.s_img);
        $('.details>p').html(result.brand.spec);
    })
    $.ajax({
        url:"http://127.0.0.1:3000/index/getNews",
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(res=>{
        var html="";
        for(var i=0;i<res.length;i++){
            var j=Math.floor(Math.random()*res.length);
            html+=`<div>
            <a href="details.html?nid=${res[j].nid}"><img src="${res[j].img}" alt=""></a>
            <p><img src="${res[j].logo}" alt=""></p>
            <a href="#">${res[j].title}</a>
            <p>￥${res[j].price}</p>
         </div>`
            res.splice(j,1);
        }
        $(".pro-list").append(html);
        $(".pro-list").css("width",res.length*278+"px");
        var num=0;
        $(".fav-recommend>a:first-child").click(function(e){
            e.preventDefault();
            var $a=$(this);
            if(num!=0){
                num++;
                $(".pro-list").css("margin-left",278*num+"px");
            }
        });
        $(".fav-recommend>a:last-child").click(function(e){
            e.preventDefault();
            var $a=$(this);
            if(num!= -(res.length-4)){
                num--;
                $(".pro-list").css("margin-left",278*num+"px");
            }
        })
    })
    }
    else{
        location.href="error.html";
    }


})