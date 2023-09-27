document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("electionPollForm");
    const checkboxes = form.querySelectorAll("input[type='checkbox']");
    const selectedCandidatesList = form.querySelector("ul#selectedCandidates");

    // Retrieve stored poll data if it exists
    const storedPollData = JSON.parse(localStorage.getItem('pollData')) || [];

    // Pre-select checkboxes based on stored data
    checkboxes.forEach(checkbox => {
        if (storedPollData.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    updateSelectedCandidatesList();

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedCandidates = Array.from(checkboxes)
            .filter(candidate => candidate.checked)
            .map(candidate => candidate.value);

        if (selectedCandidates.length <= 8) {
            // Store the selected candidates in localStorage
            localStorage.setItem('pollData', JSON.stringify(selectedCandidates));

            // Update the displayed selected candidates
            updateSelectedCandidatesList();
        } else {
            alert("You selected more than 8 candidates. Please select up to 8 candidates.");
        }
    });

    function updateSelectedCandidatesList() {
        // Display the selected candidates in the "Your Ballot" section
        selectedCandidatesList.innerHTML = "";
        const storedCandidates = JSON.parse(localStorage.getItem('pollData')) || [];
        storedCandidates.forEach(candidate => {
            const listItem = document.createElement("li");
            listItem.textContent = candidate;
            selectedCandidatesList.appendChild(listItem);
        });
    }
});
