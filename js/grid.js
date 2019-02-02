window.onpageshow = function () {
    $("main, header, footer").show();
}

$(document).ready(function () {    
//    // Fade in main, header and footer objects
//    $("main, header, footer")/*.hide()*/.fadeIn(200, function() {
//        // Once faded in, set body's background color to #f4f4f4
//        $("body").css(" background-color", "#f4f4f4");
//    });
    
    $("main, header, footer").show();
    anime ({
        targets: "main, header, footer",
        opacity: [0, 1],
        duration: 400,
        complete: function (){
            $("body").css(" background-color", "#f4f4f4");
        },
        easing: "easeInOutSine"
    });
    
    // When home button clicked, set URL to index.html
    $("#home-button").click(function () {
        window.location.href = "index.html";
    });
    
    $("#grid > div").hover(function() {
        $(this).css("border-bottom-color", "#009FFF");
        
        var name = $(this).find(".project-name");
        name.css("background", "#00BAFF")
        name.find("h3").css("color", "#FFF");
    }, function () {
        $(this).css("border-bottom-color", "#00BAFF");
        
        var name = $(this).find(".project-name");
        name.css("background", "#FFF")
        name.find("h3").css("color", "#000");
    });
})