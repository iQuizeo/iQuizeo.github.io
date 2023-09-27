document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("electionPollForm");
    const checkboxes = form.querySelectorAll("input[type='checkbox']");
    const selectedCandidatesList = form.querySelector("ul#selectedCandidates");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Count the number of selected candidates
        const selectedCandidates = Array.from(checkboxes)
            .filter(candidate => candidate.checked)
            .map(candidate => candidate.value);

        // Check if the number of selected candidates is not more than 8
        if (selectedCandidates.length <= 8) {
            // Display the selected candidates in the "Your Ballot" section
            selectedCandidatesList.innerHTML = "";
            selectedCandidates.forEach(candidate => {
                const listItem = document.createElement("li");
                listItem.textContent = candidate;
                selectedCandidatesList.appendChild(listItem);
            });
        } else {
            alert("You selected more than 8 candidates. Please select up to 8 candidates.");
        }
    });
});