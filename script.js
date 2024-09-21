// Handle the navigation
function handleClick(selectedValue) {
    // Define the mapping of values to section IDs
    const sectionMapping = {
        'Gown': 'check-list',
        'Lehenga': 'check-list',
        'Saree': 'check-list',
        // Add more mappings as needed
    };

    // Get the corresponding section ID
    const sectionId = sectionMapping[selectedValue];

    // If a valid section ID is found, scroll to that section
    if (sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
}



// mobile swiper
// Grab all swiper slides and the dropdown
const slides = document.querySelectorAll('.swiper-slide');
const select = document.getElementById('swiper-select');

// Keep track of active slide index
let activeIndex = 0;

// Initialize swiper with active, left, and right classes
function updateSwiper() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'left', 'right', 'hidden-left', 'hidden-right');

        if (index === activeIndex) {
            // Set active slide
            slide.classList.add('active');
        }
        else if (index === (activeIndex - 1 + slides.length) % slides.length) {
            // Set left slide
            slide.classList.add('left');
        }
        else if (index === (activeIndex + 1) % slides.length) {
            // Set right slide
            slide.classList.add('right');
        }
        else if (index === (activeIndex - 2 + slides.length) % slides.length) {
            // Set hidden-left slides (2nd image behind left)
            slide.classList.add('hidden-left');
        }
        else if (index === (activeIndex + 2) % slides.length) {
            // Set hidden-right slides (2nd image behind right)
            slide.classList.add('hidden-right');
        }
    });
}

// Update active index on dropdown change
select.addEventListener('change', (e) => {
    activeIndex = parseInt(e.target.value);
    updateSwiper();
});

// Swipe logic for mobile
let startX = 0;
let endX = 0;

document.querySelector('.swiper-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.swiper-container').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (startX > endX + 50) {
        // Swipe left to next image
        activeIndex = (activeIndex + 1) % slides.length;
    } else if (startX < endX - 50) {
        // Swipe right to previous image
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    }
    select.value = activeIndex;
    updateSwiper();
}

// Call initially to set the first slide as active
updateSwiper();



// image grid
// Get the 'Continue' button and image grid container
const continueButton = document.getElementById('continue-button');
const imageGrid = document.getElementById('image-grid');
const login = document.getElementById('login');


// Function to expand the grid when 'Continue' is clicked
continueButton.addEventListener('click', function () {
    // Change the height of the image grid to 'auto' to display all images
    imageGrid.style.height = 'auto';

    // Optionally, hide the 'Continue' button after expanding
    // continueButton.style.display = 'none';
    login.style.display = 'none';
});

