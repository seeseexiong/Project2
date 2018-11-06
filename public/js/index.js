
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
        console.log(topHeadlines)
        $headlineDiv.prepend(rowsToAdd);
      }

    function getTopHeadlines() {
        $.get("/api/topHeadlines", function(data){
            topHeadlines = [];
            for (var x = 0; x < data.length; x++) {
                console.log(data[x])
                for (var y = 0; y < data[x].articles.length; y++) {
                    console.log(data[x].articles[y])
                    topHeadlines.push(data[x].articles[y])
                }
            }
            initializeCards();
        })
    }
    function createNewCard(data) {
        $('.card-content').append("")
        $('.card-horizontal').append("<div class= 'card-content'>")
        $('.card-content').append("<h3>" + data.title + "</h3>")
        $('.card-stacked').append("<div class= 'card-content'>");
        $('.card-content').append("<a href=" + data.url + ">Read more</a>");
    };

});