$(function(){
    var no=1;
    function getPage(pno){
        no=pno;
        var keywords;
        if(location.search.indexOf("keywords=")!=-1){
            keywords=location.search.split("=")[1];
            keywords=decodeURIComponent(keywords);
            var html=`<span>关键词：${keywords} <i>×</i></span>`;
            $(".list-navTop").html(html);
            $(".list-navTop>span>i").click(function(){
                var $i=$(this);
                $i.parent().css("display","none");
                location.href="list.html";
            })
    }else{keywords=null};
    $.ajax({
        url:"http://127.0.0.1:3000/list",
        data:{keywords:keywords,pno:pno,pageSize:16},
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
        }).then(res=>{
            console.log(res);
        var {count,pageCount,product,pno}=res;
        var html="";
        for(var item of product){
            html+=`<div>
            <div>
                <a href="details.html?nid=${item.nid}"><img src="${item.img}" alt=""></a>
                <div class="hover-show">限时抢￥${item.newPrice}</div>
            </div>
            <div>
                <p><a href="">${item.title}</a></p>
                <p>
                   ￥<span>${item.newPrice}</span>
                   <del>￥</del><del>${item.oldPrice}</del>
                   <i class="hover-show list-fav" ></i>
                </p>
            </div>
        </div>`
        }
        $(".content-main").html(html);
        $('.content-left>div').html(`共>${count}个结果`)
        var html1=`${pno} - ${pageCount}页 / <a href="#" class="${pno<2?'page-none':''}">上一页> </a>
        <a href="#" class="${pno==pageCount?'page-none':''}">下一页></a>`;
        $(".screen>div>span").html(html1);
        var text="";
        text=`<a href="#" class="${pno<2?'page-none':''}"><上一页</a>`;
        for(var i=0;i<pageCount;i++){
            text+=`<a href="#" class="${pno==(i+1)?'page-active':''}">${i+1}</a>`;
        }
        text+=`<a href="#" class="${pno==pageCount?'page-none':''}">下一页></a>`
        $(".page>div").html(text);
    })
    } 
    getPage(pno=1);
    $(".screen>div>span").on("click","a",function(e){
        e.preventDefault();
        var $a=$(this);
        if($a.text()=="上一页> "){
            getPage(no-1);
        };
        if($a.text()=="下一页>"){
            getPage(no+1);
        };
    });
    $(".page>div").on("click","a:not(.page-active)",function(e){
        e.preventDefault();
        var $a=$(this);
        if($a.text()=="<上一页"){
            getPage(no-1);
        }else if($a.text()=="下一页>"){
            getPage(no+1);
        }else{
            getPage(parseInt($a.html()));
        }
    })
})