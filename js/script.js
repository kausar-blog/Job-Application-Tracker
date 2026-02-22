let jobsInterviewed = [];
let jobsRejected = [];
let currentStatus = "all";

let totalJobsEl = document.getElementById("appTotal");
let interviewCountEl = document.getElementById("appInterview");
let rejectedCountEl = document.getElementById("appRejected");
let jobsDisplayCountEl = document.getElementById("jobsCount");

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
}

// 3 card actions delegation

mainEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    let jobStatus = parentNode.querySelector(".jobStatus").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Interview",
      jobNotes,
    };

    jobStatus = "Interview";
    // console.log(jobInfo);

    const jobExist = jobsInterviewed.find(
      (item) => item.jobCompany == jobInfo.jobCompany,
    );

    if (!jobExist) {
      jobsInterviewed.push(jobInfo);
    }

    jobsRejected = jobsRejected.filter(
      (item) => item.jobCompany != jobInfo.jobCompany,
    );

    if (currentStatus == "filterRejected") {
      renderRejected();
    }

    calculateCount();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    // console.log(parentNode);
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    let jobStatus = parentNode.querySelector(".jobStatus").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Rejected",
      jobNotes,
    };

    jobStatus = "Interview";
    // console.log(jobInfo);

    const jobExist = jobsRejected.find(
      (item) => item.jobCompany == jobInfo.jobCompany,
    );

    if (!jobExist) {
      jobsRejected.push(jobInfo);
    }

    jobsInterviewed = jobsInterviewed.filter(
      (item) => item.jobCompany != jobInfo.jobCompany,
    );

    if (currentStatus == "filterInterview") {
      renderInterview();
    }

    calculateCount();
  }
});

// 4 new html file created
function renderInterview() {
  sectionFilteredJobs.innerHTML = "";

  for (let interview of jobsInterviewed) {
    // console.log(interview);

    let div = document.createElement("div");
    div.classList =
      "flex flex-col md:flex-row justify-between border rounded-lg p-4 bg-base-100";

    div.innerHTML = `<p>Hello Kausar ${interview.jobCompany}</p>`;

    sectionFilteredJobs.appendChild(div);
  }
}

function renderRejected() {
  sectionFilteredJobs.innerHTML = "";

  for (let rejected of jobsRejected) {
    // console.log(interview);

    let div = document.createElement("div");
    div.classList =
      "flex flex-col md:flex-row justify-between border rounded-lg p-4 bg-base-100";

    div.innerHTML = `<p>Hello blogger ${rejected.jobCompany}</p>`;

    sectionFilteredJobs.appendChild(div);
  }
}
