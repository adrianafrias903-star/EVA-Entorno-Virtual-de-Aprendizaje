
/* =====================================================
   EVA - ENTORNO VIRTUAL DE APRENDIZAJE
   NUEVA VERSION INTEGRAL
   15 MATERIAS - 75 MODULOS
===================================================== */

// ==========================================
// 1. DATOS Y ALMACENAMIENTO
// ==========================================

let usuario = localStorage.getItem("eva_usuario") || "";

function leerDatos(clave, defecto) {
    try {
        return JSON.parse(localStorage.getItem(clave)) || defecto;
    } catch {
        return defecto;
    }
}

let progreso = leerDatos("eva_progreso", {});
let calificaciones = leerDatos("eva_calificaciones", {});
let respuestasPracticas = leerDatos("eva_practicas", {});

const main = document.getElementById("main-content");

function guardarDatos() {
    localStorage.setItem("eva_progreso", JSON.stringify(progreso));
    localStorage.setItem("eva_calificaciones", JSON.stringify(calificaciones));
    localStorage.setItem("eva_practicas", JSON.stringify(respuestasPracticas));
}

function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caracter]);
}

function nombreModulo(modulo) {
    return typeof modulo === "string"
        ? modulo
        : modulo.nombre || modulo.titulo || modulo.title || "Módulo";
}

// ==========================================
// 2. CONTENIDOS DE LAS 15 MATERIAS
// Cada materia contiene cinco lecciones.
// ==========================================

const contenidosEVA = {

1: [
{
concepto: "La programación consiste en diseñar instrucciones que una computadora puede ejecutar para resolver problemas.",
explicacion: "Aprenderás qué es un programa, cómo funcionan los algoritmos y por qué es importante organizar las instrucciones antes de programar.",
ejemplo: "Un algoritmo para preparar café puede incluir calentar agua, colocar café en una taza, agregar agua y mezclar.",
palabra: "algoritmo",
practica: "Escribe un algoritmo de cinco pasos para realizar una actividad cotidiana."
},
{
concepto: "Las variables almacenan datos que pueden utilizarse y modificarse durante la ejecución de un programa.",
explicacion: "Los tipos de datos permiten clasificar la información. Entre ellos están los números enteros, decimales, textos y valores booleanos.",
ejemplo: 'let nombre = "Ana"; let edad = 20; let activo = true;',
palabra: "variable",
practica: "Escribe tres variables: una para tu nombre, otra para tu edad y otra para indicar si estás estudiando."
},
{
concepto: "Las condiciones permiten que un programa tome decisiones utilizando expresiones que pueden ser verdaderas o falsas.",
explicacion: "Los operadores permiten comparar valores. Por ejemplo, mayor que, menor que, igual que y diferente de.",
ejemplo: 'if (edad >= 18) { console.log("Mayor de edad"); }',
palabra: "condicion",
practica: "Describe una situación cotidiana en la que debas tomar una decisión usando una condición."
},
{
concepto: "Los ciclos repiten instrucciones y las funciones agrupan código para reutilizarlo.",
explicacion: "Un ciclo permite ejecutar varias veces una tarea. Una función puede recibir datos, realizar operaciones y devolver resultados.",
ejemplo: "Un ciclo puede mostrar los números del 1 al 10. Una función puede calcular la suma de dos números.",
palabra: "funcion",
practica: "Diseña una función que reciba dos números y explique cómo calcular su suma."
},
{
concepto: "Un proyecto de programación integra variables, condiciones, ciclos y funciones para resolver una necesidad.",
explicacion: "Un proyecto comienza identificando un problema, diseñando un algoritmo, escribiendo el código y probando su funcionamiento.",
ejemplo: "Puedes desarrollar una calculadora que solicite dos números y permita sumar, restar, multiplicar y dividir.",
palabra: "proyecto",
practica: "Diseña un pequeño programa. Explica su objetivo, los datos que necesita y los pasos que realizará."
}
],

2: [
{
concepto: "Internet es una red mundial de dispositivos y la web permite consultar páginas y recursos mediante navegadores.",
explicacion: "Conocerás la diferencia entre Internet y la web, los navegadores, los servidores, las direcciones URL y el funcionamiento de una solicitud web.",
ejemplo: "Cuando escribes una dirección en Chrome, el navegador solicita el contenido al servidor y presenta la página.",
palabra: "navegador",
practica: "Escribe dos nombres de navegadores y explica para qué sirven."
},
{
concepto: "HTML es un lenguaje de marcado que organiza los títulos, párrafos, imágenes, enlaces y demás elementos de una página.",
explicacion: "Las etiquetas HTML definen la estructura del documento. Una página básica utiliza las etiquetas html, head y body.",
ejemplo: "<h1>Mi página</h1><p>Estoy aprendiendo HTML.</p>",
palabra: "html",
practica: "Escribe la estructura que tendría una página con un título, un párrafo y un enlace."
},
{
concepto: "CSS permite definir los colores, tamaños, espacios, bordes y distribución visual de una página web.",
explicacion: "Los selectores identifican elementos HTML y las propiedades CSS establecen cómo deben mostrarse.",
ejemplo: "h1 { color: blue; font-size: 30px; }",
palabra: "css",
practica: "Escribe tres propiedades CSS que utilizarías para diseñar una página personal."
},
{
concepto: "JavaScript agrega comportamiento e interactividad a los sitios web.",
explicacion: "Puede responder a clics, validar formularios, modificar elementos HTML y mostrar información dinámica.",
ejemplo: 'function saludar() { alert("Hola estudiante"); }',
palabra: "javascript",
practica: "Describe cómo utilizarías JavaScript para hacer funcionar un botón."
},
{
concepto: "Un sitio web completo integra HTML para la estructura, CSS para el diseño y JavaScript para la interacción.",
explicacion: "Un proyecto web requiere planificación, organización de archivos, desarrollo, pruebas y corrección de errores.",
ejemplo: "Una página personal puede contener una presentación, fotografías, enlaces y un botón interactivo.",
palabra: "integracion",
practica: "Diseña una propuesta de página web personal indicando sus secciones y funciones."
}
],

3: [
{
concepto: "Una base de datos organiza información para almacenarla, consultarla y actualizarla de manera eficiente.",
explicacion: "Conocerás los datos, registros, tablas, sistemas gestores y las ventajas de mantener información organizada.",
ejemplo: "Una biblioteca puede guardar libros, autores, estudiantes y préstamos en una base de datos.",
palabra: "datos",
practica: "Propón cinco datos que guardarías en una base de datos de estudiantes."
},
{
concepto: "El modelado de datos permite representar entidades, atributos y relaciones antes de construir una base de datos.",
explicacion: "Las entidades representan objetos, los atributos describen sus características y las relaciones conectan entidades.",
ejemplo: "Un estudiante puede tener un identificador, nombre, correo y una relación con sus cursos.",
palabra: "entidad",
practica: "Diseña dos entidades para un sistema escolar e indica sus atributos."
},
{
concepto: "SQL es un lenguaje utilizado para consultar y administrar información en bases de datos relacionales.",
explicacion: "Permite crear tablas, insertar registros, modificar datos y consultar información.",
ejemplo: "SELECT nombre FROM estudiantes;",
palabra: "sql",
practica: "Escribe una consulta SQL que permita mostrar los nombres de todos los estudiantes."
},
{
concepto: "Las consultas permiten recuperar información específica mediante filtros, condiciones y ordenamientos.",
explicacion: "Las operaciones SELECT, WHERE y ORDER BY ayudan a encontrar y organizar registros.",
ejemplo: "SELECT * FROM estudiantes WHERE edad >= 18;",
palabra: "consulta",
practica: "Explica cómo buscarías estudiantes mayores de edad en una tabla."
},
{
concepto: "Un proyecto de base de datos integra el diseño, creación de tablas, relaciones, consultas y pruebas.",
explicacion: "Para construir un sistema debes identificar necesidades, definir campos, establecer claves y comprobar la integridad de la información.",
ejemplo: "Un sistema de biblioteca puede registrar libros, usuarios y préstamos.",
palabra: "relacion",
practica: "Diseña una pequeña base de datos para una biblioteca con tres tablas."
}
],

4: [
{
concepto: "Un sistema operativo administra los recursos de una computadora y permite ejecutar aplicaciones.",
explicacion: "Conocerás las funciones del sistema operativo, sus componentes y la comunicación entre hardware y software.",
ejemplo: "Windows, Linux y macOS son sistemas operativos utilizados en computadoras.",
palabra: "sistema",
practica: "Compara dos sistemas operativos e indica una característica de cada uno."
},
{
concepto: "Los procesos son programas en ejecución y el sistema operativo administra su uso del procesador.",
explicacion: "Los procesos tienen estados, consumen recursos y pueden ejecutarse de manera concurrente.",
ejemplo: "Cuando escuchas música y escribes un documento, el sistema administra varios procesos.",
palabra: "proceso",
practica: "Explica qué procesos pueden ejecutarse al mismo tiempo en una computadora."
},
{
concepto: "La memoria y el almacenamiento permiten conservar datos e instrucciones para el funcionamiento del equipo.",
explicacion: "La memoria RAM guarda temporalmente información en uso, mientras que los discos SSD y HDD almacenan datos de forma persistente.",
ejemplo: "Al abrir un programa, parte de su información se carga en la memoria RAM.",
palabra: "memoria",
practica: "Explica dos diferencias entre la memoria RAM y un disco de almacenamiento."
},
{
concepto: "La instalación y configuración de un sistema operativo preparan una computadora para su utilización.",
explicacion: "El proceso incluye verificar requisitos, preparar medios de instalación, configurar opciones y comprobar los controladores.",
ejemplo: "Instalar un sistema operativo desde una memoria USB de instalación.",
palabra: "instalacion",
practica: "Enumera los pasos que seguirías para preparar una computadora antes de instalar un sistema operativo."
},
{
concepto: "La administración de sistemas mantiene el funcionamiento, seguridad y rendimiento de los equipos.",
explicacion: "Incluye gestionar usuarios, permisos, actualizaciones, servicios, almacenamiento y copias de seguridad.",
ejemplo: "Un administrador puede crear cuentas de usuario y actualizar el sistema.",
palabra: "administracion",
practica: "Propón cinco tareas de mantenimiento para administrar correctamente una computadora."
}
],

5: [
{
concepto: "Una red informática conecta dispositivos para compartir información y recursos.",
explicacion: "Aprenderás los elementos de una red, sus beneficios y los medios utilizados para transmitir datos.",
ejemplo: "Una red escolar permite conectar computadoras, impresoras y servidores.",
palabra: "red",
practica: "Describe una situación en la que una red facilite el trabajo de una institución."
},
{
concepto: "Las redes pueden organizarse mediante diferentes topologías y clasificarse según su alcance.",
explicacion: "Existen redes LAN, MAN y WAN. Las topologías describen cómo se conectan los dispositivos.",
ejemplo: "Una red en estrella conecta los equipos a un dispositivo central.",
palabra: "topologia",
practica: "Dibuja o describe una red en estrella con cinco computadoras."
},
{
concepto: "Las direcciones IP identifican dispositivos dentro de una red y permiten dirigir la comunicación.",
explicacion: "Una dirección IPv4 utiliza cuatro grupos numéricos. Las redes también utilizan máscaras de subred y puertas de enlace.",
ejemplo: "192.168.1.10 es un ejemplo de dirección IPv4 privada.",
palabra: "direccion",
practica: "Explica para qué sirve una dirección IP y menciona un ejemplo."
},
{
concepto: "La configuración de redes establece parámetros para que los dispositivos puedan comunicarse.",
explicacion: "Se configuran direcciones IP, máscaras, puertas de enlace, DNS y conexiones inalámbricas o cableadas.",
ejemplo: "Un router distribuye conexiones y puede asignar direcciones IP mediante DHCP.",
palabra: "configuracion",
practica: "Describe los pasos para conectar una computadora a una red Wi-Fi segura."
},
{
concepto: "Un proyecto de conectividad planifica, instala y prueba una red según las necesidades de sus usuarios.",
explicacion: "Se deben considerar cantidad de dispositivos, cobertura, seguridad, equipos y presupuesto.",
ejemplo: "Una pequeña oficina necesita conectar computadoras, impresoras y puntos de acceso.",
palabra: "conectividad",
practica: "Diseña una propuesta de red para un laboratorio escolar."
}
],

6: [
{
concepto: "El soporte técnico ayuda a identificar y solucionar problemas de hardware y software.",
explicacion: "Un técnico recibe solicitudes, recopila información, diagnostica fallas y documenta las soluciones.",
ejemplo: "Ayudar a un usuario que no puede conectarse a Internet.",
palabra: "soporte",
practica: "Describe cómo atenderías a una persona que informa que su computadora no enciende."
},
{
concepto: "El hardware está formado por los componentes físicos de una computadora.",
explicacion: "Entre sus componentes están la placa madre, procesador, memoria RAM, almacenamiento, fuente de poder y periféricos.",
ejemplo: "El procesador ejecuta instrucciones y la memoria RAM conserva temporalmente datos en uso.",
palabra: "hardware",
practica: "Identifica cinco componentes de una computadora y explica su función."
},
{
concepto: "El diagnóstico técnico identifica la causa de una falla mediante observación y pruebas ordenadas.",
explicacion: "Es importante recopilar síntomas, revisar conexiones, comprobar componentes y documentar resultados.",
ejemplo: "Si una computadora no muestra imagen, se revisan monitor, cables y conexiones.",
palabra: "diagnostico",
practica: "Describe un procedimiento para investigar por qué una computadora está lenta."
},
{
concepto: "El mantenimiento preventivo reduce fallas y prolonga la vida útil de los equipos.",
explicacion: "Incluye limpieza adecuada, actualizaciones, revisión de conexiones, ventilación y copias de seguridad.",
ejemplo: "Limpiar periódicamente el polvo de las rejillas de ventilación con procedimientos seguros.",
palabra: "preventivo",
practica: "Elabora una lista de mantenimiento preventivo para una computadora."
},
{
concepto: "Una práctica de soporte técnico aplica procedimientos seguros para resolver una incidencia.",
explicacion: "El trabajo incluye registrar el problema, revisar posibles causas, aplicar una solución y verificar el resultado.",
ejemplo: "Diagnosticar una conexión de red desconectada y comprobar que vuelva a funcionar.",
palabra: "solucion",
practica: "Crea un informe breve de una falla informática y su posible solución."
}
],

7: [
{
concepto: "La ofimática utiliza aplicaciones digitales para crear documentos, procesar datos y comunicar información.",
explicacion: "Las herramientas ofimáticas facilitan tareas administrativas, académicas y profesionales.",
ejemplo: "Una oficina utiliza documentos, hojas de cálculo y presentaciones para organizar su trabajo.",
palabra: "ofimatica",
practica: "Menciona tres tareas escolares que podrían realizarse con aplicaciones ofimáticas."
},
{
concepto: "Los procesadores de texto permiten crear, editar y dar formato a documentos.",
explicacion: "Puedes utilizar títulos, párrafos, tablas, imágenes, encabezados y herramientas de revisión.",
ejemplo: "Un informe escolar puede incluir portada, introducción, desarrollo y conclusiones.",
palabra: "documento",
practica: "Diseña la estructura de un documento escolar con cinco secciones."
},
{
concepto: "Las hojas de cálculo organizan datos en filas y columnas y permiten realizar operaciones mediante fórmulas.",
explicacion: "Las celdas pueden contener textos, números y fórmulas. También permiten crear gráficos y ordenar información.",
ejemplo: "=SUMA(A1:A5)",
palabra: "celda",
practica: "Explica cómo organizarías una tabla de gastos mensuales."
},
{
concepto: "Las presentaciones digitales comunican ideas mediante diapositivas organizadas.",
explicacion: "Una buena presentación utiliza títulos claros, imágenes pertinentes, poco texto y una secuencia lógica.",
ejemplo: "Una presentación educativa puede tener portada, objetivos, explicación, ejemplos y conclusiones.",
palabra: "diapositiva",
practica: "Propón cinco diapositivas para exponer un tema escolar."
},
{
concepto: "Un proyecto ofimático integra documentos, hojas de cálculo y presentaciones para resolver una necesidad.",
explicacion: "El proyecto requiere organizar archivos, comprobar datos y presentar resultados de forma clara.",
ejemplo: "Crear un presupuesto en una hoja de cálculo y presentar sus resultados en diapositivas.",
palabra: "integracion",
practica: "Diseña un proyecto que utilice un documento, una hoja de cálculo y una presentación."
}
],

8: [
{
concepto: "La ciberseguridad protege sistemas, redes y datos frente a accesos y acciones no autorizadas.",
explicacion: "Se basa en proteger la confidencialidad, integridad y disponibilidad de la información.",
ejemplo: "Utilizar contraseñas robustas y mantener actualizados los dispositivos.",
palabra: "ciberseguridad",
practica: "Explica tres medidas para proteger la información de una institución."
},
{
concepto: "Las amenazas digitales incluyen programas maliciosos, engaños y ataques contra sistemas informáticos.",
explicacion: "El phishing busca engañar a las personas para obtener información. El malware puede afectar dispositivos y datos.",
ejemplo: "Un correo falso que solicita una contraseña mediante un enlace sospechoso.",
palabra: "phishing",
practica: "Describe tres señales que pueden indicar que un correo es fraudulento."
},
{
concepto: "La protección de datos utiliza medidas para evitar la pérdida, alteración o divulgación no autorizada de información.",
explicacion: "Es importante controlar permisos, realizar respaldos y utilizar métodos adecuados de protección.",
ejemplo: "Una institución puede limitar el acceso a expedientes según las funciones de cada usuario.",
palabra: "proteccion",
practica: "Propón un procedimiento para proteger los datos de estudiantes."
},
{
concepto: "La seguridad de dispositivos requiere actualizaciones, controles de acceso y hábitos responsables.",
explicacion: "Los equipos deben contar con bloqueo de pantalla, actualizaciones y aplicaciones obtenidas de fuentes confiables.",
ejemplo: "Activar la autenticación multifactor en una cuenta importante.",
palabra: "dispositivo",
practica: "Elabora una lista de cinco acciones para proteger un teléfono o computadora."
},
{
concepto: "Un proyecto de seguridad informática identifica riesgos y propone medidas para reducirlos.",
explicacion: "Se analizan activos, amenazas, vulnerabilidades, controles y procedimientos de respuesta.",
ejemplo: "Diseñar un plan de copias de seguridad y control de accesos para una escuela.",
palabra: "riesgo",
practica: "Diseña un plan básico de seguridad para un laboratorio de computación."
}
],

9: [
{
concepto: "La inteligencia artificial desarrolla sistemas capaces de realizar tareas que normalmente requieren capacidades humanas.",
explicacion: "Se utiliza en reconocimiento de imágenes, procesamiento del lenguaje, recomendaciones y automatización.",
ejemplo: "Un sistema puede reconocer objetos en fotografías mediante modelos de inteligencia artificial.",
palabra: "inteligencia",
practica: "Menciona tres aplicaciones de inteligencia artificial en la vida cotidiana."
},
{
concepto: "El aprendizaje automático permite que un sistema identifique patrones a partir de datos.",
explicacion: "Los modelos se entrenan con información y después pueden realizar predicciones o clasificaciones.",
ejemplo: "Un modelo puede aprender a clasificar correos como deseados o no deseados.",
palabra: "aprendizaje",
practica: "Describe qué datos necesitaría un sistema para recomendar películas."
},
{
concepto: "La inteligencia artificial generativa produce contenido nuevo a partir de instrucciones y patrones aprendidos.",
explicacion: "Puede generar textos, imágenes, código y otros contenidos. Sus resultados deben revisarse.",
ejemplo: "Un asistente puede crear un resumen a partir de un texto proporcionado.",
palabra: "generativa",
practica: "Escribe una instrucción clara para pedir a una IA que explique un tema escolar."
},
{
concepto: "Las herramientas de inteligencia artificial apoyan actividades de investigación, creación y productividad.",
explicacion: "Es importante verificar los resultados, proteger los datos personales y utilizar estas herramientas responsablemente.",
ejemplo: "Una herramienta puede ayudar a organizar ideas para una presentación.",
palabra: "herramientas",
practica: "Propón una actividad educativa en la que utilizarías una herramienta de IA."
},
{
concepto: "Un proyecto de inteligencia artificial identifica un problema y evalúa si puede resolverse con datos y modelos.",
explicacion: "Se define el objetivo, se recopilan datos apropiados, se selecciona un método y se evalúan los resultados.",
ejemplo: "Crear una propuesta de asistente que responda preguntas frecuentes de una institución.",
palabra: "modelo",
practica: "Diseña una propuesta de proyecto de IA e indica su objetivo y utilidad."
}
],

10: [
{
concepto: "La ciudadanía digital implica participar de manera responsable, segura y respetuosa en los entornos digitales.",
explicacion: "Incluye convivencia en línea, participación, accesibilidad, pensamiento crítico y responsabilidad.",
ejemplo: "Respetar las opiniones de otras personas en una comunidad virtual.",
palabra: "ciudadania",
practica: "Escribe cinco normas para convivir responsablemente en Internet."
},
{
concepto: "La ética tecnológica orienta el desarrollo y uso responsable de las tecnologías.",
explicacion: "Considera la justicia, transparencia, responsabilidad, respeto y posibles consecuencias de las decisiones tecnológicas.",
ejemplo: "Evaluar si una aplicación utiliza datos personales de manera apropiada.",
palabra: "etica",
practica: "Describe un dilema ético relacionado con el uso de inteligencia artificial."
},
{
concepto: "La privacidad y la protección de datos buscan controlar cómo se recopila y utiliza la información personal.",
explicacion: "Los datos personales deben tratarse con responsabilidad, seguridad y respeto a los derechos de las personas.",
ejemplo: "Solicitar autorización antes de compartir fotografías de otras personas.",
palabra: "privacidad",
practica: "Menciona cinco datos personales que no deberías publicar indiscriminadamente."
},
{
concepto: "Los derechos digitales protegen la participación, privacidad, expresión y otros derechos en entornos tecnológicos.",
explicacion: "También existen responsabilidades relacionadas con el respeto, la seguridad y el uso legítimo de contenidos.",
ejemplo: "Respetar los derechos de autor al utilizar imágenes en una presentación.",
palabra: "derechos",
practica: "Explica tres derechos que deben respetarse en Internet."
},
{
concepto: "Un proyecto de ciudadanía digital promueve el uso responsable e inclusivo de la tecnología.",
explicacion: "Puede incluir campañas educativas, normas de convivencia, protección de datos y prevención del acoso digital.",
ejemplo: "Una campaña escolar sobre respeto y seguridad en redes sociales.",
palabra: "responsabilidad",
practica: "Diseña una campaña para promover la ciudadanía digital en tu institución."
}
],

11: [
{
concepto: "Las matemáticas estudian cantidades, estructuras, relaciones y patrones para resolver problemas.",
explicacion: "Los fundamentos incluyen operaciones, números, propiedades y razonamiento lógico.",
ejemplo: "Calcular el costo total de varios productos mediante sumas y multiplicaciones.",
palabra: "operacion",
practica: "Plantea un problema cotidiano que pueda resolverse mediante operaciones matemáticas."
},
{
concepto: "El álgebra utiliza letras y símbolos para representar cantidades y expresar relaciones matemáticas.",
explicacion: "Las expresiones algebraicas contienen variables, constantes y operaciones. Las ecuaciones permiten encontrar valores desconocidos.",
ejemplo: "Si x + 5 = 12, entonces x = 7.",
palabra: "variable",
practica: "Resuelve la ecuación x + 8 = 15 y explica el procedimiento."
},
{
concepto: "Las funciones relacionan valores de entrada con valores de salida y las ecuaciones representan igualdades matemáticas.",
explicacion: "Una función puede describirse mediante una expresión, tabla o gráfica.",
ejemplo: "f(x) = 2x. Si x vale 3, entonces f(x) vale 6.",
palabra: "funcion",
practica: "Calcula los resultados de f(x) = 3x cuando x vale 1, 2 y 4."
},
{
concepto: "La geometría estudia figuras, formas, medidas, ángulos y propiedades del espacio.",
explicacion: "Se utilizan conceptos como perímetro, área, volumen, puntos, líneas y polígonos.",
ejemplo: "El área de un rectángulo se calcula multiplicando base por altura.",
palabra: "geometria",
practica: "Calcula el área de un rectángulo de base 8 y altura 5."
},
{
concepto: "La resolución de problemas matemáticos requiere comprender datos, seleccionar estrategias y comprobar resultados.",
explicacion: "Un procedimiento organizado permite interpretar situaciones y justificar las soluciones obtenidas.",
ejemplo: "Calcular cuánto dinero se necesita para comprar varios artículos con precios diferentes.",
palabra: "problema",
practica: "Inventa un problema de compras, escribe los datos y resuélvelo."
}
],

12: [
{
concepto: "La física estudia la materia, la energía, el movimiento y las interacciones de la naturaleza.",
explicacion: "Utiliza observaciones, mediciones, experimentos y modelos para explicar fenómenos.",
ejemplo: "Medir la temperatura del agua o estudiar la caída de un objeto.",
palabra: "energia",
practica: "Describe tres fenómenos cotidianos que puedan estudiarse mediante la física."
},
{
concepto: "El movimiento describe cómo cambia la posición de un objeto con respecto al tiempo.",
explicacion: "La velocidad relaciona el desplazamiento con el tiempo y puede expresarse en metros por segundo.",
ejemplo: "Si un objeto recorre 100 metros en 20 segundos, su rapidez media es 5 m/s.",
palabra: "velocidad",
practica: "Calcula la rapidez de un objeto que recorre 60 metros en 10 segundos."
},
{
concepto: "Las leyes de Newton explican la relación entre movimiento, fuerza y masa.",
explicacion: "La segunda ley establece que la fuerza neta es igual a la masa multiplicada por la aceleración.",
ejemplo: "F = m × a. Una masa de 2 kg con aceleración de 3 m/s² requiere una fuerza neta de 6 N.",
palabra: "fuerza",
practica: "Calcula la fuerza necesaria para acelerar una masa de 4 kg a 2 m/s²."
},
{
concepto: "La energía puede transformarse y transferirse, mientras que la electricidad se relaciona con las cargas eléctricas.",
explicacion: "La energía aparece en distintas formas, como cinética, potencial, térmica y eléctrica.",
ejemplo: "Una lámpara transforma energía eléctrica en luz y calor.",
palabra: "energia",
practica: "Describe tres transformaciones de energía que observes en tu hogar."
},
{
concepto: "Un proyecto de física utiliza conceptos, mediciones y experimentos para explicar un fenómeno.",
explicacion: "Debe plantear una pregunta, formular una hipótesis, realizar observaciones y comunicar resultados.",
ejemplo: "Investigar cómo cambia el tiempo de caída de objetos desde diferentes alturas, siguiendo normas de seguridad.",
palabra: "experimento",
practica: "Diseña un experimento sencillo indicando pregunta, materiales, procedimiento y resultado esperado."
}
],

13: [
{
concepto: "La comprensión lectora permite interpretar, analizar y valorar información escrita.",
explicacion: "Incluye identificar ideas principales, reconocer detalles, inferir significados y evaluar argumentos.",
ejemplo: "Leer una noticia y distinguir su idea principal de los datos secundarios.",
palabra: "lectura",
practica: "Elige un texto breve y escribe su idea principal y dos ideas secundarias."
},
{
concepto: "La gramática estudia la organización del lenguaje y la ortografía establece normas para escribir correctamente.",
explicacion: "Incluye categorías gramaticales, concordancia, puntuación, acentuación y estructura de las oraciones.",
ejemplo: "La oración 'Los estudiantes estudian' mantiene concordancia entre sujeto y verbo.",
palabra: "gramatica",
practica: "Escribe cinco oraciones cuidando la concordancia y los signos de puntuación."
},
{
concepto: "La redacción comunica ideas mediante textos organizados, claros y coherentes.",
explicacion: "Un texto puede incluir introducción, desarrollo y conclusión. La revisión permite mejorar su claridad.",
ejemplo: "Un informe presenta el tema, desarrolla información y termina con conclusiones.",
palabra: "redaccion",
practica: "Redacta un párrafo sobre la importancia de la educación."
},
{
concepto: "La literatura expresa experiencias, ideas y emociones mediante diferentes géneros y recursos.",
explicacion: "Entre sus géneros están la narrativa, la poesía y el teatro. Las obras reflejan contextos culturales e históricos.",
ejemplo: "Un cuento narra acontecimientos mediante personajes, ambiente y una secuencia de hechos.",
palabra: "literatura",
practica: "Crea una historia breve con un personaje, un conflicto y un desenlace."
},
{
concepto: "Un proyecto de comunicación integra lectura, escritura, expresión y organización de mensajes.",
explicacion: "El proyecto debe identificar a su público, definir un propósito y seleccionar un formato adecuado.",
ejemplo: "Crear una revista escolar con noticias, entrevistas y artículos.",
palabra: "comunicacion",
practica: "Diseña una propuesta de revista escolar con tres secciones."
}
],

14: [
{
concepto: "El vocabulario básico en inglés permite identificar y utilizar palabras frecuentes en situaciones cotidianas.",
explicacion: "Aprenderás saludos, números, colores, objetos, familia y expresiones habituales.",
ejemplo: "Hello significa hola. Thank you significa gracias. Good morning significa buenos días.",
palabra: "hello",
practica: "Escribe cinco palabras en inglés y su traducción al español."
},
{
concepto: "La gramática inglesa organiza las palabras para construir oraciones con sentido.",
explicacion: "Se estudiarán pronombres, el verbo to be, artículos, plurales y estructuras sencillas.",
ejemplo: "I am a student. She is happy. They are friends.",
palabra: "grammar",
practica: "Escribe tres oraciones en inglés utilizando am, is y are."
},
{
concepto: "Las conversaciones cotidianas utilizan expresiones para saludar, presentarse, preguntar y responder.",
explicacion: "La comunicación requiere escuchar, comprender y utilizar expresiones apropiadas según la situación.",
ejemplo: "A: What is your name? B: My name is Ana.",
palabra: "conversation",
practica: "Escribe un diálogo de cuatro intervenciones para presentarte en inglés."
},
{
concepto: "La lectura y escritura en inglés permiten comprender textos y comunicar información.",
explicacion: "Es importante identificar vocabulario, comprender ideas principales y construir oraciones sencillas.",
ejemplo: "My school is big. I study English every day.",
palabra: "reading",
practica: "Escribe un párrafo de cuatro oraciones sobre tu rutina diaria en inglés."
},
{
concepto: "Un proyecto final de inglés integra vocabulario, gramática, lectura y comunicación.",
explicacion: "Puedes preparar una presentación personal, una descripción de tu comunidad o un diálogo sobre actividades diarias.",
ejemplo: "Una presentación puede incluir nombre, edad, intereses y actividades favoritas.",
palabra: "project",
practica: "Prepara una presentación breve en inglés sobre ti y tus intereses."
}
],

15: [
{
concepto: "El emprendimiento consiste en identificar oportunidades y organizar recursos para crear una iniciativa que genere valor.",
explicacion: "Un emprendimiento requiere creatividad, planificación, responsabilidad y conocimiento de las necesidades de las personas.",
ejemplo: "Crear un servicio de tutorías para estudiantes de una comunidad.",
palabra: "emprendimiento",
practica: "Describe una necesidad de tu comunidad que podría convertirse en un emprendimiento."
},
{
concepto: "Las ideas y oportunidades de negocio surgen al observar necesidades y proponer soluciones útiles.",
explicacion: "Se pueden evaluar clientes, competencia, recursos, costos y posibilidades de crecimiento.",
ejemplo: "Identificar que en una zona hacen falta entregas de productos escolares.",
palabra: "oportunidad",
practica: "Propón tres ideas de negocio y explica qué necesidad atendería cada una."
},
{
concepto: "El plan de negocios organiza los objetivos, clientes, propuesta de valor, recursos y estrategias de una iniciativa.",
explicacion: "Puede incluir descripción del negocio, estudio de mercado, operaciones, presupuesto y proyecciones.",
ejemplo: "Un plan para una cafetería describe sus productos, clientes, costos y forma de promoción.",
palabra: "plan",
practica: "Elabora un esquema de plan de negocios para una idea propia."
},
{
concepto: "El marketing y las ventas permiten comunicar el valor de un producto y establecer relaciones con clientes.",
explicacion: "Se estudian el público objetivo, producto, precio, distribución, promoción y atención al cliente.",
ejemplo: "Una campaña puede presentar los beneficios de un producto mediante redes sociales.",
palabra: "marketing",
practica: "Diseña una estrategia sencilla para promocionar un producto."
},
{
concepto: "Un proyecto emprendedor integra una idea, un plan, recursos, estrategias y evaluación de resultados.",
explicacion: "El proyecto debe demostrar qué problema resuelve, quiénes son sus clientes y cómo puede mantenerse.",
ejemplo: "Presentar un pequeño negocio con presupuesto, propuesta de valor y estrategia de promoción.",
palabra: "proyecto",
practica: "Prepara una propuesta de emprendimiento con nombre, producto, clientes y presupuesto inicial."
}
]
};

// ==========================================
// 3. VALIDAR MATERIAS
// ==========================================

if (!Array.isArray(materias) || materias.length !== 15) {
    console.error("EVA necesita las 15 materias de js/data.js.");
}

function obtenerContenido(idMateria, numeroModulo) {
    const lista = contenidosEVA[String(idMateria)];
    return lista ? lista[numeroModulo] : null;
}

// ==========================================
// 4. INICIAR SESION
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
    if (nombre) nombre.textContent = usuario;

    mostrarInicio();
}

// ==========================================
// 5. PANEL PRINCIPAL
// ==========================================

function contarCompletados() {
    return Object.values(progreso).reduce((total, lista) => {
        return total + (Array.isArray(lista) ? lista.length : 0);
    }, 0);
}

function mostrarInicio() {
    const total = materias.reduce((suma, m) => suma + m.modulos.length, 0);
    const completados = contarCompletados();
    const porcentaje = Math.round(completados / total * 100);

    main.innerHTML = `
        <section class="card">
            <h1>🚀 ¡Bienvenido a EVA, ${escapar(usuario)}!</h1>
            <p>Tu conocimiento, tu futuro.</p>
            <h2>🌌 Aprende. Practica. Supera tus límites.</h2>
            <button onclick="mostrarMaterias()">Explorar mis materias →</button>
        </section>

        <div class="card">
            <h2>📚 Materias disponibles</h2>
            <h1>${materias.length}</h1>
        </div>

        <div class="card">
            <h2>📖 Módulos disponibles</h2>
            <h1>${total}</h1>
        </div>

        <div class="card">
            <h2>🏆 Módulos completados</h2>
            <h1>${completados}</h1>
        </div>

        <div class="card">
            <h2>⚡ Progreso general</h2>
            <h1>${porcentaje}%</h1>
            <progress value="${porcentaje}" max="100"></progress>
        </div>

        <div class="card">
            <h2>🎓 Mi aprendizaje</h2>
            <button onclick="mostrarMaterias()">📚 Ver materias</button>
            <button onclick="mostrarProgreso()">📊 Ver progreso</button>
            <button onclick="mostrarDiplomas()">🏆 Mis certificados</button>
        </div>
    `;
}

// ==========================================
// 6. MOSTRAR MATERIAS
// ==========================================

function mostrarMaterias() {
    main.innerHTML = `
        <h1>📚 Mis 15 materias</h1>
        <p>Selecciona una asignatura para entrar a tu aula virtual.</p>

        <div class="subjects-container">
            ${materias.map(m => {
                const completados = progreso[m.id]?.length || 0;

                return `
                    <div class="subject-card"
                         onclick="mostrarModulos('${escapar(m.id)}')">
                        <h1>${escapar(m.icono)}</h1>
                        <h3>${escapar(m.nombre)}</h3>
                        <p>${escapar(m.description)}</p>
                        <p>📖 5 módulos</p>
                        <p>✅ ${completados}/5 completados</p>
                        <progress value="${completados}" max="5"></progress>
                        <button>Entrar al aula →</button>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// ==========================================
// 7. MOSTRAR MODULOS
// ==========================================

function mostrarModulos(idMateria) {
    const materia = materias.find(m => String(m.id) === String(idMateria));
    if (!materia) return;

    main.innerHTML = `
        <button onclick="mostrarMaterias()">⬅ Volver a materias</button>

        <h1>${escapar(materia.icono)} ${escapar(materia.nombre)}</h1>
        <p>${escapar(materia.description)}</p>

        <h2>📖 Módulos de aprendizaje</h2>

        ${materia.modulos.map((modulo, i) => {
            const terminado = progreso[idMateria]?.includes(i);
            const nota = calificaciones[idMateria + "-" + i];

            return `
                <div class="module-card"
                     onclick="abrirModulo('${escapar(idMateria)}', ${i})">
                    <h3>📘 Módulo ${i + 1}</h3>
                    <h3>${escapar(nombreModulo(modulo))}</h3>
                    <p>${terminado ? "🏆 Aprobado" : "🔓 Disponible"}</p>
                    ${nota !== undefined ? `<p>Calificación: ${nota}/10</p>` : ""}
                    <button>Ingresar al módulo →</button>
                </div>
            `;
        }).join("")}
    `;
}

// ==========================================
// 8. ABRIR MODULO
// ==========================================

function abrirModulo(idMateria, numeroModulo) {
    const materia = materias.find(m => String(m.id) === String(idMateria));
    if (!materia) return;

    const modulo = materia.modulos[numeroModulo];
    const titulo = nombreModulo(modulo);
    const contenido = obtenerContenido(idMateria, numeroModulo);

    if (!contenido) {
        alert("No se encontró el contenido de este módulo.");
        return;
    }

    const clave = idMateria + "-" + numeroModulo;
    const notaGuardada = calificaciones[clave];

    main.innerHTML = `
        <button onclick="mostrarModulos('${escapar(idMateria)}')">
            ⬅ Volver al aula
        </button>

        <section class="lesson-container">

            <div class="card">
                <h1>📘 ${escapar(titulo)}</h1>
                <h2>${escapar(materia.nombre)}</h2>
                <p>Bienvenido a tu módulo de aprendizaje.</p>
            </div>

            <div class="card">
                <h2>🎯 Objetivo de aprendizaje</h2>
                <p>${escapar(contenido.concepto)}</p>
            </div>

            <div class="card">
                <h2>📚 Lección educativa</h2>
                <p>${escapar(contenido.explicacion)}</p>
            </div>

            <div class="card">
                <h2>💡 Ejemplo práctico</h2>
                <pre style="white-space:pre-wrap;">${escapar(contenido.ejemplo)}</pre>
            </div>

            <div class="card">
                <h2>🧠 Actividad 1: Opción múltiple</h2>
                <p>Selecciona la respuesta que mejor representa lo aprendido.</p>

                <p><strong>¿Cuál afirmación describe mejor el tema de este módulo?</strong></p>

                <label class="eva-opcion">
                    <input type="radio" name="eva-mc" value="0">
                    ${escapar(contenido.concepto)}
                </label>

                <label class="eva-opcion">
                    <input type="radio" name="eva-mc" value="1">
                    Es un tema que no tiene aplicaciones prácticas.
                </label>

                <label class="eva-opcion">
                    <input type="radio" name="eva-mc" value="2">
                    Es un procedimiento que solamente sirve para decorar equipos.
                </label>

                <label class="eva-opcion">
                    <input type="radio" name="eva-mc" value="3">
                    Es una actividad sin relación con la asignatura.
                </label>
            </div>

            <div class="card">
                <h2>✅ Actividad 2: Verdadero o falso</h2>

                <p>1. ${escapar(contenido.concepto)}</p>

                <label>
                    <input type="radio" name="eva-vf1" value="true">
                    Verdadero
                </label>

                <label>
                    <input type="radio" name="eva-vf1" value="false">
                    Falso
                </label>

                <p>2. El contenido de este módulo no tiene ninguna utilidad práctica.</p>

                <label>
                    <input type="radio" name="eva-vf2" value="true">
                    Verdadero
                </label>

                <label>
                    <input type="radio" name="eva-vf2" value="false">
                    Falso
                </label>
            </div>

            <div class="card">
                <h2>✍️ Actividad 3: Completa la palabra</h2>
                <p>Escribe la palabra clave del tema:</p>
                <input id="eva-completar" type="text"
                       placeholder="Escribe la palabra">
            </div>

            <div class="card">
                <h2>💻 Actividad 4: Reto práctico</h2>
                <p>${escapar(contenido.practica)}</p>
                <textarea id="eva-practica" rows="5"
                    placeholder="Escribe aquí tu respuesta..."></textarea>
            </div>

            <div class="card">
                <h2>📝 Evaluación final</h2>
                <p>Responde todas las actividades y revisa tu nota.</p>
                <button onclick="evaluarModulo('${escapar(idMateria)}', ${numeroModulo})">
                    Corregir y calcular mi nota
                </button>
                <div id="resultado-modulo">
                    ${notaGuardada !== undefined
                        ? `<p>Última nota registrada: ${notaGuardada}/10</p>`
                        : ""}
                </div>
            </div>

            <div class="card">
                <h2>🎬 Recurso educativo</h2>
                <p>Busca explicaciones adicionales sobre este tema.</p>
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(materia.nombre + " " + titulo + " explicación")}"
                   target="_blank" rel="noopener">
                    <button>▶ Buscar videos educativos</button>
                </a>
            </div>

            <div class="card">
                <h2>🏆 Finalizar módulo</h2>
                <p>Para aprobar necesitas obtener al menos 7/10 y completar tu reto práctico.</p>
                <button id="boton-completar"
                    onclick="completarModulo('${escapar(idMateria)}', ${numeroModulo})"
                    ${progreso[idMateria]?.includes(numeroModulo) ? "" : "disabled"}>
                    ${progreso[idMateria]?.includes(numeroModulo)
                        ? "✅ Módulo aprobado"
                        : "🔒 Completa y aprueba las actividades"}
                </button>
            </div>

        </section>
    `;
}

// ==========================================
// 9. EVALUAR MODULO
// ==========================================

function evaluarModulo(idMateria, numeroModulo) {
    const contenido = obtenerContenido(idMateria, numeroModulo);
    const clave = idMateria + "-" + numeroModulo;

    const mc = document.querySelector('input[name="eva-mc"]:checked');
    const vf1 = document.querySelector('input[name="eva-vf1"]:checked');
    const vf2 = document.querySelector('input[name="eva-vf2"]:checked');

    const completar = document.getElementById("eva-completar").value.trim().toLowerCase();
    const practica = document.getElementById("eva-practica").value.trim();

    if (!mc || !vf1 || !vf2 || !completar || !practica) {
        alert("Completa todas las actividades antes de corregir.");
        return;
    }

    let puntos = 0;

    // Opción múltiple: 3 puntos
    if (mc.value === "0") puntos += 3;

    // Verdadero y falso: 2 puntos cada uno
    if (vf1.value === "true") puntos += 2;
    if (vf2.value === "false") puntos += 2;

    // Completar palabra: 3 puntos
    if (completar === contenido.palabra.toLowerCase()) {
        puntos += 3;
    }

    const nota = Number(puntos.toFixed(2));

    calificaciones[clave] = nota;
    respuestasPracticas[clave] = practica;
    guardarDatos();

    const resultado = document.getElementById("resultado-modulo");

    resultado.innerHTML = `
        <div class="card">
            <h2>📊 Resultado de evaluación</h2>
            <h1>${nota}/10</h1>
            <p>Opción múltiple: ${mc.value === "0" ? "Correcto" : "Incorrecto"}</p>
            <p>Verdadero y falso: ${Number(vf1.value === "true") + Number(vf2.value === "false")} de 2 correctas</p>
            <p>Completar palabra: ${completar === contenido.palabra.toLowerCase() ? "Correcto" : "Incorrecto"}</p>
            <p>${nota >= 7
                ? "¡Excelente! Has aprobado la evaluación. 🎉"
                : "Necesitas obtener al menos 7/10. Revisa la lección y vuelve a intentarlo."}
            </p>
        </div>
    `;

    const boton = document.getElementById("boton-completar");

    if (nota >= 7 && practica.length >= 10) {
        boton.disabled = false;
        boton.textContent = "🏆 Aprobar y completar módulo";
    } else {
        boton.disabled = true;
        boton.textContent = "🔒 Necesitas aprobar y completar tu práctica";
    }
}

// ==========================================
// 10. COMPLETAR MODULO
// ==========================================

function completarModulo(idMateria, numeroModulo) {
    const clave = idMateria + "-" + numeroModulo;
    const nota = calificaciones[clave];
    const practica = respuestasPracticas[clave];

    if (nota === undefined || nota < 7 || !practica || practica.length < 10) {
        alert("Primero debes aprobar la evaluación y completar el reto práctico.");
        return;
    }

    if (!progreso[idMateria]) progreso[idMateria] = [];

    if (!progreso[idMateria].includes(numeroModulo)) {
        progreso[idMateria].push(numeroModulo);
    }

    guardarDatos();

    alert("¡Felicitaciones! Has aprobado este módulo. 🎉");
    mostrarModulos(idMateria);
}

// ==========================================
// 11. MOSTRAR PROGRESO
// ==========================================

function mostrarProgreso() {
    const completados = contarCompletados();
    const total = 75;
    const porcentaje = Math.round(completados / total * 100);

    main.innerHTML = `
        <h1>📊 Mi progreso académico</h1>

        <div class="card">
            <h2>🏆 Avance general</h2>
            <h1>${completados} / ${total}</h1>
            <h2>${porcentaje}%</h2>
            <progress value="${completados}" max="${total}"></progress>
        </div>

        <h2>📚 Avance por materia</h2>

        ${materias.map(m => {
            const cantidad = progreso[m.id]?.length || 0;
            const notas = m.modulos.map((_, i) => calificaciones[m.id + "-" + i])
                .filter(n => n !== undefined);

            const promedio = notas.length
                ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2)
                : "Sin notas";

            return `
                <div class="card">
                    <h3>${escapar(m.icono)} ${escapar(m.nombre)}</h3>
                    <p>${cantidad} de 5 módulos aprobados</p>
                    <progress value="${cantidad}" max="5"></progress>
                    <p>Promedio de evaluaciones: ${promedio}</p>
                </div>
            `;
        }).join("")}

        <button onclick="mostrarInicio()">Volver al inicio</button>
    `;
}

// ==========================================
// 12. CERTIFICADOS
// ==========================================

function mostrarDiplomas() {
    main.innerHTML = `
        <h1>🏆 Mis certificados</h1>
        <p>Aprueba los cinco módulos de cada materia para obtener su certificado.</p>

        ${materias.map(m => {
            const cantidad = progreso[m.id]?.length || 0;
            const aprobado = cantidad === 5;

            return `
                <div class="card">
                    <h2>${escapar(m.icono)} ${escapar(m.nombre)}</h2>
                    <p>${cantidad} de 5 módulos aprobados</p>
                    ${aprobado
                        ? `<p>🏆 ¡Materia aprobada!</p>
                           <button onclick="imprimirCertificado('${escapar(m.id)}')">
                               Descargar / imprimir certificado
                           </button>`
                        : "<p>🔒 Certificado pendiente</p>"
                    }
                </div>
            `;
        }).join("")}
    `;
}

function imprimirCertificado(idMateria) {
    const materia = materias.find(m => String(m.id) === String(idMateria));

    if (!materia || (progreso[idMateria]?.length || 0) !== 5) {
        alert("Debes aprobar los cinco módulos para obtener el certificado.");
        return;
    }

    const ventana = window.open("", "_blank");

    if (!ventana) {
        alert("Permite las ventanas emergentes para imprimir el certificado.");
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
                    font-family: Georgia, serif;
                    text-align: center;
                    padding: 45px;
                    color: #17223a;
                }
                .certificado {
                    border: 10px double #9870ff;
                    padding: 45px;
                    min-height: 400px;
                }
                h1 { color: #6040a0; font-size: 36px; }
                h2 { font-size: 27px; }
                .nombre { font-size: 30px; font-weight: bold; }
                .firma { margin-top: 65px; }
                @media print {
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="certificado">
                <h1>🚀 EVA</h1>
                <h2>CERTIFICADO DE APROBACIÓN</h2>
                <p>Se certifica que</p>
                <p class="nombre">${escapar(usuario)}</p>
                <p>Ha completado satisfactoriamente los cinco módulos de:</p>
                <h2>${escapar(materia.nombre)}</h2>
                <p>Entorno Virtual de Aprendizaje</p>
                <p class="firma">EVA - Formación y aprendizaje</p>
                <p>Fecha: ${new Date().toLocaleDateString("es-EC")}</p>
            </div>
            <br>
            <button onclick="window.print()">Imprimir o guardar como PDF</button>
        </body>
        </html>
    `);

    ventana.document.close();
}

// ==========================================
// 13. RECUPERAR SESION
// ==========================================

window.addEventListener("DOMContentLoaded", function() {
    const usuarioGuardado = localStorage.getItem("eva_usuario");

    if (usuarioGuardado) {
        usuario = usuarioGuardado;
        entrarPlataforma();
    }
});
