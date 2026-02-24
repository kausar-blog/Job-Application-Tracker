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
