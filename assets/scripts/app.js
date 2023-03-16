const addMovieModal = document.getElementById("add-modal");
const startAtMovieButton = document.querySelector("header").lastElementChild;
const backDrop = document.getElementById("backdrop");
const cancelButton = document.getElementById("backdrop-cancel-add-btns").firstElementChild;
const addButton = document.getElementById("backdrop-cancel-add-btns").lastElementChild;
const userInputs = addMovieModal.querySelectorAll("input");
const section = document.getElementById("entry-text");
const listOfMovies = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal"); 
const movies = [];

const updateUI = () => {
  if (movies.lenght === 0) {
    section.style.display = "block";
  } else {
    section.style.display = "none"; 
  }
};

const deleteMovie = (movieId) => {
  closeMovieModal();
  let movieIndex = 0;
  for(const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  // listRoot.removeChildlistRoot.children[movieIndex];
};

// const confirmDeletionButton = () => {
//   const confirmDeletion = deleteMovieModal.querySelector(".btn--danger");
//   deleteMovie();
//   toggleBackdrop();
// };

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletion = deleteMovieModal.querySelector(".btn--passive");
  const confirmDeletion = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletion.addEventListener("click", cancelMovieDeletion);
  confirmDeletion.addEventListener("click", () => {
    deleteMovie(movieId);
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
  });
  // deleteMovie(movieId);
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;

  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

  const listRoot = document.getElementById("movie-list");
  listRoot.appendChild(newMovieElement);
  
}

const showMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const toggleBackdrop = () => {
  backDrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const backdropClickHandler = () => {
  cancelMovieDeletion();
  closeMovieModal();
};

const cancelButtonHandler = () => {
  toggleBackdrop();
  closeMovieModal();
  clearUserInput();
  
};

const clearUserInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  // console.log(titleValue, imageUrlValue, ratingValue);

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" || 
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Validate your input!");
    return
  } 

  const moviesObject = {
    id : Math.random().toString(),
    movieTitle : titleValue,
    imageURL : imageUrlValue,
    rating : ratingValue,
  }

  movies.push(moviesObject);
  console.log(movies);

  closeMovieModal();
  clearUserInput();
  toggleBackdrop();
  updateUI();
  renderNewMovieElement(moviesObject.id, moviesObject.movieTitle, moviesObject.imageURL, moviesObject.rating);

};

const updateMovieList = () => {
  section.classList.toggle("visible");
}

startAtMovieButton.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backdropClickHandler);
cancelButton.addEventListener("click", cancelButtonHandler);
addButton.addEventListener("click", addMovieHandler);

let firstCourse = {
  "2Л-22Б" : "Куліш Дар'я | 099 479 76 78",
  "П-22Б" : "Македонська Юлія | 097 611 38 70",
  "1Л-22Б" : "Матійчук Єлизавета | 098 873 86 17",
  "МФКД-22" : "Вергелес Анастасія | 096 038 31 96",
  "УБ-22Б" : "Дорофєєва Діана | 096 181 40 63",
  "ЄК-22Б" : "Мовчан Ірина | 098 708 92 25",
  "1Л-22Б" : "Слободян Христина | 097 383 34 20",
}

const keyObject = () => {
  let newArrayInfo = [];
  for (const [key, value] of Object.entries(firstCourse)) {
    console.log(`Group name: ${key} Proforg Name: ${value}`);
    newArrayInfo.push([key, value]);
  }
  
  console.log(newArrayInfo);
};

keyObject();



