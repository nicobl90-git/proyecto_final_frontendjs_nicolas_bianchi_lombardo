// ===========================
// ===== PERSONALIZACION =====
// ===========================

const form = document.getElementById("form-preferencias");
const inputNombre = document.getElementById("nombre");
const selectColor = document.getElementById("color");
const saludo = document.getElementById("saludo");
const btnReset = document.getElementById("btn-reset");

function aplicarPreferencias(nombre, color) {
    if (saludo) {
        saludo.textContent = "¡Hola, " + nombre + "!";
    }
    document.body.style.backgroundColor = color;
}

// Al cargar la página: ¿hay algo guardado?
const nombreGuardado = localStorage.getItem("nombre");
const colorGuardado = localStorage.getItem("color");

if (nombreGuardado && colorGuardado) {
    aplicarPreferencias(nombreGuardado, colorGuardado);
}

// Al enviar el formulario: capturar y guardar
if (form) {
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = inputNombre.value;
        const color = selectColor.value;

        localStorage.setItem("nombre", nombre);
        localStorage.setItem("color", color);

        aplicarPreferencias(nombre, color);
    });
}

function restablecerPreferencias() {
    // 1) Borrar lo guardado
    localStorage.removeItem("nombre");
    localStorage.removeItem("color");

    // 2) Deshacer lo visible
    if (saludo) {
        saludo.textContent = "";
    }
    document.body.style.backgroundColor = ""; // vuelve al color del CSS

    // 3) Vaciar el formulario
    if (form) {
        form.reset();
    }
}

if (btnReset) {
    btnReset.addEventListener("click", restablecerPreferencias);
}

// ===========================
// ===== PRODUCTOS (API) =====
// ===========================

const contenedorApi = document.getElementById("productos-container");

if (contenedorApi) {
    fetch("https://fakestoreapi.com/products")
    .then(respuesta => respuesta.json())
    .then(productos => {
        productos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" width="150" class="tarjeta-img">
            <h3 class="tarjeta-nombre">${producto.title}</h3>
            <p class="tarjeta-precio">$${producto.price}</p>
            <button class="tarjeta-boton">
                <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i> Añadir al carrito
            </button>
        `;

        tarjeta.querySelector("button")
            .addEventListener("click", () => agregarAlCarrito(producto));

        contenedorApi.appendChild(tarjeta);
        });
    })
    .catch(error => {
        contenedorApi.innerHTML = "<p>No pudimos cargar los productos. Intentá de nuevo más tarde.</p>";
        console.error("Error:", error);
    });
}

// ===========================================
// ---------- FUNCIONES DEL CARRITO ----------
// ===========================================

const contadorCarrito = document.getElementById("contador-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

// "$28.000" -> 28000 (si ya es número, lo deja igual)
function precioANumero(precio) {
    if (typeof precio === "number") return precio;
    return Number(String(precio).replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

// Lee el carrito guardado y lo normaliza:
// agrupa repetidos, convierte precios y agrega cantidad si falta.
// Así también funcionan los productos que ya tenías guardados.
function obtenerCarrito() {
    let guardado;
    try {
        guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
        guardado = [];
    }

    const carrito = [];
    guardado.forEach(item => {
        const id = String(item.id ?? item.title);
        const cantidad = item.cantidad || 1;
        const existente = carrito.find(p => p.id === id);

        if (existente) {
            existente.cantidad += cantidad;
        } else {
            carrito.push({
                id,
                title: item.title,
                price: precioANumero(item.price),
                image: item.image || "",
                cantidad
            });
        }
    });
    return carrito;
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    renderCarrito();
}

// Total de unidades (no de líneas)
function actualizarContador() {
    if (contadorCarrito) {
        contadorCarrito.textContent = obtenerCarrito().reduce((total, p) => total + p.cantidad, 0);
    }
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const id = String(producto.id ?? producto.title);
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            id,
            title: producto.title,
            price: precioANumero(producto.price),
            image: producto.image || "",
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    alert(`"${producto.title}" se agregó al carrito`);
}

// Dibuja la lista en carrito.html (en otras páginas no hace nada)
function renderCarrito() {
    if (!listaCarrito || !totalCarrito) return;

    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
        totalCarrito.textContent = "0";
        return;
    }

    carrito.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${p.image ? `<img src="${p.image}" alt="${p.title}" width="50">` : ""}
            <span>${p.title}</span>
            <span>$${p.price.toLocaleString("es-AR")}</span>
            <button type="button" data-accion="restar" data-id="${p.id}" aria-label="Restar una unidad de ${p.title}">−</button>
            <span>${p.cantidad}</span>
            <button type="button" data-accion="sumar" data-id="${p.id}" aria-label="Sumar una unidad de ${p.title}">+</button>
            <span>Subtotal: $${(p.price * p.cantidad).toLocaleString("es-AR")}</span>
            <button type="button" data-accion="eliminar" data-id="${p.id}" aria-label="Eliminar ${p.title} del carrito">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((suma, p) => suma + p.price * p.cantidad, 0);
    totalCarrito.textContent = total.toLocaleString("es-AR");
}

// Botones +, − y Eliminar de la lista
if (listaCarrito) {
    listaCarrito.addEventListener("click", e => {
        const boton = e.target.closest("[data-accion]");
        if (!boton) return;

        const carrito = obtenerCarrito();
        const item = carrito.find(p => p.id === boton.dataset.id);
        if (!item) return;

        if (boton.dataset.accion === "sumar") item.cantidad++;
        if (boton.dataset.accion === "restar") item.cantidad--;
        if (boton.dataset.accion === "eliminar") item.cantidad = 0;

        guardarCarrito(carrito.filter(p => p.cantidad > 0));
    });
}

if (botonVaciar) {
    botonVaciar.addEventListener("click", () => guardarCarrito([]));
}

// ---------- BOTONES DE TUS LIBROS (hechos a mano en el HTML) ----------

const botonesLibros = document.querySelectorAll("#contenedor-productos .tarjeta-boton");

botonesLibros.forEach(boton => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.closest(".tarjeta");
        const libro = {
            title: tarjeta.querySelector(".tarjeta-nombre").textContent,
            price: tarjeta.querySelector(".tarjeta-precio").textContent,
            image: tarjeta.querySelector("img")?.getAttribute("src") || ""
        };
        agregarAlCarrito(libro);
    });
});

// Al cargar cada página
actualizarContador();
renderCarrito();

// ===============================
// ===== VALIDACIÓN CONTACTO =====
// ===============================

const formContacto = document.getElementById("form-contacto");

if (formContacto) {
    formContacto.addEventListener("submit", (evento) => {
        const nombre = document.getElementById("nombre-contacto");
        const email = document.getElementById("email-contacto");
        const mensaje = document.getElementById("mensaje-contacto");

        const errorNombre = document.getElementById("error-nombre");
        const errorEmail = document.getElementById("error-email");
        const errorMensaje = document.getElementById("error-mensaje");

        // Limpiar errores anteriores
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorMensaje.textContent = "";

        let hayErrores = false;

        if (nombre.value.trim() === "") {
            errorNombre.textContent = "Ingresá tu nombre.";
            hayErrores = true;
        }

        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            errorEmail.textContent = "Ingresá tu correo electrónico.";
            hayErrores = true;
        } else if (!formatoEmail.test(email.value.trim())) {
            errorEmail.textContent = "El correo no tiene un formato válido (ej: nombre@dominio.com).";
            hayErrores = true;
        }

        if (mensaje.value.trim().length < 10) {
            errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
            hayErrores = true;
        }

        // Si hay errores, no se envía a Formspree
        if (hayErrores) {
            evento.preventDefault();
        }
    });
}