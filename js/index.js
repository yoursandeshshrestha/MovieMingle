//------------- API KEY  -----------//
const MOVIE_API_KEY = "97af0a15d4c46c8013543f1929dcbbe6";
//------------- API KEY  -----------//

//------------- This is required to find Images Poster in Database -----------//
const baseURL = "https://image.tmdb.org/t/p/w500";
//------------- This is required to find Images -----------//

//------------- Getting a refrence of container -----------//
const trending_movies = document.querySelector(".trending-movie-container");
const japaneseMovieContainer = document.querySelector(
  ".japanese-movie-container"
);
const bollywood = document.querySelector(".bollywood");
const bollywood2 = document.querySelector(".bollywood2");
const korean = document.querySelector(".korean");
const korean2 = document.querySelector(".korean2");
const tvshow = document.querySelector(".Tv-shows");
//------------- Getting a refrence of container -----------//

//------------- API LINKS -----------//
let trendingAPI =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
let japaneseAPI =
  "https://api.themoviedb.org/3/discover/movie?api_key=97af0a15d4c46c8013543f1929dcbbe6&region=JP&include_adult=true&with_original_language=ja";
let koreanAPI =
  "https://api.themoviedb.org/3/discover/movie?api_key=97af0a15d4c46c8013543f1929dcbbe6&region=KR&include_adult=true&with_original_language=ko";
let koreanAPI2 =
  "https://api.themoviedb.org/3/discover/movie?api_key=97af0a15d4c46c8013543f1929dcbbe6&region=KR&include_adult=true&with_original_language=ko&page=2";
let bollywoodAPI =
  " https://api.themoviedb.org/3/discover/movie?api_key=97af0a15d4c46c8013543f1929dcbbe6&with_original_language=hi";
let bollywoodAPI2 =
  " https://api.themoviedb.org/3/discover/movie?api_key=97af0a15d4c46c8013543f1929dcbbe6&with_original_language=hi&page=2";
let tvshowAPI =
  "https://api.themoviedb.org/3/discover/tv?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US&page=1";
//------------- API LINKS -----------//

//------------- Access Token -----------//
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2FmMGExNWQ0YzQ2YzgwMTM1NDNmMTkyOWRjYmJlNiIsInN1YiI6IjY2M2UxNTJhYWRkNzAxMWMzMzMwZDlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.btwoJ6jnkuNzX-Tg5aG4HxTdh0wER9_nKtzh3xUW-4c",
  },
};
//------------- Access Token -----------//

//------------- Trending Movie Fetching  -----------//
fetch(`${trendingAPI}`, options)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    data.results.slice(0, 20).forEach((movie) => {
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      let PosterIsUndefined =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
      let posterURL = movie.poster_path
        ? `${baseURL}${movie.poster_path}`
        : `${PosterIsUndefined}`;
      trending_movies.innerHTML += `
              <div class="resuable-movies-wrapper">
                <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                  <div class="resuable-movies-image">
                   <img src=${posterURL}>
                    <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating}</p>
                  </div>
                  <div class="resuable-movies-name">
                    <p>${movie.title}</p>
                    <p>${year}</p>
                  </div>
                </a>
              </div>
              `;
    });
  })
  .catch((err) => console.error(err));
//------------- Trending Movie Fetching  -----------//

//------------- Japanese Movie Fetching  -----------//
fetch(`${japaneseAPI}`, options)
  .then((response) => response.json())
  .then((data) => {
    data.results.slice(0, 18).forEach((movie) => {
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      let PosterIsUndefined =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
      let posterURL = movie.poster_path
        ? `${baseURL}${movie.poster_path}`
        : `${PosterIsUndefined}`;
      japaneseMovieContainer.innerHTML += `
            <div class="resuable-movies-wrapper">
                      <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                        <div class="resuable-movies-image-230px">
                          <img src=${posterURL}>
                          <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  7.1</p>
                        </div>
                        <div class="resuable-movies-name">
                          <p>${movie.title}</p>
                          <p>${year}</p>
                        </div>
                      </a>
                  </div>
            `;
    });
  })
  .catch((err) => console.error(err));
//------------- Japanese Movie Fetching  -----------//

//------------- Bollywood Movie Fetching  -----------//
fetch(`${bollywoodAPI}`, options)
  .then((response) => response.json())
  .then((data) => {
    data.results.slice(0, 20).forEach((movie) => {
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      const baseBackdropURL = "https://image.tmdb.org/t/p/original";
      const imageURL = baseBackdropURL + movie.backdrop_path;

      bollywood.innerHTML += `
                  <div class="movie_card" id="tomb">
                  <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                    <div class="info_section">
                      <div class="movie_header">
                        <img class="locandina" src="${baseURL}${movie.poster_path}"/>
                        <h1>${movie.title}</h1>
                        <h4>${year}</h4>
                        <li><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating}</p></li>
                      </div>
                      <div class="movie_desc">
                        <p class="text">${movie.overview}</p>
                      </div>
                      <div class="movie_social">
                        <ul>
                        </ul>
                      </div>
                    </div>
                    <div class="blur_back tomb_back" style="background-image: url(${imageURL})">
                    </div>
                  </a>
                  </div>
                `;
    });
  })
  .catch((err) => console.error(err));
//------------- Bollywood Movie Fetching  -----------//

//------------- Bollywood2 Movie Fetching  -----------//
fetch(`${bollywoodAPI2}`, options)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    data.results.slice(0, 6).forEach((movie) => {
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      let PosterIsUndefined =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
      let posterURL = movie.poster_path
        ? `${baseURL}${movie.poster_path}`
        : `${PosterIsUndefined}`;
      bollywood2.innerHTML += `
                <div class="resuable-movies-wrapper">
                      <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                        <div class="resuable-movies-image-230px">
                          <img src=${posterURL}>
                          <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  7.1</p>
                        </div>
                        <div class="resuable-movies-name">
                          <p>${movie.title}</p>
                          <p>${year}</p>
                        </div>
                      </a>
                  </div>
                `;
    });
  })
  .catch((err) => console.error(err));
//------------- Bollywood2 Movie Fetching  -----------//

//------------- korean Movie Fetching  -----------//
fetch(`${koreanAPI}`, options)
  .then((response) => response.json())
  .then((data) => {
    data.results.slice(0, 18).forEach((movie) => {
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      const baseBackdropURL = "https://image.tmdb.org/t/p/original";
      const imageURL = baseBackdropURL + movie.backdrop_path;

      korean.innerHTML += `
                  <div class="movie_card" id="tomb">
                  <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                    <div class="info_section">
                      <div class="movie_header">
                        <img class="locandina" src="${baseURL}${movie.poster_path}"/>
                        <h1>${movie.title}</h1>
                        <h4>${year}</h4>
                        <li><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating}</p></li>
                      </div>
                      <div class="movie_desc">
                        <p class="text">${movie.overview}</p>
                      </div>
                      <div class="movie_social">
                        <ul>
                        </ul>
                      </div>
                    </div>
                    <div class="blur_back tomb_back" style="background-image: url(${imageURL})">
                    </div>
                  </a>
                  </div>
                `;
    });
  })
  .catch((err) => console.error(err));
//------------- korean Movie Fetching  -----------//

//------------- korean2 Movie Fetching  -----------//
fetch(`${koreanAPI2}`, options)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    data.results.slice(0, 18).forEach((movie) => {
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      let PosterIsUndefined =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
      let posterURL = movie.poster_path
        ? `${baseURL}${movie.poster_path}`
        : `${PosterIsUndefined}`;
      korean2.innerHTML += `
                  <div class="resuable-movies-wrapper">
                      <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                        <div class="resuable-movies-image-230px">
                          <img src=${posterURL}>
                          <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  7.1</p>
                        </div>
                        <div class="resuable-movies-name">
                          <p>${movie.title}</p>
                          <p>${year}</p>
                        </div>
                      </a>
                  </div>
                `;
    });
  })
  .catch((err) => console.error(err));
//------------- korean2 Movie Fetching  -----------//

//------------- Function to show active page  -----------//
const activePage = window.location.pathname;
console.log(activePage);
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  if (link.href.includes(activePage)) {
    link.classList.add("active");
  }
});
//------------- Function to show active page  -----------//

//------------- function to move to new list of movie-----------//
function prev() {
  document.getElementById("slider-container").scrollLeft -= 400;
}
function prev2() {
  document.querySelector(".bollywood").scrollLeft -= 730 * 2;
}

function next() {
  document.getElementById("slider-container").scrollLeft += 400;
}
function next2() {
  document.querySelector(".bollywood").scrollLeft += 730 * 2;
}
//------------- function to move to new list of movie-----------//

//------------- Buttons to toggle between movies and tv-show-----------//
// const movieShowButton = document.querySelector(".movie-show-button");
// const tvShowButton = document.querySelector(".tv-show-button");

// const trendingh1 = document.querySelector(".trending-h1");
// const trendingContainer = document.querySelector(".trending-movie-container");
// const bollywoodh1 = document.querySelector(".bollywood-h1");
// const bollywoodContainer = document.querySelector(".bollywood");
// const japaneseh1 = document.querySelector(".japanese-h1");
// const japaneseContainer = document.querySelector(".japanese");
// const koreanh1 = document.querySelector(".korean-h1");
// const koreanConatiner = document.querySelector(".korean");
// const LoadMore = document.querySelector(".load-button");

// function tvShowFetch() {
//   tvShowButton.classList.add("movie-option-2");
//   movieShowButton.classList.remove("movie-option-1");
//   trendingh1.innerText = "TV Shows";
//   bollywoodh1.style.display = "none";
//   japaneseh1.style.display = "none";
//   koreanh1.style.display = "none";
//   trendingContainer.style.display = "none";
//   bollywoodContainer.style.display = "none";
//   japaneseContainer.style.display = "none";
//   koreanConatiner.style.display = "none";
//   korean2.style.display = "none";
//   tvshow.style.display = "flex";
//   bollywood2.style.display = "none";
//   LoadMore.style.display = "flex";
// }

// function movieShowFetch() {
//   tvShowButton.classList.remove("movie-option-2");
//   movieShowButton.classList.add("movie-option-1");
//   trendingh1.innerText = "Trending";
//   bollywoodh1.style.display = "flex";
//   japaneseh1.style.display = "flex";
//   koreanh1.style.display = "flex";
//   trendingContainer.style.display = "flex";
//   bollywoodContainer.style.display = "flex";
//   japaneseContainer.style.display = "flex";
//   koreanConatiner.style.display = "flex";
//   korean2.style.display = "flex";
//   tvshow.style.display = "none";
//   bollywood2.style.display = "flex";
//   LoadMore.style.display = "none";
// }

// tvShowButton.addEventListener("click", tvShowFetch);
// movieShowButton.addEventListener("click", movieShowFetch);
//------------- Buttons to toggle between movies and tv-show-----------//

//------------- function to fetch TV-SHOW -----------//
// let page = 1;
// function fetchShow() {
//   const showAPI = `https://api.themoviedb.org/3/discover/tv?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US&page=${page}`;
//   fetch(showAPI)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       data.results.slice(0, 18).forEach((movie) => {
//         let rating = parseFloat(movie.vote_average).toFixed(1);
//         let year = parseFloat(movie.first_air_date).toFixed(0.5);
//         let PosterIsUndefined =
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
//         let posterURL = movie.poster_path
//           ? `${baseURL}${movie.poster_path}`
//           : `${PosterIsUndefined}`;
//         tvshow.innerHTML += `
//                 <div class="resuable-movies-wrapper">
//                   <a href="./moviedetail/moviedetail.html?id=${movie.id}">
//                         <div class="resuable-movies-image-230px">
//                             <img src="${posterURL}" alt="${movie.name}">
//                             <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating}</p>
//                         </div>
//                         <div class="resuable-movies-name">
//                             <p>${movie.name}</p>
//                             <p>${year}</p>
//                         </div>
//                     </a>
//                 </div>
//                 `;
//       });
//       page++;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

// fetchShow();

// LoadMore.addEventListener("click", (e) => {
//   e.preventDefault;
//   fetchShow();
// });
//------------- function to fetch TV-SHOW -----------//

//------------- Search With KeyWords -----------//
const searchInput = document.querySelector(".search-box input");
const findMoviesContainer = document.querySelector(".findmovies");

function findMoviesbyKeyword() {
  findMoviesContainer.innerHTML = "";

  let keyword = searchInput.value.trim();
  let movieSearch = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${keyword}`;

  fetch(movieSearch)
    .then((response) => response.json())
    .then((data) => {
      data.results.slice(0, 18).forEach((movie) => {
        let rating = parseFloat(movie.vote_average).toFixed(1);
        let year = parseFloat(movie.release_date).toFixed(0.5);
        let PosterIsUndefined =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
        let posterURL = movie.poster_path
          ? `${baseURL}${movie.poster_path}`
          : `${PosterIsUndefined}`;
        findMoviesContainer.innerHTML += `
                    <div class="resuable-movies-wrapper">
                        <a href="./moviedetail/moviedetail.html?id=${movie.id}">
                            <div class="resuable-movies-image-230px">
                                <img src="${posterURL}" alt="${movie.name}">
                                <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating}</p>
                            </div>
                            <div class="resuable-movies-name">
                                <p>${movie.title}</p>
                                <p>${year}</p>
                            </div>
                        </a>
                    </div>
                `;
      });
    })
    .catch((error) => console.log("ERROR:", error));
}

searchInput.addEventListener("input", findMoviesbyKeyword);

// async function addTofavorites(id) {
//   console.log("fav-item", id);

//   localStorage.setItem(Math.random().toString(36).slice(2, 7), id);// math.random for the unique key and value pair
//   alert('Movie Added to Watchlist!');
// }

// //Removing the movie from the favorites list  and also from the localstorage
// async function removeFromfavorites(id) {
//   console.log(id);
//   for (i in localStorage) {
//       // If the ID passed as argument matches with value associated with key, then removing it
//       if (localStorage[i] == id) {
//           localStorage.removeItem(i)
//           break;
//       }
//   }
//   //Alerting the user and refreshing the page
//   alert('Movie Removed from Watchlist');
//   window.location.replace('favorite.html');
// }

//------------- Function to show active page  -----------//
const movie_show = window.location.pathname;
console.log(activePage);
const movie_show_links = document.querySelectorAll(".movie-show-icon a");
movie_show_links.forEach((link) => {
  if (link.href.includes(activePage)) {
    link.classList.add("active");
  }
});
//------------- Function to show active page  -----------//