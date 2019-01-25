// Declaring variables
//var windowFocus;

var projectIcons = [];
var timer;

var dropDiameter;
var dropCenter;
var mainHeight;
var headerHeight;

var dropAreaFade;

var animateIcons = true;

var isMobile = false;

/*  On some devices, a page's last CSS state is shown when pressing
    the back button. Also, document.ready doesn't run on some devices 
    when back button pressed. This results in the wrong styling being 
    displayed upon pressing back button. Function onpageshow() is 
    used to get around this, resetting the saved CSS state
    back to normal. */
window.onpageshow = function () {
    
////     Show everything in body
//    $("main, header, footer .container").show();
    
    isMobile = window.mobilecheck();
    
    // Reset project drop and project icon z-indexes
    $("#project-drop").css("z-index", "2");
    $(".icon-container").css("z-index", "3");
}

$(window).on('pageshow', function(){
    isMobile = window.mobilecheck();
    
    if (isMobile) {
        $("#mobile-break").css("display", "block");
        $("#scroll-anchor").css("display", "block");
    }
    
    projectIcons = [];
    timer = 0;
    
    updateDropAreaInfo();
                             
    initProjectIcons();
    
//    windowFocus = true;
    updateIconPos();
    
    // Hide page content so intro animations will run properly
    $("main").hide();
    $("header").hide();
    $("footer .container").hide();
    
    // When mouse is released anywhere, run dropAreaOut()
//    $("*").mouseup(function () {
//        dropAreaOut(); 
//    });
    
    initDropArea();
    
    startupAnim();
    
    // Run the following code 60 times every second (60 FPS)
    setInterval(function(){
//        windowFocus = document.hasFocus();
//        windowFocus = true;
        
        if (animateIcons) {
            updateIconPos();
        }
    }, 1000/60);
});

//// Runs upon the page loading
//$(document).ready(function() {    
//    onReady();
//});

// Code to make startup animation run
function startupAnim () {
//    // Called slideDown, but actually makes footer slide up
//    $("footer .container").slideDown(800);
//    
//    // Slide header down
//    $("header").slideDown(800, function(){
//        // Fade in main after header anim is finished
//        $("main").fadeIn(800);
//    });
    
    $("footer .container").show();
    anime({
        targets: "footer .container",
        translateY: [
            {value: [100,0], duration: 800}
        ],
        
        easing: "easeInOutSine"
    });
    
    $("header").show();
    anime({
        targets: "header",
        translateY: [
            {value: [-100, 0], duration: 800}
        ],
        
        easing: "easeInOutSine"
    }).finished.then(function () {
        $("main").show();
        anime({
            targets: "main",
            opacity: [0,1],
            duration: 500,
            easing: "easeInOutSine"
        });
    });
}

/*  Animation that happens when a project icon is
    dragged into the drop area 
    
    Params:
    projectHref - The URL of the project's page */
function loadProjectAnim (projectHref) {   
//    // Bring drop area to front
//    $("#project-drop").css("z-index", "3");
//    
//    /*  Hide overflow in body (stops scroll bars from appearing
//        when drop area grows) */
//    $("body").css("overflow", "hidden");
//    
//    /*  Scales drop area to 2000% in X and Y axis. Anim 
//        runs for 1000ms (1s) */
//    $("#project-drop").toggle("scale", {
//        direction:"both",
//        percent: "2000"
//    }, 1000, function () {
//        // This code runs after drop area scaling is done
//        
//        // Hide everything in body
//        $("body *").hide();
//        
//        // Set current URL to projectHref (go to project page)
//        window.location.href = projectHref;
//        
//    });
    
    animateIcons = false;
    
    // Bring drop area to front
    $("#project-drop").css("z-index", "3");
    dropAreaOut();
    
    $("#project-drop p").hide();
    anime({
        targets: "#project-drop",
        scale: "25",
        duration: 700,
        easing: "easeInOutQuad"    
    }).finished.then(function() {
        // Hide everything in body
        $("body *").hide();
        
        // Set current URL to projectHref (go to project page)
        window.location.href = projectHref;
    });
}

/*  Sets up important variables, objects and settings
    for project icons */
function initProjectIcons () {
    // Iterate through all elements with project-icon class
    $(".icon-container").each(function () {
        
        // Push object into projectIcons array
        projectIcons.push({
            element: $(this),           // This project icon element
            currentPos: {x: 0, y: 0},   // Icon's current rotation pos
            isDragging: false           // Is icon being dragged?
        }); 
    });
    
    // Make all project icons jQuery UI draggable
    $(".icon-container").draggable({
        containment: 'parent',  // Can't be dragged out of parent
        
        // Runs when user starts dragging icon
        start: function (event, ui) {
            // wrote next line using info from https://stackoverflow.com/questions/18850289/datadraggable-is-undefined-in-jquery-ui-1-10-3
            
            // Get the icon currently being dragged
            var draggedObj = $(this).data("ui-draggable").element;
            
            // Set isDragging to true in icon's respective object in projectIcons array
            projectIcons[draggedObj.index()].isDragging = true;
        },
        
        // Runs when user stops dragging icon
        stop: function (event, ui) {
            // wrote next line using info from https://stackoverflow.com/questions/18850289/datadraggable-is-undefined-in-jquery-ui-1-10-3
            
            // Get the icon that has stopped being dragged
            var draggedObj = $(this).data("ui-draggable").element;
            
            // Set isDragging to false in icon's respective object in projectIcons array
            projectIcons[draggedObj.index()].isDragging = false;
        }
    });
}

/*  Sets up important variables and settings for project icons */
function initDropArea () {
    /*  Makes drop area element jQuery Droppable (draggables
        can be dropped on this element, causing some code
        to be triggered in the process) */
    $("#project-drop").droppable({
        
        // Runs when jQuery draggable is dragged over this object
        over: function (event, ui) {
            /*  Call dropAreaOver, passing the path to the appropriate
                background image for the project */
            
            // wrote next line using info from https://stackoverflow.com/questions/18850289/datadraggable-is-undefined-in-jquery-ui-1-10-3
            // Get the project icon object that was dropped
            var draggedObj = ui.draggable;
            var imgUrl = ""
            
            console.log(draggedObj.index());
            
            switch(draggedObj.index()) {
                case (0):
                    imgUrl = "img/interactomy/interactomy_DropAreaImg.jpg";
                    break;
                    
                case (1):
                    imgUrl = "img/march-the-cube/march-the-cube_DropAreaImg.jpg";
                    break;
                    
                case (2):
                    imgUrl = "img/violence-vid-games/violence-vid-games_DropAreaImg.jpg";
                    break;
                
                case (3):
                    imgUrl = "img/disasteroids/disasteroids_DropAreaImg.jpg";
                    break;
                    
                default:
                    imgUrl = "img/16-9-Placeholder.jpg";
                    break;
            }
            
            dropAreaOver(imgUrl);
            
        },
        
        // Runs when jQuery draggable is dragged away from this object
        out: function (event, ui) {
            dropAreaOut();
        },
        
        // Runs when jQuery draggable is dropped on this object
        drop: function (event, ui) {            
            // wrote next line using info from https://stackoverflow.com/questions/18850289/datadraggable-is-undefined-in-jquery-ui-1-10-3
            // Get the project icon object that was dropped
            var draggedObj = ui.draggable;
            
            // Set the roulette's container to cover the whole height of the page
            $("#roulette.container").css("height", "100vh");
            
            /*  Iterate through all children of project icon that are 
                a tags (there should only be one for each icon) */
            draggedObj.find("a").each (function () {
                /*  Call loadProjectAnim, passing the link's href attribute
                    as an argument (link to project page) */
                loadProjectAnim($(this).attr("href"));
            });
        }
    });
    
    dropAreaFade = anime({
        targets: "#project-drop",
        opacity: [0,1],
        duration: 200,
        easing: "easeInOutSine",
        update: function () {
            console.log("fading");
        },
        autoplay: false
    });
    
    dropAreaFade.play();
}

// Keeps variables regarding the drop area's position and size updated
function updateDropAreaInfo () {
    // Get drop area's width and position
    dropDiameter = $("#project-drop").width();
    dropCenter = $("#project-drop").position();
}

/*  This function handles positioning and rotating the project icons
    around the drop area, and holds the majority of my custom JS.
    This function is run 60 times a second (see document.ready) */
function updateIconPos () {
    // Some rotation logic referenced from here: https://youtu.be/BGe5HDsyhkY
    
    // If window isn't in focus, don't run the function
//    if (!windowFocus){
//        return;
//    }
    
    // Increase the timer by a very small amount
    timer += (1*0.0025);
    
    /*  If project drop area is visible, update its info
        (When hidden, it's width and position can't be accessed) */
    if (!$("#project-drop").is(":hidden")) {
        updateDropAreaInfo();
    }
    
    // Get project icon width
    var iconWidth = $(".icon-container > .project-icon").width();
    
    /*  Calculate project icon offset (amount to add on to
        the icon's distance from the center of the drop area) */
    var offsetAmount = dropDiameter/4;
    
    // Iterate through projectIcons array
    for (var i=0; i<projectIcons.length; i++) {
        
        /*  These lines of code look horrible, but I'll try to explain:
            - Math.PI * (i/2) is the angle that dictates each project icon's
              starting position when passed into sin and cos. As i increases,
              the icon's starting position is increased by 90 degrees around
              the drop circle. This results in the four project icons being
              placed at 0 degrees, 90 degrees, 180 degrees and 270 degrees
              around project drop circle.
            
            - (dropDiameter/2 + offsetAmount) calculates how far the project
              icon will be from the center of the project drop circle.
              dropDiameter/2 is the radius of the circle, which is added to
              the offsetAmount. The angle is multiplied by this scale to
              apply the distance.
              
            - The timer variable is added to all of the above stuff to gradually
              rotate each project icon around the project drop area.
              
            - Finally, the icons are centered around their rotation positions
              by subtracting the iconWidth (halved for the X axis and quartered
              for Y axis; not sure why they're different but it works)
              
            
        */
        projectIcons[i].currentPos.x = (dropCenter.left + Math.cos(timer +Math.PI*(i/(projectIcons.length*0.5)))*(dropDiameter/2 + offsetAmount))- iconWidth/2;
        projectIcons[i].currentPos.y = (dropCenter.top +Math.sin(timer +Math.PI*(i/(projectIcons.length*0.5)))*(dropDiameter/2 + offsetAmount)) - iconWidth/4;
        
        /*  If projectIcons[i]'s element is not being dragged apply the positions calculated above
            to that element */
        if (!projectIcons[i].isDragging) {
            projectIcons[i].element.offset({
                top: projectIcons[i].currentPos.y,
                left: projectIcons[i].currentPos.x
            });
        }
    }
}

/*  Runs an animation in the drop area when icon is dragged over it
    Params:
    bgImgUrl - The path to an image that will be set as the drop area's background
    */
function dropAreaOver (bgImgUrl) {
    // Set the drop area's background image to the img at bgImgUrl
    $("#project-drop-bg").css("background-image", "url('" + bgImgUrl + "')");
    
//    /*  Stop drop area's current animation and fade the object out,
//        revealing the background object that is hiding behind it */
//    $("#project-drop").stop().fadeOut(200);
    dropAreaFade.reverse();
    dropAreaFade.play();
}

// Runs an animation in the drop area when icon is dragged out of it
function dropAreaOut () {
//    /*  Stop drop area's current animation and fade the object in,
//    hiding the background object and reintroducing the drop area */
//    $("#project-drop").stop().fadeIn(200);
    dropAreaFade.reverse();
    dropAreaFade.play();
}

// code from detectmobilebrowsers.com
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};