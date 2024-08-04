let currentIndex = 0;

const gallery = document.querySelector('.gallery');
const images = document.querySelectorAll('.gallery-image');
const totalImages = images.length;
const uploadInput = document.getElementById('upload');
const deleteButton = document.querySelector('.delete-button');

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateGallery();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateGallery();
});

uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newImage = document.createElement('img');
            newImage.src = e.target.result;
            newImage.alt = 'New Image';
            newImage.classList.add('gallery-image');
            gallery.appendChild(newImage);
            updateGalleryImages();
        };
        reader.readAsDataURL(file);
    }
});

gallery.addEventListener('click', (event) => {
    if (event.target.classList.contains('gallery-image')) {
        images.forEach(img => img.classList.remove('selected'));
        event.target.classList.add('selected');
        deleteButton.style.display = 'inline-block';
    }
});

deleteButton.addEventListener('click', () => {
    const selectedImage = document.querySelector('.gallery-image.selected');
    if (selectedImage) {
        gallery.removeChild(selectedImage);
        deleteButton.style.display = 'none';
        updateGalleryImages();
    }
});

function updateGallery() {
    const offset = -currentIndex * 100;
    gallery.style.transform = `translateX(${offset}%)`;
}

function updateGalleryImages() {
    images = document.querySelectorAll('.gallery-image');
    totalImages = images.length;
    currentIndex = 0;
    updateGallery();
}