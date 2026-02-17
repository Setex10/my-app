import addFavoriteGame from "../utils/saveFavorites.js"
const mainContainer = document.getElementsByTagName("main")[0];

const fetchGame = async () => {
    const path = window.location.pathname,
    segments = path.split("/"),
    id = segments.pop() || segments.pop();
    
    try {
        const data = await fetch(`http://localhost:3000/api/idGame/${id}`);
        const dataJson = await data.json();

        const { thumbnail, title, description, genre, platform, publisher, release_date, minimum_system_requirements} = dataJson;

        // Limpiar contenedor
        mainContainer.innerHTML = '';

                // 1. Crear el contenedor principal de la sección
        const heroSection = document.createElement("section");
        heroSection.className = "hero-section";

        // 2. Crear el wrapper del contenido
        const heroContent = document.createElement("div");
        heroContent.className = "hero-content";

        // 3. Imagen del juego
        const img = document.createElement("img");
        img.src = thumbnail;
        img.alt = title;
        img.className = "hero-img";

        // 4. Contenedor de texto
        const heroText = document.createElement("div");
        heroText.className = "hero-text";

        // 5. Badge del género
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = genre;

        // 6. Título principal
        const h1 = document.createElement("h1");
        h1.textContent = title;

        // 7. Info del Publisher y fecha
        const publisherText = document.createElement("p");
        publisherText.className = "publisher";
        publisherText.textContent = `${publisher} • ${release_date}`;

        // 8. Grupo de botones (CTA)
        const ctaGroup = document.createElement("div");
        ctaGroup.className = "cta-group";

        const btnPrimary = document.createElement("button");
        btnPrimary.className = "btn-primary";
        btnPrimary.textContent = "Obtener";

        const btnFavorite = document.createElement("button");
        btnFavorite.className = "btn-favorite";
        btnFavorite.id = "btnSaveFavorite";
        btnFavorite.setAttribute("data-id", id);
        btnFavorite.addEventListener("click", () => {
            addFavoriteGame(id)
        })

        // 9. Crear el Icono SVG para el botón de favoritos
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "18");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");

        // --- Ensamblaje (Append) ---

        svg.appendChild(path);
        btnFavorite.append(svg, " Añadir a favoritos"); // Agrega el SVG y el texto

        ctaGroup.append(btnPrimary, btnFavorite);

        heroText.append(badge, h1, publisherText, ctaGroup);

        heroContent.append(img, heroText);
        heroSection.append(heroContent);

        // Finalmente agregas la sección al contenedor principal
        mainContainer.append(heroSection);

        // Crear Sección de Descripción
        const descSection = document.createElement("section");
        descSection.className = "content-section";
        descSection.innerHTML = `
            <div class="info-grid">
                <div class="description-box">
                    <h3>Acerca de este juego</h3>
                    <p>${description}</p>
                </div>
                <div class="specs-box">
                    <h3>Requisitos del sistema</h3>
                    <ul>
                        <li><strong>OS:</strong> ${minimum_system_requirements?.os || 'N/A'}</li>
                        <li><strong>Procesador:</strong> ${minimum_system_requirements?.processor || 'N/A'}</li>
                        <li><strong>Memoria:</strong> ${minimum_system_requirements?.memory || 'N/A'}</li>
                        <li><strong>Gráficos:</strong> ${minimum_system_requirements?.graphics || 'N/A'}</li>
                        <li><strong>Espacio:</strong> ${minimum_system_requirements?.storage || 'N/A'}</li>
                    </ul>
                    <div class="platform-badge">${platform}</div>
                </div>
            </div>
        `;

        mainContainer.append(heroSection, descSection);

    } catch (error) {
        console.log(error)
        mainContainer.innerHTML = `<p class="error-msg">No se pudo cargar la información del juego.</p>`;
    }
}
fetchGame();
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