'use client'
import { useEffect, useState } from "react";
import addFavoriteGame from "../utils/addFavoriteGame";
import "../general.css";
import "./profile.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const host = window.location.origin;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${host}/api/allGames`, {
          method: "GET",
        });

        const dataJson = await response.json();
        setGames(dataJson);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [host]);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/" id="homeLink">Inicio</a>
            </li>
            <li>
              <a href="#" id="profileLink">Perfil</a>
            </li>
          </ul>

          <form method="get" className="formSearch" id="formSearch">
            <input
              type="text"
              name="gameName"
              placeholder="Nombre de un juego"
            />
            <button type="submit">Buscar</button>
          </form>

          <div id="containerResults"></div>
        </nav>
      </header>

      <main className="mainContainer">
        {games.map((element) => (
          <div key={element.id} className="gameContainer">
            <img src={element.thumbnail} alt={element.title} />
            <p>{element.title}</p>

            <button
              className="saveFavoriteBtn"
              onClick={() => addFavoriteGame(element.id)}
            >
              Guardar
            </button>

            <a href={`${host}/game/${element.id}`}>Ver</a>
          </div>
        ))}
      </main>
    </>
  );
}
