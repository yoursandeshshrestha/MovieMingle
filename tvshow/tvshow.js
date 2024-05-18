// ------------- Function to show active page  -----------//
const activePage = window.location.pathname;
console.log(activePage);
const movie_show_links = document.querySelectorAll(".movie-show-icon a");
movie_show_links.forEach((link) => {
    if (link.href.includes(activePage)) {
        link.classList.add("active");
    }
});


//------------- This is required to find Images Poster in Database -----------//
const baseURL = "https://image.tmdb.org/t/p/w500";


//------------- Refrence of the container -----------//
let tvshow = document.querySelector(".Tv-shows")
const LoadMore = document.querySelector(".load-button")


//------------- Fetching Show -----------//
let page = 1;
function fetchShow() {
    const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US&page=${page}`
    const showAPI = `https://api.themoviedb.org/3/discover/tv?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US&page=${page}`;
    fetch(upcoming)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data.results.slice(0, 18).forEach((movie) => {
                let rating = parseFloat(movie.vote_average).toFixed(1);
                let year = parseFloat(movie.release_date).toFixed(0.5);
                let PosterIsUndefined =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
                let posterURL = movie.poster_path
                    ? `${baseURL}${movie.poster_path}`
                    : `${PosterIsUndefined}`;
                tvshow.innerHTML += `
                <div class="resuable-movies-wrapper">
                  <a href="../moviedetail/moviedetail.html?id=${movie.id}">
                        <div class="resuable-movies-image-230px">
                            <img src="${posterURL}" alt="${movie.title}">
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
            page++;
        })
        .catch((err) => {
            console.error(err);
        });
}
fetchShow();


//------------- To fetch page 2 -----------//
LoadMore.addEventListener("click", (e) => {
    e.preventDefault;
    fetchShow();
});