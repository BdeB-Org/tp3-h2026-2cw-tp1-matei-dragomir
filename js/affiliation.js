const corpsTableau = document.getElementById('corps-tableau');

async function chargerAffiliations() {
    try {
        const affiliations = await getAll('vue_affiliations');
        
        corpsTableau.innerHTML = '';

        if (affiliations.length === 0) {
            corpsTableau.innerHTML = '<tr><td colspan="4" style="text-align:center;">Aucune affiliation trouvée.</td></tr>';
            return;
        }

        affiliations.forEach(aff => {
            const datePropre = new Date(aff.date_inscription).toLocaleDateString('fr-CA');

            const ligne = `
                <tr>
                    <td><strong>${aff.nom_membre}</strong></td>
                    <td>${aff.nom_cours}</td>
                    <td>${aff.nom_instructeur}</td>
                    <td>${datePropre}</td>
                </tr>
            `;
            corpsTableau.innerHTML += ligne;
        });

    } catch (erreur) {
        console.error("Erreur de chargement :", erreur);
        corpsTableau.innerHTML = `<tr><td colspan="4" style="color:red; text-align:center;">Erreur : Impossible de charger les données.</td></tr>`;
    }
}

chargerAffiliations();