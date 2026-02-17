import addFavoriteGame from "./utils/saveFavorites.js"
const mainContainer = document.getElementsByClassName("mainContainer"),
    host = window.location.origin

const fetchGames = async() => {
    const data = await fetch(`${host}/api/allGames`, {
        method: "GET"
    })
    const dataJson = await data.json()
    dataJson.forEach(element => {
        const p = document.createElement("p"),
        img = document.createElement("img"),
        div = document.createElement("div"),
        btnSaveFavorite = document.createElement("button"),
        a = document.createElement("a")

        p.textContent = element.title
        img.src = element.thumbnail
        btnSaveFavorite.textContent = "Guardar"
        btnSaveFavorite.setAttribute("idGame", element.id)
        btnSaveFavorite.addEventListener("click", () => {
            addFavoriteGame(element.id)
        })
        a.setAttribute("href",  `${host}/game/${element.id}`)
        a.textContent = "Ver"
        div.append(img)
        div.append(p)
        div.append(btnSaveFavorite)
        div.append(a)

        div.className = "gameContainer"
        btnSaveFavorite.className = "saveFavoriteBtn"

        mainContainer[0].append(div)
    });
}
fetchGames()