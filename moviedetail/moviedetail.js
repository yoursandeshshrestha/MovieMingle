async function singleMovie() {
  // Finding ID of the movie from the URL
  var urlQueryParams = new URLSearchParams(window.location.search);
  var id = urlQueryParams.get("id");
  console.log(id);

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=97af0a15d4c46c8013543f1929dcbbe6`;
  const credit = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=97af0a15d4c46c8013543f1929dcbbe6`;
  const genre = `https://api.themoviedb.org/3/movie/${id}?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US`;
  const runtime = `https://api.themoviedb.org/3/movie/${id}?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US`;
  const streaming = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=97af0a15d4c46c8013543f1929dcbbe6`;

  const baseURL = "https://image.tmdb.org/t/p/w500";

  try {
    const res = await fetch(url);
    const movie = await res.json();
    // this is done to dynamically set the title of HTML page based on clicked movie
    document.title = `${movie.title}`;

    const creditFetch = await fetch(credit);
    const creditresult = await creditFetch.json();

    const genreFetch = await fetch(genre);
    const genreResult = await genreFetch.json();

    const runtimeFetch = await fetch(runtime);
    const runtimeResult = await runtimeFetch.json();

    const streamingFetch = await fetch(streaming);
    const streamingResult = await streamingFetch.json();

    console.log(streamingResult);

    let rating = parseFloat(movie.vote_average).toFixed(1);
    let year = new Date(movie.release_date).getFullYear();

    // If any movie's poster is unavailable, then our hardcoded img is attached.
    let PosterIsUndefined =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tv4EjlI_lp7odYMWUdD7gknAHIeYCSZ83j6yYbQM6SZAnRWfQoORHQmHb92PHCQi_VE&usqp=CAU";
    let posterURL = movie.poster_path
      ? `${baseURL}${movie.poster_path}`
      : `${PosterIsUndefined}`;

    // checking if the movie's ID is already stored in local storage
    let isFavorite = Object.values(localStorage).includes(id);

    let genres = genreResult.genres.map((genre) => genre.name).slice(0, 3);
    let genresOutput = genres.join(", ");

    let streamingLogos = '';
    if (streamingResult.results.US && streamingResult.results.US.flatrate) {
      const flatrateCount = streamingResult.results.US.flatrate.length;
      for (let i = 0; i < Math.min(flatrateCount, 10); i++) {
        streamingLogos += `<img src="${baseURL}${streamingResult.results.US.flatrate[i].logo_path}" alt="${streamingResult.results.US.flatrate[i].provider_name}">`;
      }
    } else {
      streamingLogos = '<p class="no_stream">No streaming options available</p>';
    }

    let output = `
      <div class="image">
        <img src="${posterURL}">
        <i class="fa-${isFavorite ? "solid" : "regular"} fa-bookmark" onClick="${
      isFavorite
        ? `removeFromfavorites('${movie.id}')`
        : `addTofavorites('${movie.id}')`
    }" style="cursor: pointer;"></i>
      </div>
      <div class="info">
        <div class="heading-wrapper">
          <div class="title">
            <div class="heading">
              <h1>${movie.title}</h1>
            </div>
            <div class="little-desc">
              <p class="year">${year}</p>
              <p class="hour">${runtimeResult.runtime} Min</p>
            </div>
          </div>
          <div class="movie-rating">
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <p>${rating}</p>
          </div>
        </div>
        <div class="overview">
          <div class="overview-title">
            <p>OVERVIEW</p>
          </div>
          <div class="overview-wrapper">
            <div class="movie-info">
              <p>${movie.overview}</p>
            </div>
            <div class="movie-more-info">
              <div class="starring-info">
                <p>Starring</p>
                <p>${creditresult.cast
                  .slice(0, 3)
                  .map((cast) => cast.name)
                  .join(", ")}</p>
              </div>
              <div class="created-by">
                <p>Created by</p>
                <p>${creditresult.crew
                  .slice(0, 3)
                  .map((crew) => crew.name)
                  .join(", ")}</p>
              </div>
              <div class="genre">
                <p>Genre</p>
                <p>${genresOutput}</p>
              </div>
            </div>
          </div>
          <div class="buy-container">
          <div>
          <p>Streaming on</p>
          <div class="buy-image">
          ${streamingLogos}
          </div>
          </div>
          <div class="trailer"></div>
          </div>
        </div>
      </div>`;

    // Injecting the movie details into the HTML
    document.querySelector(".movie-wrapper").innerHTML = output;

    // Adding video section for trailer only
    const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=97af0a15d4c46c8013543f1929dcbbe6&language=en-US`;
    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();

    if (videoData.results && videoData.results.length > 0) {
      let trailer = videoData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        let videoSection = `
          <p> Watch Trailer </p>
          <div class="video-section">
            <iframe width="360" height="215" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
          </div>`;
        document.querySelector(".trailer").innerHTML = videoSection;
      } else {
        document.querySelector(".trailer").innerHTML = '<p>No trailer found</p>';
      }
    } else {
      document.querySelector(".trailer").innerHTML = '<p>No videos found</p>';
    }
  } catch (error) {
    console.error(error);
  }
}


async function addTofavorites(id) {
  let exists = Object.values(localStorage).includes(id);

  if (exists) {
    alert("Movie is already in your watchlist");
  } else {
    localStorage.setItem(Math.random().toString(36).slice(2, 7), id);

    // removing alert because the user will get to know with bookmark icon

    // alert('Movie Added to Watchlist!');
    // we need to reload to change the bookmark icon
    window.location.reload();
  }
}

async function removeFromfavorites(id) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(localStorage.key(i)) === id) {
      localStorage.removeItem(localStorage.key(i));
      break;
    }
  }
  // removing alert because the user will get to know with bookmark icon

  // alert('Movie Removed from Watchlist!');
  // we need to reload to change the bookmark icon
  window.location.reload();
}
