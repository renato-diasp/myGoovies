const searchMovieButton = document.getElementById('search-movie');
const movieContainer = document.getElementById('movie-container');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('year-movie');

async function insertieMovieData(){   
  try{
    let url = `https://www.omdbapi.com/?apikey=${key}&t=${await generateMovieParameter()}${generateYearParameter()}`;  
    const response =  await fetch(url);
    const data = await response.json();
    if(data.Error) throw new Error('Filme não encontrado');

    let urlTranslate = `https://api.mymemory.translated.net/get?q=${data.Plot}!&langpair=en|pt-br`;
    const responseTranslate = await fetch(urlTranslate);
    const dataTranslate = await responseTranslate.json();
    const plotTranslate = dataTranslate.responseData.translatedText;

    let urlTranslateGenre = `https://api.mymemory.translated.net/get?q=${data.Genre}!&langpair=en|pt-br`;
    const responseTranslateGenre = await fetch(urlTranslateGenre);
    const dataTranslateGenre = await responseTranslateGenre.json();
    const genreTranslate = dataTranslateGenre.responseData.translatedText;

    movieContainer.classList.add('unhidden-movie-container')
  
    movieContainer.innerHTML = `
      <div id="movie-info" class="d-flex container">
        <div id="movie-img"> 
          <img src="${data.Poster}" alt="${data.Title}">
        </div>
        <div id="movie-data" class="d-flex flex-column">
           <p>Sinopse: ${plotTranslate}</p>
           <p>Elenco: ${data.Actors}</p>
            <p>Gênero: ${genreTranslate}</p>
        </div>
      </div>
          <button class="mt-5">Adicionar aos favoritos <i class="bi bi-star"></i></button>
  `;
  }catch (error){
    notie.alert({type: 'error', text: error.message})
  }
  
  
}

async function generateMovieParameter (){
  if(movieName.value === '') throw new Error('Nome do filme deve ser informado');   
   
  let urlTranslate = `https://api.mymemory.translated.net/get?q=${movieName.value}!&langpair=pt-br|en`;
  const responseTranslate = await fetch(urlTranslate);
  const dataTranslate = await responseTranslate.json();
  const nameMovieTranslate = dataTranslate.responseData.translatedText;   
   
  const searchMovie = nameMovieTranslate.split(' ').join('+')
  return searchMovie;
}

function generateYearParameter (){
  if (movieYear.value === '') return '';
  if(movieYear.value.length !== 4 || Number(movieYear.value === NaN)) throw new Error('Ano do filme inválido');    
  
  return `&y=${movieYear.value}`;
}



searchMovieButton.addEventListener('click', insertieMovieData)




