
const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');
const FavoriteSection = document.querySelector('#favorite');

const API_URL='http://www.omdbapi.com/?apikey=45ebdd49&s=';

const state = {
    searchTerm: '' ,
    results:  [],
    favorite: []
};

input.addEventListener('keyup', () =>{
  state.searchTerm = input.value;
  
});

form.addEventListener('submit', formSubmitted);

 async function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  try {
    state.results = await getResults(state.searchTerm);
      showResults(results);
    } catch(error) {
     showError(error);
    }
}

async function getResults(searchTerm){
  const url = `${API_URL}${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.Error){
    throw new Error(data.Error);
  }
   return data.Search;
}

function showResults (){
  resultsSection.innerHTML = state.results.reduce((html, movie) => {
    return html + getMovieTemplate(movie, 4);
  }, '');

  addButtonListeners();
}

function addButtonListeners(){
  const addFavoriteMovie = document.querySelectorAll('.add-favorite');
  addFavoriteMovie.forEach(button => {
  button.addEventListener('click', buttonClicked);
  });
}

function buttonClicked(event){
        const { id } = event.target.dataset;
        const movie = state.results.find(movie => movie.imdbID === id);
        state.favorite.push(movie);
        updateFavoriteSection();
};

function updateFavoriteSection(){
    FavoriteSection.innerHTML = state.favorite.reduce((html, movie) => {
      return html + getMovieTemplate(movie, 12, false);
    }, '');
}

function getMovieTemplate(movie, cols, button = true){
    return `
    <div class="card col-${cols}">
      <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
      <div class=" card">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Year}</p>
        ${ 
          button ?
          `<button data-id="${movie.imdbID}" type="button" class="btn btn-danger add-favorite"> Add to Favorite </button>`
          : ''
        }  
      </div>
    </div>
    `;
}

function showError(error) {
  resultsSection.innerHTML = `
<div class="alert alert-primary col" role="alert">
 ${error.message}
</div>
`;
}

