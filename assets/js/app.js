//RECIPE FINDER APP PROJECT CODE

var searchQuery = "";
//var resultsArray = ['apple', 'banana', 'orange', 'strawberry'];

function renderResults(response){
    $('#results').empty();
    console.log(response.results);
    var resultsArray = response.results;
    for (let i = 0; i < resultsArray.length; i++) {    
        var resultImg = "https://spoonacular.com/recipeImages/" + resultsArray[i].image;
        var resultTitle = resultsArray[i].title;
        var resultCooktime = resultsArray[i].readyInMinutes;
        var resultId = resultsArray[i].id;

        var resultDiv = $('<div class="col-md-4">');
        var resultTemplate = `<div class="card mb-4 shadow-sm"><img class="thumbnail" src="${resultImg}"><div class="card-body"><p class="card-text">${resultTitle}</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" id="${resultId}" class="details-btn btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">Details</button><button type="button" id="add-list-btn" class="btn btn-sm btn-outline-secondary">Add to list</button></div><small class="text-muted">Cook time: ${resultCooktime} mins</small></div></div></div>`;

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
    searchRecipes(searchQuery);
    //renderResults(searchQuery);
});

$(document).on('click', '.details-btn', function(){
    var id = $(this).attr("id");
    getRecipeInfo(id);
});

