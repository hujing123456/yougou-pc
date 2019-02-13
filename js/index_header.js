$(function(){
    $("<link rel='stylesheet' href='css/index_header.css'>").appendTo("head");
    $.ajax({
        url:"index_header.html",
        type:"get"
    }).then(result=>{
        $(result).appendTo("header");
            var uname=sessionStorage.getItem("uname");
            if(uname){
                $("div.login").html(`<a href=""><i></i>您好，${uname} </a>
                <a href="" class="logout"> [退出] </a>`)
            }
            $(".logout").click(function(e){
                e.preventDefault();
                var $a=$(this);
                $.ajax({
                    url:"http://127.0.0.1:3000/user/signout",
                    type:"get",
                    xhrFields:{
                        withCredentials:true
                    }
                }).then(res=>{
                    alert("已退出登录");
                    sessionStorage.removeItem("uname");
                    history.go(0);
                })
            })
            var btn=$(".container-bar");
            btn.on("mouseenter","[data-toggle]",function(){
            var btn=$(this);
            var id=btn.attr("data-toggle");
            $(id).css("z-index","10").siblings().css("z-index","0").parent().css("display","block");
        })
       btn.on("mouseleave","[data-toggle]",function(){
            var btn=$(this);
            var id=btn.attr("data-toggle");
            $(id).parent().css("display","none");
        })
        $(".nav-show").on("mouseenter","ul",function(){
            var btn=$(this);
            btn.parent().css("display","block");
        })
        $(".nav-show").on("mouseleave","ul",function(){
            var btn=$(this);
            btn.parent().css("display","none");
        });
        
        $(window).scroll(function(){
            var $li=$(".container-bar>ul>li:first-child");
            var scrollTop=$(document).scrollTop();
            if(scrollTop>=230){
                $li.removeClass("navchange");
                $(".container-bar").addClass("navShow");
            }else{
                $li.addClass("navchange");
                $(".container-bar").removeClass("navShow");
            }
        });
        $(".search>i").click(function(){
            var $i=$(this);
            var keywords=$i.prev().val();
            if(keywords.trim()!=""){
                location.href=`list.html?keywords=${keywords}`;
            }else{
                location.href="list.html";
            }
        }).prev().keyup(function(e){
            if(e.keyCode==13){
                $(this).next().click();
            }
        })  
    })
    
})