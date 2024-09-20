// API Endpoints
const apiEndpoint = 'http://localhost:8080/api/animals'; // Endpoint to fetch all animals
const profileEndpointBase = 'http://localhost:8080/api/animals/'; // To fetch specific animal profiles

// Fetch all animals and display cards
async function fetchAnimals() {
    try {
        const response = await fetch(apiEndpoint);
        const animals = await response.json();
        displayAnimals(animals);
    } catch (error) {
        console.error('Error fetching animal data:', error);
    }
}

// Display animal cards dynamically 
function displayAnimals(animals) {
    const animalCards = document.getElementById('animal-cards');

    // Clear existing cards by removing all child elements
    animalCards.replaceChildren();  // This efficiently clears all children

    animals.forEach(animal => {
        // Create a div for the animal card column
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4', 'my-3');

        // Create a card div
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Create an image element
        const img = document.createElement('img');
        img.src = animal.imageUrl;
        img.alt = animal.name;
        img.classList.add('card-img-top');

        // Create the card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create the card title (animal name)
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = animal.name;

        // Create the card text (animal bio)
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = animal.bio;

        // Create the button div (for "View Profile", "Favorite", "Share")
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

        // Create the "View Profile" button
        const viewProfileBtn = document.createElement('button');
        viewProfileBtn.classList.add('btn', 'btn-outline-primary');
        viewProfileBtn.textContent = 'View Profile';
        viewProfileBtn.onclick = () => viewProfile(animal.id);  // Event handler for viewing the profile

        // Create the div to hold favorite and share buttons
        const actionBtnDiv = document.createElement('div');

        // Create the "Favorite" button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('btn', 'btn-outline-danger');

        // Create the heart icon for the favorite button
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('bi', 'bi-heart'); // Bootstrap icon class for heart
        favoriteBtn.appendChild(heartIcon); // Append the heart icon to the button
        favoriteBtn.appendChild(document.createTextNode(' Favorite')); // Append the text
        favoriteBtn.onclick = () => toggleFavorite(favoriteBtn);  // Event handler for toggling favorite

        // Create the "Share" button
        const shareBtn = document.createElement('button');
        shareBtn.classList.add('btn', 'btn-outline-secondary');

        // Create the share icon for the share button
        const shareIcon = document.createElement('i');
        shareIcon.classList.add('bi', 'bi-share'); // Bootstrap icon class for share
        shareBtn.appendChild(shareIcon); // Append the share icon to the button
        shareBtn.appendChild(document.createTextNode(' Share')); // Append the text

        // Append buttons to the actionBtnDiv
        actionBtnDiv.appendChild(favoriteBtn);
        actionBtnDiv.appendChild(shareBtn);

        // Append "View Profile" and action buttons to the buttonDiv
        buttonDiv.appendChild(viewProfileBtn);
        buttonDiv.appendChild(actionBtnDiv);

        // Append the card title, text, and buttons to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(buttonDiv);

        // Append the image and card body to the card div
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        // Append the card to the column div
        colDiv.appendChild(cardDiv);

        // Finally, append the column to the animalCards container
        animalCards.appendChild(colDiv);
    });
}


// View profile, but only if the user is authenticated
function viewProfile(animalId) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert('You must be logged in to view this profile.');
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    } else {
        window.location.href = `profile.html?id=${animalId}`; // Redirect to profile with ID
    }
}

// Toggle favorite status
function toggleFavorite(button) {
    const heartIcon = button.querySelector('i');
    heartIcon.classList.toggle('bi-heart');
    heartIcon.classList.toggle('bi-heart-fill');

    const cardTitle = button.closest('.card-body').querySelector('.card-title').textContent;
    alert(`${cardTitle} has been added to your favorites!`);
}

// Fetch animals on page load
document.addEventListener('DOMContentLoaded', fetchAnimals);
