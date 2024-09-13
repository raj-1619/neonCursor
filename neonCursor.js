document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Ensure canvas doesn't block other mouse events
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let drawing = false; // State to control drawing

    function draw(x, y) {
        if (!drawing) return;
        ctx.globalCompositeOperation = 'source-over'; // Default composite operation to draw new elements
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowBlur = 20; // Adjust for stronger/weaker glow
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        lastX = x;
        lastY = y;
        hue = (hue + 1) % 360; // Change color over time
    }

    function fadeOut() {
        ctx.globalCompositeOperation = 'destination-out'; // Apply fading only to the existing drawn elements
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Gradually fade existing content
    }

    document.addEventListener('mousemove', (e) => {
        if (!drawing) {
            lastX = e.clientX;
            lastY = e.clientY;
            drawing = true; // Start drawing
        }
        requestAnimationFrame(() => draw(e.clientX, e.clientY));
    });

    // Fade out the lines slowly
    setInterval(fadeOut, 100); // Adjust this interval to control the speed of fading
});
