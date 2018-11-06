
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
        $($headlineDiv).append("<div class = 'card-horizontal'>");
        $('.card-horizontal').append("<div class= 'card-content'>")
        $('.card-content').append("<h1>" + data.articles.title + "</h1>")
        $($headlineDiv).append("<div class = 'card-stacked'>");
        $('.card-stacked').append("<div class= 'card-content'>");
        $('.card-content').append("<a href=" + data.articles.url + ">Read more</a>");


        
         
    }


})