/** Welcome to the LacunaErrata javascript main file*/

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


    /** The code below governs the population and transitions of picture divs */

    var btns = document.querySelectorAll('button');

    function picSwitch(e){

      /** Can you keep track of the variables?! */
      var allDivs = document.getElementsByClassName("pictures");
      var btnName = e.target.id;
      var divName = document.getElementsByClassName(btnName)[0];
      var divChild = divName.firstChild;
      var denverImgDivs = document.getElementsByClassName("denver")[0];
      var denverImgArray = denverImgDivs.children;

    /** Populate selected picture div with images. */
      if (divChild == null){
        var imgDirectoryPath = "static/blog/images/" + btnName + "/";
        var jsonListLocation = imgDirectoryPath + btnName +".json";

        /** Check if any previously loaded images need the "pic-fadein" class removed */

        if(denverImgArray[0].classList[1]="pic-fadein"){
            for(let i = 0; i < denverImgArray.length; i++){
              denverImgArray[i].classList.remove("pic-fadein");
            }
        }

        function readList(response){
          return response.json();
        }

        function profferIMG(response){
          return response.blob();
        }

        function appendIMG(blob){
          var imgURL = URL.createObjectURL(blob);
          var nextIMG = document.createElement('img');
          var containerDiv = document.createElement('div');
          nextIMG.src = imgURL;
          divName.appendChild(containerDiv);
          containerDiv.appendChild(nextIMG);
          var newImgClass = "imgContainer";
          containerDiv.classList.add(newImgClass);
        }

        function fetchAllImages(jsonImgList){
          for(var i = 0; i < jsonImgList.length; i++){
            var newDirectoryPath = imgDirectoryPath + jsonImgList[i];
            fetch(newDirectoryPath)
            .then(profferIMG)
            .then(appendIMG)
          }
        }

        function populatePicDivs(jsonListDir){
          fetch(jsonListDir)
          .then(readList)
          .then(fetchAllImages)
        }

        populatePicDivs(jsonListLocation);
      }


    /** Adjust the CSS styles whenever a button is clicked */


      for(let i = 0; i < allDivs.length; i++){
        if(allDivs[i].classList.contains(btnName)){
          var desiredDiv = i;
        }else{
          allDivs[i].classList.add("pic-fadeout");
          allDivs[i].classList.remove("pic-fadein");
        }
      }
      allDivs[desiredDiv].classList.add("pic-fadein");
      allDivs[desiredDiv].classList.remove("pic-fadeout");


    }


    for (let i=0; i<btns.length; i++){
      btns[i].onclick = picSwitch;
    }



    /** Intersection Observer API implementation */

    // Get all of the images that are marked up to lazy load
    const images = document.querySelectorAll('.js-lazy-image');

    const config = {
      // If the image gets within 50px in the Y axis, start the download.
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    // The observer for the images on the page
    let observer = new IntersectionObserver(onIntersection, config);
      images.forEach(image => {
        observer.observe(image);

    });

    function lazyLoadImage(newImage) {
      var observedSRC = newImage.dataset.src;
      newImage.src = observedSRC;
    }

    function onIntersection(entries) {
      // Loop through the entries
      entries.forEach(entry => {
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {
          // Stop watching and load the image
          observer.unobserve(entry.target);
            lazyLoadImage(entry.target);
            entry.target.parentElement.classList.remove("pic-fadeout");
            entry.target.parentElement.classList.add("pic-fadein");
          }
      });
    }


var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

if(isSafari === true){
  var lacunaSwitch = document.getElementsByClassName("lacuna-style")[0];
  lacunaSwitch.classList.remove("lacuna-style");
  lacunaSwitch.classList.add("lacuna-safari-style");
}
