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
const activeColor = document.getElementById("active-color");

const jobCardsContainer = document.getElementById("jobCards");
const sectionFilteredJobs = document.getElementById("filteredIntRej");
const mainEl = document.querySelector("main");

// 1 update counts
function calculateCount() {
  const totalJobs = jobCardsContainer.children.length;
  totalJobsEl.innerText = totalJobs;
  jobsDisplayCountEl.innerText = totalJobs;

  interviewCountEl.innerText = jobsInterviewed.length;
  rejectedCountEl.innerText = jobsRejected.length;

  if (currentStatus === "filterInterview") {
    visibleJobsCountEl.innerText = jobsInterviewed.length;
    jobInfoCount.classList.remove("hidden");
  } else if (currentStatus === "filterRejected") {
    visibleJobsCountEl.innerText = jobsRejected.length;
    jobInfoCount.classList.remove("hidden");
  } else {
    jobInfoCount.classList.add("hidden");
  }
}

calculateCount();

// 2 button toggle & display
btnFilterAll.addEventListener("click", () => toggleStyle("filterAll"));

btnFilterInterview.addEventListener("click", () =>
  toggleStyle("filterInterview"),
);

btnFilterRejected.addEventListener("click", () =>
  toggleStyle("filterRejected"),
);

function toggleStyle(id) {
  // removing color for all
  btnFilterAll.classList.remove("btn-primary");
  btnFilterInterview.classList.remove("btn-primary");
  btnFilterRejected.classList.remove("btn-primary");

  // adding color for all
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
    jobInfoCount.classList.remove("hidden");

    renderInterview();
  } else if (id == "filterAll") {
    jobCardsContainer.classList.remove("hidden");
    sectionFilteredJobs.classList.add("hidden");
    jobInfoCount.classList.add("hidden");
  } else if (id == "filterRejected") {
    jobCardsContainer.classList.add("hidden");
    sectionFilteredJobs.classList.remove("hidden");
    jobInfoCount.classList.remove("hidden");

    renderRejected();
  }
}

// 3 card actions delegation

mainEl.addEventListener("click", (event) => {
  const btn = event.target;

  if (btn.classList.contains("delete-btn")) {
    const card = btn.closest(".border");
    const jobCompany = card.querySelector(".jobCompany").innerText;

    jobsInterviewed = jobsInterviewed.filter(
      (job) => job.jobCompany !== jobCompany,
    );
    jobsRejected = jobsRejected.filter((job) => job.jobCompany !== jobCompany);

    card.remove();
    calculateCount();
  }
  if (btn.classList.contains("interview-btn")) {
    const parentNode = btn.closest(".border");
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;
    const jobStatus = parentNode.querySelector(".jobStatus");

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

    activeColor.classList.remove("bg-gray-300", "bg-red-300");
    activeColor.classList.add("bg-green-300");

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
  } else if (btn.classList.contains("rejected-btn")) {
    const parentNode = btn.closest(".border");
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobStatus = parentNode.querySelector(".jobStatus");

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

    activeColor.classList.remove("bg-gray-300", "bg-green-300");
    activeColor.classList.add("bg-red-300");
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
  visibleJobsCountEl.innerText = jobsInterviewed.length;

  for (let interview of jobsInterviewed) {
    // console.log(interview);

    let div = document.createElement("div");
    div.classList =
      "flex flex-col md:flex-row justify-between border rounded-lg p-4 bg-base-100";

    div.innerHTML = `
     <div class="space-y-4 md:space-y-6 flex-1">
            <!-- title and position -->
            <div>
              <p class="jobCompany text-2xl md:text-3xl font-bold mb-3"
                >${interview.jobCompany}</p
              >
              <p class="jobPosition text-gray-600">${interview.jobPosition}</p>
            </div>
            <!-- location / type / salary -->
            <div class="jobDetails text-gray-600 text-sm md:text-base">
              ${interview.jobDetails}
            </div>
            <!-- status -->
            <p class="jobStatus text-gray-500 font-medium">${interview.jobStatus}</p>

            <!-- notes  -->
            <p class="jobNotes text-gray-700"
              >${interview.jobNotes}</p
            >

            <!-- actions buttons -->
            <div class="flex flex-wrap gap-3">
              <button class="interview-btn btn btn-success btn-sm" type="button"
                >Interview</button
              >
              <button class="rejected-btn btn btn-error btn-sm" type="button"
                >Rejected</button
              >
            </div>
          </div>
          <div class="mt-4 md:mt-0 md:ml-4">
            <button
              class="delete-btn btn btn-error btn-sm bg-transparent border-0 p-2 flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 hover:bg-error hover:text-white"
              type="button"
              title="Delete"
            >
              <i class="delete-btn fa-solid fa-trash"></i>
            </button>
          </div>
    
    
    `;

    sectionFilteredJobs.appendChild(div);
  }
}

function renderRejected() {
  sectionFilteredJobs.innerHTML = "";
  visibleJobsCountEl.innerText = jobsRejected.length;

  for (let rejected of jobsRejected) {
    // console.log(interview);

    let div = document.createElement("div");
    div.classList =
      "flex flex-col md:flex-row justify-between border rounded-lg p-4 bg-base-100";

    div.innerHTML = `
     <div class="space-y-4 md:space-y-6 flex-1">
            <!-- title and position -->
            <div>
              <p class="jobCompany text-2xl md:text-3xl font-bold mb-3"
                >${rejected.jobCompany}</p
              >
              <p class="jobPosition text-gray-600">${rejected.jobPosition}</p>
            </div>
            <!-- location / type / salary -->
            <div class="jobDetails text-gray-600 text-sm md:text-base">
              ${rejected.jobDetails}
            </div>
            <!-- status -->
            <p class="jobStatus text-gray-500 font-medium">${rejected.jobStatus}</p>

            <!-- notes  -->
            <p class="jobNotes text-gray-700"
              >${rejected.jobNotes}</p
            >

            <!-- actions buttons -->
            <div class="flex flex-wrap gap-3">
              <button class="interview-btn btn btn-success btn-sm" type="button"
                >Interview</button
              >
              <button class="rejected-btn btn btn-error btn-sm" type="button"
                >Rejected</button
              >
            </div>
          </div>
          <div class="mt-4 md:mt-0 md:ml-4">
            <button
              class="delete-btn btn btn-error btn-sm bg-transparent border-0 p-2 flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 hover:bg-error hover:text-white"
              type="button"
              title="Delete"
            >
              <i class="delete-btn fa-solid fa-trash"></i>
            </button>
          </div>
    
    
    `;

    sectionFilteredJobs.appendChild(div);
  }
}
