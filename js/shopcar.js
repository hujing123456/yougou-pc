$(function(){
    function getCart(){
    $.ajax({
        url:"http://127.0.0.1:3000/cart/cartList",
        type:"get",
        dataType:"json",
        xhrFields:{
            withCredentials:true
        }
    }).then(res=>{
        console.log(res);
       if(res.code==-1 || res.data.length==0){
        $(".car-list").css("display","none");
        $(".unlogin").css("display","block");
       }else{
           var html="";
          for(var item of res.data){
           html+=`<tr>
           <td>
               <input type="checkbox" name="list[]">
               <a href=""><img src="http://127.0.0.1:3000/img/details/100980703_01_t.jpg" alt=""></a>
           </td>
           <td>${item.title}</td>
           <td>
               <P>颜色：${item.color}</P>
               <P>尺码：${item.size}</P>
           </td>
           <td>
               <span>${item.newPrice}</span>
               <div><span><i></i>限时抢</span></div>
           </td>
           <td>
               <div>
                   <button>-</button>
                   <button>${item.count}</button>
                   <button>+</button>
               </div>
           </td>
           <td>
               <div>${(item.count*item.newPrice).toFixed(2)}</div>
               
           </td>
           <td>
               <div>
                   <a href="">移入收藏夹</a>
                   <a href="">删除</a>
               </div>
           </td>
       </tr>`
          } 
          $("table>tbody:nth-child(2)").html(html);
          function getTotal(){
          var totals=$("tbody>tr>td:nth-child(6)>div");
          var totPrice=0;
          for(var tot of totals){
              var tot=parseFloat(tot.innerHTML);
              totPrice+=tot;
          }
          $("tfoot>tr>td:nth-child(2)>span:last-child").html("￥"+totPrice.toFixed(2));
        }
        getTotal();
          $("tbody>tr>td:nth-child(5)>div>button:nth-child(1)").click(function(){
            var num=$(this).next().html();
            if(num>1){ num--;$(this).next().html(num);}
            var price=$(this).parent().parent().prev().children("span").html();
            price=parseFloat(price);
            var total=$(this).parent().parent().next().children("div");
            total.html((num*price).toFixed(2));
            getTotal();
           })
           $("tbody>tr>td:nth-child(5)>div>button:nth-child(3)").click(function(){
            var num=$(this).prev().html();
            if(num<10){ 
                num++;
                $(this).prev().html(num);
                var price=$(this).parent().parent().prev().children("span").html();
                price=parseFloat(price);
                var total=$(this).parent().parent().next().children("div");
                total.html((num*price).toFixed(2));
                getTotal();
            }else{
                alert("超多只能购买10双！");
            }
           })
           function ischecked(ele,other){
            if(ele.prop("checked")){
                $("table>tbody:nth-child(2)>tr>td>input").prop("checked",true);
                other.prop("checked",true);
            }else{
                $("table>tbody:nth-child(2)>tr>td>input").prop("checked",false);
                other.prop("checked",false);
            }
           }
           $("thead>tr>td>input").click(function(){
                ischecked($("thead>tr>td>input"),$("table>tbody:nth-child(3)>tr>td>input"));
           })
           
           $("table>tbody:nth-child(3)>tr>td>input").click(function(){
            ischecked($("table>tbody:nth-child(3)>tr>td>input"),$("thead>tr>td>input"));
           })
           $("table>tbody:nth-child(2)>tr>td>input").click(function(){
               var unchecked=$("table>tbody:nth-child(2)>tr>td>input:not(:checked)");
               $("table>tbody:nth-child(3)>tr>td>input").prop("checked",unchecked.length==0);
                $("thead>tr>td>input").prop("checked",unchecked.length==0);
           })
         }
     })
    }
    getCart();
})