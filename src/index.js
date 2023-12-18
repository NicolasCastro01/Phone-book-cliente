async function createContact() {
    const contactName = document.getElementById("contact__creation__name");
    const contactAge = document.getElementById("contact__creation__age");
    const contactPhone = document.getElementById("contact__creation__phone");

    const body = {
        contact: {
            name: contactName.value,
            age: Number(contactAge.value)
        },
        phone: {
            number: contactPhone.value
        }
    }

    const response = await fetch('http://localhost:3001/api/contacts', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    });
    const data = await response.json();

    if(data.message) {
        alert(data.message);
        return;
    }

    alert("Contact created!");
    window.location.reload()
}

async function searchContact() {
    const contactInfoContainer = document.getElementById("contact__info");
    const contactInfo = document.getElementById("search__input");

    const response = await fetch(`http://localhost:3001/api/contacts?search=${contactInfo.value}`);
    const data = await response.json();

    if(data.message) {
        alert(data.message);

        return;
    }

    contactInfoContainer.style.display = "block";
    contactInfoContainer.innerHTML = `
        <div class="contact__info" id="contact__info__name">
            <span>Nome: </span>
            <span>${data.contact.name}</span>
        </div>
        <div class="contact__info" id="contact__info__age">
            <span>Idade: </span>
            <span>${data.contact.age}</span>
        </div>
        <div class="contact__info" id="contact__info__phone">
            <span>Telefone: </span>
            <span>${data.contact.phone}</span>
        </div>
        <button class="contact__info__actions" id="contact__edit__btn" onclick="editContact('${data.contact.name}')">Editar</button>
        <button class="contact__info__actions" id="contact__delete__btn" onclick="deleteContact('${data.contact.id}')">Excluir</button>
    `;
}

async function deleteContact(contactId) {
    await fetch(`http://localhost:3001/api/contacts/${contactId}`,{
        method: "DELETE"
    });

    alert('Contact deleted.');
    window.location.reload();
}

async function editContact(contact) {
    const editContainer = document.getElementById("contact__edit__container");
    const saveEditBtn = document.getElementById("contact__edit__save__btn");

    const contactName = document.getElementById("contact__edit__name");
    const contactAge = document.getElementById("contact__edit__age");
    const contactPhone = document.getElementById("contact__edit__phone");

    const response = await fetch(`http://localhost:3001/api/contacts?search=${contact}`);
    const data = await response.json();

    editContainer.style.display = "block";
    contactName.value = data.contact.name;
    contactAge.value = data.contact.age;
    contactPhone.value = data.contact.phone;

    saveEditBtn.addEventListener('click', () => saveEditContact(data.contact.id));
}

async function saveEditContact(contactId) {
    const contactName = document.getElementById("contact__edit__name");
    const contactAge = document.getElementById("contact__edit__age");
    const contactPhone = document.getElementById("contact__edit__phone");

    const body = {
        contact: {
            name: contactName.value,
            age: Number(contactAge.value)
        },
        phone: {
            number: contactPhone.value
        }
    }

    const response = await fetch(`http://localhost:3001/api/contacts/${contactId}`,{
        headers: {
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(body)
    });
    const data = await response.json();

    if(data.message) {
        alert(data.message);

        return;
    }

    alert('Contact edited.');
    window.location.reload();
}

function showCreation() {
    const searchContainer = document.getElementById("contact__search__container");
    const newContactContainer = document.getElementById("contact__creation__container");
    
    searchContainer.style.display = "none";
    newContactContainer.style.display = "flex";
}