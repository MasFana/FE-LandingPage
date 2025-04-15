const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("mouseover", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

let allCards = [];
let visibleCards = 4;
let isAllVisible = false;

document.getElementById("loadMoreBtn").addEventListener("click", toggleCards);

function loadCards() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      allCards = data;
      renderCards();
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
}

function renderCards() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (let i = 0; i < visibleCards && i < allCards.length; i++) {
    const cardData = allCards[i];

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = cardData.image;
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = cardData.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = cardData.description;
    card.appendChild(description);

    const rate = document.createElement("div");
    rate.classList.add("rate");
    rate.textContent = `Coming soon`;
    card.appendChild(rate);

    cardContainer.appendChild(card);
  }

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (isAllVisible) {
    loadMoreBtn.textContent = "Lebih Sedikit";
  } else {
    if (visibleCards >= allCards.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
      loadMoreBtn.textContent = "Selengkapnya";
    }
  }

  const cardWrapper = document.querySelector(".card-wrapper");

  if (isAllVisible) {
    cardWrapper.style.paddingTop = "40px";
    cardWrapper.style.paddingBottom = "40px";
    cardWrapper.style.paddingTop = "20px";
    cardWrapper.style.paddingBottom = "20px";
  }
}

function toggleCards() {
  if (isAllVisible) {
    visibleCards = 4;
    isAllVisible = false;
  } else {
    visibleCards = allCards.length;
    isAllVisible = true;
  }
  renderCards();
}

loadCards();
