
// Get HTML elements
const promptInput = document.getElementById("promptInput");
const checkBtn = document.getElementById("checkBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");

const scoreElement = document.getElementById("score");
const ratingElement = document.getElementById("rating");
const ratingDescription = document.getElementById("ratingDescription");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const componentResults = document.getElementById("componentResults");
const suggestions = document.getElementById("suggestions");
const errorMessage = document.getElementById("errorMessage");

// Five prompt components and their detection keywords
const components = [
    {
        name: "Role",
        keywords: ["act as", "role", "you are", "expert"],
        suggestion: "Add a clear role. Example: Act as a professional teacher."
    },
    {
        name: "Task",
        keywords: ["task", "create", "write", "generate", "explain",
                   "develop", "design", "summarize"],
        suggestion: "Clearly describe the task. Example: Create an Instagram caption."
    },
    {
        name: "Context",
        keywords: ["context", "background", "target audience",
                   "designed for", "college students", "for students",
                   "situation", "product is"],
        suggestion: "Provide context. Example: The product targets college students."
    },
    {
        name: "Constraints",
        keywords: ["constraints", "constraint", "limit", "must",
                   "should", "do not", "avoid", "maximum",
                   "minimum", "within", "word limit"],
        suggestion: "Add constraints. Example: Limit the answer to 50 words."
    },
    {
        name: "Output Format",
        keywords: ["output format", "format", "bullet points",
                   "table", "json", "paragraph", "list",
                   "html", "markdown", "code"],
        suggestion: "Specify the output format. Example: Provide the answer in bullet points."
    }
];

// Check prompt button
checkBtn.addEventListener("click", checkPrompt);

function checkPrompt() {

    // Convert prompt to lowercase for case-insensitive detection
    const prompt = promptInput.value.trim().toLowerCase();

    // Validate empty input
    if (prompt === "") {
        errorMessage.textContent = "⚠ Please enter a prompt before checking!";
        return;
    }

    errorMessage.textContent = "";

    let score = 0;
    let detectedCount = 0;
    let resultHTML = "";
    let suggestionHTML = "";

    // Check each of the five components
    components.forEach(component => {

        const detected = component.keywords.some(keyword =>
            prompt.includes(keyword.toLowerCase())
        );

        if (detected) {
            score += 20;
            detectedCount++;

            resultHTML += `
                <div class="component-item">
                    <span>${component.name}</span>
                    <span class="status detected">✓ Detected (+20)</span>
                </div>
            `;
        } else {
            resultHTML += `
                <div class="component-item">
                    <span>${component.name}</span>
                    <span class="status missing">✗ Missing</span>
                </div>
            `;

            suggestionHTML += `
                <li>${component.suggestion}</li>
            `;
        }
    });

    // Display component results
    componentResults.innerHTML = resultHTML;

    // Calculate and display total score
    scoreElement.textContent = score;

    // Update animated progress bar
    progressBar.style.width = "0%";

    requestAnimationFrame(() => {
        progressBar.style.width = score + "%";
    });

    progressText.textContent = score + "%";

    // Display rating
    showRating(score);

    // Display suggestions
    if (detectedCount === 5) {
        suggestions.innerHTML = `
            <p>🎉 Excellent! Your prompt contains all five components.
            Keep creating effective prompts!</p>
        `;
    } else {
        suggestions.innerHTML = `
            <p>Improve your prompt by adding these missing components:</p>
            <ul>${suggestionHTML}</ul>
        `;
    }
}

// Rating function
function showRating(score) {

    if (score === 100) {
        ratingElement.textContent = "Excellent! 🏆";
        ratingDescription.textContent =
            "Your prompt includes all five components.";
    }
    else if (score === 80) {
        ratingElement.textContent = "Very Good! 🌟";
        ratingDescription.textContent =
            "Your prompt is strong. Add one missing component.";
    }
    else if (score === 60) {
        ratingElement.textContent = "Good! 👍";
        ratingDescription.textContent =
            "Your prompt is good but needs improvement.";
    }
    else if (score === 40) {
        ratingElement.textContent = "Average! 🙂";
        ratingDescription.textContent =
            "Your prompt needs more details.";
    }
    else {
        ratingElement.textContent = "Needs Improvement! 📚";
        ratingDescription.textContent =
            "Add more components to improve your prompt.";
    }
}

// Load sample prompt button
sampleBtn.addEventListener("click", function() {

    promptInput.value =
        "Act as a digital marketing expert. " +
        "Create an Instagram caption promoting a new smartwatch. " +
        "The product is being launched by a startup targeting college students. " +
        "Limit the caption to 50 words and include five hashtags. " +
        "Provide the output in bullet points.";

    errorMessage.textContent = "";

});

// Clear button
clearBtn.addEventListener("click", function() {

    // Clear input
    promptInput.value = "";

    // Reset score and rating
    scoreElement.textContent = "0";
    ratingElement.textContent = "Not Checked Yet";

    ratingDescription.textContent =
        "Enter a prompt and click Check Prompt.";

    // Reset progress bar
    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    // Reset component results
    componentResults.innerHTML = `
        <div class="component-item">
            <span>Role</span>
            <span class="status pending">Not checked</span>
        </div>
        <div class="component-item">
            <span>Task</span>
            <span class="status pending">Not checked</span>
        </div>
        <div class="component-item">
            <span>Context</span>
            <span class="status pending">Not checked</span>
        </div>
        <div class="component-item">
            <span>Constraints</span>
            <span class="status pending">Not checked</span>
        </div>
        <div class="component-item">
            <span>Output Format</span>
            <span class="status pending">Not checked</span>
        </div>
    `;

    // Reset suggestions and error
    suggestions.innerHTML =
        "<p>Suggestions will appear after checking your prompt.</p>";

    errorMessage.textContent = "";

});
