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
let ticket_sold;
let movieObj;
// Selectors
const content = document.querySelector("#content");
const cards = [];
fetch(url)
.then(data => data.json())
.then(res => {
    filmsData = res;
    //Initial diplay when the page loads
    renderMovies(res[0]);
    // console.log(res[0])
    for(let i = 0; i < res.length; i++)
    {
        renderNav(res[i])
    }
})
.catch(error => console.log(error));

function renderMovies(movie)
{
    movieObj = movie;
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = '';
    available = (movie.capacity - movie.tickets_sold);
    ticket_sold = movie.tickets_sold;
    movieDiv.innerHTML = `
        <div class="card">
            <img class="card-img" src="${movie.poster}">
            <div class="card-description">
                <h4>${movie.title}</h4>
                <p class="info">${movie.description}</p>
                <p>Runtime: ${movie.runtime}</p>
                <p>Availible tickets: <span id='available'>${available}</span></p>
                <p>Show time: ${movie.showtime}</p>
                <button class="buyTicket" id="buyTicket" onClick="buyTicket('${movie.id}')">Buy Ticket</button>
            </div>
        </div>
    `
    document.querySelector("#movies").innerHTML = '';
    document.querySelector("#movies").appendChild(movieDiv);
}

function renderNav(data)
{
    films.className = "films"
    let film = document.createElement('li')
    film.className = "film item"
    film.innerHTML = `
        <a onClick = "navigator('${data.id}')">${data.title}</a>
        <a onClick = "deleteFilm('${data.id}')" style="color:red; float:right;">delete</a>
    `
    films.appendChild(film);
}

function navigator(id)
{
    renderMovies(filmsData[id-1]);
}

function buyTicket(id){
    
    if(available > 0){
        available = available - 1;
        ticket_sold = ticket_sold + 1;
        updateServer(id,ticket_sold);
        document.getElementById('available').textContent = available;
        if (available === 0){
            const button = document.getElementById("buyTicket");
            button.textContent = "Ticket Sold Out";
            button.style.backgroundColor = "red"
            button.style.cursor = "not-allowed"
            button.setAttribute("disabled", "");
        }
    } 
    
}

function updateServer(id,ticket_sold)
{
    // console.log(id,ticket_sold)
    console.log(movieObj)
    fetch(`${url}/${id}`,{
        method: "PATCH",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "tickets_sold":ticket_sold
        })
        
    })
    .then(res => res.json())
        .then(movie => {
            renderMovies(movie);
        })
}

function deleteFilm(id)
{
    console.log(id);
    let msg = "Are you sure you want to delete";
    if(confirm(msg) == true){
        fetch(`${url}/${id}`,{
            method: "DELETE",
        })
    }
}

