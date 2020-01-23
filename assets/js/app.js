//RECIPE FINDER APP PROJECT CODE

var searchQuery = "";
var resultsArray = ['apple', 'banana', 'orange'];

function renderResults(){
    $('#results').empty();
    for (let i = 0; i < resultsArray.length; i++) {    
        var resultDiv = $('<div class="col-md-4">');
        var resultImg;
        var resultTitle;

            // resultItem.addClass('movie');
            // resultItem.attr('data-name', resultsArray[i]);
            // resultItem.text(resultsArray[i]);
            $('#results').append(resultDiv);
    }
};

$('#search-button').on('click', function(){
    event.preventDefault();
    searchQuery = $('#search-query').val().trim();
    console.log(searchQuery);
    renderResults();
});

