
/** testes */

const medicines = [

    {
        name: "DIPIRONA 500 mg",
        details: "Comprimido"
    },

    {
        name: "DIPIRONA 1 g",
        details: "Comprimido"
    },

    {
        name: "DIPIRONA GOTAS",
        details: "Solução oral"
    },

    {
        name: "PARACETAMOL 500 mg",
        details: "Comprimido"
    },

    {
        name: "IBUPROFENO 600 mg",
        details: "Comprimido"
    },

    {
        name: "AMOXICILINA 500 mg",
        details: "Cápsula"
    }

];

/* =========================
   TELAS
   ========================= */

const homeScreen =
    document.getElementById("homeScreen");

const medicineScreen =
    document.getElementById("medicineScreen");

let telaAnteriorInformacao = medicineScreen;

const informationScreen =
    document.getElementById("informationScreen");

const errorScreen =
    document.getElementById("errorScreen");

const searchScreen =
    document.getElementById("searchScreen");

const selectionScreen =
    document.getElementById("selectionScreen");

const informationChoiceScreen =
    document.getElementById("informationChoiceScreen");


/* =========================
   BOTÕES DA TELA INICIAL
   ========================= */

const manualSearchButton =
    document.getElementById("manualSearchButton");


/* =========================
   BOTÕES DA TELA DO MEDICAMENTO
   ========================= */

const backButton =
    document.getElementById("backButton");

const homeButton =
    document.getElementById("homeButton");

const newSearchButton =
    document.getElementById("newSearchButton");


/* =========================
   BOTÕES DA TELA DE INFORMAÇÃO
   ========================= */

const informationBackButton =
    document.getElementById("informationBackButton");

const informationHomeButton =
    document.getElementById("informationHomeButton");

const backToInformationButton =
    document.getElementById("backToInformationButton");

/* =========================
   BOTÕES DA TELA DE SELEÇÃO
   ========================= */

const selectionBackButton =
    document.getElementById("selectionBackButton");

const selectionHomeButton =
    document.getElementById("selectionHomeButton");

const selectionBackSearchButton =
    document.getElementById("selectionBackSearchButton");

const medicineResults =
    document.getElementById("medicineResults");

/* =========================
   BOTÕES DA TELA DE INFORMAÇÕES
   ========================= */

const informationChoiceBackButton =
    document.getElementById("informationChoiceBackButton");

const informationChoiceHomeButton =
    document.getElementById("informationChoiceHomeButton");

const informationChoiceBackSearchButton =
    document.getElementById("informationChoiceBackSearchButton");

const selectedMedicineName =
    document.getElementById("selectedMedicineName");

const informationChoiceButtons =
    document.querySelectorAll(".information-choice-button");

informationChoiceButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Avisa que viemos da tela de escolha da busca manual
        telaAnteriorInformacao = informationChoiceScreen; 

        const type =
            button.dataset.info;

        console.log("Informação selecionada:", type);

        showInformation(type);

    });
});

/* =========================
   BOTÕES DA TELA DE ERRO
   ========================= */

const errorBackButton =
    document.getElementById("errorBackButton");

const errorHomeButton =
    document.getElementById("errorHomeButton");

const retryButton =
    document.getElementById("retryButton");

const errorManualSearchButton =
    document.getElementById("errorManualSearchButton");


/* =========================
   BUSCA MANUAL
   ========================= */

const searchBackButton =
    document.getElementById("searchBackButton");

const searchHomeButton =
    document.getElementById("searchHomeButton");

const medicineSearchInput =
    document.getElementById("medicineSearchInput");

const clearSearchButton =
    document.getElementById("clearSearchButton");

const continueSearchButton =
    document.getElementById("continueSearchButton");


/* =========================
   ELEMENTOS DA INFORMAÇÃO
   ========================= */

const informationTitle =
    document.getElementById("informationTitle");

const informationText =
    document.getElementById("informationText");

    


/* =========================
   MOSTRAR TELA
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


/* =========================
   VOLTAR PARA INÍCIO
   ========================= */

function goHome() {

    showScreen(homeScreen);

}


/* =========================
   MOSTRAR MEDICAMENTO
   ========================= */

function showMedicine() {

    showScreen(medicineScreen);

}


/* =========================
   MOSTRAR INFORMAÇÃO
   ========================= */

function showInformation(type) {

    const information = {

        "composicao": {
            title: "COMPOSIÇÃO",

            text:
                "Nesta área serão apresentadas as informações " +
                "sobre a composição do medicamento, conforme " +
                "as informações cadastradas na base de dados."
        },


        "como-tomar": {
            title: "COMO TOMAR",

            text:
                "Nesta área serão apresentadas as informações " +
                "sobre o modo de uso do medicamento, conforme " +
                "as informações cadastradas na base de dados."
        },


        "contraindicacoes": {
            title: "CONTRAINDICAÇÕES",

            text:
                "Nesta área serão apresentadas as informações " +
                "sobre contraindicações e advertências, conforme " +
                "as informações cadastradas na base de dados."
        },


        "outras": {
            title: "OUTRAS INFORMAÇÕES",

            text:
                "Nesta área serão apresentadas outras informações " +
                "relevantes presentes na bula do medicamento."
        }

    };


    const selectedInformation =
        information[type];


    if (!selectedInformation) {
        return;
    }


    informationTitle.textContent =
        selectedInformation.title;


    informationText.textContent =
        selectedInformation.text;


    showScreen(informationScreen);

}


/* =========================
   BUSCA MANUAL
   ========================= */

function showSearch() {

    medicineSearchInput.value = "";

    continueSearchButton.disabled = true;

    showScreen(searchScreen);

    /*
     * Coloca o cursor automaticamente
     * no campo de busca.
     */

    setTimeout(() => {

        medicineSearchInput.focus();

    }, 100);

}


/* =========================
   ATUALIZAR BOTÃO CONTINUAR
   ========================= */

function updateContinueButton() {

    const hasText =
        medicineSearchInput.value.trim().length > 0;

    continueSearchButton.disabled =
        !hasText;

}


/* =========================
   BOTÃO BUSCAR MEDICAMENTO
   ========================= */

manualSearchButton.addEventListener("click", () => {

    showSearch();

});


/* =========================
   VOLTAR DA BUSCA
   ========================= */

searchBackButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   HOME DA BUSCA
   ========================= */

searchHomeButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   DIGITAÇÃO
   ========================= */

medicineSearchInput.addEventListener("input", () => {

    updateContinueButton();

});


/* =========================
   LIMPAR BUSCA
   ========================= */

clearSearchButton.addEventListener("click", () => {

    medicineSearchInput.value = "";

    updateContinueButton();

    medicineSearchInput.focus();

});


/* =========================
   CONTINUAR BUSCA
   ========================= */

continueSearchButton.addEventListener("click", () => {

    const medicineName =
        medicineSearchInput.value.trim();

    if (!medicineName) {
        return;
    }

    showSelection(medicineName);

});

/* =========================
   VOLTAR DA TELA DO MEDICAMENTO
   ========================= */

backButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   HOME
   ========================= */

homeButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   NOVA CONSULTA
   ========================= */

newSearchButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   BOTÕES DE INFORMAÇÃO
   ========================= */

const informationButtons =
    document.querySelectorAll(".information-button");


informationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const type =
            button.dataset.info;

        showInformation(type);

    });

});


/* =========================
   VOLTAR DA INFORMAÇÃO
   ========================= */

informationBackButton.addEventListener("click", () => {

    showScreen(telaAnteriorInformacao);

});


/* =========================
   HOME DA INFORMAÇÃO
   ========================= */

informationHomeButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   VOLTAR PARA O MENU
   ========================= */

backToInformationButton.addEventListener("click", () => {

    showScreen(telaAnteriorInformacao);

});


/* =========================
   TELA DE ERRO
   ========================= */

function showError() {

    showScreen(errorScreen);

}


/* =========================
   VOLTAR DA TELA DE ERRO
   ========================= */

errorBackButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   HOME DA TELA DE ERRO
   ========================= */

errorHomeButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   TENTAR NOVAMENTE
   ========================= */

retryButton.addEventListener("click", () => {

    goHome();

});


/* =========================
   BUSCA MANUAL PELO ERRO
   ========================= */

errorManualSearchButton.addEventListener("click", () => {

    showSearch();

});

/* =========================
   BOTÕES DE SELEÇÕES
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


/* =========================
   BOTÕES DE NAVEGAÇÃO
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

const noResultsBackButton =
    document.getElementById("noResultsBackButton");

noResultsBackButton.addEventListener("click", () => {

    showSearch();

});
   

/* =========================
   MOSTRAR RESULTADOS DA SELEÇÃO
   ========================= */

function showSelection(searchTerm = "") {

    const noResults =
        document.getElementById("noResults");

    noResults.classList.remove("active");

    medicineResults.innerHTML = "";


    const normalizedSearch =
        searchTerm
            .trim()
            .toLowerCase();


    const results =
        medicines.filter(medicine => {

            return medicine.name
                .toLowerCase()
                .includes(normalizedSearch);

        });


    if (results.length === 0) {

        showNoResults();

        return;

    }


    results.forEach(medicine => {

        const index =
            medicines.indexOf(medicine);


        const button =
            document.createElement("button");

        button.className =
            "medicine-result";


        const information =
            document.createElement("div");


        const name =
            document.createElement("div");

        name.className =
            "medicine-result-name";

        name.textContent =
            medicine.name;


        const details =
            document.createElement("div");

        details.className =
            "medicine-result-details";

        details.textContent =
            medicine.details;


        information.appendChild(name);

        information.appendChild(details);


        const arrow =
            document.createElement("div");

        arrow.className =
            "medicine-result-arrow";

        arrow.textContent =
            "→";


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

    const noResults =
        document.getElementById("noResults");

    noResults.classList.add("active");

    showScreen(selectionScreen);

}

function selectMedicine(index) {

    const selectedMedicine = medicines[index];

    selectedMedicineName.textContent =
        selectedMedicine.name;

    showScreen(informationChoiceScreen);
}
