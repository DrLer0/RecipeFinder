/**
 * It recieve the search keyword and a offset obtain recipes from api call
 * @param {String} query recipes search key word
 * @param {int} offset   rearch result offset
 * @returns {JSON} the recipes list or return a error message
 */

const apiKey = "6413164bb90b4d0785ee7d9c80604499";

function searchRecipes(query, offset) {
    // in case parameter is not defined
    if (offset == undefined) {
        offset = 0;
    }
    if (query == undefined || query == "") {
        alert('cannot search recipes for undefined or empty string ')
        return "error: empty/undefined query input";
    }

    // Recipe - Food - Nutrition api settings (50 requests/month)
    const number = 10; // numbers of recipe result from the api call
    var settings = {
        url: `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${number}&offset=${offset}&type=main%20course&query=${query}`,
        method: "GET"
    }

    // call api and wait for response
    $.ajax(settings).then(function (response) {
        //console.log(response);
        //  do something with the response:
        renderResults(response);
        return response;
    });
}


/**
 * It take an recipe id and return the recipe information
 * @param {int} id recipe id
 * @returns {JSON} the recipe information or return the error message
 */
function getRecipeInfo(id) {
    // check if the id is valid (is a number at least)
    if (isNaN(parseInt(id))) {
        alert("this is not a vlid id");
        return "error: id not valid";
    }

    // Recipe - Food - Nutrition api settings (50 requests/month) 
    var settings = {
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
        method: "GET"
    }

    $.ajax(settings).then(function (response) {
        console.log(response);
        renderDetails(response);
        //  do somethin with the response:
        return response;
    });
}
