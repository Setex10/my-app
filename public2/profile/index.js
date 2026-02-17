const mainContainer = document.getElementById("mainContainer"),
    host = window.location.origin

const deleteFavorite = async(id) => {
    try {
        const data = await fetch(`${host}/deleteFromFavorite`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idGame: id})
        }
        )
        const dataJson = await data.json()
        if(dataJson.status == 200){
            location.reload()
        }
    } catch (error) {
        console.log(error)
    }
}
const fetchProfile = async() => {
    const path = window.location.pathname,
    segments = path.split("/"),
    id = segments.pop() || segments.pop()
    try {
        const data = await fetch(`${host}/api/profile/id/${id}`)
        const dataJson = await data.json()

        if(!dataJson){
            mainContainer.textContent = "User not found"
        }

        const {name, favoriteGamesInfo} = dataJson
        const h2 = document.createElement("h2"),
        divContainerListGamesFavories = document.createElement("div")
        h2.textContent = name

        favoriteGamesInfo.forEach(({title, description, thumbnail, id}) => {
            const divContainerGameTag = document.createElement("div"),
            titleTag = document.createElement("h3"),
            descriptionTag = document.createElement("p"),
            imgTag = document.createElement("img"),
            btnDelelte = document.createElement("button")

            titleTag.textContent = title
            descriptionTag.textContent = description
            imgTag.setAttribute("src",thumbnail)
            btnDelelte.textContent = "eliminar de favoritos"
            btnDelelte.addEventListener("click", () =>{
                deleteFavorite(id)
            })
            divContainerGameTag.append(titleTag, descriptionTag, imgTag, btnDelelte)
            divContainerListGamesFavories.append(divContainerGameTag)
        })
        mainContainer.append(h2)
        mainContainer.append(divContainerListGamesFavories)
    } catch (error) {
        console.log(error)
    }
}

fetchProfile()

// --- Sección de Gestión de Cuenta (Account Settings) ---

const accountSection = document.createElement("section");
accountSection.className = "account-settings-section";

const accountContainer = document.createElement("div");
accountContainer.className = "account-container";

// Título sutil de la sección
const accountTitle = document.createElement("h4");
accountTitle.textContent = "Gestión de cuenta";
accountTitle.className = "account-label";

const buttonsGroup = document.createElement("div");
buttonsGroup.className = "account-buttons";

// Botón Cerrar Sesión (Estilo Secundario)
const btnLogout = document.createElement("button");
btnLogout.className = "btn-secondary";
btnLogout.textContent = "Cerrar sesión";
btnLogout.onclick = async() => {
    console.log("Cerrando sesión...");
    try {
            const data = await fetch(`${host}/logout`)
            const dataJson = await data.json()
            console.log(dataJson)
        } catch (error) {
            console.log(error)
        }
};

// Botón Borrar Cuenta (Estilo Destructivo)
const btnDeleteAccount = document.createElement("button");
btnDeleteAccount.className = "btn-destructive";
btnDeleteAccount.textContent = "Borrar cuenta";
btnDeleteAccount.onclick = async() => {
    const confirmDelete = confirm("¿Estás seguro de que deseas borrar tu cuenta? Esta acción es irreversible.");
    if(confirmDelete) {
        try {
            const data = await fetch(`${host}/delete`, {
            method: "DELETE"
            })
            const dataJson = await data.json()
            console.log(dataJson)
        } catch (error) {
            console.log(error)
        }
    }
};

// Ensamblaje
buttonsGroup.append(btnLogout, btnDeleteAccount);
accountContainer.append(accountTitle, buttonsGroup);
accountSection.append(accountContainer);

// Agregar al mainContainer
mainContainer.append(accountSection);