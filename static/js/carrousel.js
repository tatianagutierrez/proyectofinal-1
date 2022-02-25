const fila = document.querySelector(".contenedor-carousel");
const carousel = document.querySelector(".carousel");
const peliculas = document.querySelectorAll(".pelicula");

const flechaIzquierda = document.getElementById("flecha-izquierda");
const flechaDerecha = document.getElementById("flecha-derecha");

function agregarPeliculas() {
  fetch("/static/json/peliculas.json")
    .then((respuesta) => respuesta.json()) // indicar el formato que queremos que se obtenga la informacion
    .then((peliculas) => {
      peliculas.forEach((pelicula) => {
        const pelis = document.createElement("div");
        pelis.innerHTML += `
        <a href="#">
        <br>
        <p class="pelicula-titulo"> ${pelicula.title} </p> <img src="${pelicula.poster}" class="image">
        </a>
`;
        carousel.appendChild(pelis);
      });
    })
    .catch((error) => console.log("Hubo un error : " + error.message));
}

agregarPeliculas();

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener("click", () => {
  fila.scrollLeft += fila.offsetWidth;

  const indicadorActivo = document.querySelector(".indicadores .activo");
  if (indicadorActivo.nextSibling) {
    indicadorActivo.nextSibling.classList.add("activo");
    indicadorActivo.classList.remove("activo");
  }
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener("click", () => {
  fila.scrollLeft -= fila.offsetWidth;

  const indicadorActivo = document.querySelector(".indicadores .activo");
  if (indicadorActivo.previousSibling) {
    indicadorActivo.previousSibling.classList.add("activo");
    indicadorActivo.classList.remove("activo");
  }
});
