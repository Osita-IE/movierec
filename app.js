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
  
});
// Home Button 
const homeButton = document.getElementById("homeButton");
if (homeButton.addEventListener("click",function() {
  const homeButton = alert ("You're currently in Homepage");
})) {
  
}

// profile dropdown

const dropdownicon = document.getElementById("dropdown-icon");
const dropdownMenu = document.getElementById("myDropdown");

if (dropdownicon.addEventListener("click",function() {
  dropdownMenu.classList.toggle("show");
})) {
  
}

window.onclick = function(event) {
  if (!event.target.matches("#dropdown-icon")) {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }
  }
}

// //////////////////////

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

// callling an API



document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value.trim();
  const apiKey = '75857bbb'; // Replace with your actual OMDb API key

  if (!query) {
    alert('dark');
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=75857bbb&s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Clear previous results

      if (data.Response === 'True') {
        data.Search.forEach(movie => {
          const movieCard = `
            <div>
              <h3>${movie.Title} (${movie.Year})</h3>
              <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}" width="150">
            </div>
          `;
          resultsDiv.innerHTML += movieCard;
        });
      } else {
        resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});



document.addEventListener('DOMContentLoaded', () => {
  // This should be inside your fetch success block
  const watchButtons = document.querySelectorAll('.movie-list-item-button');

  watchButtons.forEach(button => {
    button.addEventListener('click', () => {
      const movieId = button.getAttribute('data-id');
      window.location.href = `watch.html?id=${movieId}`;
    });
  });
});


const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
// const apiKey = '75857bbb';

fetch(`https://www.omdbapi.com/?apikey=75857bbb&s=${movieId}`)
  .then(response => response.json())
  .then(data => {
    // Display movie details here
    console.log(data);
  });


  document.getElementById('users-icon').addEventListener('click', function () {
  const footer = document.getElementById('user-footer');
  const link = document.getElementById('user-count-link');

  // Simulate a virtual user count
  const virtualUsers = Math.floor(Math.random() * 900) + 100;
  link.textContent = `${virtualUsers} users online`;

  // Show the footer
  footer.style.display = 'block';
});


const profilePic = document.getElementById('profile-pic');
const modalPic = document.getElementById('modal-pic');
const profileModal = document.getElementById('profile-modal');
const uploadInput = document.getElementById('upload-pic');

profilePic.addEventListener('click', () => {
  profileModal.style.display = 'grid';
});

function closeProfile() {
  profileModal.style.display = 'none';
}

uploadInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePic.src = e.target.result;
      modalPic.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});


// >>>>>>>>>>>>>>>>>>>>>>>>>>>Favorite

const apiKey = '75857bbb'; // same OMDb key you used before

function renderFavorites() {
  const favoritesDiv = document.getElementById('favorites');
  favoritesDiv.innerHTML = '';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesDiv.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  favorites.forEach(id => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=short`)
      .then(res => res.json())
      .then(details => {
        favoritesDiv.innerHTML += `
          <div class="movie-card">
            <h3>${details.Title} (${details.Year})</h3>
            <img src="${details.Poster !== 'N/A' ? details.Poster : 'placeholder.jpg'}" width="120">
            <p>${details.Plot}</p>
          </div>
        `;
      });
  });
}

// Run when index.html loads
document.addEventListener('DOMContentLoaded', renderFavorites);
