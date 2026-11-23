# PROYECTO FINAL - FRONTEND JS - NICOLÁS BIANCHI LOMBARDO
"Página web del Universo de los Seres"


## CONSIGNA DEL PROYECTO FINAL:

Desarrollarás una página web completa, que combine todos los conocimientos adquiridos a lo largo del curso. El proyecto consistirá en la creación de un sitio web de e-commerce dinámico e interactivo, que consuma datos de una API REST para mostrar productos, y permita a los usuarios añadir productos a un carrito de compras.

Pasos a seguir:

HTML: Uso de etiquetas semánticas para organizar la página.

CSS: Implementación de un diseño responsivo y atractivo usando Bootstrap y Flexbox.

JavaScript: Integración de una API REST para obtener datos y renderizar productos en el DOM, además de la funcionalidad de un carrito de compras usando localStorage.

Accesibilidad y SEO: Implementar prácticas que mejoren la experiencia del usuario y optimicen la página para los motores de búsqueda.


## DESCRIPCIÓN: 

Este es un sitio web de e-commerce dedicado al "Universo de los Seres", un proyecto literario de mi autoría. Presenta las obras publicadas, una tienda online con productos obtenidos desde una API REST, un carrito de compras dinámico y un formulario de contacto.

El objetivo es aplicar lo aprendido en el curso: HTML semántico, CSS responsivo, JavaScript, consumo de APIs, almacenamiento local (LocalStorage), accesibilidad web y SEO básico.


## FUNCIONALIDADES:

- Personalización de la visita: el usuario puede ingresar su nombre y elegir un color de fondo (se guarda en LocalStorage)
- Catálogo de obras literarias con imagen, título, descripción y precio.
- Tienda online: productos obtenidos desde https://fakestoreapi.com/ y mostrados en tarjetas.
- Carrito de compras:
  - Agregar productos desde las tarjetas.
  - Contador en la barra de navegación.
  - Página propia para ver el carrito, con cantidad, precio y subtotal.
  - Editar cantidades (+ / −), eliminar productos y vaciar el carrito.
  - Precio total (dinámico).
- Formulario de contacto con validación en JavaScript (campos requeridos y formato de correo) y envío mediante Formspree (https://formspree.io/).
- Multimedia: video de presentación y mapa de Google Maps (iframe).


## TECNOLOGÍAS UTILIZADAS:

- HTML5 semántico (header, nav, main, section, article, footer)
- CSS: Flexbox, Grid y media queries para el diseño responsivo
- JavaScript: manipulación del DOM, validación de formularios, fetch y localStorage
- Google Fonts y Font Awesome
- Formspree y FakeStore API
- GitHub Pages para el hosting


## ESTRUCTURA DEL PROYECTO:

Tomo como punto de partida lo trabajado en la Clase 14 para elaborar lo que falta para el trabajo final.

El proyecto está dividido en las siguientes carpetas:

- CSS: archivo css para los estilos de la página
- IMG: carpeta donde guardo las distintas imágenes utilizadas en la página (banner, productos, fondo, etc.)
- JAVASCRIPT: carpeta donde guardo el archivo con las funciones de JS utilizadas en la página
- PAGES: aquí se encuentran las páginas principales del proyecto: productos, contacto y carrito
- VIDEO: aquí almaceno el video utilizado en la página index como presentación
- Archivo index.html: la página principal del proyecto


## CÓMO EJECUTAR/VER EL PROYECTO:

Opción 1: ingresar al link del hosting (GitHub Pages): https://nicobl90-git.github.io/proyecto_final_frontendjs_nicolas_bianchi_lombardo/

Opción 2: descargar el repositorio y abrir index.html en una nueva pestaña del navegador
