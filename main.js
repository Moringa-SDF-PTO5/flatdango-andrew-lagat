const url = "http://localhost:3000/films"

//create elements
const card = document.createElement('div');
card.className = "card"
const cardImg = document.createElement('img')
cardImg.className = "card-img"
const cardDescription = document.createElement('div');
cardDescription.className = "card-description"
const films = document.querySelector('#films');
let filmsData = []; 
let available;

// Selectors
const content = document.querySelector("#content");
// console.log(content)
const cards = [];
fetch(url)
.then(data => data.json())
.then(res => {
    filmsData = res;
    //Initial diplay when the page loads
    renderMovies(res[0]);

    for(let i = 0; i < res.length; i++)
    {
        renderNav(res[i])
    }
});

function renderMovies(movie)
{
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = '';
    available = (movie.capacity - movie.tickets_sold);
    movieDiv.innerHTML = `
        <div class="card">
            <img class="card-img" src="${movie.poster}">
            <div class="card-description">
                <h4>${movie.title}</h4>
                <p class="info">${movie.description}</p>
                <p>Runtime: ${movie.runtime}</p>
                <p>Availible tickets: <span id='available'>${available}</span></p>
                <p>Show time: ${movie.showtime}</p>
                <button class="buyTicket" onClick="buyTicket('${movie.id}')">Buy Ticket</button>
            </div>
        </div>
    `
    document.querySelector("#movies").innerHTML = '';
    document.querySelector("#movies").appendChild(movieDiv);
}

function renderNav(data)
{
    films.className = "films"
    const film = document.createElement('li')
    film.className = "film item"
    film.innerHTML = `
        <a onClick = "navigator('${data.id}')">${data.title}</a>
    `
    films.appendChild(film);
}

function navigator(id)
{
    renderMovies(filmsData[id-1]);
}

function buyTicket(id){
    console.log(filmsData[id-1])
    
    // console.log(available)
    if(available > 0){
        available = available - 1
        document.getElementById('available').textContent = available;
    } else {
        const button = document.getElementsByClassName('buyTicket');
        button.setAttribute("disabled","");
    }
    
}

