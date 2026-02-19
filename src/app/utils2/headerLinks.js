const homeLink = document.getElementById("homeLink"),
    profileLink = document.getElementById("profileLink");

const fetchId = async() => {
    try {
        const data = await fetch(`${window.location.origin}/api/profile/id`)
        const {id} = await data.json()
        return id
    } catch (error) {
        return ""
    }
}
const setLinks = async() => {
    const id = await fetchId()
    homeLink.setAttribute("href", `${window.location.origin}/`)
    profileLink.setAttribute("href", `${window.location.origin}/profile/${id}`)
}

setLinks()