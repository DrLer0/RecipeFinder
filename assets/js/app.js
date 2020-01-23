//RECIPE FINDER APP PROJECT CODE

var searchQuery = "";

function renderResults(response) {
    $('#homepage').hide();
    $('#search-results').show();
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

function renderDetails(response) {
    console.log(response);
    $('.modal-title').text(response.title);

    var detailsImg = response.image;
    var detailsIngredients = response.extendedIngredients;
    var instructions = response.instructions.split(".");

    $("#instructions").empty();
    for (let i = 0; i < instructions.length; i++) {
        var lineDiv = $(`<li>${instructions[i]}.</li>`)
        $("#instructions").append(lineDiv);
    }


    var detailsThumbnail = `<img class="details-thumbnail" src="${detailsImg}">`;
    $('#detail-thumbnail').empty().append(detailsThumbnail);

    $('#ingredients').empty();
    for (let i = 0; i < detailsIngredients.length; i++) {
        // option 1: sperate the ingredient by name, amount, unit
        const detail = detailsIngredients[i];
        // const name = detail.name;
        // const amount = detail.amount;
        // const unit = detail.unit;

        // option 2: directyl using the ingredient string
        var item = $(`<li class="ingredient-item" data-name=${detail.name}>${detail.originalString}</li>`);
        $('#ingredients').append(item);

    }


}

// Search input entry - pulls response for query
$('#search-button').on('click', function() {
    event.preventDefault();
    searchQuery = $('#search-query').val().trim();
    searchRecipes(searchQuery);
    //renderResults(searchQuery);
});

$('#home-logo').on('click', function() {
    event.preventDefault();
    $('#homepage').show();
    $('#search-results').hide();
    $('#results').empty();
});

// Gets ID from item and gets recipe information response
$(document).on('click', '.details-btn', function() {
    var id = $(this).attr("id");
    getRecipeInfo(id);
});

$(document).ready(function() {
    $('#search-results').hide();
});