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

confirmDeleteBtn.addEventListener("click", () => {
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

  /*
  // all section from remove also
  const allCards = jobCardsContainer.querySelectorAll(".job-card");

  allCards.forEach((card) => {
    const company = card.querySelector(".jobCompany").innerText;
    const position = card.querySelector(".jobPosition").innerText;

    if (company === jobCompany && position === jobPosition) {
      card.remove();
    }
  }); */

  cardToDelete.remove();
  cardToDelete = null;

  if (currentStatus == "filterInterview") renderInterview();
  if (currentStatus == "filterRejected") renderRejected();

  calculateCount();
  deleteModal.close();
});
