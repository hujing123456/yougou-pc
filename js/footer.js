$(function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head");
    $.ajax({
        url:"footer.html",
        type:"get"
        }).then(result=>{
            $(result).appendTo("footer")
    })
})
