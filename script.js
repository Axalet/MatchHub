const comentarios = [
    {
        usuario: "PixelHunter",
        tiempo: "Hace unos segundos",
        mensaje: "Cyberpunk 2077 ya sí parece juego terminado y está buenísimo."
    },
    {
        usuario: "DarkPlayer",
        tiempo: "Hace unos segundos",
        mensaje: "Sekiro sigue teniendo el mejor combate de cualquier souls."
    },
    {
        usuario: "LunaGamer",
        tiempo: "Hace unos segundos",
        mensaje: "Minecraft con shaders de noche se ve hermoso."
    },
    {
        usuario: "NeoFPS",
        tiempo: "Hace unos segundos",
        mensaje: "DOOM Eternal literalmente te hace sentir invencible."
    }
];

const contenedor = document.getElementById("cardsComunidad");
const formulario = document.getElementById("comentarioForm");
const usuarioInput = document.getElementById("usuarioComentario");
const comentarioInput = document.getElementById("textoComentario");

function obtenerIniciales(nombre) {
    const texto = nombre.trim();
    if (texto.length === 0) return "MH";

    const partes = texto.split(/\s+/);

    if (partes.length > 1) {
        return (partes[0][0] + partes[1][0]).toUpperCase();
    }

    return texto.slice(0, 2).toUpperCase();
}

function crearCardComentario(comentario) {
    const nuevaCard = document.createElement("div");
    nuevaCard.classList.add("card", "comunidad-card", "nueva-card");

    nuevaCard.innerHTML = `
        <div class="avatar avatar-iniciales">${obtenerIniciales(comentario.usuario)}</div>
        <h3><a href="hub.html">${comentario.usuario}</a></h3>
        <span class="post-time">${comentario.tiempo}</span>
        <p>${comentario.mensaje}</p>
    `;

    return nuevaCard;
}

function agregarComentarioRandom() {
    if (!contenedor) return;

    const random = comentarios[Math.floor(Math.random() * comentarios.length)];
    const nuevaCard = crearCardComentario(random);

    contenedor.prepend(nuevaCard);

    if (contenedor.children.length > 6) {
        contenedor.removeChild(contenedor.lastElementChild);
    }
}

if (contenedor) {
    setInterval(agregarComentarioRandom, 7000);
}

if (formulario && contenedor && usuarioInput && comentarioInput) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = usuarioInput.value.trim();
        const mensaje = comentarioInput.value.trim();

        if (usuario === "" || mensaje === "") {
            alert("Escribe tu usuario y tu comentario antes de publicar.");
            return;
        }

        const comentarioUsuario = {
            usuario: usuario,
            tiempo: "Ahora mismo",
            mensaje: mensaje
        };

        contenedor.prepend(crearCardComentario(comentarioUsuario));
        formulario.reset();
    });
}

const advisorCards = Array.from(document.querySelectorAll(".advisor-3d-card"));
const advisorPrev = document.getElementById("advisorPrev");
const advisorNext = document.getElementById("advisorNext");
let advisorActivo = 0;
let advisorTimer;

function distanciaCircular(index, activo, total) {
    let distancia = index - activo;

    if (distancia > total / 2) distancia -= total;
    if (distancia < -total / 2) distancia += total;

    return distancia;
}

function actualizarAdvisorCarousel() {
    if (!advisorCards.length) return;

    const total = advisorCards.length;

    advisorCards.forEach((card, index) => {
        card.classList.remove("is-active", "is-left", "is-right", "is-far-left", "is-far-right");

        const distancia = distanciaCircular(index, advisorActivo, total);

        if (distancia === 0) card.classList.add("is-active");
        if (distancia === -1) card.classList.add("is-left");
        if (distancia === 1) card.classList.add("is-right");
        if (distancia === -2) card.classList.add("is-far-left");
        if (distancia === 2) card.classList.add("is-far-right");
    });
}

function moverAdvisor(direccion) {
    if (!advisorCards.length) return;

    advisorActivo = (advisorActivo + direccion + advisorCards.length) % advisorCards.length;
    actualizarAdvisorCarousel();
}

function reiniciarAdvisorAutoplay() {
    clearInterval(advisorTimer);
    advisorTimer = setInterval(() => moverAdvisor(1), 5000);
}

function abrirAdvisorModal(card) {
    if (!card || typeof bootstrap === "undefined") return;

    const modalElement = document.getElementById("advisorModal");
    const titulo = document.getElementById("advisorModalTitle");
    const rol = document.getElementById("advisorModalRole");
    const desc = document.getElementById("advisorModalDesc");
    const rating = document.getElementById("advisorModalRating");
    const precio = document.getElementById("advisorModalPrice");

    if (!modalElement || !titulo || !rol || !desc || !rating || !precio) return;

    titulo.textContent = card.dataset.nombre;
    rol.textContent = card.dataset.rol;
    desc.textContent = card.dataset.descripcion;
    rating.textContent = card.dataset.rating;
    precio.textContent = card.dataset.precio;

    new bootstrap.Modal(modalElement).show();
}

if (advisorCards.length) {
    actualizarAdvisorCarousel();
    reiniciarAdvisorAutoplay();

    if (advisorPrev) advisorPrev.addEventListener("click", () => {
        moverAdvisor(-1);
        reiniciarAdvisorAutoplay();
    });

    if (advisorNext) advisorNext.addEventListener("click", () => {
        moverAdvisor(1);
        reiniciarAdvisorAutoplay();
    });

    advisorCards.forEach((card, index) => {
        card.addEventListener("click", (event) => {
            if (!card.classList.contains("is-active")) {
                advisorActivo = index;
                actualizarAdvisorCarousel();
                reiniciarAdvisorAutoplay();
                return;
            }

            if (event.target.closest(".advisor-info-btn") || event.currentTarget === card) {
                abrirAdvisorModal(card);
            }
        });
    });
}

const loginForm = document.getElementById("loginForm");
const pagoForm = document.getElementById("pagoForm");
const estadoSesion = document.getElementById("estadoSesion");
const loginUsuario = document.getElementById("loginUsuario");
const loginCorreo = document.getElementById("loginCorreo");
const rifaResultado = document.getElementById("rifaResultado");
const rifaResultadoTexto = document.getElementById("rifaResultadoTexto");
const listaParticipantes = document.getElementById("listaParticipantes");
const participantesTitulo = document.getElementById("participantesTitulo");
const participantesCountAaa = document.getElementById("participantesCountAaa");
const participantesCountRandom = document.getElementById("participantesCountRandom");
const rifaModal = document.getElementById("rifaModal");
const rifaModalTitulo = document.getElementById("rifaModalTitulo");
const rifaModalTexto = document.getElementById("rifaModalTexto");
const rifaSeleccionTexto = document.getElementById("rifaSeleccionTexto");
const pagarRifaBtn = document.getElementById("pagarRifaBtn");
const rifaOpciones = Array.from(document.querySelectorAll(".rifa-opcion"));
const botonesRifa = Array.from(document.querySelectorAll(".seleccionar-rifa"));

let rifaActiva = "aaa";

const estaEnPaginaRifa = document.getElementById("rifa") !== null;

if (estaEnPaginaRifa) {
    localStorage.removeItem("matchhub_usuario");
    localStorage.removeItem("matchhub_correo");
    localStorage.removeItem("matchhub_rifa_aaa_pagada");
    localStorage.removeItem("matchhub_rifa_random_pagada");
}

const rifas = {
    aaa: {
        nombre: "Rifa AAA",
        premio: "Juego AAA digital",
        precio: 50,
        participantes: ["Gacofan3", "Lauta349", "Inosita2.0", "ManGamer"]
    },
    random: {
        nombre: "Rifa random",
        premio: "Juego random digital",
        precio: 10,
        participantes: ["PixelHunter", "DarkPlayer", "LunaGamer", "NeoFPS"]
    }
};

function abrirModalRifa(titulo, texto) {
    if (!rifaModal || !rifaModalTitulo || !rifaModalTexto || typeof bootstrap === "undefined") {
        alert(`${titulo}\n${texto}`);
        return;
    }

    rifaModalTitulo.textContent = titulo;
    rifaModalTexto.textContent = texto;

    const modal = new bootstrap.Modal(rifaModal);
    modal.show();
}

function actualizarParticipantes() {
    if (!listaParticipantes) return;

    const datos = rifas[rifaActiva];

    listaParticipantes.innerHTML = "";

    datos.participantes.forEach((participante) => {
        const item = document.createElement("li");
        item.textContent = participante;
        listaParticipantes.appendChild(item);
    });

    if (participantesTitulo) participantesTitulo.textContent = datos.nombre;
    if (participantesCountAaa) participantesCountAaa.textContent = rifas.aaa.participantes.length;
    if (participantesCountRandom) participantesCountRandom.textContent = rifas.random.participantes.length;
}

function actualizarRifaSeleccionada() {
    const datos = rifas[rifaActiva];

    rifaOpciones.forEach((opcion) => {
        opcion.classList.toggle("is-selected", opcion.dataset.rifa === rifaActiva);
    });

    if (rifaSeleccionTexto) {
        rifaSeleccionTexto.textContent = `Rifa seleccionada: ${datos.premio} — $${datos.precio} MXN`;
    }

    if (pagarRifaBtn) {
        pagarRifaBtn.textContent = `PAGAR $${datos.precio} Y PARTICIPAR`;
    }

    if (rifaResultado && rifaResultadoTexto) {
        const usuario = localStorage.getItem("matchhub_usuario");
        const pagada = localStorage.getItem(`matchhub_rifa_${rifaActiva}_pagada`) === "true";

        if (usuario && pagada) {
            rifaResultado.classList.remove("oculto");
            if (pagoForm) pagoForm.classList.add("oculto");
            rifaResultadoTexto.textContent = `Tu entrada para ${datos.premio} fue registrada correctamente.`;
        } else if (usuario) {
            rifaResultado.classList.add("oculto");
            if (pagoForm) pagoForm.classList.remove("oculto");
        }
    }

    actualizarParticipantes();
}

function cargarSesionRifa() {
    if (!loginForm || !pagoForm || !estadoSesion) return;

    const usuarioGuardado = localStorage.getItem("matchhub_usuario");

    Object.keys(rifas).forEach((key) => {
        const pagada = localStorage.getItem(`matchhub_rifa_${key}_pagada`) === "true";

        if (usuarioGuardado && pagada && !rifas[key].participantes.includes(usuarioGuardado)) {
            rifas[key].participantes.push(usuarioGuardado);
        }
    });

    if (usuarioGuardado) {
        estadoSesion.textContent = `Sesión iniciada como ${usuarioGuardado}.`;
        loginForm.classList.add("oculto");
        pagoForm.classList.remove("oculto");
    }

    actualizarRifaSeleccionada();
}

botonesRifa.forEach((boton) => {
    boton.addEventListener("click", () => {
        rifaActiva = boton.dataset.rifa;
        actualizarRifaSeleccionada();
    });
});

if (loginForm && loginUsuario && loginCorreo) {
    cargarSesionRifa();

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = loginUsuario.value.trim();
        const correo = loginCorreo.value.trim();

        if (usuario === "" || correo === "") {
            abrirModalRifa("Datos incompletos", "Escribe tu usuario y tu correo para iniciar sesión.");
            return;
        }

        localStorage.setItem("matchhub_usuario", usuario);
        localStorage.setItem("matchhub_correo", correo);
        estadoSesion.textContent = `Sesión iniciada como ${usuario}.`;
        loginForm.classList.add("oculto");
        pagoForm.classList.remove("oculto");
        abrirModalRifa("Sesión iniciada", "Ahora puedes elegir una rifa y pagar tu entrada simbólica.");
    });
}

if (pagoForm) {
    pagoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = localStorage.getItem("matchhub_usuario");
        const datos = rifas[rifaActiva];

        if (!usuario) {
            abrirModalRifa("Inicia sesión", "Debes iniciar sesión antes de pagar la entrada.");
            return;
        }

        localStorage.setItem(`matchhub_rifa_${rifaActiva}_pagada`, "true");

        if (!datos.participantes.includes(usuario)) {
            datos.participantes.push(usuario);
        }

        pagoForm.classList.add("oculto");
        rifaResultado.classList.remove("oculto");
        rifaResultadoTexto.textContent = `Tu entrada para ${datos.premio} fue registrada correctamente.`;
        actualizarParticipantes();
        abrirModalRifa("Entrada registrada", `Tu pago de $${datos.precio} MXN fue registrado. Ya estás participando por ${datos.premio}.`);
    });
}
