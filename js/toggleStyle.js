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
