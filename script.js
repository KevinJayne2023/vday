// ---------- ADS (visible immediately) ----------
const ads = [
  {
    brand: "Trip Advisor",
    headline: "Five-star honeymoon energy",
    caption: "★★★★★ “Would relive forever.”",
    img: "img/bora_bora.jpg"
  },
  {
    brand: "Matchmaking",
    headline: "Best couple on the internet",
    caption: "Verified chemistry • zero returns",
    img: "img/selfie.jpg"
  },
  {
    brand: "Parenting Weekly",
    headline: "Mom mode: elite",
    caption: "Organization + love = unstoppable",
    img: "img/luca.jpg"
  },
  {
    brand: "Sushi Society",
    headline: "Top members since day one",
    caption: "Recommended pairing: you + me",
    img: "img/sushi.jpg"
  },
  {
    brand: "Vacation Planner Pro",
    headline: "Itinerary perfect. Memories better.",
    caption: "Adventurous • effortless • iconic",
    img: "img/vacation.jpg"
  },
  {
    brand: "Mexico Airlines",
    headline: "First family trip: approved",
    caption: "Beach level: maximum joy",
    img: "img/mexico.jpg"
  }
];

const grid = document.getElementById("grid");

ads.forEach(ad => {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-img" style="background-image:url('${ad.img}')"></div>
    <div class="card-body">
      <div class="brand">
        <b>${ad.brand}</b>
        <span class="sponsored">Sponsored</span>
      </div>
      <h3>${ad.headline}</h3>
      <p>${ad.caption}</p>
    </div>
  `;

  grid.appendChild(card);
});

// ---------- AUDIO PLAYER ----------
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");
const seek = document.getElementById("seek");
const curTime = document.getElementById("curTime");
const durTime = document.getElementById("durTime");

// format seconds => M:SS
function fmt(t) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function setPlayingUI(isPlaying){
  playIcon.textContent = isPlaying ? "❚❚" : "▶";
  playText.textContent = isPlaying ? "Pause" : "Press play";
}

// iOS/Safari sometimes needs a user gesture: play button is perfect.
playBtn.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      setPlayingUI(true);
    } else {
      audio.pause();
      setPlayingUI(false);
    }
  } catch (err) {
    alert("Audio couldn’t play. Double-check the file path: audio/song.m4a");
    console.error(err);
  }
});

audio.addEventListener("loadedmetadata", () => {
  durTime.textContent = fmt(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  curTime.textContent = fmt(audio.currentTime);
  if (isFinite(audio.duration) && audio.duration > 0) {
    const pct = (audio.currentTime / audio.duration) * 100;
    seek.value = pct;
  }
});

audio.addEventListener("ended", () => {
  setPlayingUI(false);
  seek.value = 0;
});

seek.addEventListener("input", () => {
  if (!isFinite(audio.duration) || audio.duration <= 0) return;
  const pct = Number(seek.value) / 100;
  audio.currentTime = pct * audio.duration;
});

// ---------- EASTER EGG ----------
document.getElementById("terms").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Terms & Conditions: I’m going to love you forever. No cancellations. No fine print. ❤️");
});
