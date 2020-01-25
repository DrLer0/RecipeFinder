/**
 * Search for a restaurant on yelp based on food served there and/or by location
 * @param {string} foodItem - food item to search for
 * @param {string} location - location to look around in
 */

var restaurantArray = [];

function searchRestaurants(foodItem, location) {
    // console.log(location);
    if (location == "") {
        location = "California";
    }
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&term=" + foodItem + "&location=" + location;

    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer c61ND7to-HUsyUgFkgCZKF60ni6ub2LV6l_-LYkugb75J2dy5HIcSRcSZxX0UUUSfejRHjyOUMC03fdoKKIAQmxp_FS6Pf4CqZkWLHEV0ktfdqVjV_p7cFcu1HwjXnYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Grab the results from the API JSON return
            var totalresults = data.total;
            // If our results are greater than 0, continue
            if (totalresults > 0) {
                // Display a header on the page with the number of results
                $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                // console.log(data.businesses);
                // Itirate through the JSON array of 'businesses' which was returned by the API
                $.each(data.businesses, function(i, item) {
                    // Store each business's object in a variable
                    var restaurant = {
                        id: item.id,
                        phone: item.display_phone,
                        image: item.image_url,
                        name: item.name,
                        rating: item.rating,
                        reviewcount: item.review_count,
                        address: item.location.address1,
                        city: item.location.city,
                        state: item.location.state,
                        zipcode: item.location.zip_code,
                        url: item.url
                    }
                    restaurantArray.push(restaurant);
                });

            } else {
                // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                $('#results').append('<h5>We discovered no results!</h5>');
                var restaurant = {
                    id: null,
                    phone: null,
                    image: null,
                    name: null,
                    rating: null,
                    reviewcount: null,
                    address: null,
                    city: null,
                    state: null,
                    zipcode: null
                }
                restaurantArray.push(restaurant);
            }
        }
    }).then(function() {
        console.log("this is the final size:", restaurantArray.length);
        renderRestaurants(restaurantArray);
    });
}

function getSize() {
    console.log("size", restaurantArray.length);
}

// console.log(searchRestaurants("banana", "boston"));