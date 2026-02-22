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

// 1 update counts
function calculateCount() {
  totalJobsEl.innerText = jobCardsContainer.children.length;
  jobsDisplayCountEl.innerText = jobCardsContainer.children.length;

  interviewCountEl.innerText = jobsInterviewed.length;
  rejectedCountEl.innerText = jobsRejected.length;
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
  // console.log(event.target.classList.contains("delete-btn"));
  // if (event.target.classList.contains("delete-btn")) {
  //   const parentNode = event.target.parentNode.parentNode;
  //   // console.log(parentNode);
  //   // parentNode()
  // }
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    const jobStatus = parentNode.querySelector(".jobStatus").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Interview",
      jobNotes,
    };

    parentNode.querySelector(".jobStatus").innerText = "Interview";
    // console.log(jobInfo);

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
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    // console.log(parentNode);
    const jobCompany = parentNode.querySelector(".jobCompany").innerText;
    const jobPosition = parentNode.querySelector(".jobPosition").innerText;
    const jobDetails = parentNode.querySelector(".jobDetails").innerText;
    const jobStatus = parentNode.querySelector(".jobStatus").innerText;
    const jobNotes = parentNode.querySelector(".jobNotes").innerText;

    parentNode.querySelector(".jobStatus").innerText = "Rejected";

    const jobInfo = {
      jobCompany,
      jobPosition,
      jobDetails,
      jobStatus: "Rejected",
      jobNotes,
    };

    // console.log(jobInfo);

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
          <div class="mt-4 md:mt-0 md:ml-4 shrink-0">
            <button
              class="delete-btn btn btn-outline btn-error btn-sm"
              type="button"
              >Delete</button
            >
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
          <div class="mt-4 md:mt-0 md:ml-4 shrink-0">
            <button
              class="delete-btn btn btn-outline btn-error btn-sm"
              type="button"
              >Delete</button
            >
          </div>
    
    
    `;

    sectionFilteredJobs.appendChild(div);
  }
}
