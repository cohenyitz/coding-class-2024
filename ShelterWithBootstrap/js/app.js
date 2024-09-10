// Sample animal data
const animals = [
  {
    id: 1,
    name: "Buddy",
    image: "images/dog1.jpg",
    bio: "Buddy is a friendly golden retriever.",
  },
  {
    id: 2,
    name: "Mittens",
    image: "images/cat1.jpg",
    bio: "Mittens is a calm and loving cat.",
  },
  {
    id: 3,
    name: "Max",
    image: "images/dog2.jpg",
    bio: "Max loves to run and play fetch.",
  },
];

const animalCardsContainer = document.getElementById("animalCards");

// Dynamically generate animal cards
animals.forEach((animal) => {
  const animalCard = `
        <div class="col-md-4">
            <div class="card">
                <img src="${animal.image}" class="card-img-top" alt="${animal.name}">
                <div class="card-body">
                    <h5 class="card-title">${animal.name}</h5>
                    <p class="card-text">${animal.bio}</p>
                    <div class="d-flex justify-content-between">
                        <i class="bi bi-heart-fill favorite" onclick="toggleFavorite(${animal.id})"></i>
                        <i class="bi bi-share-fill share" onclick="shareAnimal('${animal.name}')"></i>
                    </div>
                    <a href="profile.html?id=${animal.id}" class="btn btn-primary mt-3">View Profile</a>
                </div>
            </div>
        </div>
    `;
  animalCardsContainer.innerHTML += animalCard;
});

// Add to favorites functionality
function toggleFavorite(id) {
  // Add functionality to toggle the favorite status
  console.log(`Toggled favorite for animal with ID: ${id}`);
}

// Share functionality
function shareAnimal(name) {
  alert(`Share ${name}'s profile!`);
}
