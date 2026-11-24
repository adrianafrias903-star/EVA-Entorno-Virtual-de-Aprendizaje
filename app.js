// ==========================================
// EVA - ENTORNO VIRTUAL DE APRENDIZAJE
// ==========================================

let usuario = "";
let progreso = JSON.parse(localStorage.getItem("eva_progreso")) || {};

// INICIAR SESIÓN
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (nombre !== "" && password !== "") {
            usuario = nombre;
            localStorage.setItem("eva_usuario", nombre);

            document.getElementById("login-screen").classList.add("hidden");
            document.getElementById("app").classList.remove("hidden");

            const userName = document.getElementById("user-name");
            if (userName) userName.textContent = usuario;

            mostrarInicio();
        }
    });
}

// CERRAR SESIÓN
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("eva_usuario");
        location.reload();
    });
}

// NAVEGACIÓN
document.querySelectorAll(".nav-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const pagina = button.dataset.page;

        if (pagina === "home") mostrarInicio();
        if (pagina === "subjects") mostrarMaterias();
        if (pagina === "progress") mostrarProgreso();
        if (pagina === "diplomas") mostrarDiplomas();
    });
});

// INICIO
function mostrarInicio() {
    const main = document.getElementById("main-content");

    main.innerHTML = `
        <section class="welcome-banner">
            <h1>¡Bienvenido a EVA! 🎓</h1>
            <p>Tu espacio para aprender, crecer y alcanzar tus metas.</p>
        </section>

        <section class="stats-grid">
            <div class="card">
                <h3>📚 Materias</h3>
                <p>15 asignaturas disponibles</p>
            </div>

            <div class="card">
                <h3>📖 Módulos</h3>
                <p>5 módulos por materia</p>
            </div>

            <div class="card">
                <h3>🏆 Certificados</h3>
                <p>Aprende y obtén tus logros</p>
            </div>
        </section>

        <section class="card">
            <h2>¿Qué deseas aprender hoy?</h2>
            <p>Selecciona la sección de materias para comenzar tu aprendizaje.</p>
            <button onclick="mostrarMaterias()">Explorar materias</button>
        </section>
    `;
}

// MOSTRAR MATERIAS
function mostrarMaterias() {
    const main = document.getElementById("main-content");

    if (typeof materias === "undefined") {
        main.innerHTML = `
            <h1>Materias</h1>
            <p>No se encontraron los datos de las materias.</p>
        `;
        return;
    }

    main.innerHTML = `
        <h1>📚 Mis materias</h1>
        <div class="subjects-grid">
            ${materias.map(function(materia) {
                return `
                    <div class="subject-card">
                        <h2>${materia.icono || materia.icon || "📘"} ${materia.nombre}</h2>
                        <p>${materia.descripcion || "Aprende nuevos conocimientos."}</p>
                        <button onclick="mostrarModulos('${materia.id}')">
                            Ver módulos
                        </button>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// MOSTRAR MÓDULOS
function mostrarModulos(idMateria) {
    const materia = materias.find(function(m) {
        return String(m.id) === String(idMateria);
    });

    if (!materia) return;

    const main = document.getElementById("main-content");

    main.innerHTML = `
        <button onclick="mostrarMaterias()">⬅ Volver a materias</button>
        <h1>${materia.nombre}</h1>

        <div class="modules-grid">
            ${(materia.modulos || materia.modules || []).map(function(modulo, index) {
                const nombreModulo = typeof modulo === "string"
                    ? modulo
                    : modulo.nombre || modulo.titulo || modulo.title || "Módulo " + (index + 1);

                return `
                    <div class="module-card">
                        <h3>📖 Módulo ${index + 1}</h3>
                        <p>${nombreModulo}</p>
                        <button onclick="abrirModulo('${idMateria}', ${index})">
                            Estudiar
                        </button>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// ABRIR MÓDULO

function abrirModulo(idMateria, numeroModulo) {
    const materia = materias.find(function(m) {
        return String(m.id) === String(idMateria);
    });

    if (!materia) return;

    const modulo = (materia.modulos || materia.modules)[numeroModulo];

    const tituloModulo = typeof modulo === "string"
        ? modulo
        : modulo.nombre || modulo.titulo || modulo.title;

    const esIntroduccion = String(idMateria) === "1" &&
                           Number(numeroModulo) === 0;

    const contenido = esIntroduccion ? `
        <h2>📚 ¿Qué es la programación?</h2>
        <p>
            La programación consiste en crear instrucciones
            que una computadora puede ejecutar para realizar
            tareas y resolver problemas.
        </p>

        <h3>Conceptos importantes</h3>
        <ul>
            <li><b>Programa:</b> conjunto de instrucciones.</li>
            <li><b>Algoritmo:</b> pasos ordenados para resolver un problema.</li>
            <li><b>Código:</b> instrucciones escritas en un lenguaje de programación.</li>
        </ul>

        <div class="card">
            <h3>💡 Ejemplo práctico</h3>
            <p>Algoritmo para encender una computadora:</p>
            <ol>
                <li>Conectar la computadora.</li>
                <li>Presionar el botón de encendido.</li>
                <li>Esperar que inicie el sistema.</li>
            </ol>
        </div>

        <h2>📝 Actividad 1: Opción múltiple</h2>

        <div class="card eva-pregunta">
            <p><b>1. ¿Qué es la programación?</b></p>
            <button class="eva-opcion" data-correct="false">Un componente físico</button>
            <button class="eva-opcion" data-correct="true">Crear instrucciones para una computadora</button>
            <button class="eva-opcion" data-correct="false">Una red social</button>
            <p class="eva-feedback"></p>
        </div>

        <div class="card eva-pregunta">
            <p><b>2. ¿Qué es un algoritmo?</b></p>
            <button class="eva-opcion" data-correct="false">Un virus informático</button>
            <button class="eva-opcion" data-correct="true">Una serie ordenada de pasos</button>
            <button class="eva-opcion" data-correct="false">Una computadora</button>
            <p class="eva-feedback"></p>
        </div>

        <h2>✅ Actividad 2: Verdadero o falso</h2>

        <div class="card eva-pregunta">
            <p><b>3. Un programa contiene instrucciones que puede ejecutar una computadora.</b></p>
            <button class="eva-opcion" data-correct="true">Verdadero</button>
            <button class="eva-opcion" data-correct="false">Falso</button>
            <p class="eva-feedback"></p>
        </div>

        <div class="card eva-pregunta">
            <p><b>4. Un algoritmo debe tener pasos desordenados.</b></p>
            <button class="eva-opcion" data-correct="false">Verdadero</button>
            <button class="eva-opcion" data-correct="true">Falso</button>
            <p class="eva-feedback"></p>
        </div>

        <h2>💻 Actividad 3: Reto práctico</h2>

        <div class="card">
            <p>
                Escribe tres pasos ordenados para preparar
                una taza de café.
            </p>
            <textarea id="eva-practica"
                placeholder="Escribe aquí tus tres pasos..."
                rows="4"></textarea>
            <button id="eva-revisar-practica">
                Revisar mi respuesta
            </button>
            <p id="eva-practica-feedback"></p>
        </div>
    ` : `
        <h2>📚 Aprende sobre ${tituloModulo}</h2>
        <p>
            En esta unidad estudiaremos ${tituloModulo}
            de la asignatura ${materia.nombre}.
        </p>
        <p>
            Este módulo tendrá contenido, ejemplos,
            ejercicios y evaluaciones específicos de su tema.
        </p>
    `;

    document.getElementById("main-content").innerHTML = `
        <button onclick="mostrarModulos('${idMateria}')">
            ⬅ Volver a los módulos
        </button>

        <section class="lesson-container">
            <h1>${tituloModulo}</h1>

            <div class="card">
                <h2>🎯 Objetivo de aprendizaje</h2>
                <p>
                    Comprender y aplicar los conocimientos
                    relacionados con ${tituloModulo}.
                </p>
            </div>

            ${contenido}

            <div class="card">
                <h2>🏆 Finalizar módulo</h2>
                <p>Cuando termines las actividades, puedes registrar tu avance.</p>
                <button onclick="completarModulo('${idMateria}', ${numeroModulo})">
                    Marcar módulo como completado
                </button>
            </div>
        </section>
    `;

    // Comprobar respuestas de las preguntas
    document.querySelectorAll(".eva-pregunta").forEach(function(pregunta) {
        const botones = pregunta.querySelectorAll(".eva-opcion");
        const feedback = pregunta.querySelector(".eva-feedback");

        botones.forEach(function(boton) {
            boton.addEventListener("click", function() {
                if (pregunta.dataset.respondida === "si") return;

                pregunta.dataset.respondida = "si";

                if (boton.dataset.correct === "true") {
                    feedback.textContent = "¡Correcto! 🎉 Muy bien.";
                    feedback.style.color = "green";
                } else {
                    feedback.textContent = "Respuesta incorrecta. ¡Sigue aprendiendo!";
                    feedback.style.color = "red";
                }

                botones.forEach(function(b) {
                    b.disabled = true;
                });
            });
        });
    });

    // Revisar actividad práctica
    const revisar = document.getElementById("eva-revisar-practica");

    if (revisar) {
        revisar.addEventListener("click", function() {
            const respuesta = document.getElementById("eva-practica").value.trim();
            const resultado = document.getElementById("eva-practica-feedback");

            if (respuesta.length < 15) {
                resultado.textContent = "Escribe un poco más para explicar tus pasos.";
            } else {
                resultado.textContent =
                    "¡Muy bien! Has completado tu reto práctico. Revisa que tus pasos estén ordenados.";
            }
        });
    }
}


// COMPLETAR MÓDULO
function completarModulo(idMateria, numeroModulo) {
    if (!progreso[idMateria]) {
        progreso[idMateria] = [];
    }

    if (!progreso[idMateria].includes(numeroModulo)) {
        progreso[idMateria].push(numeroModulo);
    }

    localStorage.setItem("eva_progreso", JSON.stringify(progreso));

    alert("¡Excelente! 🎉 Has completado el módulo.");

    mostrarModulos(idMateria);
}

// PROGRESO
function mostrarProgreso() {
    const main = document.getElementById("main-content");

    main.innerHTML = `
        <h1>📊 Mi progreso</h1>

        ${Object.keys(progreso).length === 0
            ? `<div class="card"><p>Aún no has completado ningún módulo.</p></div>`
            : Object.keys(progreso).map(function(id) {
                const cantidad = progreso[id].length;

                return `
                    <div class="card">
                        <h3>Materia ${id}</h3>
                        <p>${cantidad} módulos completados de 5</p>
                        <progress value="${cantidad}" max="5"></progress>
                    </div>
                `;
            }).join("")
        }
    `;
}

// CERTIFICADOS
function mostrarDiplomas() {
    const main = document.getElementById("main-content");

    main.innerHTML = `
        <h1>🏆 Mis certificados</h1>

        <div class="card">
            <h3>¡Tu primer certificado te espera!</h3>
            <p>Completa los cinco módulos de una asignatura para obtener tu certificado.</p>
        </div>
    `;
}

// RECUPERAR SESIÓN
window.addEventListener("DOMContentLoaded", function() {
    const usuarioGuardado = localStorage.getItem("eva_usuario");

    if (usuarioGuardado) {
        usuario = usuarioGuardado;

        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");

        const userName = document.getElementById("user-name");
        if (userName) userName.textContent = usuario;

        mostrarInicio();
    }
});
