// ===========================
// Job Application Tracker JS
// ===========================

let interviewList = [];
let rejectedList = [];
let currentFilter = "all";

const totalJobsEl = document.getElementById("total");
const interviewCountEl = document.getElementById("thrivingCount");
const rejectedCountEl = document.getElementById("strugglingCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("thriving-filter-btn");
const rejectedFilterBtn = document.getElementById("struggling-filter-btn");

const allCardSection = document.getElementById("allCards");
const filteredSection = document.getElementById("filtered-section");
const mainEl = document.querySelector("main");

// ---------------------------
// Step 1: Update Counts
// ---------------------------
function calculateCount() {
  totalJobsEl.innerText = allCardSection.children.length;
  interviewCountEl.innerText = interviewList.length;
  rejectedCountEl.innerText = rejectedList.length;
}

calculateCount();

// ---------------------------
// Step 2: Filter Button Toggle & Display
// ---------------------------
function toggleStyle(id) {
  // reset all buttons
  allFilterBtn.classList.add("bg-gray-300", "text-black");
  interviewFilterBtn.classList.add("bg-gray-300", "text-black");
  rejectedFilterBtn.classList.add("bg-gray-300", "text-black");

  allFilterBtn.classList.remove("bg-black", "text-white");
  interviewFilterBtn.classList.remove("bg-black", "text-white");
  rejectedFilterBtn.classList.remove("bg-black", "text-white");

  // highlight current
  const selectedBtn = document.getElementById(id);
  currentFilter = id;
  selectedBtn.classList.remove("bg-gray-300", "text-black");
  selectedBtn.classList.add("bg-black", "text-white");

  // show/hide sections
  if (id === "thriving-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  } else if (id === "struggling-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  }
}

// ---------------------------
// Step 3: Card Status Delegation
// ---------------------------
mainEl.addEventListener("click", function (event) {
  if (event.target.classList.contains("thriving-btn")) {
    const card = event.target.closest(".card");
    const companyName = card.querySelector(".plantName").innerText;
    const position = card.querySelector(".latinName").innerText;
    const details = card.querySelector(".notes").innerText;

    // add to interview list
    if (!interviewList.find((item) => item.companyName === companyName)) {
      interviewList.push({
        companyName,
        position,
        status: "Interview",
        details,
      });
    }

    // remove from rejected list if exists
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );

    if (currentFilter === "struggling-filter-btn") renderRejected();

    calculateCount();
  } else if (event.target.classList.contains("struggling-btn")) {
    const card = event.target.closest(".card");
    const companyName = card.querySelector(".plantName").innerText;
    const position = card.querySelector(".latinName").innerText;
    const details = card.querySelector(".notes").innerText;

    // add to rejected list
    if (!rejectedList.find((item) => item.companyName === companyName)) {
      rejectedList.push({ companyName, position, status: "Rejected", details });
    }

    // remove from interview list if exists
    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );

    if (currentFilter === "thriving-filter-btn") renderInterview();

    calculateCount();
  } else if (event.target.classList.contains("btn-delete")) {
    const card = event.target.closest(".card");
    const companyName = card.querySelector(".plantName").innerText;

    // remove from arrays
    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );

    // remove card from DOM
    card.remove();
    calculateCount();
  }
});

// ---------------------------
// Step 4: Render Functions
// ---------------------------
function renderInterview() {
  filteredSection.innerHTML = "";
  for (let job of interviewList) {
    const div = document.createElement("div");
    div.className = "card flex justify-between border p-8";

    div.innerHTML = `
      <div class="space-y-6">
        <div>
          <p class="plantName text-4xl">${job.companyName}</p>
          <p class="latinName">${job.position}</p>
        </div>
        <p class="status">${job.status}</p>
        <p class="notes">${job.details}</p>
        <div class="flex gap-5">
          <button class="thriving-btn bg-green-200 px-4 py-2" type="button">Interview</button>
          <button class="struggling-btn bg-red-200 px-4 py-2" type="button">Rejected</button>
        </div>
      </div>
      <div>
        <button class="btn-delete bg-red-200 text-red-600 px-4 py-2" type="button">Delete</button>
      </div>
    `;
    filteredSection.appendChild(div);
  }
}

function renderRejected() {
  filteredSection.innerHTML = "";
  for (let job of rejectedList) {
    const div = document.createElement("div");
    div.className = "card flex justify-between border p-8";

    div.innerHTML = `
      <div class="space-y-6">
        <div>
          <p class="plantName text-4xl">${job.companyName}</p>
          <p class="latinName">${job.position}</p>
        </div>
        <p class="status">${job.status}</p>
        <p class="notes">${job.details}</p>
        <div class="flex gap-5">
          <button class="thriving-btn bg-green-200 px-4 py-2" type="button">Interview</button>
          <button class="struggling-btn bg-red-200 px-4 py-2" type="button">Rejected</button>
        </div>
      </div>
      <div>
        <button class="btn-delete bg-red-200 text-red-600 px-4 py-2" type="button">Delete</button>
      </div>
    `;
    filteredSection.appendChild(div);
  }
}
