const form = document.getElementById("loginUser"),
    messageTag = document.getElementById("message")

form.addEventListener("submit", async(event) => {
    event.preventDefault()

    const data = new FormData(form),
    dataEntries = Object.fromEntries(data.entries()),
    host = window.location.origin
    try {
        const data = await fetch(`${host}/login`, {
            body: JSON.stringify(dataEntries),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
        const dataJson = await data.json()
        messageTag.textContent = ""
        messageTag.textContent = dataJson.message
        if(dataJson.status == 201){
            window.location = `${host}/`
        } 
    } catch (error) {
        console.log(error)
    }
})