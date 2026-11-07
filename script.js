
/* =====================================
   CREDIT CARD DATABASE
===================================== */

const creditCards = [
    {
        id: 1,
        name: "Millennia Credit Card",
        bank: "HDFC Bank",
        category: "Shopping",
        annualFee: 1000,
        joiningFee: 1000,
        cashback: "5%",
        rewards: "5X Rewards",
        interest: "3.6% monthly",
        rating: 4.5,
        color: "linear-gradient(135deg,#173c8c,#3979d8)",
        benefits: "Cashback on selected online shopping brands and dining.",
        description: "A demo shopping-focused credit card."
    },

    {
        id: 2,
        name: "SimplyCLICK Credit Card",
        bank: "SBI Card",
        category: "Shopping",
        annualFee: 499,
        joiningFee: 499,
        cashback: "10X Rewards",
        rewards: "10X Online Rewards",
        interest: "3.5% monthly",
        rating: 4.3,
        color: "linear-gradient(135deg,#e85b26,#f39a43)",
        benefits: "Extra reward points on selected online purchases.",
        description: "A demo card designed for online shoppers."
    },

    {
        id: 3,
        name: "Amazon Pay ICICI",
        bank: "ICICI Bank",
        category: "Shopping",
        annualFee: 0,
        joiningFee: 0,
        cashback: "5%",
        rewards: "Amazon Cashback",
        interest: "3.5% monthly",
        rating: 4.8,
        color: "linear-gradient(135deg,#182d43,#e28b30)",
        benefits: "Cashback on eligible Amazon purchases.",
        description: "A demo lifetime-free shopping card."
    },

    {
        id: 4,
        name: "Regalia Gold",
        bank: "HDFC Bank",
        category: "Travel",
        annualFee: 2500,
        joiningFee: 2500,
        cashback: "Travel Benefits",
        rewards: "Reward Points",
        interest: "3.6% monthly",
        rating: 4.6,
        color: "linear-gradient(135deg,#8b713d,#d6bb7b)",
        benefits: "Travel privileges and selected lifestyle benefits.",
        description: "A demo premium travel-focused credit card."
    },

    {
        id: 5,
        name: "Coral Credit Card",
        bank: "ICICI Bank",
        category: "Lifestyle",
        annualFee: 500,
        joiningFee: 500,
        cashback: "Movie Offers",
        rewards: "Reward Points",
        interest: "3.5% monthly",
        rating: 4.1,
        color: "linear-gradient(135deg,#8d2347,#d44c74)",
        benefits: "Selected movie, dining and lifestyle offers.",
        description: "A demo lifestyle-focused credit card."
    },

    {
        id: 6,
        name: "BPCL SBI Card",
        bank: "SBI Card",
        category: "Fuel",
        annualFee: 499,
        joiningFee: 499,
        cashback: "Fuel Savings",
        rewards: "Fuel Reward Points",
        interest: "3.5% monthly",
        rating: 4.2,
        color: "linear-gradient(135deg,#087d4c,#39b77d)",
        benefits: "Fuel-related savings at eligible BPCL outlets.",
        description: "A demo fuel-focused credit card."
    },

    {
        id: 7,
        name: "Platinum Chip",
        bank: "HDFC Bank",
        category: "Lifestyle",
        annualFee: 0,
        joiningFee: 0,
        cashback: "Reward Points",
        rewards: "Basic Rewards",
        interest: "3.6% monthly",
        rating: 3.9,
        color: "linear-gradient(135deg,#343a46,#828b9c)",
        benefits: "Basic reward points on eligible transactions.",
        description: "A demo entry-level credit card."
    },

    {
        id: 8,
        name: "MakeMyTrip Signature",
        bank: "ICICI Bank",
        category: "Travel",
        annualFee: 2500,
        joiningFee: 2500,
        cashback: "Travel Savings",
        rewards: "Travel Rewards",
        interest: "3.5% monthly",
        rating: 4.4,
        color: "linear-gradient(135deg,#4a287e,#9362c9)",
        benefits: "Selected travel and hotel booking benefits.",
        description: "A demo travel-focused credit card."
    },

    {
        id: 9,
        name: "SimplySAVE Credit Card",
        bank: "SBI Card",
        category: "Lifestyle",
        annualFee: 499,
        joiningFee: 499,
        cashback: "Reward Points",
        rewards: "10X Rewards",
        interest: "3.5% monthly",
        rating: 4.0,
        color: "linear-gradient(135deg,#174b87,#35a1d3)",
        benefits: "Extra reward points on selected everyday spending.",
        description: "A demo everyday spending credit card."
    }
];


/* =====================================
   DOM ELEMENTS
===================================== */

const cardContainer =
    document.getElementById("cardContainer");

const comparisonContainer =
    document.getElementById("comparisonContainer");

const searchInput =
    document.getElementById("searchInput");

const bankFilter =
    document.getElementById("bankFilter");

const feeFilter =
    document.getElementById("feeFilter");

const typeFilter =
    document.getElementById("typeFilter");

const emptyMessage =
    document.getElementById("emptyMessage");


/* =====================================
   APPLICATION STATE
===================================== */

let selectedCards = [];

let savedComparisons = JSON.parse(
    localStorage.getItem("savedComparisons") || "[]"
);


/* =====================================
   INITIALIZE DASHBOARD
===================================== */

function initializeDashboard() {

    populateBankFilter();

    renderCards();

    updateStatistics();

    renderComparison();

    updateSavedCount();

}


/* =====================================
   POPULATE BANK FILTER
===================================== */

function populateBankFilter() {

    const banks = [
        ...new Set(creditCards.map(card => card.bank))
    ];

    banks.forEach(bank => {

        const option = document.createElement("option");

        option.value = bank;

        option.textContent = bank;

        bankFilter.appendChild(option);

    });

}


/* =====================================
   RENDER CREDIT CARDS
===================================== */

function renderCards() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedBank = bankFilter.value;

    const selectedFee = feeFilter.value;

    const selectedType = typeFilter.value;


    const filteredCards = creditCards.filter(card => {

        const matchesSearch =
            card.name.toLowerCase().includes(searchText) ||
            card.bank.toLowerCase().includes(searchText);

        const matchesBank =
            selectedBank === "all" ||
            card.bank === selectedBank;

        const matchesFee =
            selectedFee === "all" ||
            (
                selectedFee === "0"
                    ? card.annualFee === 0
                    : card.annualFee < Number(selectedFee)
            );

        const matchesType =
            selectedType === "all" ||
            card.category === selectedType;

        return (
            matchesSearch &&
            matchesBank &&
            matchesFee &&
            matchesType
        );

    });


    cardContainer.innerHTML = "";

    emptyMessage.style.display =
        filteredCards.length === 0 ? "block" : "none";


    filteredCards.forEach(card => {

        const isSelected =
            selectedCards.includes(card.id);

        const cardElement =
            document.createElement("div");

        cardElement.className = "credit-card";

        cardElement.innerHTML = `

            <span class="bank-name">
                ${card.bank}
            </span>

            <div class="card-visual"
                 style="background:${card.color}">

                <strong>${card.bank}</strong>

                <small>•••• •••• •••• ${String(card.id).padStart(4, "0")}</small>

                <span class="network">VISA</span>

            </div>

            <span class="card-category">
                ${card.category}
            </span>

            <h3>${card.name}</h3>

            <div class="card-info">

                <div class="info-item">
                    <span>Annual Fee</span>
                    <strong>${formatFee(card.annualFee)}</strong>
                </div>

                <div class="info-item">
                    <span>Benefits</span>
                    <strong>${card.cashback}</strong>
                </div>

                <div class="info-item">
                    <span>Rewards</span>
                    <strong>${card.rewards}</strong>
                </div>

                <div class="info-item">
                    <span>Rating</span>
                    <strong>★ ${card.rating}/5</strong>
                </div>

            </div>

            <div class="card-actions">

                <button
                    class="compare-btn ${isSelected ? "selected" : ""}"
                    data-action="compare"
                    data-id="${card.id}">

                    ${isSelected ? "✓ Selected" : "+ Compare"}

                </button>

                <button
                    class="details-btn"
                    data-action="details"
                    data-id="${card.id}">

                    Details

                </button>

            </div>

        `;

        cardContainer.appendChild(cardElement);

    });

}


/* =====================================
   FORMAT ANNUAL FEE
===================================== */

function formatFee(fee) {

    return fee === 0
        ? "Lifetime Free*"
        : "₹" + fee.toLocaleString("en-IN");

}


/* =====================================
   COMPARE CARD SELECTION
===================================== */

function toggleCompare(id) {

    if (selectedCards.includes(id)) {

        selectedCards =
            selectedCards.filter(cardId => cardId !== id);

    }

    else {

        if (selectedCards.length >= 3) {

            alert("You can compare a maximum of 3 cards.");

            return;

        }

        selectedCards.push(id);

    }

    renderCards();

    renderComparison();

    updateStatistics();

}


/* =====================================
   RENDER COMPARISON TABLE
===================================== */

function renderComparison() {

    const cards = creditCards.filter(card =>
        selectedCards.includes(card.id)
    );


    if (cards.length === 0) {

        comparisonContainer.innerHTML = `

            <div class="empty-comparison">

                <div class="empty-icon">⇄</div>

                <h3>No cards selected</h3>

                <p>Add cards from Explore Cards to compare them.</p>

            </div>

        `;

        return;

    }


    const comparisonRows = [

        ["Bank", card => card.bank],

        ["Category", card => card.category],

        ["Annual Fee", card => formatFee(card.annualFee)],

        ["Joining Fee", card => formatFee(card.joiningFee)],

        ["Cashback / Benefits", card => card.cashback],

        ["Reward System", card => card.rewards],

        ["Interest Rate", card => card.interest],

        ["Rating", card => "★ " + card.rating + "/5"]

    ];


    let tableHTML = `

        <table class="comparison-table">

            <thead>

                <tr>

                    <th>Features</th>

                    ${cards.map(card => `
                        <th>
                            ${card.name}
                            <br><br>
                            <button
                                class="remove-compare"
                                data-id="${card.id}">
                                Remove
                            </button>
                        </th>
                    `).join("")}

                </tr>

            </thead>

            <tbody>

    `;


    comparisonRows.forEach(row => {

        tableHTML += `

            <tr>

                <td>${row[0]}</td>

                ${cards.map(card => `
                    <td>${row[1](card)}</td>
                `).join("")}

            </tr>

        `;

    });


    tableHTML += `

            </tbody>

        </table>

    `;


    comparisonContainer.innerHTML = tableHTML;

}


/* =====================================
   REMOVE COMPARED CARD
===================================== */

function removeComparedCard(id) {

    selectedCards =
        selectedCards.filter(cardId => cardId !== id);

    renderCards();

    renderComparison();

    updateStatistics();

}


/* =====================================
   CLEAR COMPARISON
===================================== */

function clearComparison() {

    selectedCards = [];

    renderCards();

    renderComparison();

    updateStatistics();

}


/* =====================================
   CARD DETAILS MODAL
===================================== */

function showCardDetails(id) {

    const card = creditCards.find(card =>
        card.id === id
    );

    if (!card) return;

    const modal = document.getElementById("detailsModal");

    const modalBody = document.getElementById("modalBody");


    modalBody.innerHTML = `

        <span class="bank-name">${card.bank}</span>

        <h2>${card.name}</h2>

        <span class="card-category">${card.category}</span>

        <div class="card-visual" style="background:${card.color}">
            <strong>${card.bank}</strong>
            <small>•••• •••• •••• ${String(card.id).padStart(4, "0")}</small>
            <span class="network">VISA</span>
        </div>

        <p><strong>Annual Fee:</strong> ${formatFee(card.annualFee)}</p>

        <p><strong>Joining Fee:</strong> ${formatFee(card.joiningFee)}</p>

        <p><strong>Cashback:</strong> ${card.cashback}</p>

        <p><strong>Rewards:</strong> ${card.rewards}</p>

        <p><strong>Interest:</strong> ${card.interest}</p>

        <p><strong>Benefits:</strong> ${card.benefits}</p>

        <p><strong>Description:</strong> ${card.description}</p>

        <p><strong>Illustrative rating:</strong> ${card.rating}/5</p>

        <small>Demo information. Check the issuer's official terms for actual charges and benefits.</small>

    `;


    modal.classList.add("show");

}


/* =====================================
   CLOSE MODAL
===================================== */

function closeModal() {

    document.getElementById("detailsModal")
        .classList.remove("show");

}


/* =====================================
   SMART RECOMMENDATION ENGINE
===================================== */

function getRecommendation() {

    const category =
        document.getElementById("spendingCategory").value;

    const feeLimit =
        Number(document.getElementById("preferredFee").value);


    const suitableCards = creditCards.filter(card => {

        const categoryMatch =
            card.category === category;

        const feeMatch =
            feeLimit === 5000 ||
            card.annualFee < feeLimit;

        return categoryMatch && feeMatch;

    });


    const result =
        document.getElementById("recommendationResult");


    if (suitableCards.length === 0) {

        result.innerHTML = `

            <div class="recommend-icon">!</div>

            <h3>No matching card found</h3>

            <p>Try changing your spending category or annual fee preference.</p>

        `;

        return;

    }


    // Sort by illustrative rating

    suitableCards.sort((a, b) =>
        b.rating - a.rating
    );


    const bestCard = suitableCards[0];


    result.innerHTML = `

        <div class="recommend-icon">✦</div>

        <h3>Recommended Card For You</h3>

        <div class="recommended-card">

            ${bestCard.name}

        </div>

        <p>
            Bank: ${bestCard.bank}
            <br>
            Category: ${bestCard.category}
            <br>
            Annual Fee: ${formatFee(bestCard.annualFee)}
            <br>
            Benefits: ${bestCard.cashback}
            <br>
            Illustrative Rating: ${bestCard.rating}/5
        </p>

        <button
            class="recommend-btn"
            data-action="compare"
            data-id="${bestCard.id}"
            style="margin-top:15px">

            Add to Comparison

        </button>

    `;

}


/* =====================================
   SAVE COMPARISON
===================================== */

function saveComparison() {

    if (selectedCards.length < 2) {

        alert("Select at least two cards to save a comparison.");

        return;

    }


    const savedData = selectedCards.map(id => {

        const card = creditCards.find(item =>
            item.id === id
        );

        return {
            id: card.id,
            name: card.name,
            bank: card.bank
        };

    });


    savedComparisons.push({

        date: new Date().toLocaleString(),

        cards: savedData

    });


    localStorage.setItem(
        "savedComparisons",
        JSON.stringify(savedComparisons)
    );


    updateSavedCount();

    alert("Comparison saved successfully!");

}


/* =====================================
   UPDATE DASHBOARD STATISTICS
===================================== */

function updateStatistics() {

    document.getElementById("totalCards")
        .textContent = creditCards.length;

    document.getElementById("totalBanks")
        .textContent = new Set(
            creditCards.map(card => card.bank)
        ).size;

    document.getElementById("selectedCards")
        .textContent = selectedCards.length;

}


function updateSavedCount() {

    document.getElementById("savedCount")
        .textContent = savedComparisons.length;

}


/* =====================================
   RESET FILTERS
===================================== */

function resetFilters() {

    searchInput.value = "";

    bankFilter.value = "all";

    feeFilter.value = "all";

    typeFilter.value = "all";

    renderCards();

}


/* =====================================
   EVENT LISTENERS
===================================== */

searchInput.addEventListener("input", renderCards);

bankFilter.addEventListener("change", renderCards);

feeFilter.addEventListener("change", renderCards);

typeFilter.addEventListener("change", renderCards);


document.getElementById("resetFilters")
    .addEventListener("click", resetFilters);


document.getElementById("clearCompare")
    .addEventListener("click", clearComparison);


document.getElementById("saveComparison")
    .addEventListener("click", saveComparison);


document.getElementById("recommendBtn")
    .addEventListener("click", getRecommendation);


document.getElementById("closeModal")
    .addEventListener("click", closeModal);


document.getElementById("detailsModal")
    .addEventListener("click", event => {

        if (event.target.id === "detailsModal") {
            closeModal();
        }

    });


// Handle buttons generated dynamically

document.addEventListener("click", event => {

    const button = event.target.closest("button[data-action]");

    if (button) {

        const id = Number(button.dataset.id);

        if (button.dataset.action === "compare") {
            toggleCompare(id);
        }

        if (button.dataset.action === "details") {
            showCardDetails(id);
        }

    }


    if (event.target.classList.contains("remove-compare")) {

        removeComparedCard(Number(event.target.dataset.id));

    }

});


/* =====================================
   START APPLICATION
===================================== */

initializeDashboard();
