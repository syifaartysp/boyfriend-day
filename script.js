/* =========================
   SCREEN NAVIGATION
========================= */

function goTo(number) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen-${number}`);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (number === 3) {
    createHearts();
  }
}


/* =========================
   LITTLE THINGS
========================= */

function littleThing(button) {

  document.querySelectorAll(".choice-card").forEach(card => {
    card.classList.remove("selected");
  });

  button.classList.add("selected");

  const message = document.getElementById("choice-message");
  const continueButton = document.getElementById("choice-continue");

  const messages = [
    "Awww. Cipaaa is happy now. ♡",
    "Good choice. Attention is VERY important. 😌",
    "Correct. Cipaaa deserves to be spoiled. ♡"
  ];

  const index = [...document.querySelectorAll(".choice-card")]
    .indexOf(button);

  message.textContent = messages[index];

  continueButton.classList.remove("hidden");
}


/* =========================
   HEART GAME
========================= */

const totalHearts = 12;
let collectedHearts = 0;

function createHearts() {

  const area = document.getElementById("heart-area");

  area.innerHTML = "";

  collectedHearts = 0;

  updateHeartCount();

  const heartSymbols = ["♥", "♡", "💗"];

  for (let i = 0; i < totalHearts; i++) {

    const heart = document.createElement("button");

    heart.className = "floating-heart";

    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left =
      `${8 + Math.random() * 84}%`;

    heart.style.top =
      `${8 + Math.random() * 80}%`;

    heart.style.animationDelay =
      `${Math.random() * 1.5}s`;

    heart.addEventListener("click", () => {

      heart.remove();

      collectedHearts++;

      updateHeartCount();

      if (collectedHearts >= totalHearts) {

        document.getElementById("heart-continue")
          .classList.remove("hidden");
      }

    });

    area.appendChild(heart);
  }
}


function updateHeartCount() {

  document.getElementById("heart-count").textContent =
    `${collectedHearts} / ${totalHearts} hearts`;
}


/* =========================
   LOVE INPUT
========================= */

function checkLoveInput() {

  const input = document.getElementById("love-input");
  const button = document.getElementById("unlock-button");

  const value = input.value.trim().toLowerCase();

  button.disabled = value !== "i love you";
}


/* =========================
   UNLOCK MESSAGE
========================= */

function unlockMessage() {

  const input = document.getElementById("love-input");
  const error = document.getElementById("unlock-error");

  const value = input.value.trim().toLowerCase();

  if (value === "i love you") {

    error.textContent = "";

    goTo(5);

  } else {

    error.textContent =
      "Hmm... that's not the magic word. Try again. ♡";
  }
}


/* =========================
   RESTART
========================= */

function restartWebsite() {

  collectedHearts = 0;

  document.getElementById("love-input").value = "";

  document.getElementById("unlock-button").disabled = true;

  document.getElementById("unlock-error").textContent = "";

  document.getElementById("choice-message").textContent = "";

  document.getElementById("choice-continue").classList.add("hidden");

  document.querySelectorAll(".choice-card").forEach(card => {
    card.classList.remove("selected");
  });

  goTo(1);
}