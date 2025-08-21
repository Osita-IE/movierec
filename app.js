const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});


// calling an API
// >>>>>>>>>>>>>>>>>>

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjQwZGNkOTZhOWUxYzNiOTM2MGFiYjY0NTU4NjkwMSIsIm5iZiI6MTc1NDcwMzM1My4xODIwMDAyLCJzdWIiOiI2ODk2YTVmOTgyNzQyNGIzOWJlMjQyZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0X4UhIof8tnfSG5B8JT4qfqd5ykjEli7TwvdKo_J7Wk'
//   }
// };

// fetch('https://api.themoviedb.org/3/authentication', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

const API_KEY = "5640dcd96a9e1c3b9360abb645586901"

const fetchMovies = async ()=>{
  const req = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  const res = await req.json()
  console.log(res.results);  
}

fetchMovies()