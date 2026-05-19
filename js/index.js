import { getAll } from "./api.js";

async function chargerCours() {
    const liste = document.getElementById("liste-cours");
    liste.innerHTML = "<p>Chargement...</p>";

    try {
        const cours = await getAll("cours");

        if (cours.length === 0) {
            liste.innerHTML = "<p>Aucun cours trouvé.</p>";
            return;
        }

        liste.innerHTML = "";

        cours.forEach(c => {
            const card = document.createElement("div");
            card.className = "carte";

            card.innerHTML = `
                <div class="carte-corps">
                    <h3 class="carte-nom">${c.titre}</h3>
                    <p><strong>Niveau :</strong> ${c.niveau}</p>
                    <p><strong>Capacité :</strong> ${c.capacite_max}</p>
                    <p><strong>Instructeur :</strong> ${c.id_instructeur}</p>
                </div>
            `;

            liste.appendChild(card);
        });

    } catch (err) {
        liste.innerHTML = `<p style="color:red;">Erreur : ${err.message}</p>`;
    }
}

chargerCours();
