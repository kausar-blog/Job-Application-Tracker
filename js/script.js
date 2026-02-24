let jobsInterviewed = [];
let jobsRejected = [];
let currentStatus = "filterAll";

let totalJobsEl = document.getElementById("appTotal");
let interviewCountEl = document.getElementById("appInterview");
let rejectedCountEl = document.getElementById("appRejected");
let jobsDisplayCountEl = document.getElementById("jobsCount");
let visibleJobsCountEl = document.getElementById("visibleJobsCount");

const btnFilterAll = document.getElementById("filterAll");
const btnFilterInterview = document.getElementById("filterInterview");
const btnFilterRejected = document.getElementById("filterRejected");
const jobInfoCount = document.getElementById("job-info-count");

const jobCardsContainer = document.getElementById("jobCards");
const sectionFilteredJobs = document.getElementById("filteredIntRej");
const mainEl = document.querySelector("main");

const deleteModal = document.getElementById("delete_modal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
let cardToDelete = null;

/* update all counter */
function calculateCount() {
  const totalJobs = jobCardsContainer.querySelectorAll(".job-card").length;
  totalJobsEl.innerText = totalJobs;
  jobsDisplayCountEl.innerText = totalJobs;

  interviewCountEl.innerText = jobsInterviewed.length;
  rejectedCountEl.innerText = jobsRejected.length;

  const emptyState = document.getElementById("emptyState");
  let visibleCount = 0;

  // currentStatus for visible count and empty state
  if (currentStatus === "filterInterview") {
    visibleCount = jobsInterviewed.length;
    jobInfoCount.classList.remove("hidden");
  } else if (currentStatus === "filterRejected") {
    visibleCount = jobsRejected.length;
    jobInfoCount.classList.remove("hidden");
  } else {
    visibleCount = totalJobs;
    jobInfoCount.classList.add("hidden");
  }

  visibleJobsCountEl.innerText = visibleCount;

  // emptyState show
  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}
calculateCount();

btnFilterAll.addEventListener("click", () => toggleStyle("filterAll"));
btnFilterInterview.addEventListener("click", () =>
  toggleStyle("filterInterview"),
);
btnFilterRejected.addEventListener("click", () =>
  toggleStyle("filterRejected"),
);

/* ---- handle filter change ---- */
function toggleStyle(id) {
  btnFilterAll.classList.remove(
    "bg-gradient-to-r",
    "from-indigo-500",
    "to-purple-500",
    "text-white",
    "active-filter",
  );
  btnFilterInterview.classList.remove(
    "bg-gradient-to-r",
    "from-indigo-500",
    "to-purple-500",
    "text-white",
    "active-filter",
  );
  btnFilterRejected.classList.remove(
    "bg-gradient-to-r",
    "from-indigo-500",
    "to-purple-500",
    "text-white",
    "active-filter",
  );

  btnFilterAll.classList.add(
    "bg-transparent",
    "text-black",
    "hover:bg-purple-100",
    "hover:text-purple-600",
  );
  btnFilterInterview.classList.add(
    "bg-transparent",
    "text-black",
    "hover:bg-green-100",
    "hover:text-green-600",
  );
  btnFilterRejected.classList.add(
    "bg-transparent",
    "text-black",
    "hover:bg-red-100",
    "hover:text-red-600",
  );

  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.remove("bg-transparent", "text-black");
  selectedBtn.classList.add(
    "bg-gradient-to-r",
    "from-indigo-500",
    "to-purple-500",
    "text-white",
    "active-filter",
  );

  currentStatus = id;

  if (id == "filterInterview") {
    jobCardsContainer.classList.add("hidden");
    sectionFilteredJobs.classList.remove("hidden");
    renderInterview();
  } else if (id == "filterAll") {
    jobCardsContainer.classList.remove("hidden");
    sectionFilteredJobs.classList.add("hidden");
  } else if (id == "filterRejected") {
    jobCardsContainer.classList.add("hidden");
    sectionFilteredJobs.classList.remove("hidden");
    renderRejected();
  }

  calculateCount();
}

/* ---- main click handler (delegation) ---- */
mainEl.addEventListener("click", (event) => {
  const btn = event.target;

  /* open delete model */
  if (btn.classList.contains("delete-btn") || btn.closest(".delete-btn")) {
    const card = btn.closest(".job-card") || btn.closest(".border");
    cardToDelete = card;
    deleteModal.showModal();
    return;
  }

  /* ---- mark as interview ---- */
  if (btn.classList.contains("interview-btn")) {
    /* ---- mark as interview ---- */
    const parentNode = btn.closest(".job-card") || btn.closest(".border");
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobStatus = parentNode.querySelector(".jobStatus");
    const activeColor = parentNode.querySelector(".active-color");

    jobStatus.innerText = "Interview";

    jobStatus.classList.remove(
      "text-gray-500",
      "text-red-600",
      "border-indigo-600",
      "text-red-500",
      "border-red-500",
      "hover:bg-indigo-600",
      "hover:text-white",
      "hover:bg-red-500",
    );

    jobStatus.classList.add(
      "text-green-600",
      "border-green-500",
      "hover:bg-green-500",
      "hover:text-white",
    );

    if (activeColor) {
      activeColor.classList.remove("bg-gray-300", "bg-red-300");
      activeColor.classList.add("bg-green-300");
    }

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Interview",
      jobNotes,
    };

    const jobExist = jobsInterviewed.find(
      (item) =>
        item.jobCompany == jobInfo.jobCompany &&
        item.jobPosition == jobInfo.jobPosition,
    );
    if (!jobExist) jobsInterviewed.push(jobInfo);

    jobsRejected = jobsRejected.filter(
      (item) =>
        !(
          item.jobCompany == jobInfo.jobCompany &&
          item.jobPosition == jobInfo.jobPosition
        ),
    );

    if (currentStatus == "filterRejected") renderRejected();
    if (currentStatus == "filterInterview") renderInterview();

    calculateCount();
  } else if (btn.classList.contains("rejected-btn")) {
    /* ---- mark as rejected ---- */
    const parentNode = btn.closest(".job-card") || btn.closest(".border");
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobStatus = parentNode.querySelector(".jobStatus");
    const activeColor = parentNode.querySelector(".active-color");

    jobStatus.innerText = "Rejected";

    jobStatus.classList.remove(
      "text-gray-500",
      "border-indigo-600",
      "text-blue-600",
      "border-blue-500",
      "hover:bg-indigo-600",
      "hover:text-white",
      "hover:bg-blue-500",
    );

    jobStatus.classList.add(
      "text-red-600",
      "border-red-500",
      "hover:bg-red-500",
      "hover:text-white",
    );

    if (activeColor) {
      activeColor.classList.remove("bg-gray-300", "bg-green-300");
      activeColor.classList.add("bg-red-300");
    }

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Rejected",
      jobNotes,
    };

    const jobExist = jobsRejected.find(
      (item) =>
        item.jobCompany == jobInfo.jobCompany &&
        item.jobPosition == jobInfo.jobPosition,
    );
    if (!jobExist) jobsRejected.push(jobInfo);

    jobsInterviewed = jobsInterviewed.filter(
      (item) =>
        !(
          item.jobCompany == jobInfo.jobCompany &&
          item.jobPosition == jobInfo.jobPosition
        ),
    );

    if (currentStatus == "filterInterview") renderInterview();
    if (currentStatus == "filterRejected") renderRejected();

    calculateCount();
  }
});

/* confirmDeleteBtn.addEventListener("click", () => {
  if (!cardToDelete) return;

  const jobCompany = cardToDelete.querySelector(".jobCompany").innerText;
  const jobPosition = cardToDelete.querySelector(".jobPosition").innerText;

  jobsInterviewed = jobsInterviewed.filter(
    (item) =>
      !(item.jobCompany === jobCompany && item.jobPosition === jobPosition),
  );
  jobsRejected = jobsRejected.filter(
    (item) =>
      !(item.jobCompany === jobCompany && item.jobPosition === jobPosition),
  );

  cardToDelete.remove();
  cardToDelete = null;

  if (currentStatus == "filterInterview") renderInterview();
  if (currentStatus == "filterRejected") renderRejected();

  calculateCount();
  deleteModal.close();
}); */

/* ---- confirm delete ---- */
confirmDeleteBtn.addEventListener("click", () => {
  if (!cardToDelete) return;

  const jobCompany = cardToDelete.querySelector(".jobCompany").innerText;
  const jobPosition = cardToDelete.querySelector(".jobPosition").innerText;

  // Remove from Interview array
  jobsInterviewed = jobsInterviewed.filter(
    (item) =>
      !(item.jobCompany === jobCompany && item.jobPosition === jobPosition),
  );

  // Remove from Rejected array
  jobsRejected = jobsRejected.filter(
    (item) =>
      !(item.jobCompany === jobCompany && item.jobPosition === jobPosition),
  );

  // 🔥 Remove from ALL section also
  const allCards = jobCardsContainer.querySelectorAll(".job-card");

  allCards.forEach((card) => {
    const company = card.querySelector(".jobCompany").innerText;
    const position = card.querySelector(".jobPosition").innerText;

    if (company === jobCompany && position === jobPosition) {
      card.remove();
    }
  });

  // Remove from filtered section
  cardToDelete.remove();
  cardToDelete = null;

  if (currentStatus == "filterInterview") renderInterview();
  if (currentStatus == "filterRejected") renderRejected();

  calculateCount();
  deleteModal.close();
});

/* ---- render interview section ---- */
function renderInterview() {
  sectionFilteredJobs.innerHTML = "";
  visibleJobsCountEl.innerText = jobsInterviewed.length;

  for (let interview of jobsInterviewed) {
    let div = document.createElement("div");

    div.className =
      "job-card border rounded-lg p-4 bg-base-100 flex flex-col md:flex-row justify-between gap-4";

    div.innerHTML = `
      <div class="space-y-4 md:space-y-6 flex-1">
        <div>
          <p class="jobCompany text-2xl md:text-3xl font-bold mb-3">${interview.jobCompany}</p>
          <p class="jobPosition text-gray-600">${interview.jobPosition}</p>
        </div>

        <div class="jobDetails text-gray-600 text-sm md:text-base">${interview.jobDetails}</div>

        <p class="jobStatus text-green-600 font-medium">${interview.jobStatus}</p>

        <p class="jobNotes text-gray-700">${interview.jobNotes}</p>

        <div class="flex flex-wrap gap-3">
          <button class="interview-btn btn btn-success btn-sm" type="button">Interview</button>
          <button class="rejected-btn btn btn-error btn-sm" type="button">Rejected</button>
        </div>
      </div>

      <div class="mt-2 md:mt-0">
        <button class="delete-btn btn btn-error btn-sm bg-transparent border-0 p-2" type="button" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    sectionFilteredJobs.appendChild(div);
  }
}

/* ---- render rejected section ---- */
function renderRejected() {
  sectionFilteredJobs.innerHTML = "";
  visibleJobsCountEl.innerText = jobsRejected.length;

  for (let rejected of jobsRejected) {
    let div = document.createElement("div");
    div.className =
      "job-card border rounded-lg p-4 bg-base-100 flex flex-col md:flex-row justify-between gap-4";

    div.innerHTML = `
      <div class="space-y-4 md:space-y-6 flex-1">
        <div>
          <p class="jobCompany text-2xl md:text-3xl font-bold mb-3">${rejected.jobCompany}</p>
          <p class="jobPosition text-gray-600">${rejected.jobPosition}</p>
        </div>

        <div class="jobDetails text-gray-600 text-sm md:text-base">${rejected.jobDetails}</div>

        <p class="jobStatus text-red-600 font-medium">${rejected.jobStatus}</p>

        <p class="jobNotes text-gray-700">${rejected.jobNotes}</p>

        <div class="flex flex-wrap gap-3">
          <button class="interview-btn btn btn-success btn-sm" type="button">Interview</button>
          <button class="rejected-btn btn btn-error btn-sm" type="button">Rejected</button>
        </div>
      </div>

      <div class="mt-2 md:mt-0">
        <button class="delete-btn btn btn-error btn-sm bg-transparent border-0 p-2" type="button" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    sectionFilteredJobs.appendChild(div);
  }
}
