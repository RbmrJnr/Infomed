/* =========================
   DADOS DA BUSCA
   ========================= */

let medicines = [];
let selectedMedicine = null;

/* =========================
   TELAS E ESTADO
   ========================= */

const homeScreen = document.getElementById("homeScreen");
const medicineScreen = document.getElementById("medicineScreen");
const informationScreen = document.getElementById("informationScreen");
const errorScreen = document.getElementById("errorScreen");
const searchScreen = document.getElementById("searchScreen");
const selectionScreen = document.getElementById("selectionScreen");
const informationChoiceScreen = document.getElementById("informationChoiceScreen");

let telaAnteriorInformacao = medicineScreen;

/* =========================
   ELEMENTOS DA TELA INICIAL
   ========================= */

const manualSearchButton = document.getElementById("manualSearchButton");

/* =========================
   ELEMENTOS DA BUSCA MANUAL
   ========================= */

const searchBackButton = document.getElementById("searchBackButton");
const searchHomeButton = document.getElementById("searchHomeButton");
const medicineSearchInput = document.getElementById("medicineSearchInput");
const clearSearchButton = document.getElementById("clearSearchButton");
const continueSearchButton = document.getElementById("continueSearchButton");

/* =========================
   ELEMENTOS DA SELEÇÃO
   ========================= */

const selectionBackButton = document.getElementById("selectionBackButton");
const selectionHomeButton = document.getElementById("selectionHomeButton");
const selectionBackSearchButton = document.getElementById("selectionBackSearchButton");
const medicineResults = document.getElementById("medicineResults");
const noResultsBackButton = document.getElementById("noResultsBackButton");

/* =========================
   ELEMENTOS DAS INFORMAÇÕES
   ========================= */

const informationChoiceBackButton = document.getElementById("informationChoiceBackButton");
const informationChoiceHomeButton = document.getElementById("informationChoiceHomeButton");
const informationChoiceBackSearchButton = document.getElementById("informationChoiceBackSearchButton");
const informationChoiceButtons = document.querySelectorAll(".information-choice-button");
const selectedMedicineName = document.getElementById("selectedMedicineName");

const informationBackButton = document.getElementById("informationBackButton");
const informationHomeButton = document.getElementById("informationHomeButton");
const backToInformationButton = document.getElementById("backToInformationButton");
const informationButtons = document.querySelectorAll(".information-button");
const informationTitle = document.getElementById("informationTitle");
const informationText = document.getElementById("informationText");

/* =========================
   ELEMENTOS DA TELA DO MEDICAMENTO
   ========================= */

const backButton = document.getElementById("backButton");
const homeButton = document.getElementById("homeButton");
const newSearchButton = document.getElementById("newSearchButton");

/* =========================
   ELEMENTOS DA TELA DE ERRO
   ========================= */

const errorBackButton = document.getElementById("errorBackButton");
const errorHomeButton = document.getElementById("errorHomeButton");
const retryButton = document.getElementById("retryButton");
const errorManualSearchButton = document.getElementById("errorManualSearchButton");

/* =========================
   NAVEGAÇÃO ENTRE TELAS
   ========================= */

function showScreen(screen) {
    homeScreen.classList.remove("active");
    medicineScreen.classList.remove("active");
    informationScreen.classList.remove("active");
    errorScreen.classList.remove("active");
    searchScreen.classList.remove("active");
    selectionScreen.classList.remove("active");
    informationChoiceScreen.classList.remove("active");

    screen.classList.add("active");
}

function goHome() {
    showScreen(homeScreen);
}

function showMedicine() {
    showScreen(medicineScreen);
}

function showError() {
    showScreen(errorScreen);
}

/* =========================
   INFORMAÇÕES DO MEDICAMENTO
   ========================= */

function showInformation(type) {
    if (!selectedMedicine) {
        return;
    }

    const information = {
        composicao: {
            title: "COMPOSIÇÃO",
            text: selectedMedicine.composicao
        },
        "como-tomar": {
            title: "COMO TOMAR",
            text: selectedMedicine.como_tomar
        },
        contraindicacoes: {
            title: "CONTRAINDICAÇÕES",
            text: selectedMedicine.contraindicacoes
        },
        outras: {
            title: "OUTRAS INFORMAÇÕES",
            text: selectedMedicine.outras_informacoes
        }
    };

    const selectedInformation = information[type];

    if (!selectedInformation) {
        return;
    }

    informationTitle.textContent = selectedInformation.title;
    informationText.textContent = selectedInformation.text;

    showScreen(informationScreen);
}

/* =========================
   BUSCA E RESULTADOS
   ========================= */

function showSearch() {
    medicineSearchInput.value = "";
    continueSearchButton.disabled = true;

    showScreen(searchScreen);

    setTimeout(() => {
        medicineSearchInput.focus();
    }, 100);
}

function updateContinueButton() {
    const hasText = medicineSearchInput.value.trim().length > 0;

    continueSearchButton.disabled = !hasText;
}

async function showSelection(searchTerm = "") {
    const noResults = document.getElementById("noResults");

    noResults.classList.remove("active");
    medicineResults.innerHTML = "";

    try {
        const response = await fetch(
            `/api/medicamentos?busca=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
            throw new Error("Não foi possível buscar os medicamentos.");
        }

        medicines = await response.json();
    } catch (error) {
        console.error(error);
        showError();
        return;
    }

    if (medicines.length === 0) {
        showNoResults();
        return;
    }

    medicines.forEach((medicine, index) => {
        const button = document.createElement("button");
        const information = document.createElement("div");
        const name = document.createElement("div");
        const details = document.createElement("div");
        const arrow = document.createElement("div");

        button.className = "medicine-result";
        name.className = "medicine-result-name";
        details.className = "medicine-result-details";
        arrow.className = "medicine-result-arrow";

        name.textContent = medicine.nome;
        details.textContent = medicine.apresentacao;
        arrow.textContent = "→";

        information.appendChild(name);
        information.appendChild(details);
        button.appendChild(information);
        button.appendChild(arrow);

        button.addEventListener("click", () => {
            selectMedicine(index);
        });

        medicineResults.appendChild(button);
    });

    showScreen(selectionScreen);
}

function showNoResults() {
    medicineResults.innerHTML = "";

    const noResults = document.getElementById("noResults");
    noResults.classList.add("active");

    showScreen(selectionScreen);
}

function selectMedicine(index) {
    selectedMedicine = medicines[index];

    selectedMedicineName.textContent = selectedMedicine.nome;

    showScreen(informationChoiceScreen);
}

/* =========================
   EVENTOS: TELA INICIAL
   ========================= */

manualSearchButton.addEventListener("click", () => {
    showSearch();
});

/* =========================
   EVENTOS: BUSCA MANUAL
   ========================= */

searchBackButton.addEventListener("click", () => {
    goHome();
});

searchHomeButton.addEventListener("click", () => {
    goHome();
});

medicineSearchInput.addEventListener("input", () => {
    updateContinueButton();
});

clearSearchButton.addEventListener("click", () => {
    medicineSearchInput.value = "";
    updateContinueButton();
    medicineSearchInput.focus();
});

continueSearchButton.addEventListener("click", async () => {
    const medicineName = medicineSearchInput.value.trim();

    if (!medicineName) {
        return;
    }

    showSelection(medicineName);
});

/* =========================
   EVENTOS: SELEÇÃO
   ========================= */

selectionBackButton.addEventListener("click", () => {
    showSearch();
});

selectionHomeButton.addEventListener("click", () => {
    goHome();
});

if (selectionBackSearchButton) {
    selectionBackSearchButton.addEventListener("click", () => {
        showSearch();
    });
}

noResultsBackButton.addEventListener("click", () => {
    showSearch();
});

/* =========================
   EVENTOS: TELA DE INFORMAÇÕES
   ========================= */

informationChoiceBackButton.addEventListener("click", () => {
    showSelection(medicineSearchInput.value);
});

informationChoiceHomeButton.addEventListener("click", () => {
    goHome();
});

informationChoiceBackSearchButton.addEventListener("click", () => {
    showSearch();
});

informationChoiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Avisa que viemos da tela de escolha da busca manual.
        telaAnteriorInformacao = informationChoiceScreen;

        const type = button.dataset.info;

        console.log("Informação selecionada:", type);
        showInformation(type);
    });
});

/* =========================
   EVENTOS: DETALHES DO MEDICAMENTO
   ========================= */

backButton.addEventListener("click", () => {
    goHome();
});

homeButton.addEventListener("click", () => {
    goHome();
});

newSearchButton.addEventListener("click", () => {
    goHome();
});

informationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const type = button.dataset.info;

        showInformation(type);
    });
});

/* =========================
   EVENTOS: DETALHE DA INFORMAÇÃO
   ========================= */

informationBackButton.addEventListener("click", () => {
    showScreen(telaAnteriorInformacao);
});

informationHomeButton.addEventListener("click", () => {
    goHome();
});

backToInformationButton.addEventListener("click", () => {
    showScreen(telaAnteriorInformacao);
});

/* =========================
   EVENTOS: TELA DE ERRO
   ========================= */

errorBackButton.addEventListener("click", () => {
    goHome();
});

errorHomeButton.addEventListener("click", () => {
    goHome();
});

retryButton.addEventListener("click", () => {
    goHome();
});

errorManualSearchButton.addEventListener("click", () => {
    showSearch();
});
