import { getAll } from "./api.js";

async function chargerDetailCours() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const conteneur = document.getElementById("detail-cours");

    if (!id) {
        conteneur.innerHTML = "<p style='color:red;'>Cours introuvable.</p>";
        return;
    }

    try {
        const cours = await getAll("cours");
        const c = cours.find(c => c.id_cours === id);

        if (!c) {
            conteneur.innerHTML = "<p style='color:red;'>Ce cours n'existe pas.</p>";
            return;
        }

        conteneur.innerHTML = `
            <div class="carte" style="max-width:600px; margin:0 auto;">
                <div class="carte-couverture"></div>
                <div class="carte-corps">
                    <h2 class="carte-nom">${c.titre}</h2>
                    <span class="carte-specialite">${c.niveau}</span>
                    <p style="margin-top:15px;"><strong>Capacité :</strong> ${c.capacite_max} places</p>
                    <p><strong>Instructeur :</strong> ${c.id_instructeur}</p>
                </div>
            </div>
        `;

    } catch (err) {
        conteneur.innerHTML = `<p style="color:red;">Erreur : ${err.message}</p>`;
    }
}

chargerDetailCours();