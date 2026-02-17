const formSearch = document.getElementById("formSearch"),
header = document.getElementsByTagName("header")[0],
containerResults = document.getElementById("containerResults")

formSearch.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(formSearch),
    {gameName} = Object.fromEntries(formData.entries())
    try {
        const data = await fetch(`http://localhost:3000/api/gameName/${gameName}`, {
            method: "GET"
        })
        containerResults.innerHTML = ""
        header.appendChild(containerResults)
        const dataJson = await data.json()
        dataJson.forEach(({title, id}) => {
            const div = document.createElement("div"),
            a = document.createElement("a");
            a.textContent = title
            a.href = window.location.origin + `/game/${id}`
            div.append(a)
            containerResults.append(div)

        })
    } catch (error) {
        console.log(error)
    }
})

document.body.addEventListener("click", () => {
    containerResults.innerHTML = ""
})