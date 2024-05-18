const baseURL = "https://image.tmdb.org/t/p/w500";
let page = 2;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2FmMGExNWQ0YzQ2YzgwMTM1NDNmMTkyOWRjYmJlNiIsInN1YiI6IjY2M2UxNTJhYWRkNzAxMWMzMzMwZDlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.btwoJ6jnkuNzX-Tg5aG4HxTdh0wER9_nKtzh3xUW-4c",
  },
};

// Function to fetch movies from the API
function fetchMovies() {
  const trendingAPI = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  fetch(trendingAPI, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setTimeout(function () {
        LoadMore.style.opacity = "1";
        const moviesContainer = document.querySelector(".movie-container");
        data.results.slice(0, 18).forEach((movie) => {
          let rating = parseFloat(movie.vote_average).toFixed(1);
          let year = parseFloat(movie.release_date).toFixed(0.5);
          let PosterIsUndefined =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
          let posterURL = movie.poster_path
            ? `${baseURL}${movie.poster_path}`
            : `${PosterIsUndefined}`;
          moviesContainer.innerHTML += `
                        <div class="resuable-movies-wrapper">
                        <a href="../moviedetail/moviedetail.html?id=${movie.id}">
                          <div class="resuable-movies-image-230px">
                            <img src=${posterURL}>
                            <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating}</p>
                          </div>
                          <div class="resuable-movies-name">
                            <p>${movie.title}</p>
                            <p>${year}</p>
                          </div>
                        </a>
                    </div>
                        `;
        });
      }, 500);
      page++; // Increment page number for the next request
    })
    .catch((err) => {
      console.error(err);
    });
}

fetchMovies();

const LoadMore = document.querySelector(".load-button");

LoadMore.addEventListener("click", (e) => {
  e.preventDefault;
  fetchMovies();
});

const activePage = window.location.pathname;
console.log(activePage);
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  if (link.href.includes(activePage)) {
    link.classList.add("active");
  }
});
