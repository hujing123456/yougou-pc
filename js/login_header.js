$(function(){
    $("<link rel='stylesheet' href='css/login_header.css'></link>").appendTo("head");
    $.ajax({
        url:"login_header.html",
        type:"get"
    }).then(result=>{
        $(result).replaceAll("header");
        var uname=sessionStorage.getItem("uname");
        if(uname){
            $("div.login").html(`<a href=""><i></i>您好，${uname} </a>
                <a href="" class="logout"> [退出] </a>`)
        };
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
    })
})