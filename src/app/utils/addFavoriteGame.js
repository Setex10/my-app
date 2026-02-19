const addFavoriteGame = async(id) => {
    const host = window.location.origin
    try {
        const data = await fetch(`${host}/addFavoriteGame`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idGame: id})
        })
        const dataJson = await data.json()
        alert("Se guardo correctamente, revisa tu perfil")
        console.log(dataJson)
    } catch (error) {
        alert("Hubo un error")   
    }
}

export default addFavoriteGame