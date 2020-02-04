// RECIPE FINDER APP PROJECT CODE


// Global Variables
var searchQuery = "";
var detailsIngredients;
var shoppingList = [];

function renderResults(response) {
    console.log(response);
    $("#homepage").hide();
    $("#search-results").show();
    $("#recipeResults").empty();
    $('#result-text').text(searchQuery);
    // console.log(response.results);
    var resultsArray = response.results;
    for (let i = 0; i < resultsArray.length; i++) {
        var resultImg =
            "https://spoonacular.com/recipeImages/" + resultsArray[i].image;
        var resultTitle = resultsArray[i].title;
        var resultCooktime = resultsArray[i].readyInMinutes;
        var resultId = resultsArray[i].id;

        var resultDiv = $('<div class="col-6">');
        var resultTemplate = `
        <div class="card mb-4 shadow-sm fly">
            <img class="thumbnail" src="${resultImg}">
            <div class="card-body">
                <p class="card-text">${resultTitle}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" id="${resultId}" class="details-btn btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">Details</button>
                    </div>
                <small class="text-muted"><i class="far fa-clock"></i> Cook time: ${resultCooktime} mins</small>
                </div>
            </div>
        </div>`;

        resultDiv.addClass("recipe-result");
        resultDiv.attr("data-name", resultsArray[i]);
        // resultItem.text(resultsArray[i]);
        resultDiv.append(resultTemplate);
        $('#recipeResults').prepend(resultDiv);
    }
    $('#recipeResults').append(`<div class="col-10"></div>`)
    $('#recipeResults').append(`<div class="col-2"><button id="btn-more" class="btn btn-sm btn-outline-secondary">More>>></button></div>`);
    $("#btn-more").on("click",function(){
        console.log(response.offset+response.number)
        searchRecipes(searchQuery,response.offset+response.number);
    })
    
}

function renderRestaurants(restaurants) {
    // console.log("length here", restaurants[19]);
    $("#homepage").hide();
    $("#search-results").show();
    $("#YelpResults").empty();
    console.log(restaurants);
    for (let i = 0; i < restaurants.length; i++) {
        var resultDiv = $('<div class="col-12">');
        var resultTemplate = `
        <div class="card mb-4 shadow-sm fly">
            <img class="thumbnail" src=${restaurants[i].image}>
            <div class="card-body">
                <p class="card-text"><b><u>${restaurants[i].name}</u></b></p>
                <p class="card-text">${restaurants[i].rating}/5 Stars <small>(${restaurants[i].reviewcount} Reviews)</small></p>
                <p class="card-text">${restaurants[i].address}</p>
                <p class="card-text">${restaurants[i].city}, ${restaurants[i].state}, ${restaurants[i].zipcode}</p>
                <p class="card-text">${restaurants[i].phone}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <a href="${restaurants[i].url}" class="button" target="_blank">Open in Yelp</a>
                </div>
            </div>
        </div>`;

        // resultDiv.addClass('recipe-result');
        resultDiv.attr("data-name", restaurants[i].name);
        // resultItem.text(resultsArray[i]);
        resultDiv.append(resultTemplate);
        $('#YelpResults').prepend(resultDiv);
    }
}

function renderDetails(response) {
    console.log(response);
    $(".modal-title").text(response.title);

    var detailsImg = response.image;
    var detailsId = response.id;
    //var instructions = response.instructions.split(".");
    var instructions = response.analyzedInstructions[0].steps;
    detailsIngredients = response.extendedIngredients;

    $("#instructions").empty();
    for (let i = 0; i < instructions.length; i++) {
        var lineDiv = $(`<li>${instructions[i].step}</li>`);
        $("#instructions").append(lineDiv);
    }

    var detailsThumbnail = `<img class="details-thumbnail" src="${detailsImg}">`;
    $("#detail-thumbnail")
        .empty()
        .append(detailsThumbnail);

    $("#ingredients").empty();
    for (let i = 0; i < detailsIngredients.length; i++) {
        // option 1: sperate the ingredient by name, amount, unit
        const detail = detailsIngredients[i];
        // const name = detail.name;
        // const amount = detail.amount;
        // const unit = detail.unit;

        // option 2: directyl using the ingredient string
        var item = $(
            `<li class="ingredient-item" data-name=${detail.name}>${detail.originalString}</li>`
        );
        $("#ingredients").append(item);
    }

    // set initial add-to-list button
    $("button #add-to-list").attr("data-name", detailsId);
    $("#add-list-button").text("Add to Shopping List");
    $("#add-list-button").css("background-color", "#007bff");

    // Gets Id from item and adds ingredients to list
    $("#add-list-button").on("click", function() {
        shoppingList.push(detailsIngredients);
        displayShoppingList();
        console.log(shoppingList);

        $("#add-list-button").text("Added!");
        $("#add-list-button").css("background", "green");
        $("#add-list-button").off("click");
    });
}

// Search input entry - pulls response for query
$("#search-button").on("click", function() {
    event.preventDefault();
    searchQuery = $("#search-query")
        .val()
        .trim();
    searchRecipes(searchQuery);

    var foodItem = $('#search-query').val().trim();
    var location = $('#location-query').val().trim();
    searchRestaurants(foodItem, location);
    //renderResults(searchQuery);
});

$("#yelp-button").on("click", function() {
    event.preventDefault();
    var foodItem = $("#search-query")
        .val()
        .trim();
    var location = $("#location-query")
        .val()
        .trim();
    searchRestaurants(foodItem, location);
    // console.log("here", restaurants);
    // renderRestaurants(restaurants);
});

$("#home-logo").on("click", function() {
    event.preventDefault();
    $("#homepage").show();
    $("#search-results").hide();
    $("#results").empty();
});

$("#collapse-btn").on("click", function() {
    $('footer').toggleClass("list-closed list-open");
});

$("#clear-list").on("click", function() {
    shoppingList = [];
    displayShoppingList();
    $("footer").removeClass("list-open").addClass("list-closed");
});

// Gets ID from item and gets recipe information response
$(document).on("click", ".details-btn", function() {
    var id = $(this).attr("id");
    getRecipeInfo(id);
});

//populate shopping list
function displayShoppingList() {
    $("#shopping-list").empty();
    // do something for the shoppingList
    for (let i = 0; i < shoppingList.length; i++) {
        var ingredients = shoppingList[i];
        for (let j = 0; j < ingredients.length; j++) {
            var detail = ingredients[j];
            var item = $(
                `<li class="ingredient-item" data-name=${detail.name}>${detail.name} <i class="fas fa-trash-alt"></i></li>`
            );
            $("#shopping-list").append(item);
        }
    }
    //open list when populated
    $("footer").removeClass("list-closed").addClass("list-open");
    //show clear button when populated
    if ($("#shopping-list").text().length == 0) {
        $('#clear-list').hide();
    } else {
        $('#clear-list').show();
    }
}

$(document).on("click",".fa-trash-alt", function(){
    $(this).parent().remove();
})

$(document).ready(function() {
    $("#search-results").hide();
});