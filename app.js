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

    document.getElementById("main-content").innerHTML = `
        <button onclick="mostrarModulos('${idMateria}')">⬅ Volver</button>

        <section class="lesson-container">
            <h1>${tituloModulo}</h1>

            <h2>Bienvenido a tu módulo de aprendizaje</h2>

            <p>
                En este módulo estudiaremos ${tituloModulo}.
                Aquí podrás aprender paso a paso, revisar ejemplos
                y desarrollar tus conocimientos.
            </p>

            <div class="card">
                <h3>🎯 Objetivo de aprendizaje</h3>
                <p>Comprender los conceptos principales de este tema.</p>
            </div>

            <div class="card">
                <h3>📝 Actividad</h3>
                <p>Reflexiona sobre lo aprendido y prepárate para la evaluación.</p>
            </div>

            <button onclick="completarModulo('${idMateria}', ${numeroModulo})">
                Marcar módulo como completado
            </button>
        </section>
    `;
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
