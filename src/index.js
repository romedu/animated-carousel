// This file was made assuming a modern browser(which supports es6 out of the box) was used

const imageCarousel = document.querySelector(".carousel"), // Carousel of images
      playStopBtn = document.querySelector(".play-stop-btn"),
      [leftArrowBtn, rightArrowBtn] = document.querySelectorAll(".arrow-btn"), 
      imagesPath = [
         "https://d24fkeqntp1r7r.cloudfront.net/wp-content/uploads/2019/03/14191224/kazuend-30877-unsplash.jpg",
         "https://i.ytimg.com/vi/zNduB6NTah8/maxresdefault.jpg", 
         "https://bloximages.chicago2.vip.townnews.com/dailyitem.com/content/tncms/assets/v3/editorial/1/34/1341ffa7-d377-51e3-8832-47aebdda202d/5cf2a1ea077b0.image.jpg?resize=1200%2C801",
         "https://cdn-images-1.medium.com/max/1600/0*cUOzSFNA_qBLIyVK.jpg"
      ];

let currentImageIndex = 0, // Index of the image currently being displayed in the carousel
    isCarouselActive = true, // If the carousel is changing images automatically or not
    carouselTimer = startCarouselTimer(); // Holds the current carousel timer

playStopBtn.onclick = playOrStopCarousel;
leftArrowBtn.onclick = skipImage.bind({}, -1);
rightArrowBtn.onclick = skipImage.bind({}, 1);

// Play or pauses the carousel's automatic image change
function playOrStopCarousel(){
   if(isCarouselActive){
      clearInterval(carouselTimer);
      isCarouselActive = false;
      playStopBtn.textContent = "▶";
   }
   else {
      carouselTimer = startCarouselTimer();
      isCarouselActive = true;
      playStopBtn.textContent = "◼";
   }
}

// Starts the carousel's automatic image change
function startCarouselTimer(){
   return setInterval(() => {
      currentImageIndex++;
      if(currentImageIndex === imagesPath.length) currentImageIndex = 0;
      updateCarouselImage(currentImageIndex);
   }, 3500);
}

function updateCarouselImage(imageIndex){
   imageCarousel.style.backgroundImage = `url(${imagesPath[imageIndex]})`;
}

// Manually changes images
// If this method was called, the carousel will stop changing images automatically
function skipImage(skipCount){
   currentImageIndex += skipCount;
   // If the last image was being displayed and the next one was requested display the first one
   if(currentImageIndex >= imagesPath.length) currentImageIndex = 0;
   // If the first image was being displayed and the previous one was requested display the last one
   else if(currentImageIndex < 0) currentImageIndex = imagesPath.length -1; 

   updateCarouselImage(currentImageIndex);
   // If the carousel was still moving chaging images automatically it will stop it
   if(isCarouselActive) playOrStopCarousel()
}