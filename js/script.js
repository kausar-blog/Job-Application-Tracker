let jobsInterviewed = [];
let jobsRejected = [];
let currentStatus = "all";

const totalJobsEl = document.getElementById("appTotal");
const interviewCountEl = document.getElementById("appInterview");
const rejectedCountEl = document.getElementById("appRejected");
const jobsDisplayCountEl = document.getElementById("jobsCount");

const btnFilterAll = document.getElementById("filterAll");
const btnFilterInterview = document.getElementById("filterInterview");
const btnFilterRejected = document.getElementById("filterRejected");

const jobCardsContainer = document.getElementById("jobCards");
const sectionFilteredJobs = document.getElementById("filteredIntRej");
const mainEl = document.querySelector("main");

// 1 update counts
function calculateCount() {
  totalJobsEl.innerText = jobCardsContainer.children.length;
  jobsDisplayCountEl.innerText = jobCardsContainer.children.length;
  interviewCountEl.innerText = jobsInterviewed.length;
  rejectedCountEl.innerText = jobsRejected.length;
}

calculateCount();

// 2 button toggle & display

function toggleStyle(id) {
  btnFilterAll.classList.remove("btn-primary");
  btnFilterInterview.classList.remove("btn-primary");
  btnFilterRejected.classList.remove("btn-primary");

  btnFilterAll.classList.add("btn-outline");
  btnFilterInterview.classList.add("btn-outline");
  btnFilterRejected.classList.add("btn-outline");

  // highlight present on the click
  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.remove("btn-outline");
  selectedBtn.classList.add("btn-primary");

  currentStatus = id;

  //
  if (id == "btnFilterInterview") {
    jobCardsContainer.classList.add("hidden");
    sectionFilteredJobs.classList.remove("hidden");
  } else if (id == "filterAll") {
    jobCardsContainer.classList.remove("hidden");
    sectionFilteredJobs.classList.add("hidden");
  } else if (id == "filterRejected") {
    jobCardsContainer.classList.add("hidden");
    sectionFilteredJobs.classList.remove("hidden");
  }
}

// 3 card actions delegation

mainEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("interview-btn")) {
    console.log("kausar");

    const parentNode = event.target.parentNode.parentNode;
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    let jobStatus = parentNode.querySelector(".jobStatus").innerText;
    jobStatus = "Interview";
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Interview",
      jobNotes,
    };

    console.log(jobInfo);

    calculateCount();
  }
});

// 4 new html file created
/* function renderInterview() {
  sectionFilteredJobs.innerHTML = "";

  let div = document.createElement("div");

  div.innerHTML = "<p>Hello Kausar</p>";

  sectionFilteredJobs.appendChild(div);
} */
