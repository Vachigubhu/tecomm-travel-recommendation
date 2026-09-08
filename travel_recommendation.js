let travelData = {};

// Fetch the travel data
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log(travelData);
    })
    .catch(error => {
        console.error("Error fetching travel data:", error);
    });


// Search button
document.getElementById("searchButton").addEventListener("click", searchRecommendations);


// Search function
function searchRecommendations() {

    const searchInput = document.getElementById("searchInput").value
        .toLowerCase()
        .trim();

    console.log("Search:", searchInput);

    if (
        searchInput === "beach" ||
        searchInput === "beaches"
    ) {
        displayRecommendations(travelData.beaches, "Beaches");

    } else if (
        searchInput === "temple" ||
        searchInput === "temples"
    ) {
        displayRecommendations(travelData.temples, "Temples");

    } else if (
        searchInput === "country" ||
        searchInput === "countries"
    ) {
        displayCountryRecommendations(travelData.countries);

    } else {
        alert("Please search for beaches, temples, or countries.");
    }
}


// Display beaches and temples
function displayRecommendations(recommendations, title) {

    const resultsSection = document.getElementById("results");

    resultsSection.innerHTML = `<h2>${title}</h2>`;

    recommendations.forEach(item => {

        resultsSection.innerHTML += `
            <div class="recommendation-card">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;

    });
}


// Display countries and their cities
function displayCountryRecommendations(countries) {

    const resultsSection = document.getElementById("results");

    resultsSection.innerHTML = `<h2>Countries</h2>`;

    countries.forEach(country => {

        country.cities.forEach(city => {

            resultsSection.innerHTML += `
                <div class="recommendation-card">
                    <img src="${city.imageUrl}" alt="${city.name}">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                </div>
            `;

        });

    });
}


// Reset button
document.getElementById("resetButton").addEventListener("click", resetResults);


function resetResults() {

    document.getElementById("searchInput").value = "";

    document.getElementById("results").innerHTML = "";

}