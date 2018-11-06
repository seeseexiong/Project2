$(document).ready(function (){
    var $ = $("");
    var $headlineDiv = $(".headlineNews");
    var topHeadlines = [];

    getTopHeadlines();

    function initializeCards() {
        $headlineDiv.empty();
        var rowsToAdd = [];
        for (var i = 0; i < topHeadlines.length; i++) {
          rowsToAdd.push(createNewRow(topHeadlines[i]));
        }
        $headlineDiv.prepend(rowsToAdd);
      }

    function getTopHeadlines() {
        $.get("/api/topHeadlines", function(data){
            topHeadlines = data;
            initializeCards();
        })
    }



})