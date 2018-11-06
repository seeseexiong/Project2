
document.addEventListener('DOMContentLoaded', function (){
    var $headlineDiv = $("#headlineNews");
    var topHeadlines = [];

    getTopHeadlines();

    function initializeCards() {
        $headlineDiv.empty();
        var rowsToAdd = [];
        for (var i = 0; i < topHeadlines.length; i++) {
          rowsToAdd.push(createNewCard(topHeadlines[i]));
        }
        $headlineDiv.prepend(rowsToAdd);
      }

    function getTopHeadlines() {
        $.get("/api/topHeadlines", function(data){
            topHeadlines = data;
            initializeCards();
        })
    }
    function createNewCard(data) {
        $('.card-horizontal').append("<div class= 'card-content'>")
        $('.card-content').append("<h3>" + data.articles[0].title + "</h3>")
        $('.card-stacked').append("<div class= 'card-content'>");
        $('.card-content').append("<a href=" + data.articles[0].url + ">Read more</a>");
    };

});