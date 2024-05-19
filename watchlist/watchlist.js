async function favoritesMovieLoader() {
  const baseURL = "https://image.tmdb.org/t/p/w500";

  var output = "";
  for (i in localStorage) {
    var id = localStorage.getItem(i);
    if (id != null) {
      //Fetching the movie through id
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=97af0a15d4c46c8013543f1929dcbbe6`;
      const res = await fetch(`${url}`);
      const movie = await res.json();
      let PosterIsUndefined =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
      let posterURL = movie.poster_path
        ? `${baseURL}${movie.poster_path}`
        : `${PosterIsUndefined}`;
      let rating = parseFloat(movie.vote_average).toFixed(1);
      let year = parseFloat(movie.release_date).toFixed(0.5);
      // console.log(movie);
      output += `

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
                <button onClick=removeFromfavorites('${movie.id}')><i class="fa-solid fa-trash" style="color: white;"></i></button>
            </div>

       `;
    }
  }
  document.querySelector(".fav-container").innerHTML = output;
}

async function removeFromfavorites(id) {
  // console.log(id);
  for (i in localStorage) {
    if (localStorage[i] == id) {
      localStorage.removeItem(i);
      break;
    }
  }
  window.location.replace("./watchlist.html");
}
