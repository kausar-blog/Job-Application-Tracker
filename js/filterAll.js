function syncAllCardsStatus() {
  const allCards = jobCardsContainer.querySelectorAll(".job-card");

  allCards.forEach((card) => {
    const company = card.querySelector(".jobCompany").innerText;
    const position = card.querySelector(".jobPosition").innerText;
    const jobStatusEl = card.querySelector(".jobStatus");
    const activeColor = card.querySelector(".active-color");

    const isInterview = jobsInterviewed.find(
      (item) => item.jobCompany === company && item.jobPosition === position,
    );

    const isRejected = jobsRejected.find(
      (item) => item.jobCompany === company && item.jobPosition === position,
    );

    if (isInterview) {
      jobStatusEl.innerText = "Interview";

      jobStatusEl.className =
        "jobStatus inline-flex px-4 py-1 text-xs font-medium text-green-600 border border-green-500 rounded-full uppercase";

      activeColor.className = "active-color w-1.5 bg-green-300 rounded";
    } else if (isRejected) {
      jobStatusEl.innerText = "Rejected";

      jobStatusEl.className =
        "jobStatus inline-flex px-4 py-1 text-xs font-medium text-red-600 border border-red-500 rounded-full uppercase";

      activeColor.className = "active-color w-1.5 bg-red-300 rounded";
    } else {
      jobStatusEl.innerText = "Not Applied";

      jobStatusEl.className =
        "jobStatus inline-flex px-4 py-1 text-xs font-medium text-gray-500 border border-indigo-600 rounded-full uppercase";

      activeColor.className = "active-color w-1.5 bg-gray-300 rounded";
    }
  });
}
