//RECIPE FINDER APP PROJECT CODE

var searchQuery = "";
var resultsArray = ['apple', 'banana', 'orange', 'strawberry'];

function renderResults(){
    $('#results').empty();
    for (let i = 0; i < resultsArray.length; i++) {    
        var resultDiv = $('<div class="col-md-4">');
        var resultTemplate = '<div class="card mb-4 shadow-sm"><svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg><div class="card-body"><p class="card-text">Recipe Title</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" id="details-btn" class="btn btn-sm btn-outline-secondary">Details</button><button type="button" id="add-list-btn" class="btn btn-sm btn-outline-secondary">Add to list</button></div><small class="text-muted">Category</small></div></div></div>';
        var resultImg;
        var resultTitle;
        var resultLink;

            resultDiv.addClass('recipe-result');
            resultDiv.attr('data-name', resultsArray[i]);
            // resultItem.text(resultsArray[i]);
            resultDiv.append(resultTemplate);
            $('#results').append(resultDiv);
    }
};

$('#search-button').on('click', function(){
    event.preventDefault();
    searchQuery = $('#search-query').val().trim();
    console.log(searchQuery);
    renderResults();
});

$('#add-list-btn').on('click', function(){
    console.log("test 2");
});

