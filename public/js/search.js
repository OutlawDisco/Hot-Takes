const searchFormHandler = async (event) => {
  event.preventDefault();

  const movieQuery = document.querySelector('input[name="movie-search]').value;

  // const response = await fetch(`http://www.omdbapi.com/?t=${movieQuery}&apikey=b1ba91dd`)

console.log(response);


};
document.querySelector('#movie-search').addEventListener('submit', searchFormHandler);