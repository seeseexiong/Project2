(function ($) {
    $(function () {

        $('.sidenav').sidenav();
        $('.parallax').parallax();
        $('.dropdown-trigger').dropdown();
        $(document).ready(function () {
            $('.sidenav').sidenav();
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space


// When the user scrolls the page, execute myFunction 
window.onscroll = function () { myFunction() };

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// smooth scroll link=======================

$(document).ready(function () {
    // Add smooth scrolling to the take a peek link

    $("#download-button-2").on('click', function (event) {

        console.log('slow scroll callback called')
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
        return false;
    });
    $('#signInModal').modal();
    $('#signUpModal').modal();
    $('#modal1').modal();
    $('#modal2').modal();

});

// News API =================================================================

$.ajax({
    url:
        "https://newsapi.org/v2/top-headlines?sources=national-geographic,entertainment-weekly&apiKey=8eb98b7edadc498986a4c7408ee44ab3",
    method: "GET",
    error: function () {
        console.log("fucked");
    },
    success: function (data) {
        processData(data);
    }
});

function processData(data) {
    var articleItems = [];

    for (var i = 0; i < data.articles.length; i++) {


        var newsDiv = $("<div class='card'>");

        var title = data.articles[i].title;
        var description = data.articles[i].description;
        var artUrl = data.articles[i].url;
        var image = data.articles[i].urlToImage;

        var cardDiv = $("<div>");
        cardDiv.addClass("card-header");
        var headerName = $("<h4>");
        headerName.text(name);
        cardDiv.append(headerName);
        newsDiv.append(cardDiv);

        var cardBody = $("<div>")
        cardBody.addClass("card-body");
        newsDiv.append(cardBody);

        var cardRow = $("<div>");
        cardRow.addClass("row");

        cardBody.append(cardRow);
        // Image result from News Api
        var colOne = $("<div>");
        colOne.addClass("col-lg-4");
        cardRow.append(colOne);

        var imgDisplay = $("<img>");
        imgDisplay.attr("width", 400);
        imgDisplay.attr("height", 250);
        imgDisplay.attr("src", image);
        colOne.append(imgDisplay);

        var $title = $(
            "<a href=" + artUrl + '><div class="title">' + title + "</div ></a>"
        );
        var $description = $(
            "<a href=" +
            artUrl +
            '><div class="description">' +
            description +
            "</div ></a>"
        );

        $(".wrapper").append(imgDisplay, $title, $description,"_______________________________________________________________________________________",  );
        console.log(artUrl);
    }
}

