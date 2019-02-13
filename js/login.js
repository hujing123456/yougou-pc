 window.onload=function(){
     var as=document.querySelectorAll(".input-top>a");
     for(var a of as){
         a.onclick=function(){
             var a=this;
            if(a.className!="login-active"){
                a.className="login-active";
                if(a.nextElementSibling!=null){
                    a.nextElementSibling.className="";
                }else{
                    a.previousElementSibling.className="";
                }
                var id=a.getAttribute("data-id");
                var div=document.getElementById(id);
                var divs=document.querySelectorAll(".input>div.input-top~div");
                for(var d of divs){
                    d.style.display="none";
                }
                 div.style.display="block";
             }
         }
     }
     var isTestUname=false;
     var isTestUpwd=false;
     $(".input-body>.body-name>div>input").on("blur",function(e){
         var $text=$(this);
         var reg=/^\w{6,15}$/;
         var $prompt=$(".input-body>div.body-name>div:last-child>div");
         if(!reg.test($text.val())){
            $prompt.html("请确认用户名为6-15位数字字母或下划线组成");
            $prompt.css("color","red");
            $prompt.parent().removeClass("test");
            isTestUname=false;
         }else{
             isTestUname=true;
             $prompt.parent().addClass("test");
            }
            
     })
    
     $(".input-body>.body-pwd>div>input").on("blur",function(e){
        var $text=$(this);
        var reg=/^[0-9a-zA-Z]{6,11}$/;
        var $prompt2=$(".input-body>div.body-pwd>div:last-child>div")
        if(!reg.test($text.val())){
           $prompt2.html("请确认密码为6-11位的数字或字母组成");
           $prompt2.css("color","red");
           $prompt2.parent().removeClass("test");
           isTestUpwd=false;
        }else{isTestUpwd=true;$prompt2.parent().addClass("test");}
    })
    $("div.input>div.input-body>button").on("click",function(e){
        e.preventDefault();
        var uname=$(".input-body>.body-name>div>input").val();
        var upwd=$(".input-body>.body-pwd>div>input").val();
        if(isTestUname==true && isTestUpwd==true){
            $.ajax({
                url:"http://127.0.0.1:3000/user/login",
                type:"post",
                data:{uname,upwd},
                dataType:"json",
                xhrFields:{
                    withCredentials:true
                }
            }).then(result=>{
                console.log(result);
                if(result.code==1){
                    alert("登录成功");
                    sessionStorage.setItem("uname",result.uname);
                    location.href="index.html";
                }else{
                    alert(result.msg);
                    history.go(0);
                }
            })
        }
    })
    
}
