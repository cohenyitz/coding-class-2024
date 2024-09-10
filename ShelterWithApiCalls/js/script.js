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
    animalCards.innerHTML = ''; // Clear existing cards

    animals.forEach(animal => {
        const cardHtml = `
        <div class="col-md-4 my-3">
            <div class="card">
                <img src="${animal.imageUrl}" class="card-img-top" alt="${animal.name}">
                <div class="card-body">
                    <h5 class="card-title">${animal.name}</h5>
                    <p class="card-text">${animal.bio}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-outline-primary" onclick="viewProfile(${animal.id})">View Profile</button>
                        <div>
                            <button class="btn btn-outline-danger" onclick="toggleFavorite(this)">
                                <i class="bi bi-heart"></i> Favorite
                            </button>
                            <button class="btn btn-outline-secondary">
                                <i class="bi bi-share"></i> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        animalCards.innerHTML += cardHtml;
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
