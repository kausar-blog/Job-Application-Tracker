/* ---- render interview section ---- */
function renderInterview() {
  sectionFilteredJobs.innerHTML = "";
  visibleJobsCountEl.innerText = jobsInterviewed.length;

  for (let interview of jobsInterviewed) {
    let div = document.createElement("div");

    div.className =
      "job-card flex border rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition";

    div.innerHTML = `
      
       <div class="active-color w-1.5 bg-green-300 rounded"></div>

          <div
            class="flex flex-col md:flex-row justify-between p-6 w-full gap-4"
          >
            <div class="space-y-4 flex-1">
              <p class="jobCompany text-2xl font-bold">${interview.jobCompany}</p>
              <p class="jobPosition text-gray-600">${interview.jobPosition}</p>
              <p class="jobDetails text-gray-600 text-sm">
                ${interview.jobDetails}
              </p>
              <p
                class="jobStatus inline-flex px-4 py-1 text-xs font-medium text-green-500 border border-green-600 rounded-full uppercase  hover:bg-green-500 hover:text-white"
              >
                ${interview.jobStatus}
              </p>
              <p class="jobNotes text-gray-700 text-sm">
                ${interview.jobNotes}  
              </p>

              <div class="flex gap-3">
                <button
                  type="button"
                  class="interview-btn btn btn-success btn-outline btn-sm uppercase"
                  >Interview</button
                >
                <button
                  type="button"
                  class="rejected-btn btn btn-error btn-outline btn-sm uppercase"
                  >Rejected</button
                >
              </div>
            </div>

            <button
              type="button"
              title="Delete"
              class="delete-btn text-gray-500 hover:text-red-500 text-lg"
            >
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
      "job-card flex border rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition";

    div.innerHTML = `
      
       <div class="active-color w-1.5 bg-red-300 rounded"></div>

          <div
            class="flex flex-col md:flex-row justify-between p-6 w-full gap-4"
          >
            <div class="space-y-4 flex-1">
              <p class="jobCompany text-2xl font-bold">${rejected.jobCompany}</p>
              <p class="jobPosition text-gray-600">${rejected.jobPosition}</p>
              <p class="jobDetails text-gray-600 text-sm">
                ${rejected.jobDetails}
              </p>
              <p
                class="jobStatus inline-flex px-4 py-1 text-xs font-medium text-red-500 border border-red-600 rounded-full uppercase hover:bg-red-500 hover:text-white"
              >
                ${rejected.jobStatus}
              </p>
              <p class="jobNotes text-gray-700 text-sm">
                ${rejected.jobNotes}  
              </p>

              <div class="flex gap-3">
                <button
                  type="button"
                  class="interview-btn btn btn-success btn-outline btn-sm uppercase"
                  >Interview</button
                >
                <button
                  type="button"
                  class="rejected-btn btn btn-error btn-outline btn-sm uppercase"
                  >Rejected</button
                >
              </div>
            </div>

            <button
              type="button"
              title="Delete"
              class="delete-btn text-gray-500 hover:text-red-500 text-lg"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
      `;

    sectionFilteredJobs.appendChild(div);
  }
}
