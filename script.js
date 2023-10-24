const apiKey = "990f89c8"; // Replace with your OMDB API key
        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        const addToFavoritesButton = document.getElementById("addToFavorites");
        const showFavoritesButton = document.getElementById("showFavorites");
        const movieDetails = document.getElementById("movieDetails");

        // Function to fetch and display movie details
        async function fetchMovieDetails(movieTitle) {
            const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.Response === "True") {
                    const movieInfo = `
                    <div >
                        <div><h2 style="text-align: center">${data.Title}</h2></div>
                        <div class="mov">
                        <div class="mmovie">
                        <img src="${data.Poster}" alt="${data.Title} Poster">
                        </div> 
                        <div>
                        <p>Year: ${data.Year}</p>
                        <p>Genre: ${data.Genre}</p>
                        <p>Plot: ${data.Plot}</p>
                        </div>
                        </div>
                    </div>
                    `;
                    movieDetails.innerHTML = movieInfo;
                } else {
                    movieDetails.innerHTML = "Movie not found.";
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }

        // Function to add the currently displayed movie to favorites in local storage
        function addToFavorites() {
            const movieTitle = document.querySelector("#movieDetails h2");
            if (movieTitle) {
                const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                favorites.push(movieTitle.textContent);
                localStorage.setItem("favorites", JSON.stringify(favorites));
            }
        }

        // Event listener for the Search button
        searchButton.addEventListener("click", () => {
            const movieTitle = searchInput.value.trim();
            if (movieTitle !== "") {
                fetchMovieDetails(movieTitle);
            }
        });

        // Event listener for the Add to Favorites button
        // ...

// Event listener for the Add to Favorites button
addToFavoritesButton.addEventListener("click", () => {
    const movieTitleElement = document.querySelector("#movieDetails h2");
    if (movieTitleElement) {
        const movieTitle = movieTitleElement.textContent;
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.push(movieTitle); // Add the current movie title to the array
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Movie is added to favorites");
    }
});


// Event listener for the Show Favorites button
// Event listener for the Show Favorites button
showFavoritesButton.addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length > 0) {
        // If there are favorite movies, display them
        const favoritesList = favorites.map((movieTitle) => {
            return `<li>${movieTitle}</li>`;
        }).join("");
        movieDetails.innerHTML = `<h2>Favorites</h2><ul>${favoritesList}</ul>`;
    } else {
        // If there are no favorite movies, display a message
        movieDetails.innerHTML = "No favorites added yet.";
    }
});


