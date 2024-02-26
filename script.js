const searchMovieButton = document.getElementById('search-movie');
const movieContainer = document.getElementById('movie-container');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('year-movie');

async function insertieMovieData(){   
  try{
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${generateMovieParameter()}${generateYearParameter()}`;  
    const response =  await fetch(url);
    const data = await response.json();
    if(data.Error) throw new Error('Filme não encontrado')    
  
    movieContainer.innerHTML = `
      <div id="movie-info" class="d-flex container">
        <div id="movie-img"> 
          <img src="${data.Poster}" alt="${data.Title}">
        </div>
        <div id="movie-data" class="d-flex flex-column">
           <p>Sinopse: ${data.Plot}</p>
           <p>Elenco: ${data.Actors}</p>
            <p>Gênero: ${data.Genre}</p>
        </div>
      </div>
          <button class="mt-5">Adicionar aos favoritos <i class="bi bi-star"></i></button>
  `;
  }catch (error){
    notie.alert({type: 'error', text: error.message})
  }
  
  
}

function generateMovieParameter (){
  if(movieName.value === '') throw new Error('Nome do filme deve ser informado');   
   
  const searchMovie = movieName.value.split(' ').join('+')
  return searchMovie;
}

function generateYearParameter (){
  if (movieYear.value === '') return '';
  if(movieYear.value.length !== 4 || Number(movieYear.value === NaN)) throw new Error('Ano do filme inválido');    
  
  return `&y=${movieYear.value}`;
}



searchMovieButton.addEventListener('click', insertieMovieData)




