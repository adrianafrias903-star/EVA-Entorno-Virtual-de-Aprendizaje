
// ==========================================
// EVA - ENTORNO VIRTUAL DE APRENDIZAJE
// VERSION FUTURISTA
// ==========================================

// DATOS Y PROGRESO
let usuario = localStorage.getItem("eva_usuario") || "";

let progreso = JSON.parse(
    localStorage.getItem("eva_progreso") || "{}"
);

let calificaciones = JSON.parse(
    localStorage.getItem("eva_calificaciones") || "{}"
);

// ELEMENTOS PRINCIPALES
const main = document.getElementById("main-content");

// ==========================================
// INICIAR SESION
// ==========================================

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("username").value.trim();

        if (!nombre) {
            alert("Escribe tu nombre para ingresar.");
            return;
        }

        usuario = nombre;

        localStorage.setItem("eva_usuario", usuario);

        entrarPlataforma();
    });
}

function entrarPlataforma() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    const nombre = document.getElementById("user-name");

    if (nombre) {
        nombre.textContent = usuario;
    }

    mostrarInicio();
}

// ==========================================
// PANEL PRINCIPAL
// ==========================================

function mostrarInicio() {
    const totalMaterias = materias.length;

    const totalModulos = materias.reduce(function(total, materia) {
        return total + materia.modulos.length;
    }, 0);

    const completados = Object.values(progreso).reduce(function(total, lista) {
        return total + lista.length;
    }, 0);

    const porcentaje = totalModulos
        ? Math.round((completados / totalModulos) * 100)
        : 0;

    main.innerHTML = `
        <section class="card">
            <h1>🚀 ¡Bienvenido a EVA, ${usuario}!</h1>
            <p>Tu futuro comienza con lo que aprendes hoy.</p>
            <h2>🌌 Explora, aprende y supera tus límites.</h2>
            <button onclick="mostrarMaterias()">Explorar mis materias →</button>
        </section>

        <h2>📊 Tu espacio de aprendizaje</h2>

        <div class="card">
            <h3>📚 Materias disponibles</h3>
            <h1>${totalMaterias}</h1>
        </div>

        <div class="card">
            <h3>📖 Módulos disponibles</h3>
            <h1>${totalModulos}</h1>
        </div>

        <div class="card">
            <h3>🏆 Módulos completados</h3>
            <h1>${completados}</h1>
        </div>

        <div class="card">
            <h3>⚡ Progreso general</h3>
            <h1>${porcentaje}%</h1>
            <progress value="${porcentaje}" max="100"></progress>
        </div>

        <h2>✨ Accesos rápidos</h2>

        <div class="card">
            <h3>📚 Mis materias</h3>
            <p>Explora tus asignaturas y descubre nuevos conocimientos.</p>
            <button onclick="mostrarMaterias()">Ver materias</button>
        </div>

        <div class="card">
            <h3>🎮 Zona de aprendizaje</h3>
            <p>Entra a tus módulos y realiza actividades interactivas.</p>
            <button onclick="mostrarMaterias()">Comenzar a aprender</button>
        </div>

        <div class="card">
            <h3>🏆 Mis certificados</h3>
            <p>Consulta tus logros académicos.</p>
            <button onclick="mostrarDiplomas()">Ver certificados</button>
        </div>
    `;
}

// ==========================================
// MOSTRAR LAS 15 MATERIAS
// ==========================================

function mostrarMaterias() {
    main.innerHTML = `
        <h1>📚 Mis materias</h1>
        <p>Selecciona una asignatura para comenzar.</p>

        <div class="subjects-container">
            ${materias.map(function(materia) {
                return `
                    <div class="subject-card"
                         onclick="mostrarModulos('${materia.id}')">

                        <h1>${materia.icono}</h1>
                        <h3>${materia.nombre}</h3>
                        <p>${materia.description}</p>

                        <p>📖 ${materia.modulos.length} módulos</p>

                        <button>Entrar al aula →</button>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// ==========================================
// MOSTRAR LOS MODULOS
// ==========================================

function mostrarModulos(idMateria) {
    const materia = materias.find(function(m) {
        return String(m.id) === String(idMateria);
    });

    if (!materia) return;

    main.innerHTML = `
        <button onclick="mostrarMaterias()">⬅ Volver a materias</button>

        <h1>${materia.icono} ${materia.nombre}</h1>

        <p>${materia.description}</p>

        <h2>📖 Contenido del aula virtual</h2>

        ${materia.modulos.map(function(modulo, indice) {
            const terminado = progreso[idMateria] &&
                progreso[idMateria].includes(indice);

            const titulo = typeof modulo === "string"
                ? modulo
                : modulo.nombre || modulo.titulo || modulo.title;

            return `
                <div class="module-card"
                     onclick="abrirModulo('${idMateria}', ${indice})">

                    <h3>📘 Módulo ${indice + 1}</h3>
                    <h3>${titulo}</h3>

                    <p>${terminado ? "✅ Completado" : "🔓 Disponible"}</p>

                    <button>Ingresar al módulo →</button>
                </div>
            `;
        }).join("")}
    `;
}

// ==========================================
// CONTENIDO DEL PRIMER MODULO
// ==========================================

const leccionProgramacion = {
    preguntas: [
        {
            pregunta: "¿Qué es la programación?",
            opciones: [
                "Un componente físico de la computadora",
                "Crear instrucciones para que una computadora realice tareas",
                "Una red social",
                "Un dispositivo electrónico"
            ],
            correcta: 1,
            explicacion: "La programación permite crear instrucciones que una computadora puede ejecutar."
        },
        {
            pregunta: "¿Qué es un algoritmo?",
            opciones: [
                "Un virus informático",
                "Una computadora",
                "Una serie ordenada de pasos para resolver un problema",
                "Un programa de música"
            ],
            correcta: 2,
            explicacion: "Un algoritmo es una secuencia ordenada de pasos para solucionar un problema."
        },
        {
            pregunta: "¿Qué es un programa informático?",
            opciones: [
                "Un conjunto de instrucciones",
                "Una pantalla",
                "Un teclado",
                "Un cable de conexión"
            ],
            correcta: 0,
            explicacion: "Un programa contiene instrucciones que la computadora puede ejecutar."
        },
        {
            pregunta: "¿Para qué sirve un lenguaje de programación?",
            opciones: [
                "Para decorar una computadora",
                "Para limpiar el teclado",
                "Para conectar cables",
                "Para escribir instrucciones que una computadora pueda interpretar"
            ],
            correcta: 3,
            explicacion: "Los lenguajes de programación permiten expresar instrucciones para crear programas."
        }
    ],

    verdaderoFalso: [
        {
            pregunta: "Un algoritmo organiza pasos para resolver un problema.",
            correcta: true
        },
        {
            pregunta: "La programación solamente sirve para jugar videojuegos.",
            correcta: false
        },
        {
            pregunta: "Un programa está formado por instrucciones.",
            correcta: true
        }
    ]
};

// ==========================================
// ABRIR UN MODULO
// ==========================================

function abrirModulo(idMateria, numeroModulo) {
    const materia = materias.find(function(m) {
        return String(m.id) === String(idMateria);
    });

    if (!materia) return;

    const modulo = materia.modulos[numeroModulo];

    const tituloModulo = typeof modulo === "string"
        ? modulo
        : modulo.nombre || modulo.titulo || modulo.title;

    const esIntroduccion =
        String(idMateria) === "1" &&
        Number(numeroModulo) === 0;

    const videoBusqueda = encodeURIComponent(
        materia.nombre + " " + tituloModulo + " explicación educativa"
    );

    main.innerHTML = `
        <button onclick="mostrarModulos('${idMateria}')">
            ⬅ Volver al aula
        </button>

        <section class="lesson-container">

            <div class="card">
                <h1>📘 ${tituloModulo}</h1>
                <p>${materia.nombre}</p>
                <p>Bienvenido a tu experiencia de aprendizaje EVA.</p>
            </div>

            ${esIntroduccion
                ? contenidoIntroduccion()
                : contenidoGeneral(materia, tituloModulo)
            }

            <div class="card">
                <h2>🎬 Biblioteca de videos</h2>
                <p>Encuentra explicaciones audiovisuales sobre este tema.</p>

                <a href="https://www.youtube.com/results?search_query=${videoBusqueda}"
                   target="_blank" rel="noopener noreferrer">
                    <button>▶ Buscar videos educativos</button>
                </a>
            </div>

            <div class="card">
                <h2>🏆 Finalizar módulo</h2>
                <p>Registra tu avance cuando hayas terminado de estudiar.</p>

                <button onclick="completarModulo('${idMateria}', ${numeroModulo})">
                    Marcar como completado
                </button>
            </div>

        </section>
    `;

    if (esIntroduccion) {
        prepararEvaluacion();
        prepararVerdaderoFalso();
        prepararPractica();
    }
}

// ==========================================
// LECCION INTRODUCCION A PROGRAMACION
// ==========================================

function contenidoIntroduccion() {
    return `
        <div class="card">
            <h2>🎯 Objetivo de aprendizaje</h2>
            <p>
                Comprender qué es la programación, reconocer
                los algoritmos y conocer su utilidad.
            </p>
        </div>

        <div class="card">
            <h2>📚 ¿Qué es la programación?</h2>

            <p>
                La programación consiste en crear instrucciones
                que una computadora puede ejecutar para realizar
                tareas y resolver problemas.
            </p>

            <h3>Conceptos fundamentales</h3>

            <ul>
                <li><b>Programa:</b> conjunto de instrucciones.</li>
                <li><b>Algoritmo:</b> pasos ordenados para resolver un problema.</li>
                <li><b>Código:</b> instrucciones escritas en un lenguaje de programación.</li>
            </ul>
        </div>

        <div class="card">
            <h2>💡 Ejemplo de algoritmo</h2>
            <p>Pasos para preparar una taza de café:</p>

            <ol>
                <li>Calentar agua.</li>
                <li>Colocar café en una taza.</li>
                <li>Agregar el agua caliente.</li>
                <li>Mezclar y servir.</li>
            </ol>

            <p>¡Eso también es un algoritmo!</p>
        </div>

        <div class="card">
            <h2>🎮 Actividad 1: Opción múltiple</h2>
            <p>Responde las cuatro preguntas y descubre tu puntuación.</p>

            ${leccionProgramacion.preguntas.map(function(p, i) {
                return `
                    <div class="eva-pregunta" data-pregunta="${i}">
                        <h3>${i + 1}. ${p.pregunta}</h3>

                        ${p.opciones.map(function(opcion, j) {
                            return `
                                <label style="display:block; margin:12px 0;">
                                    <input type="radio"
                                           name="pregunta-${i}"
                                           value="${j}"
                                           style="width:auto;">
                                    <b>${["A", "B", "C", "D"][j]}.</b>
                                    ${opcion}
                                </label>
                            `;
                        }).join("")}

                        <p id="feedback-${i}"></p>
                    </div>
                `;
            }).join("")}

            <button id="finalizar-evaluacion">
                Finalizar evaluación
            </button>

            <div id="resultado-evaluacion"></div>
        </div>

        <div class="card">
            <h2>✅ Actividad 2: Verdadero o falso</h2>

            ${leccionProgramacion.verdaderoFalso.map(function(p, i) {
                return `
                    <div class="eva-pregunta">
                        <p><b>${i + 1}. ${p.pregunta}</b></p>

                        <label>
                            <input type="radio"
                                   name="vf-${i}"
                                   value="true"
                                   style="width:auto;">
                            Verdadero
                        </label>

                        <label>
                            <input type="radio"
                                   name="vf-${i}"
                                   value="false"
                                   style="width:auto;">
                            Falso
                        </label>

                        <p id="vf-feedback-${i}"></p>
                    </div>
                `;
            }).join("")}

            <button id="revisar-vf">Corregir respuestas</button>
            <div id="resultado-vf"></div>
        </div>

        <div class="card">
            <h2>✍️ Actividad 3: Completa la idea</h2>

            <p>
                Un algoritmo es una serie ordenada de pasos
                para resolver un __________.
            </p>

            <input id="respuesta-completar"
                   type="text"
                   placeholder="Escribe tu respuesta">

            <button onclick="revisarCompletar()">Comprobar</button>

            <p id="feedback-completar"></p>
        </div>

        <div class="card">
            <h2>💻 Actividad 4: Reto práctico</h2>

            <p>
                Escribe tres o más pasos ordenados para preparar
                una taza de café.
            </p>

            <textarea id="eva-practica"
                      rows="5"
                      placeholder="1. Primero...&#10;2. Después...&#10;3. Finalmente..."></textarea>

            <button id="revisar-practica">Revisar mi reto</button>

            <p id="feedback-practica"></p>
        </div>
    `;
}

// ==========================================
// CONTENIDO DE LOS DEMAS MODULOS
// ==========================================

function contenidoGeneral(materia, titulo) {
    return `
        <div class="card">
            <h2>🎯 Objetivo de aprendizaje</h2>
            <p>
                Comprender los fundamentos de ${titulo}
                y relacionarlos con la asignatura ${materia.nombre}.
            </p>
        </div>

        <div class="card">
            <h2>📚 Lección de aprendizaje</h2>
            <p>
                En este módulo aprenderás sobre ${titulo}.
                Identificarás sus conceptos principales,
                su utilidad y sus aplicaciones.
            </p>
            <p>
                Observa ejemplos, investiga y toma apuntes
                de los conceptos importantes.
            </p>
        </div>

        <div class="card">
            <h2>🧠 Reflexiona</h2>
            <p>
                ¿Qué conocimientos previos tienes sobre ${titulo}?
                ¿Dónde podrías aplicar lo aprendido?
            </p>
            <textarea rows="4" placeholder="Escribe tus ideas..."></textarea>
        </div>
    `;
}

// ==========================================
// EVALUACION DE OPCION MULTIPLE
// ==========================================

function prepararEvaluacion() {
    const boton = document.getElementById("finalizar-evaluacion");

    if (!boton) return;

    boton.addEventListener("click", function() {
        let aciertos = 0;
        let respondidas = 0;

        leccionProgramacion.preguntas.forEach(function(p, i) {
            const seleccion = document.querySelector(
                'input[name="pregunta-' + i + '"]:checked'
            );

            const feedback = document.getElementById("feedback-" + i);

            if (!seleccion) {
                feedback.textContent = "⚠️ Debes responder esta pregunta.";
                feedback.style.color = "#ffb84d";
                return;
            }

            respondidas++;

            if (Number(seleccion.value) === p.correcta) {
                aciertos++;
                feedback.textContent = "¡Correcto! " + p.explicacion;
                feedback.style.color = "#25e6d2";
            } else {
                feedback.textContent =
                    "Incorrecto. Respuesta correcta: " +
                    ["A", "B", "C", "D"][p.correcta] +
                    ". " + p.explicacion;

                feedback.style.color = "#ff7777";
            }
        });

        if (respondidas < leccionProgramacion.preguntas.length) {
            return;
        }

        const nota = (aciertos / leccionProgramacion.preguntas.length) * 10;

        calificaciones["1-0"] = nota;

        localStorage.setItem(
            "eva_calificaciones",
            JSON.stringify(calificaciones)
        );

        document.getElementById("resultado-evaluacion").innerHTML = `
            <div class="card">
                <h2>🏆 Resultado de tu evaluación</h2>
                <h1>${nota.toFixed(2)} / 10</h1>
                <p>Respuestas correctas: ${aciertos}</p>
                <p>Respuestas incorrectas: ${4 - aciertos}</p>
                <p>${nota >= 7
                    ? "¡Excelente trabajo! Has aprobado la evaluación."
                    : "Sigue practicando para mejorar tu resultado."}
                </p>
            </div>
        `;

        boton.disabled = true;
    });
}

// ==========================================
// VERDADERO O FALSO
// ==========================================

function prepararVerdaderoFalso() {
    const boton = document.getElementById("revisar-vf");

    if (!boton) return;

    boton.addEventListener("click", function() {
        let aciertos = 0;
        let respondidas = 0;

        leccionProgramacion.verdaderoFalso.forEach(function(p, i) {
            const respuesta = document.querySelector(
                'input[name="vf-' + i + '"]:checked'
            );

            const feedback = document.getElementById("vf-feedback-" + i);

            if (!respuesta) {
                feedback.textContent = "Selecciona una respuesta.";
                return;
            }

            respondidas++;

            if ((respuesta.value === "true") === p.correcta) {
                aciertos++;
                feedback.textContent = "¡Correcto! 🎉";
                feedback.style.color = "#25e6d2";
            } else {
                feedback.textContent = "Respuesta incorrecta.";
                feedback.style.color = "#ff7777";
            }
        });

        if (respondidas === 3) {
            document.getElementById("resultado-vf").textContent =
                "Resultado: " + aciertos + " de 3 respuestas correctas.";

            boton.disabled = true;
        }
    });
}

// ==========================================
// COMPLETAR PALABRAS
// ==========================================

function revisarCompletar() {
    const respuesta = document.getElementById(
        "respuesta-completar"
    ).value.trim().toLowerCase();

    const feedback = document.getElementById(
        "feedback-completar"
    );

    if (respuesta === "problema") {
        feedback.textContent = "¡Muy bien! Respuesta correcta. 🎉";
        feedback.style.color = "#25e6d2";
    } else {
        feedback.textContent =
            "Inténtalo nuevamente. La palabra empieza con P.";
        feedback.style.color = "#ff7777";
    }
}

// ==========================================
// RETO PRACTICO
// ==========================================

function prepararPractica() {
    const boton = document.getElementById("revisar-practica");

    if (!boton) return;

    boton.addEventListener("click", function() {
        const respuesta = document.getElementById("eva-practica").value.trim();

        const feedback = document.getElementById("feedback-practica");

        const pasos = respuesta
            .split("\n")
            .filter(function(linea) {
                return linea.trim().length > 0;
            });

        if (pasos.length < 3) {
            feedback.textContent =
                "Escribe al menos tres pasos para completar el reto.";
            feedback.style.color = "#ffb84d";
        } else {
            feedback.textContent =
                "¡Reto completado! Has organizado una secuencia de pasos. 🎉";
            feedback.style.color = "#25e6d2";
        }
    });
}

// ==========================================
// COMPLETAR MODULO
// ==========================================

function completarModulo(idMateria, numeroModulo) {
    if (!progreso[idMateria]) {
        progreso[idMateria] = [];
    }

    if (!progreso[idMateria].includes(numeroModulo)) {
        progreso[idMateria].push(numeroModulo);
    }

    localStorage.setItem(
        "eva_progreso",
        JSON.stringify(progreso)
    );

    alert("¡Excelente! Has registrado el módulo como completado. 🎉");

    mostrarModulos(idMateria);
}

// ==========================================
// MOSTRAR PROGRESO
// ==========================================

function mostrarProgreso() {
    const completados = Object.values(progreso).reduce(function(total, lista) {
        return total + lista.length;
    }, 0);

    main.innerHTML = `
        <h1>📊 Mi progreso</h1>

        <div class="card">
            <h2>🏆 Tu avance académico</h2>
            <h1>${completados} / 75 módulos</h1>
            <progress value="${completados}" max="75"></progress>
        </div>

        <h2>📚 Avance por materia</h2>

        ${materias.map(function(materia) {
            const cantidad = progreso[materia.id]
                ? progreso[materia.id].length
                : 0;

            return `
                <div class="card">
                    <h3>${materia.icono} ${materia.nombre}</h3>
                    <p>${cantidad} de 5 módulos completados</p>
                    <progress value="${cantidad}" max="5"></progress>
                </div>
            `;
        }).join("")}

        <button onclick="mostrarInicio()">Volver al inicio</button>
    `;
}

// ==========================================
// CERTIFICADOS
// ==========================================

function mostrarDiplomas() {
    main.innerHTML = `
        <h1>🏆 Mis certificados</h1>
        <p>Completa los cinco módulos de una materia para obtener su certificado.</p>

        ${materias.map(function(materia) {
            const cantidad = progreso[materia.id]
                ? progreso[materia.id].length
                : 0;

            const aprobado = cantidad === 5;

            return `
                <div class="card">
                    <h3>${materia.icono} ${materia.nombre}</h3>
                    <p>${cantidad} de 5 módulos completados</p>

                    ${aprobado
                        ? "<p>🏆 ¡Materia completada!</p>"
                        : "<p>🔒 Certificado pendiente</p>"
                    }
                </div>
            `;
        }).join("")}
    `;
}

// ==========================================
// RECUPERAR SESION
// ==========================================

window.addEventListener("DOMContentLoaded", function() {
    const usuarioGuardado = localStorage.getItem("eva_usuario");

    if (usuarioGuardado) {
        usuario = usuarioGuardado;
        entrarPlataforma();
    }
});
