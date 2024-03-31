// Function to fetch film data from API endpoint
function fetchFilmData() {
    fetch('http://localhost:3000/films')
      .then(response => {
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return response.json();
      })
      .then(data => {

        const filmsList = document.getElementById('films');
        // Here we clear any existing list items
        filmsList.innerHTML = '';
        //Here we loop through the film data and create lists for each movie
        data.forEach(film => {
          const listItem = document.createElement('li');
          listItem.classList.add('film', 'item');
          listItem.textContent = film.title;
          // Add an event listener
          listItem.addEventListener('click', () => {
            // Here we display the details of the clicked movie
            displayMovieDetails(film);
          });
          filmsList.appendChild(listItem);
        });
  
        displayMovieDetails(data[0]);
      })
      .catch(error => {
        // This is to handle any errors that occurred during the fetch process in the code
        console.error('Error fetching film data:', error);
      });
  }
  
  // This is the function to display movie details 
  function displayMovieDetails(movie) {
    document.getElementById('title').textContent = movie.title;
    document.getElementById('runtime').textContent = movie.runtime + ' minutes';
    document.getElementById('showtime').textContent = movie.showtime;
    document.getElementById('film-info').textContent = movie.description;

    //Here we calculate available tickets
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('ticket-num').textContent = availableTickets + ' remaining tickets';
    // Update poster image
    document.getElementById('poster').src = movie.poster;
  }
  
  // This is the function to handle buying a ticket
  function buyTicket() {

    const ticketNumElement = document.getElementById('ticket-num');
    let availableTickets = parseInt(ticketNumElement.textContent);
  
    // Check if there are tickets available and perform necessary operations such as increasing or decreasing the number
    if (availableTickets > 0) {
    
      availableTickets--;
  
      // Update the number of available tickets displayed on the frontend

      //I used alert for better user experience

      ticketNumElement.textContent = availableTickets + ' remaining tickets';
    } else {
      alert('Sorry, tickets are sold out.');
    }
  }
  
  //This is the function to initialize event listeners
  function initializeEventListeners() {
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.addEventListener('click', buyTicket);
  }

  // Call fetchFilmData function when the page loads
  window.onload = function() {
    fetchFilmData();
    initializeEventListeners();
  };
  