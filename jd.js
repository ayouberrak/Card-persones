document.addEventListener('DOMContentLoaded', () => {
 
    // les variables
    const personForm = document.getElementById('person-form');
    const cardsContainer = document.getElementById('cards-container');

    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // les champs 
    const editIdInput = document.getElementById('edit-id');
    const prenomInput = document.getElementById('prenom');
    const nomInput = document.getElementById('nom');
    const dateNaissanceInput = document.getElementById('dateNaissance');
    const adresseInput = document.getElementById('adresse');
    const villeInput = document.getElementById('ville');
    const photoInput = document.getElementById('photo');


    // localeStorage
    let people = JSON.parse(localStorage.getItem('people'));

    function saveToStorage() {
        localStorage.setItem('people', JSON.stringify(people));
    }


    // afficher les card
    function renderPeople() {
        cardsContainer.innerHTML = '';

        people.forEach(person => {
            const card = document.createElement('div');
            card.classList.add('person-card');

            card.innerHTML = `
                <img src="${person.photo}" alt="Photo de ${person.prenom}">
                <h3>${person.prenom} ${person.nom}</h3>
                <p><strong>Né(e) le:</strong> ${person.dateNaissance}</p>
                <p><strong>Adresse:</strong> ${person.adresse}</p>
                <p><strong>Ville:</strong> ${person.ville}</p>
                <div class="card-actions">
                    <button class="edit-btn" data-id="${person.id}">Modifier</button>
                    <button class="delete-btn" data-id="${person.id}">Supprimer</button>
                </div>
            `;

            cardsContainer.appendChild(card);
        });
    }

    // reinistalisation
    function resetForm() {
        l.reset(); 
        editIdInput.value = ''; 
        submitBtn.textContent = 'Ajouter';
        cancelBtn.classList.add('hidden');
    }

    
    personForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const idToEdit = editIdInput.value;

        // modification
        if (idToEdit) {
            people = people.map(person => {
                if (person.id == idToEdit) {
                    return {
                        id: person.id,
                        prenom: prenomInput.value,
                        nom: nomInput.value,
                        dateNaissance: dateNaissanceInput.value,
                        adresse: adresseInput.value,
                        ville: villeInput.value,
                        photo: photoInput.value
                    };
                }
                return person;
            });
        } else {
            // ajout
            const newPerson = {
                id: Date.now(), 
                prenom: prenomInput.value,
                nom: nomInput.value,
                dateNaissance: dateNaissanceInput.value,
                adresse: adresseInput.value,
                ville: villeInput.value,
                photo: photoInput.value
            };

            people.push(newPerson);
        }

        saveToStorage();
        renderPeople();
        resetForm();
    });


    cardsContainer.addEventListener('click', (event) => {
        const target = event.target; 

        // supprimer
        if (target.classList.contains('delete-btn')) {
            const idToDelete = target.dataset.id;
                if (confirm('Voulez-vous vraiment supprimer cette personne ?')) {
                people = people.filter(person => person.id != idToDelete);
                saveToStorage();
                renderPeople();
            }
        }

        // modifier
        if (target.classList.contains('edit-btn')) {
            const idToEdit = target.dataset.id;
            const personToEdit = people.find(person => person.id == idToEdit);

            editIdInput.value = personToEdit.id;
            prenomInput.value = personToEdit.prenom;
            nomInput.value = personToEdit.nom;
            dateNaissanceInput.value = personToEdit.dateNaissance;
            adresseInput.value = personToEdit.adresse;
            villeInput.value = personToEdit.ville;
            photoInput.value = personToEdit.photo;

            submitBtn.textContent = 'Modifier';
            cancelBtn.classList.remove('hidden');
        }
    });


    // anuller
    cancelBtn.addEventListener('click', () => {
        resetForm();
    });

    renderPeople();
});