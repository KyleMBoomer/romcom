var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var coverTag1 = document.querySelector(".tagline-1");
var coverTag2 = document.querySelector(".tagline-2");
var randCoverButton = document.querySelector(".random-cover-button");
var makeCoverButton = document.querySelector(".make-new-button");
var viewSavedCovers = document.querySelector(".view-saved-button");
var homeButton = document.querySelector(".home-button");
var saveCoversButton = document.querySelector(".save-cover-button");
var coverUrl = document.querySelector(".user-cover");
var titleInputBox = document.querySelector(".user-title");
var descriptorInputBox1 = document.querySelector(".user-desc1");
var descriptorInputBox2 = document.querySelector(".user-desc2");
var formView = document.querySelector(".form-view");
var newBookButton = document.querySelector(".create-new-book-button");
var savedCoversSection = document.querySelector(".saved-covers-section")
var savedCovers = [];
var currentCover;

document.addEventListener("DOMContentLoaded", getRandomNovel);
randCoverButton.addEventListener("click", getRandomNovel);
makeCoverButton.addEventListener("click", makeCover);
homeButton.addEventListener("click", goHome);
newBookButton.addEventListener("click", makeANovel);
saveCoversButton.addEventListener('click', saveCurrentCover);
viewSavedCovers.addEventListener('click', function() {
  showSavedCovers();
  displaySavedCovers();
});

function makeCover() {
  document.querySelector(".form-view").classList.remove("hidden");
  document.querySelector(".home-view").classList.add("hidden");
  document.querySelector(".random-cover-button").classList.add("hidden");
  document.querySelector(".save-cover-button").classList.add("hidden");
  document.querySelector(".home-button").classList.remove("hidden");
  document.querySelector(".make-new-button").classList.remove("hidden");
  document.querySelector(".view-saved-button").classList.remove("hidden");
}

function showSavedCovers() {
  document.querySelector(".saved-view").classList.remove("hidden");
  document.querySelector(".random-cover-button").classList.add("hidden");
  document.querySelector(".home-button").classList.remove("hidden");
  document.querySelector(".home-view").classList.add("hidden");
  document.querySelector(".save-cover-button").classList.add("hidden");
  document.querySelector(".view-saved-button").classList.remove("hidden");
  document.querySelector(".form-view").classList.add("hidden");
}

function goHome() {
  document.querySelector(".home-view").classList.remove("hidden");
  document.querySelector(".form-view").classList.add("hidden");
  document.querySelector(".home-button").classList.add("hidden");
  document.querySelector(".save-cover-button").classList.remove("hidden");
  document.querySelector(".random-cover-button").classList.remove("hidden");
  document.querySelector(".view-saved-button").classList.remove("hidden");
  document.querySelector(".make-new-button").classList.remove("hidden");
}
function changeFormView() {
  document.querySelector(".form-view").classList.toggle("hidden");
  document.querySelector(".home-view").classList.toggle("hidden");
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2,
  };
  return cover;
}

function getRandomNovel() {
  var randomCoverIndex = getRandomIndex(covers);
  var randomTitleIndex = getRandomIndex(titles);
  var randomDescriptorIndex = getRandomIndex(descriptors);
  var randomDescriptorIndex2 = getRandomIndex(descriptors);

  var newNovel = createCover(
    covers[randomCoverIndex],
    titles[randomTitleIndex],
    descriptors[randomDescriptorIndex],
    descriptors[randomDescriptorIndex2]);

  currentCover = newNovel;

  coverTitle.innerText = newNovel.title;
  coverTag1.innerText = newNovel.tagline1;
  coverTag2.innerText = newNovel.tagline2;
  coverImage.setAttribute("src", newNovel.coverImg);

  return currentCover;
}

function makeANovel(event) {
  if (event) event.preventDefault();
  var userNovelDesign = createCover(coverUrl, title, descriptor1, descriptor2);
  coverImage.setAttribute("src", userNovelDesign.coverImg.value);
  coverTitle.innerText = userNovelDesign.title.value;
  coverTag1.innerText = userNovelDesign.tagline1.value;
  coverTag2.innerText = userNovelDesign.tagline2.value;
  covers.push(userNovelDesign.coverImg);
  titles.push(userNovelDesign.title);
  descriptors.push([userNovelDesign.tagline1, userNovelDesign.tagline2]);
  changeFormView();
}

function saveCurrentCover() {
  var newCover = {
    coverImg: coverImage.src,
    title: coverTitle.innerText,
    tagline1: coverTag1.innerText,
    tagline2: coverTag2.innerText
  };
  var isDuplicate = savedCovers.some(function(savedCover) {
    return savedCover.coverImg === newCover.coverImg;
  });
  if (!isDuplicate) {
    savedCovers.push(newCover);
  }
}

function displaySavedCovers() {
  savedCoversSection.innerHTML = '';
  savedCovers.forEach(function(savedCover) {
    var savedCoverElement = document.createElement('div');
    savedCoverElement.classList.add('mini-cover');
    savedCoverElement.innerHTML = `
      <img class="cover-image" src="${savedCover.coverImg}" alt="Saved Cover">
      <h4 class="cover-title">${savedCover.title}</h4>
      <h5 class="tagline">A tale of ${savedCover.tagline1} and ${savedCover.tagline2}</h5>
    `;
    savedCoverElement.addEventListener('dblclick', function() {
      deleteSavedCover(savedCover, savedCoverElement);
    });
    savedCoversSection.appendChild(savedCoverElement);
  });
}

function deleteSavedCover(cover, coverElement) {
  savedCovers = savedCovers.filter(function(savedCover) {
    return savedCover.id !== cover.id;
  });
  coverElement.remove();
}
