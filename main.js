document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav - Handled in components.js

    // Snow Effect
    const canvas = document.getElementById('snow-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const snowflakes = [];
        const snowflakeCount = 100;

        class Snowflake {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initSnow() {
            for (let i = 0; i < snowflakeCount; i++) {
                snowflakes.push(new Snowflake());
            }
        }

        function animateSnow() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snowflakes.forEach(flake => {
                flake.update();
                flake.draw();
            });
            requestAnimationFrame(animateSnow);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        initSnow();
        animateSnow();
    }

    // Dynamic Weather
    const weatherContainer = document.getElementById('weather-display');
    if (weatherContainer) {
        // Coordinates for Logan, Utah
        const lat = 41.7370;
        const long = -111.8338;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`)
            .then(response => response.json())
            .then(data => {
                const temp = Math.round(data.current.temperature_2m);
                // Simple mapping for demonstration of "snow chance" logic or just showing current condition
                // Weather codes: https://open-meteo.com/en/docs
                // We'll keep the "Chance of Snow" as a fun mock or derive it broadly, 
                // but let's update the temp and maybe the text.

                const code = data.current.weather_code;
                let condition = "Clear";
                if (code >= 71 && code <= 77) condition = "Snowing";
                else if (code >= 51 && code <= 67) condition = "Raining";
                else if (code >= 1 && code <= 3) condition = "Cloudy";

                weatherContainer.innerHTML = `
                    <img src="assets/images/icon_snowflake.png" style="height: 24px;"> 
                    Logan, UT: ${temp}°F | ${condition}
                `;
            })
            .catch(err => {
                console.error("Weather fetch failed", err);
                weatherContainer.innerHTML = `
                     <img src="assets/images/icon_snowflake.png" style="height: 24px;"> 
                     Logan, UT: 28°F (Offline)
                `;
            });
    }
});
