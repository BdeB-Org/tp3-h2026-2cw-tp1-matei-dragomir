const conteneurListe = document.getElementById('liste-instructeurs');
const formulaireAjout = document.getElementById('formulaire-ajout');

async function chargerInstructeurs() {
    try {
        const instructeurs = await getAll('instructeur'); 

        conteneurListe.innerHTML = '';

        if (instructeurs.length === 0) {
            conteneurListe.innerHTML = '<p>Aucun instructeur dans la base de données.</p>';
            return;
        }

        instructeurs.forEach(inst => {
            const carteHTML = `
                <article class="carte">
                    <button class="btn-supprimer" onclick="supprimerInstructeur(${inst.id_instructeur})" title="Supprimer">✕</button>
                    <div class="carte-couverture"></div>
                    <div class="carte-profil">Photo</div>
                    <div class="carte-corps">
                        <h3 class="carte-nom">${inst.prenom} ${inst.nom}</h3>
                        <span class="carte-specialite">${inst.specialite}</span>
                        <p class="carte-bio">${inst.bio}</p>
                    </div>
                </article>
            `;
            conteneurListe.innerHTML += carteHTML;
        });

    } catch (erreur) {
        console.error("Erreur lors du chargement :", erreur);
        conteneurListe.innerHTML = "<p style='color:red;'>Erreur de connexion à la base de données.</p>";
    }
}

formulaireAjout.addEventListener('submit', async (evenement) => {
    evenement.preventDefault();

    const nouvelInstructeur = {
        id_instructeur: Math.floor(Math.random() * 10000), 
        prenom: document.getElementById('prenom').value,
        nom: document.getElementById('nom').value,
        specialite: document.getElementById('specialite').value,
        bio: document.getElementById('bio').value
    };

    try {
        await create('instructeur', nouvelInstructeur);
        
        formulaireAjout.reset();
        chargerInstructeurs();
        
    } catch (erreur) {
        console.error("Erreur d'ajout :", erreur);
        alert("Erreur lors de l'ajout de l'instructeur.");
    }
});

async function supprimerInstructeur(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet instructeur ?")) {
        try {
            await remove('instructeur', id);
            
            chargerInstructeurs();
            
        } catch (erreur) {
            console.error("Erreur de suppression :", erreur);
            alert("Erreur lors de la suppression.");
        }
    }
}

chargerInstructeurs();