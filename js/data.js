
const subjects = [
  {
    id: 1,
    name: "Programación y Desarrollo de Software",
    icon: "💻",
    color: "#6558d9",
    description: "Aprende lógica, algoritmos y programación.",
    modules: [
      "Introducción a la programación",
      "Variables y tipos de datos",
      "Condicionales y operadores",
      "Ciclos y funciones",
      "Proyecto final de programación"
    ]
  },
  {
    id: 2,
    name: "Diseño y Desarrollo Web",
    icon: "🌐",
    color: "#22a6b8",
    description: "Diseña y construye páginas web.",
    modules: [
      "Fundamentos de la web",
      "HTML y estructura web",
      "CSS y diseño visual",
      "JavaScript interactivo",
      "Proyecto web final"
    ]
  },
  {
    id: 3,
    name: "Bases de Datos",
    icon: "🗄️",
    color: "#e69b37",
    description: "Aprende a almacenar, organizar y administrar información.",
    modules: [
      "Introducción a las bases de datos",
      "Modelado de datos",
      "SQL básico",
      "Consultas y administración",
      "Proyecto de base de datos"
    ]
  },
  {
    id: 4,
    name: "Sistemas Operativos",
    icon: "🖥️",
    color: "#46a878",
    description: "Comprende el funcionamiento de los sistemas operativos.",
    modules: [
      "Fundamentos de sistemas operativos",
      "Procesos y tareas",
      "Memoria y almacenamiento",
      "Instalación y configuración",
      "Administración de sistemas"
    ]
  },
  {
    id: 5,
    name: "Redes y Conectividad",
    icon: "📡",
    color: "#4785d6",
    description: "Conoce las redes y la comunicación digital.",
    modules: [
      "Fundamentos de redes",
      "Tipos y topologías",
      "Direcciones IP",
      "Configuración de redes",
      "Proyecto de conectividad"
    ]
  },
  {
    id: 6,
    name: "Soporte Técnico y Mantenimiento",
    icon: "🔧",
    color: "#db765c",
    description: "Diagnostica y soluciona problemas tecnológicos.",
    modules: [
      "Fundamentos del soporte técnico",
      "Hardware y componentes",
      "Diagnóstico de problemas",
      "Mantenimiento preventivo",
      "Práctica de soporte técnico"
    ]
  },
  {
    id: 7,
    name: "Aplicaciones Ofimáticas",
    icon: "📊",
    color: "#39a69b",
    description: "Desarrolla habilidades en herramientas de oficina.",
    modules: [
      "Introducción a la ofimática",
      "Procesadores de texto",
      "Hojas de cálculo",
      "Presentaciones digitales",
      "Proyecto ofimático"
    ]
  },
  {
    id: 8,
    name: "Seguridad Informática",
    icon: "🔐",
    color: "#d95776",
    description: "Protege sistemas, información y usuarios.",
    modules: [
      "Fundamentos de ciberseguridad",
      "Amenazas digitales",
      "Protección de datos",
      "Seguridad de dispositivos",
      "Proyecto de seguridad"
    ]
  },
  {
    id: 9,
    name: "Inteligencia Artificial Aplicada",
    icon: "🤖",
    color: "#9065cf",
    description: "Explora herramientas y aplicaciones de inteligencia artificial.",
    modules: [
      "Introducción a la inteligencia artificial",
      "Aprendizaje automático",
      "IA generativa",
      "Herramientas de inteligencia artificial",
      "Proyecto de inteligencia artificial"
    ]
  },
  {
    id: 10,
    name: "Ética, Legislación y Ciudadanía Digital",
    icon: "⚖️",
    color: "#627a95",
    description: "Aprende a convivir responsablemente en entornos digitales.",
    modules: [
      "Ciudadanía digital",
      "Ética tecnológica",
      "Privacidad y datos",
      "Derechos digitales",
      "Proyecto de ciudadanía digital"
    ]
  },
  {
    id: 11,
    name: "Matemáticas",
    icon: "➗",
    color: "#4c90c8",
    description: "Fortalece el pensamiento lógico y matemático.",
    modules: [
      "Fundamentos matemáticos",
      "Álgebra",
      "Funciones y ecuaciones",
      "Geometría",
      "Resolución de problemas"
    ]
  },
  {
    id: 12,
    name: "Física",
    icon: "⚛️",
    color: "#dc9147",
    description: "Comprende los principios físicos del mundo.",
    modules: [
      "Introducción a la física",
      "Movimiento y velocidad",
      "Fuerza y leyes de Newton",
      "Energía y electricidad",
      "Proyecto de física"
    ]
  },
  {
    id: 13,
    name: "Lengua y Literatura",
    icon: "📖",
    color: "#a76b92",
    description: "Mejora la lectura, escritura y comunicación.",
    modules: [
      "Comprensión lectora",
      "Gramática y ortografía",
      "Redacción",
      "Literatura",
      "Proyecto de comunicación"
    ]
  },
  {
    id: 14,
    name: "Inglés",
    icon: "🇬🇧",
    color: "#557bd1",
    description: "Desarrolla habilidades en el idioma inglés.",
    modules: [
      "Basic vocabulary",
      "Grammar foundations",
      "Daily conversations",
      "Reading and writing",
      "Final English project"
    ]
  },
  {
    id: 15,
    name: "Emprendimiento y Gestión",
    icon: "💡",
    color: "#48a879",
    description: "Aprende a crear y gestionar ideas de negocio.",
    modules: [
      "Fundamentos del emprendimiento",
      "Ideas y oportunidades",
      "Plan de negocios",
      "Marketing y ventas",
      "Proyecto emprendedor"
    ]
  }
];
const materias = subjects.map(materia => ({
    ...materia,
    nombre: materia.name,
    icono: materia.icon,
    modulos: materia.modules
}));
