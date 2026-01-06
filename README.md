Aquí tienes una versión profesional, visual y optimizada para el archivo `README.md` de tu repositorio. Incluye insignias (badges), una estructura clara y bloques de código para resaltar tu trabajo.

---

# 🌌 Sistema Solar Interactivo en Tiempo Real

Una recreación dinámica y educativa del sistema solar desarrollada con **HTML5 Canvas**, **CSS3** y **JavaScript**. Este proyecto simula el movimiento orbital de los planetas basándose en el tiempo real astronómico y ofrece una interfaz interactiva y responsiva para explorar el cosmos.

---

## 🚀 Características Principales

### 🌍 Simulación Astronómica Real

* **Movimiento en Tiempo Real**: Las posiciones planetarias se calculan matemáticamente según los milisegundos transcurridos en el año actual.
* **Precisión Orbital**: Se respetan los periodos orbitales proporcionales de cada cuerpo celeste para una simulación fiel.

### 🛠️ Interactividad y Exploración

* **Enciclopedia Dinámica**: Haz clic en el Sol o cualquier planeta para desplegar tarjetas de información detallada.
* **Datos Aleatorios**: Cada interacción genera un nuevo dato curioso o técnico de una base de datos con más de 80 entradas.
* **Navegación Intuitiva**: Control de zoom mediante la rueda del ratón o botones dedicados (+/-) para explorar desde el Sol hasta Neptuno.

### 🎨 Estética Visual Avanzada

* **Efectos Glow**: Resplandor dinámico personalizado para cada planeta basado en su color característico.
* **Glassmorphism**: Interfaz de usuario con estilo de cristal esmerilado utilizando filtros de desenfoque de fondo.
* **Diseño Responsivo**: Adaptación total a dispositivos móviles y escritorio mediante escalado automático del lienzo y Media Queries.

---

## 📐 Lógica Matemática de las Órbitas

Para lograr que el movimiento sea astronómicamente coherente, se implementó la siguiente fórmula para determinar la posición de cada planeta en el canvas:Ç
$$\text{Ángulo} = \left( \frac{\text{Tiempo Actual (ms)} \pmod{\text{Periodo Orbital (ms)}}}{\text{Periodo Orbital (ms)}} \right) \times 2\pi$$

## ✒️ Autor

Proyecto creado con pasión por **Sebastián Fernández Buelvas**.
