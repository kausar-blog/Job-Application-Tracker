const jobsInterviewed = [];
const jobsRejected = [];

const totalJobsEl = document.getElementById("appTotal");
const interviewCountEl = document.getElementById("appInterview");
const rejectedCountEl = document.getElementById("appRejected");
const jobsDisplayCountEl = document.getElementById("jobsCount");

const btnFilterAll = document.getElementById("filterAll");
const btnFilterInterview = document.getElementById("filterInterview");
const btnFilterRejected = document.getElementById("filterRejected");

const jobCardsContainer = document.getElementById("jobCards");
const sectionFilteredJobs = document.getElementById("filteredSection");
const mainEl = document.querySelector("main");

function calculateCount() {
  totalJobsEl.innerText = jobCardsContainer.children.length;
  jobsDisplayCountEl.innerText = jobCardsContainer.children.length;
}

calculateCount();
