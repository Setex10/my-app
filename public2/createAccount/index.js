const form = document.getElementById("loginUser")
const messagesTag = document.getElementById("message")

form.addEventListener("submit", async(event) => {
    event.preventDefault()

    const data = new FormData(form),
    dataEntries = Object.fromEntries(data.entries()),
    host = window.location.origin
    try {
        console.log(`${host}/createAccount`)
        const data = await fetch(`${host}/createAccount`, {
            body: JSON.stringify(dataEntries),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
        const dataJson = await data.json()
        messagesTag.textContent = ""
        messagesTag.textContent = dataJson.message
        dataJson.detalles?.forEach((errors) => {
            messagesTag.textContent += errors + " "
        })
        if(dataJson.status == 201){
            window.location = `${host}/`
        } 
    } catch (error) {
        console.log(error)
    }
})