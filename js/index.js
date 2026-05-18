
api.getCours()
    .then(cours => {
        const conteneur = document.getElementById("liste-cours");
        conteneur.innerHTML = "";

        if (cours.length === 0) {
            conteneur.innerHTML = "<p>Aucun cours trouvé.</p>";
            return;
        }

        cours.forEach(c => {
            conteneur.innerHTML += `
                <div class="carte">
                    <div class="carte-couverture"></div>
                    <div class="carte-corps">
                        <h3 class="carte-nom">${c.titre}</h3>
                        <div class="carte-specialite">${c.niveau}</div>
                        <p class="carte-bio">Capacité : ${c.capacite_max} personnes</p>
                    </div>
                </div>
            `;
        });
    })
    .catch(err => {
        document.getElementById("liste-cours").innerHTML =
            "<p style='color:red;'>Erreur de chargement des cours.</p>";
        console.error("Erreur API cours :", err);
    });



api.getInstructeurs()
    .then(instructeurs => {
        const conteneur = document.getElementById("liste-instructeurs-accueil");
        conteneur.innerHTML = "";

        if (instructeurs.length === 0) {
            conteneur.innerHTML = "<p>Aucun instructeur trouvé.</p>";
            return;
        }

        instructeurs.forEach(i => {
            const initials = i.prenom.charAt(0) + i.nom.charAt(0);

            conteneur.innerHTML += `
                <div class="carte">
                    <div class="carte-couverture"></div>
                    <div class="carte-profil">${initials}</div>
                    <div class="carte-corps">
                        <h3 class="carte-nom">${i.prenom} ${i.nom}</h3>
                        <div class="carte-specialite">${i.specialite}</div>
                        <p class="carte-bio">${i.bio}</p>
                    </div>
                </div>
            `;
        });
    })
    .catch(err => {
        document.getElementById("liste-instructeurs-accueil").innerHTML =
            "<p style='color:red;'>Erreur de chargement des instructeurs.</p>";
        console.error("Erreur API instructeurs :", err);
    });



api.getAbonnements()
    .then(types => {
        const conteneur = document.getElementById("liste-abonnements");
        conteneur.innerHTML = "";

        if (types.length === 0) {
            conteneur.innerHTML = "<p>Aucun abonnement trouvé.</p>";
            return;
        }

        types.forEach(t => {
            conteneur.innerHTML += `
                <div class="carte">
                    <div class="carte-couverture"></div>
                    <div class="carte-corps">
                        <h3 class="carte-nom">${t.nom_type}</h3>
                        <div class="carte-specialite">${t.prix_mensuel}$/mois</div>
                        <p class="carte-bio">${t.description}</p>
                    </div>
                </div>
            `;
        });
    })
    .catch(err => {
        document.getElementById("liste-abonnements").innerHTML =
            "<p style='color:red;'>Erreur de chargement des abonnements.</p>";
        console.error("Erreur API abonnements :", err);
    });
