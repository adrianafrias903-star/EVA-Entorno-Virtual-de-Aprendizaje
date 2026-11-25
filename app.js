
// ==========================================
// EVA - ENTORNO VIRTUAL DE APRENDIZAJE
// VERSION COMPLETA: 15 MATERIAS Y 75 MODULOS
// ==========================================

let usuario = localStorage.getItem("eva_usuario") || "";

let progreso = JSON.parse(localStorage.getItem("eva_progreso")) || {};
let calificaciones = JSON.parse(localStorage.getItem("eva_calificaciones")) || {};
let respuestasPracticas = JSON.parse(localStorage.getItem("eva_practicas")) || {};

let materiaActual = null;
let moduloActual = null;

// Obtener las materias desde data.js
const listaMaterias = (typeof materias !== "undefined")
    ? materias
    : ((typeof subjects !== "undefined") ? subjects : []);

// Contenido introductorio de cada materia
const introducciones = [
    "Aprende a crear programas, utilizar algoritmos y resolver problemas mediante código.",
    "Aprende a construir páginas web utilizando HTML, CSS y JavaScript.",
    "Aprende a organizar, almacenar, consultar y administrar información.",
    "Conoce cómo funcionan los sistemas operativos y cómo administrar sus recursos.",
    "Aprende cómo se conectan los dispositivos y cómo funcionan las redes informáticas.",
    "Identifica componentes, diagnostica fallas y realiza mantenimiento de equipos.",
    "Utiliza herramientas digitales para crear documentos, hojas de cálculo y presentaciones.",
    "Aprende a proteger dispositivos, cuentas, redes e información digital.",
    "Conoce las aplicaciones de la inteligencia artificial y desarrolla proyectos con IA.",
    "Comprende la ética, la privacidad y los derechos en los entornos digitales.",
    "Desarrolla habilidades matemáticas para resolver problemas cotidianos.",
    "Comprende los fenómenos físicos mediante la observación y la experimentación.",
    "Fortalece la lectura, la escritura, la gramática y la comunicación.",
    "Desarrolla vocabulario, gramática y comunicación en inglés.",
    "Aprende a desarrollar ideas de negocio y administrar proyectos emprendedores."
];

// Consejos de aprendizaje para cada materia
const consejos = [
    "Practica escribiendo código y comprobando los resultados.",
    "Construye ejemplos de páginas web y prueba los cambios.",
    "Organiza los datos y practica consultas paso a paso.",
    "Relaciona cada concepto con el funcionamiento de una computadora.",
    "Utiliza esquemas para comprender las conexiones de red.",
    "Identifica las piezas del equipo antes de realizar un diagnóstico.",
    "Practica creando documentos y hojas de cálculo.",
    "Aplica buenas prácticas de seguridad en situaciones reales.",
    "Experimenta con herramientas de IA y analiza sus resultados.",
    "Reflexiona sobre el uso responsable de la tecnología.",
    "Resuelve ejercicios y comprueba cada procedimiento.",
    "Relaciona las fórmulas con situaciones de la vida diaria.",
    "Lee, analiza y redacta tus propias respuestas.",
    "Practica el vocabulario y construye oraciones.",
    "Relaciona las ideas de negocio con necesidades reales."
];

// Preguntas de evaluación según el tipo de materia
const preguntasMateria = [
    {
        pregunta: "¿Cuál es una práctica importante al desarrollar un programa?",
        correcta: "Probar el código y corregir los errores.",
        opciones: ["Probar el código y corregir los errores.", "Ignorar los errores.", "Eliminar todas las instrucciones."]
    },
    {
        pregunta: "¿Qué permite construir la tecnología web?",
        correcta: "Páginas y aplicaciones que funcionan en la web.",
        opciones: ["Páginas y aplicaciones que funcionan en la web.", "Únicamente documentos impresos.", "Solamente conexiones eléctricas."]
    },
    {
        pregunta: "¿Para qué se utiliza una base de datos?",
        correcta: "Para almacenar y organizar información.",
        opciones: ["Para almacenar y organizar información.", "Para reemplazar el monitor.", "Para aumentar el volumen del equipo."]
    },
    {
        pregunta: "¿Cuál es una función de un sistema operativo?",
        correcta: "Administrar los recursos de la computadora.",
        opciones: ["Administrar los recursos de la computadora.", "Diseñar únicamente imágenes.", "Fabricar componentes físicos."]
    },
    {
        pregunta: "¿Qué permite una red informática?",
        correcta: "Compartir información y recursos entre dispositivos.",
        opciones: ["Compartir información y recursos entre dispositivos.", "Eliminar todos los archivos.", "Desconectar los dispositivos."]
    },
    {
        pregunta: "¿Qué se debe hacer antes de reparar un equipo?",
        correcta: "Identificar y diagnosticar el problema.",
        opciones: ["Identificar y diagnosticar el problema.", "Cambiar todas las piezas sin revisar.", "Ignorar los síntomas."]
    },
    {
        pregunta: "¿Para qué sirven las aplicaciones ofimáticas?",
        correcta: "Para realizar tareas de oficina y crear documentos.",
        opciones: ["Para realizar tareas de oficina y crear documentos.", "Para sustituir el hardware.", "Para reparar circuitos."]
    },
    {
        pregunta: "¿Cuál es una buena práctica de ciberseguridad?",
        correcta: "Utilizar contraseñas seguras y proteger los datos.",
        opciones: ["Utilizar contraseñas seguras y proteger los datos.", "Compartir las contraseñas.", "Abrir cualquier enlace desconocido."]
    },
    {
        pregunta: "¿Qué caracteriza a la inteligencia artificial?",
        correcta: "Puede realizar tareas que requieren capacidades inteligentes.",
        opciones: ["Puede realizar tareas que requieren capacidades inteligentes.", "Es solamente una pieza del teclado.", "No procesa información."]
    },
    {
        pregunta: "¿Qué implica la ciudadanía digital responsable?",
        correcta: "Respetar a otras personas y proteger la información.",
        opciones: ["Respetar a otras personas y proteger la información.", "Difundir datos privados.", "Publicar contenido ofensivo."]
    },
    {
        pregunta: "¿Qué permite desarrollar el razonamiento matemático?",
        correcta: "Resolver problemas utilizando conceptos y procedimientos.",
        opciones: ["Resolver problemas utilizando conceptos y procedimientos.", "Evitar los cálculos.", "Reemplazar la lectura."]
    },
    {
        pregunta: "¿Qué estudia la física?",
        correcta: "La materia, la energía y sus interacciones.",
        opciones: ["La materia, la energía y sus interacciones.", "Solamente las palabras.", "Únicamente la historia."]
    },
    {
        pregunta: "¿Qué ayuda a mejorar la comprensión lectora?",
        correcta: "Leer, interpretar y analizar textos.",
        opciones: ["Leer, interpretar y analizar textos.", "Copiar sin comprender.", "Evitar la lectura."]
    },
    {
        pregunta: "¿Qué permite aprender un idioma?",
        correcta: "Comprender y comunicar ideas.",
        opciones: ["Comprender y comunicar ideas.", "Memorizar números sin contexto.", "Evitar la comunicación."]
    },
    {
        pregunta: "¿Cuál es un paso importante para emprender?",
        correcta: "Identificar una necesidad y proponer una solución.",
        opciones: ["Identificar una necesidad y proponer una solución.", "Ignorar a los clientes.", "No planificar."]
    }
];

// Obtener título de una materia
function obtenerNombreMateria(materia) {
    return materia.nombre || materia.name || "Materia";
}

// Obtener módulos de una materia
function obtenerModulos(materia) {
    return materia.modulos || materia.modules || [];
}

// Obtener nombre de un módulo
function obtenerNombreModulo(modulo) {
    if (typeof modulo === "string") return modulo;
    return modulo.nombre || modulo.name || modulo.title || "Módulo";
}

// Escapar texto para mostrarlo en HTML
function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, function(letra) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[letra];
    });
}

// Guardar información
function guardarDatos() {
    localStorage.setItem("eva_usuario", usuario);
    localStorage.setItem("eva_progreso", JSON.stringify(progreso));
    localStorage.setItem("eva_calificaciones", JSON.stringify(calificaciones));
    localStorage.setItem("eva_practicas", JSON.stringify(respuestasPracticas));
}

// ==========================================
// INICIAR SESION
// ==========================================

function entrarPlataforma() {
    const pantalla = document.getElementById("login-screen");
    const aplicacion = document.getElementById("app");
    const nombre = document.getElementById("user-name");

    if (pantalla) pantalla.classList.add("hidden");
    if (aplicacion) aplicacion.classList.remove("hidden");
    if (nombre) nombre.textContent = usuario;

    mostrarInicio();
}

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("login-form");

    if (formulario) {
        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const campo = document.getElementById("username");
            usuario = campo.value.trim();

            if (!usuario) {
                alert("Escribe tu nombre para ingresar.");
                return;
            }

            guardarDatos();
            entrarPlataforma();
        });
    }

    if (usuario) {
        entrarPlataforma();
    }
});

// ==========================================
// INICIO
// ==========================================


function mostrarInicio() {
    const contenido = document.getElementById("main-content");
    if (!contenido) return;

    const totalMaterias = listaMaterias.length;

    let totalModulos = 0;
    let completados = 0;

    listaMaterias.forEach(function(materia, indice) {
        const modulos = obtenerModulos(materia);
        totalModulos += modulos.length;

        modulos.forEach(function(modulo, i) {
            if (progreso[indice + "-" + i]) {
                completados++;
            }
        });
    });

    const porcentaje = totalModulos > 0
        ? Math.round((completados / totalModulos) * 100)
        : 0;

    const nombreEstudiante = usuario || "Estudiante";

    const frases = [
        "Cada día es una nueva oportunidad para aprender.",
        "Tu esfuerzo de hoy construye tu futuro.",
        "Aprender es descubrir todo lo que eres capaz de hacer.",
        "Los grandes logros comienzan con pequeños pasos."
    ];

    const frase = frases[new Date().getDate() % frases.length];

    let tarjetasMaterias = "";

    listaMaterias.slice(0, 6).forEach(function(materia, indice) {
        const nombre = obtenerNombreMateria(materia);
        const modulos = obtenerModulos(materia);

        const icono = materia.icono || materia.icon || "📚";

        tarjetasMaterias += `
            <article class="inicio-materia">
                <div class="inicio-materia-icono">${escapar(icono)}</div>
                <h3>${escapar(nombre)}</h3>
                <p>${modulos.length} módulos disponibles</p>
                <button onclick="mostrarModulos(${indice})">
                    Explorar materia →
                </button>
            </article>
        `;
    });

    contenido.innerHTML = `
        <div class="eva-inicio">

            <section class="eva-hero">
                <div class="eva-hero-texto">
                    <span class="eva-etiqueta">✦ TU ESPACIO DE APRENDIZAJE</span>
                    <h1>¡Hola, ${escapar(nombreEstudiante)}!</h1>
                    <h2>Bienvenido a tu futuro.</h2>
                    <p>
                        Descubre, aprende, practica y alcanza nuevas metas.
                        Tu aventura educativa comienza aquí.
                    </p>
                    <button onclick="mostrarMaterias()" class="eva-boton-principal">
                        🚀 Comenzar a aprender
                    </button>
                </div>

                <div class="eva-hero-ilustracion">
                    <div class="eva-orbita eva-orbita-uno"></div>
                    <div class="eva-orbita eva-orbita-dos"></div>
                    <div class="eva-libro">📚</div>
                    <div class="eva-flotante eva-flotante-uno">💡</div>
                    <div class="eva-flotante eva-flotante-dos">💻</div>
                    <div class="eva-flotante eva-flotante-tres">🎓</div>
                    <div class="eva-flotante eva-flotante-cuatro">✨</div>
                </div>
            </section>

            <section class="eva-saludo-frase">
                <span>🌟</span>
                <p>${escapar(frase)}</p>
            </section>

            <section class="eva-seccion">
                <div class="eva-titulo-seccion">
                    <div>
                        <span class="eva-etiqueta">TU ACTIVIDAD</span>
                        <h2>Mi espacio educativo</h2>
                    </div>
                    <span class="eva-icono-titulo">📊</span>
                </div>

                <div class="eva-estadisticas">
                    <article class="eva-estadistica">
                        <span>📚</span>
                        <div>
                            <strong>${totalMaterias}</strong>
                            <p>Materias</p>
                        </div>
                    </article>

                    <article class="eva-estadistica">
                        <span>📖</span>
                        <div>
                            <strong>${totalModulos}</strong>
                            <p>Módulos disponibles</p>
                        </div>
                    </article>

                    <article class="eva-estadistica">
                        <span>🏆</span>
                        <div>
                            <strong>${completados}</strong>
                            <p>Módulos aprobados</p>
                        </div>
                    </article>

                    <article class="eva-estadistica">
                        <span>⭐</span>
                        <div>
                            <strong>${porcentaje}%</strong>
                            <p>Progreso general</p>
                        </div>
                    </article>
                </div>
            </section>

            <section class="eva-seccion">
                <div class="eva-titulo-seccion">
                    <div>
                        <span class="eva-etiqueta">SIGUE AVANZANDO</span>
                        <h2>Mi progreso</h2>
                    </div>
                    <span class="eva-icono-titulo">🎯</span>
                </div>

                <div class="eva-progreso-panel">
                    <div class="eva-progreso-circulo"
                         style="--progreso:${porcentaje}%">
                        <div>
                            <strong>${porcentaje}%</strong>
                            <small>Completado</small>
                        </div>
                    </div>

                    <div class="eva-progreso-texto">
                        <h3>¡Sigue aprendiendo!</h3>
                        <p>
                            Has aprobado ${completados} de ${totalModulos}
                            módulos disponibles.
                        </p>
                        <p>
                            Cada actividad te acerca más a tus objetivos.
                        </p>
                        <button onclick="mostrarProgreso()">
                            Ver mi progreso →
                        </button>
                    </div>
                </div>
            </section>

            <section class="eva-seccion">
                <div class="eva-titulo-seccion">
                    <div>
                        <span class="eva-etiqueta">EXPLORA Y DESCUBRE</span>
                        <h2>Mis materias</h2>
                    </div>
                    <button class="eva-enlace" onclick="mostrarMaterias()">
                        Ver todas →
                    </button>
                </div>

                <div class="eva-materias-grid">
                    ${tarjetasMaterias}
                </div>
            </section>

            <section class="eva-destacados">
                <article class="eva-destacado eva-destacado-uno">
                    <span>🧠</span>
                    <h3>Aprende algo nuevo</h3>
                    <p>Explora tus lecciones y descubre nuevos conocimientos.</p>
                    <button onclick="mostrarMaterias()">Explorar materias</button>
                </article>

                <article class="eva-destacado eva-destacado-dos">
                    <span>🎮</span>
                    <h3>¡A practicar!</h3>
                    <p>Resuelve actividades y demuestra lo que has aprendido.</p>
                    <button onclick="mostrarMaterias()">Ir a actividades</button>
                </article>

                <article class="eva-destacado eva-destacado-tres">
                    <span>🏅</span>
                    <h3>Alcanza tus metas</h3>
                    <p>Completa tus módulos y consigue tus certificados.</p>
                    <button onclick="mostrarDiplomas()">Ver certificados</button>
                </article>
            </section>

            <footer class="eva-pie-inicio">
                <h3>🚀 EVA - Entorno Virtual de Aprendizaje</h3>
                <p>Aprende. Practica. Descubre. Supera tus límites.</p>
                <span>Tu conocimiento, tu futuro.</span>
            </footer>

        </div>
    `;
}


// ==========================================
// MOSTRAR LAS 15 MATERIAS
// ==========================================

function mostrarMaterias() {
    const contenido = document.getElementById("main-content");
    if (!contenido) return;

    let html = `
        <section class="card">
            <h2>📚 Mis materias</h2>
            <p>Selecciona una materia para ver sus cinco módulos.</p>
            <div class="subjects-grid">
    `;

    listaMaterias.forEach(function(materia, indice) {
        const nombre = obtenerNombreMateria(materia);
        const modulos = obtenerModulos(materia);
        const aprobados = modulos.filter(function(modulo, i) {
            return progreso[indice + "-" + i];
        }).length;

        html += `
            <article class="subject-card card">
                <h3>${escapar(materia.icono || materia.icon || "📘")} ${escapar(nombre)}</h3>
                <p>${escapar(materia.descripcion || materia.description || introducciones[indice] || "")}</p>
                <p>📖 ${modulos.length} módulos</p>
                <p>✅ ${aprobados} de ${modulos.length} completados</p>
                <button onclick="mostrarModulos(${indice})">Entrar a la materia</button>
            </article>
        `;
    });

    html += "</div></section>";
    contenido.innerHTML = html;
}

// ==========================================
// MOSTRAR LOS 5 MODULOS
// ==========================================

function mostrarModulos(indiceMateria) {
    const materia = listaMaterias[indiceMateria];

    if (!materia) {
        alert("No se encontró esta materia.");
        return;
    }

    materiaActual = indiceMateria;

    const contenido = document.getElementById("main-content");
    const modulos = obtenerModulos(materia);

    let html = `
        <section class="card">
            <button onclick="mostrarMaterias()">⬅ Volver a materias</button>
            <h2>${escapar(obtenerNombreMateria(materia))}</h2>
            <p>${escapar(introducciones[indiceMateria] || materia.descripcion || "")}</p>
            <h3>Contenido de la materia</h3>
    `;

    if (modulos.length === 0) {
        html += "<p>No se encontraron módulos en esta materia. Revisa js/data.js.</p>";
    }

    modulos.forEach(function(modulo, indiceModulo) {
        const nombreModulo = obtenerNombreModulo(modulo);
        const clave = indiceMateria + "-" + indiceModulo;
        const aprobado = Boolean(progreso[clave]);
        const nota = calificaciones[clave];

        html += `
            <article class="module-card card">
                <h3>📖 Módulo ${indiceModulo + 1}: ${escapar(nombreModulo)}</h3>
                <p>${aprobado ? "✅ Módulo aprobado" : "📝 Pendiente de completar"}</p>
                ${nota !== undefined ? `<p>Calificación: ${nota}/10</p>` : ""}
                <button onclick="abrirModulo(${indiceMateria}, ${indiceModulo})">
                    ${aprobado ? "Volver a estudiar" : "Abrir módulo"}
                </button>
            </article>
        `;
    });

    html += "</section>";
    contenido.innerHTML = html;
}

// ==========================================
// ABRIR UN MODULO
// ==========================================

function abrirModulo(indiceMateria, indiceModulo) {
    const materia = listaMaterias[indiceMateria];

    if (!materia) return;

    const modulos = obtenerModulos(materia);
    const modulo = modulos[indiceModulo];

    if (!modulo) {
        alert("Este módulo no existe.");
        return;
    }

    materiaActual = indiceMateria;
    moduloActual = indiceModulo;

    const nombreMateria = obtenerNombreMateria(materia);
    const nombreModulo = obtenerNombreModulo(modulo);
    const pregunta = preguntasMateria[indiceMateria] || preguntasMateria[0];

    const contenido = document.getElementById("main-content");

    contenido.innerHTML = `
        <section class="card lesson-container">
            <button onclick="mostrarModulos(${indiceMateria})">⬅ Volver a módulos</button>

            <h2>${escapar(nombreMateria)}</h2>
            <h3>Módulo ${indiceModulo + 1}: ${escapar(nombreModulo)}</h3>

            <div class="card">
                <h3>🎯 Objetivo de aprendizaje</h3>
                <p>Comprender y aplicar los conocimientos relacionados con ${escapar(nombreModulo)}.</p>
            </div>

            <div class="card">
                <h3>📘 Lección de aprendizaje</h3>
                <p>${escapar(introducciones[indiceMateria] || "")}</p>
                <p>En este módulo estudiarás ${escapar(nombreModulo)}. Es importante comprender sus conceptos principales, reconocer sus características y aprender a utilizarlos en situaciones prácticas.</p>
                <p>${escapar(consejos[indiceMateria] || "")}</p>
            </div>

            <div class="card">
                <h3>💡 Ejemplo</h3>
                <p>Imagina una situación en la que necesitas aplicar ${escapar(nombreModulo)}. Primero identifica el problema, después selecciona los conocimientos necesarios y finalmente desarrolla una solución.</p>
            </div>

            <div class="card">
                <h3>🎥 Videos de apoyo</h3>
                <p>Consulta videos educativos relacionados con este tema:</p>
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(nombreMateria + " " + nombreModulo)}" target="_blank" rel="noopener">
                    ▶ Buscar videos de ${escapar(nombreModulo)}
                </a>
            </div>

            <form id="evaluacion-eva" class="card">
                <h3>🧠 Actividad 1: Opción múltiple</h3>
                <p>${escapar(pregunta.pregunta)}</p>

                ${pregunta.opciones.map(function(opcion, i) {
                    return `
                        <label class="eva-opcion">
                            <input type="radio" name="opcion" value="${i}" required>
                            ${escapar(opcion)}
                        </label>
                    `;
                }).join("")}

                <hr>

                <h3>☑️ Actividad 2: Verdadero o falso</h3>
                <p>1. Para aprender ${escapar(nombreModulo)} es importante comprender sus conceptos y practicar.</p>
                <label><input type="radio" name="vf1" value="verdadero" required> Verdadero</label>
                <label><input type="radio" name="vf1" value="falso"> Falso</label>

                <p>2. No es necesario estudiar ni practicar para dominar un tema.</p>
                <label><input type="radio" name="vf2" value="verdadero" required> Verdadero</label>
                <label><input type="radio" name="vf2" value="falso"> Falso</label>

                <hr>

                <h3>✍️ Actividad 3: Completar</h3>
                <p>Escribe el nombre exacto del tema que estás estudiando:</p>
                <input type="text" id="respuesta-completar" placeholder="Escribe el nombre del tema" required>

                <hr>

                <h3>🛠️ Actividad 4: Práctica</h3>
                <p>Explica con tus propias palabras qué aprendiste sobre ${escapar(nombreModulo)} y escribe un ejemplo de cómo lo aplicarías.</p>
                <textarea id="respuesta-practica" rows="5" placeholder="Escribe tu respuesta práctica aquí..." required></textarea>

                <button type="submit">Evaluar mis actividades</button>
            </form>

            <div id="resultado-eva"></div>
        </section>
    `;

    document.getElementById("evaluacion-eva").addEventListener("submit", evaluarModulo);
}

// ==========================================
// EVALUAR ACTIVIDADES
// ==========================================

function evaluarModulo(evento) {
    evento.preventDefault();

    const materia = listaMaterias[materiaActual];
    const nombreModulo = obtenerNombreModulo(obtenerModulos(materia)[moduloActual]);
    const pregunta = preguntasMateria[materiaActual] || preguntasMateria[0];

    const opcion = document.querySelector('input[name="opcion"]:checked');
    const vf1 = document.querySelector('input[name="vf1"]:checked');
    const vf2 = document.querySelector('input[name="vf2"]:checked');

    const completar = document.getElementById("respuesta-completar").value.trim();
    const practica = document.getElementById("respuesta-practica").value.trim();

    if (!opcion || !vf1 || !vf2 || !completar || practica.length < 10) {
        alert("Completa todas las actividades. La práctica debe tener al menos 10 caracteres.");
        return;
    }

    let puntos = 0;

    if (pregunta.opciones[Number(opcion.value)] === pregunta.correcta) puntos += 3;
    if (vf1.value === "verdadero") puntos += 2;
    if (vf2.value === "falso") puntos += 2;

    if (completar.toLowerCase() === nombreModulo.trim().toLowerCase()) {
        puntos += 3;
    }

    const clave = materiaActual + "-" + moduloActual;
    const aprobado = puntos >= 7;

    calificaciones[clave] = puntos;
    respuestasPracticas[clave] = practica;

    if (aprobado) {
        progreso[clave] = true;
    }

    guardarDatos();

    const resultado = document.getElementById("resultado-eva");

    resultado.innerHTML = `
        <section class="card">
            <h3>${aprobado ? "🎉 ¡Felicidades! Módulo aprobado" : "📚 Sigue practicando"}</h3>
            <h2>Calificación: ${puntos}/10</h2>
            <p>${aprobado
                ? "Has aprobado este módulo. Tu progreso ha sido guardado."
                : "Necesitas obtener al menos 7/10 para aprobar. Revisa las lecciones y vuelve a intentarlo."}</p>
            <button onclick="mostrarModulos(${materiaActual})">Volver a los módulos</button>
            ${aprobado && moduloActual < obtenerModulos(materia).length - 1
                ? `<button onclick="abrirModulo(${materiaActual}, ${moduloActual + 1})">Ir al siguiente módulo</button>`
                : ""}
        </section>
    `;

    resultado.scrollIntoView({ behavior: "smooth" });
}

// ==========================================
// MOSTRAR PROGRESO
// ==========================================

function mostrarProgreso() {
    const contenido = document.getElementById("main-content");

    let total = 0;
    let aprobados = 0;

    let html = `
        <section class="card">
            <h2>📊 Mi progreso</h2>
    `;

    listaMaterias.forEach(function(materia, indice) {
        const modulos = obtenerModulos(materia);
        const completados = modulos.filter(function(modulo, i) {
            return progreso[indice + "-" + i];
        }).length;

        total += modulos.length;
        aprobados += completados;

        html += `
            <article class="card">
                <h3>${escapar(obtenerNombreMateria(materia))}</h3>
                <p>${completados} de ${modulos.length} módulos aprobados</p>
                <progress value="${completados}" max="${modulos.length || 1}"></progress>
            </article>
        `;
    });

    html += `
            <h3>Progreso general: ${aprobados} de ${total} módulos</h3>
            <progress value="${aprobados}" max="${total || 1}"></progress>
        </section>
    `;

    contenido.innerHTML = html;
}

// ==========================================
// CERTIFICADOS
// ==========================================

function mostrarDiplomas() {
    const contenido = document.getElementById("main-content");

    let html = `
        <section class="card">
            <h2>🏆 Mis certificados</h2>
            <p>Aprueba los cinco módulos de una materia para obtener su certificado imprimible.</p>
    `;

    listaMaterias.forEach(function(materia, indice) {
        const modulos = obtenerModulos(materia);

        const completa = modulos.length === 5 && modulos.every(function(modulo, i) {
            return progreso[indice + "-" + i];
        });

        html += `
            <article class="card">
                <h3>${escapar(obtenerNombreMateria(materia))}</h3>
                <p>${completa ? "🏆 Materia completada" : "🔒 Aún tienes módulos pendientes"}</p>
                ${completa ? `<button onclick="imprimirCertificado(${indice})">Ver certificado</button>` : ""}
            </article>
        `;
    });

    html += "</section>";
    contenido.innerHTML = html;
}

function imprimirCertificado(indiceMateria) {
    const materia = listaMaterias[indiceMateria];

    if (!materia) return;

    const nombre = escapar(obtenerNombreMateria(materia));

    const ventana = window.open("", "_blank");

    if (!ventana) {
        alert("Permite las ventanas emergentes para imprimir tu certificado.");
        return;
    }

    ventana.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Certificado EVA</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    color: #172554;
                }
                .certificado {
                    border: 8px double #2563eb;
                    padding: 45px;
                    min-height: 350px;
                }
                h1 { font-size: 38px; }
                h2 { color: #2563eb; }
            </style>
        </head>
        <body>
            <div class="certificado">
                <h1>🏆 EVA</h1>
                <h2>Certificado de finalización</h2>
                <p>Se certifica que</p>
                <h2>${escapar(usuario)}</h2>
                <p>ha completado satisfactoriamente la materia:</p>
                <h2>${nombre}</h2>
                <p>Entorno Virtual de Aprendizaje</p>
                <p>Fecha: ${new Date().toLocaleDateString("es-EC")}</p>
            </div>
            <script>window.onload = function() { window.print(); };</script>
        </body>
        </html>
    `);

    ventana.document.close();
}

// ==========================================
// CERRAR SESION
// ==========================================

function cerrarSesion() {
    usuario = "";
    localStorage.removeItem("eva_usuario");

    const pantalla = document.getElementById("login-screen");
    const aplicacion = document.getElementById("app");

    if (aplicacion) aplicacion.classList.add("hidden");
    if (pantalla) pantalla.classList.remove("hidden");
}

// ==========================================
// FIN DEL CODIGO EVA
// ==========================================
