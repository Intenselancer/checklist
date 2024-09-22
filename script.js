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
const imageGrid = document.getElementById('moodboard');
const login = document.getElementById('login');


// Function to expand the grid when 'Continue' is clicked
continueButton.addEventListener('click', function () {
    // Change the height of the image grid to 'auto' to display all images
    imageGrid.style.height = 'auto';

    // Optionally, hide the 'Continue' button after expanding
    // continueButton.style.display = 'none';
    login.style.display = 'none';
});



// main functionalities

let selectedList = "";
const modboardLoading = document.getElementById("modboardLoading")
const modboardSection = document.getElementById("modboardSection")
const categoryContainer = document.getElementById("categoryContainer");
const handleSaree = (id) => {
    console.log({ data: document.getElementById(id) });
    console.log(selectedList);
    // const tickContainer = document.getElementById(id).childNodes[1]
    if (selectedList.includes(id.toLowerCase())) {
        selectedList = selectedList.replace(id + ",", "");
        // console.log(tickContainer);
        // tickContainer.childNodes[5].remove()
        return;
    }
    selectedList += id.toLowerCase() + ",";

    // tickContainer.innerHTML += ' <img src="https://staticimg.tanishq.co.in/microsites-test/dreamlisttest/assets-one/images/right-mark.png " class="tw-bg-[#ffffff89] tw-rounded-full" alt="">'
};

const shareOnWhatsapp = (id) => {
    const url = window.location.href; // Replace with the link you want to share
    const text = "Tanishq for you"; // Replace with your custom message
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}/${id}`;

    // Open the WhatsApp sharing URL
    window.open(whatsappUrl, "_blank");
};

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log("Text copied:", text);
    } catch (err) {
        console.error("Failed to copy text: ", err);
    }
};

const handleCategory = async () => {
    console.log("calling");
    modboardSection.classList.add("visually-hidden")
    modboardLoading.classList.remove("visually-hidden")
    // setTimeout(()=>{

    // },2000)
    modboardLoading.scrollIntoView()

    const response = await fetch(
        `https://celebrations.tanishq.co.in/rivaah/getImages?categories=${selectedList}`,
        { method: "GET" },
    );
    const data = await response.json();
    console.log("the data is===>", data);

    const selectedCategories = selectedList.split(",");
    let category = "";
    for (let i = 0; i < selectedCategories.length - 1; i++) {
        category += `<div class="d-flex px-4 py-2 gap-3 chip align-items-center justify-content-center dark-border rounded-pill">
                <span>${selectedCategories[i]}</span>
            </div>`;
    }
    categoryContainer.innerHTML = category;
    let product = data.productDetails
    if (!localStorage.getItem("viewed"))
        product = product.slice(0, 7)
    handleMoodboard(product);
    modboardLoading.classList.add("visually-hidden")
    modboardSection.classList.remove("visually-hidden")
};

const handleMoodboard = (product) => {
    let element = '';
    for (let i = 0; i < product.length; i++) {
        const pr = product[i];


        element += ` <div class="image-box">
                        <img src="${pr.productImage}" alt="Image ">

                        <div class="d-flex justify-content-between px-2" style="margin-top: -2.5rem;">
                            <button onclick="copyText('${pr.productLink}')"
                                class="d-flex align-items-center gap-2 pad justify-content-between dark-border rounded-pill">
                                <span class="text-s">Copy URL</span>
                                <i class="bi bi-copy"></i>
                            </button>

                            <button onclick="shareOnWhatsapp('${pr.productLink}')" class="dark-border pad rounded-pill">
                                <i class="bi bi-whatsapp"></i>
                            </button>
                        </div>
                    </div>
       `;
    }

    // const userCard = ` <div id="login" class="w-100 flex-column justify-content-center align-items-center login">
    //     <div class="d-flex flex-column align-items-center justify-content-center">
    //         <h2 class="headings text-center">Stay Inspired for Your Big Day!</h2>
    //         <p class="text-center" style="font-size: 1.3rem;">Unlock Your Full Moodboard: Download, Discover Similar
    //             Styles, and Perfect Your
    //             Look!</p>
    //     </div>

    //     <div class="d-flex flex-column flex-md-row gap-3 mb-2">
    //         <div class="d-flex flex-column align-items-center align-items-lg-start">
    //             <p class="text-col">Name</p>
    //             <div
    //                 class="d-flex flex-row bg-white gap-2 px-3 py-2 justify-content-center align-items-center dark-border border-round">
    //                 <i class="bi bi-person text-col"></i>
    //                 <input id="userName" type="text" placeholder="Type your name here">
    //             </div>
    //         </div>

    //         <div class="d-flex flex-column align-items-center align-items-lg-start">
    //             <p class="text-col">Contact Number</p>
    //             <div
    //                 class="d-flex flex-row bg-white gap-2 px-3 py-2 justify-content-center align-items-center dark-border border-round">
    //                 <i class="bi bi-telephone text-col"></i>
    //                 <input type="tel" id="userMobile" placeholder="Type your phone number here">
    //             </div>
    //         </div>

    //         <button onclick="sendUserDetails()" id="continue-button" style="width: fit-content;"
    //             class="gradient-btn border-0 d-flex mt-4 gap-3 align-self-lg-end align-self-center align-items-center text-white px-4 py-1 rounded-pill">
    //             <span class="text-white">Continue</span>
    //             <div class="chevron-btn">
    //                 <i class="bi bi-chevron-right"></i>
    //             </div>
    //         </button>
    //     </div>
    // </div>  
    //    `;
    const modBoard = document.getElementById("moodboard")
    modBoard.innerHTML = element
    console.log(localStorage.getItem("viewed"));

    // if (!localStorage.getItem("viewed"))
    //     modBoard.innerHTML += userCard;
};


const sendUserDetails = async () => {

    const name = document.getElementById("userName").value
    const mobile = document.getElementById("userMobile").value

    document.getElementById("next-arr").style.display = "none"
    document.getElementById("loader").style.display = "block"
    const response = await fetch(
        `https://celebrations.tanishq.co.in/rivaah/userDetails?name=${name}&contact=${mobile}`,
        { method: "POST" },
    );
    const data = await response.json();
    console.log(data);
    localStorage.setItem("viewed", true)
    handleCategory()


};

const sendBrideDetails = async () => {
    const brideDetails = {
        bride: "Telugu",
        event: "Reception",
        clothing_type: "saree",
        tags: [
            selectedList
        ]

    }
    const response = await fetch(`https://f505-2402-e280-3e52-232-a809-8c0d-30fe-387d.ngrok-free.app/rivaah/shareDetails`,
        { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(brideDetails) },
    );
    const data = await response.json();
    shareOnWhatsapp(data.result)
}
const getBrideDetails = async () => {
    const url = window.location.href.split("/");
    const id = url[url.length - 1]

    const response = await fetch(`https://f505-2402-e280-3e52-232-a809-8c0d-30fe-387d.ngrok-free.app/rivaah/getAllDetails/${id}`, { headers: { "ngrok-skip-browser-warning": "69420" } }

    );
    const data = await response.json();
    console.log(data);

}
getBrideDetails();
