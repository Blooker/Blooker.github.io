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
})