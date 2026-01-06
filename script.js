window.onload = function() {
    const canvas = document.getElementById('solarCanvas');
    const ctx = canvas.getContext('2d');
    const clockEl = document.getElementById('clock');
    const infoBox = document.getElementById('info-box');

    let zoom = 0.6; 

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Zoom con rueda
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        changeZoom(e.deltaY > 0 ? 0.9 : 1.1);
    }, { passive: false });

    window.changeZoom = function(factor) {
        const newZoom = zoom * factor;
        if (newZoom > 0.15 && newZoom < 8) zoom = newZoom;
    };

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const sunData = {
        name: "Sol", radius: 22,
        facts: ["99.86% de la masa del sistema solar.", "Luz tarda 8 min 20 seg en llegar.", "Fusiona hidrógeno en helio.", "Su gravedad mantiene unido al sistema.", "En el futuro será una gigante roja."],
        techs: ["Temp: 15M °C núcleo.", "Edad: 4.6 mil millones años.", "Diámetro: 109x Tierra.", "Gravedad: 274 m/s².", "Tipo: Enana Amarilla."]
    };

    const planets = [
        { name: "Mercurio", color: "#A5A5A5", dist: 60, size: 3, period: 87.97, facts: ["Más pequeño del sistema.", "Superficie lunar.", "Se está encogiendo.", "Día de 59 días terrestres.", "Hielo en polos."], techs: ["Órbita: 88 días.", "Sin atmósfera.", "Temp: -180 a 430°C.", "Vel: 47.4 km/s.", "Lunas: 0."] },
        { name: "Venus", color: "#E3BB76", dist: 95, size: 5.5, period: 224.7, facts: ["El más caliente.", "Gira al revés.", "Día más largo que el año.", "Brillante como lucero.", "Miles de volcanes."], techs: ["Temp: 462°C.", "Presión: 92x Tierra.", "CO2: 96%.", "Rotación: 6.5 km/h.", "Lunas: 0."] },
        { name: "Tierra", color: "#2271B3", dist: 135, size: 6, period: 365.26, facts: ["Nuestro hogar.", "70% agua líquida.", "Planeta más denso.", "Atmósfera con oxígeno.", "Campo magnético vital."], techs: ["Dist: 1 UA.", "Vel: 29.8 km/s.", "Eje: 23.4°.", "Diám: 12,756 km.", "Lunas: 1."] },
        { name: "Marte", color: "#E27B58", dist: 180, size: 4.5, period: 686.98, facts: ["El planeta rojo.", "Monte Olimpo gigante.", "Atardeceres azules.", "Tiene estaciones.", "Cañón Valles Marineris."], techs: ["Gravedad: 3.7 m/s².", "Atmósfera fina CO2.", "Temp: -63°C.", "Dist: 1.52 UA.", "Lunas: 2."] },
        { name: "Júpiter", color: "#D39C7E", dist: 250, size: 14, period: 4332.59, facts: ["Caben 1,300 Tierras.", "Gran Mancha Roja.", "Día de 10 horas.", "Escudo de asteroides.", "Gigante gaseoso."], techs: ["Masa: 318x Tierra.", "Magnetismo 14x T.", "Hidrógeno y Helio.", "Año: 11.8 años T.", "Lunas: 95."] },
        { name: "Saturno", color: "#C5AB6E", dist: 320, size: 12, period: 10759.22, facts: ["Anillos de hielo.", "Flotaría en agua.", "Tormenta hexagonal.", "Vientos 1,800 km/h.", "Lunas fascinantes."], techs: ["Lunas: 146.", "Dist: 9.5 UA.", "Día: 10.7 horas.", "Año: 29.4 años T.", "Anillos: 282k km."] },
        { name: "Urano", color: "#BBE1E4", dist: 390, size: 9, period: 30688.5, facts: ["Gira sobre su costado.", "Primer hallazgo con telescopio.", "Atmósfera gélida.", "Huele a azufre.", "Anillos oscuros."], techs: ["Temp min: -224°C.", "Eje: 98°.", "Hielo y roca.", "Año: 84 años T.", "Lunas: 27."] },
        { name: "Neptuno", color: "#6081FF", dist: 460, size: 9, period: 60182, facts: ["Más lejano al Sol.", "Vientos supersónicos.", "Hallado con matemáticas.", "Azul metano intenso.", "Luna Tritón volcánica."], techs: ["Año: 165 años T.", "Dist: 30 UA.", "Gravedad: 11.15 m/s².", "Día: 16 horas T.", "Lunas: 14."] }
    ];

    function draw() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --- ESCALA ADAPTATIVA ---
        // En móviles (pantalla estrecha), aumentamos la escala base para que no se vea minúsculo
        const isMobile = canvas.width < 600;
        const baseScale = isMobile 
            ? Math.min(canvas.width, canvas.height) / 700 
            : Math.min(canvas.width, canvas.height) / 1100;
            
        const currentScale = baseScale * zoom;
        const centerX = canvas.width / 2;
        const centerY = (canvas.height / 2) + (isMobile ? 0 : 30);

        const now = new Date();
        clockEl.innerText = now.toLocaleString('es-ES').replace(',', ' |');

        const msInDay = 86400000;
        const currentTime = now.getTime();

        // Sol
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunData.radius * currentScale, 0, Math.PI * 2);
        ctx.fillStyle = "#ffcc00";
        ctx.shadowBlur = 60 * currentScale;
        ctx.shadowColor = "#ffcc00";
        ctx.fill();
        ctx.shadowBlur = 0;

        planets.forEach(p => {
            const scaledDist = p.dist * currentScale * 1.3; 
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, scaledDist, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.stroke();

            const angle = (currentTime % (p.period * msInDay) / (p.period * msInDay)) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * scaledDist;
            const y = centerY + Math.sin(angle) * scaledDist;

            ctx.beginPath();
            ctx.arc(x, y, p.size * currentScale, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 20 * currentScale;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Nombre (Solo si no está demasiado lejos)
            if (currentScale > 0.1) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.font = `bold ${Math.max(8, 12 * currentScale)}px Segoe UI, sans-serif`;
                ctx.fillText(p.name, x, y - (p.size * currentScale) - 10);
            }

            p.lastX = x; p.lastY = y; p.lastSize = p.size * currentScale;
        });

        requestAnimationFrame(draw);
    }

    function openInfo(data) {
        document.getElementById('planet-name').innerText = data.name;
        document.getElementById('planet-fact').innerText = getRandomItem(data.facts);
        document.getElementById('planet-tech').innerText = getRandomItem(data.techs);
        infoBox.classList.add('active');
    }

    // Soporte para Mouse y Touch
    const checkClick = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const isMobile = canvas.width < 600;
        const baseScale = isMobile ? Math.min(canvas.width, canvas.height) / 700 : Math.min(canvas.width, canvas.height) / 1100;
        const currentScale = baseScale * zoom;

        const distSun = Math.sqrt((mouseX - canvas.width/2)**2 + (mouseY - ((canvas.height/2) + (isMobile ? 0 : 30)))**2);
        if (distSun < (sunData.radius * currentScale) + 15) return openInfo(sunData);

        let found = false;
        planets.forEach(p => {
            const d = Math.sqrt((mouseX - p.lastX)**2 + (mouseY - p.lastY)**2);
            if (d < p.lastSize + 25) { openInfo(p); found = true; }
        });
        if (!found) infoBox.classList.remove('active');
    };

    canvas.addEventListener('mousedown', (e) => checkClick(e.clientX, e.clientY));
    canvas.addEventListener('touchstart', (e) => checkClick(e.touches[0].clientX, e.touches[0].clientY));

    draw();
};

function closeInfoBox() { document.getElementById('info-box').classList.remove('active'); }