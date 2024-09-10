// Login/Signup Modal Functions
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");

document.getElementById("login-btn").addEventListener("click", () => {
    loginModal.style.display = "block";
});

document.getElementById("signup-btn").addEventListener("click", () => {
    signupModal.style.display = "block";
});

function closeLogin() {
    loginModal.style.display = "none";
}

function closeSignup() {
    signupModal.style.display = "none";
}

// Animal Profile Modal
const profileModal = document.getElementById("profile-modal");
const profileDetails = document.getElementById("profile-details");

function openProfile(animalId) {
    // Normally, you'd fetch data from a server
    const profiles = {
        'animal1': {
            name: 'Max',
            bio: 'Max is an energetic dog who loves the outdoors!',
            image: 'https://via.placeholder.com/150'
        },
        // Add more animal profiles as needed
    };

    const animal = profiles[animalId];
    profileDetails.innerHTML = `
                                                    <img src="${animal.image}" alt="Animal Image" style="width: 100%;">
                                                        <h2>${animal.name}</h2>
                                                            <p>${animal.bio}</p>
                                                              `;
    profileModal.style.display = "block";
}

function closeProfile() {
    profileModal.style.display = "none";
}

// Favorite and Share Functions
function toggleFavorite(event, animalId) {
    event.stopPropagation(); // Prevent card click
    const target = event.target;
    if (target.textContent === '❤️') {
        target.textContent = '💔'; // Unfavorite
    } else {
        target.textContent = '❤️'; // Favorite
    }
}

function shareProfile(event, animalId) {
    event.stopPropagation(); // Prevent card click
    alert(`Sharing profile of ${animalId}`);
}

// Close modal when clicked outside
window.onclick = function (event) {
    if (event.target == profileModal) {
        closeProfile();
    } else if (event.target == loginModal) {
        closeLogin();
    } else if (event.target == signupModal) {
        closeSignup();
    }
};