document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);

    // Navbar Scrolled State
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Interactions
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // Squad Data Mocks (2025/2026 approximation)
    const squadData = {
        atacantes: [
            { name: "Robert Lewandowski", number: "9", pos: "Centroavante" },
            { name: "Lamine Yamal", number: "19", pos: "Ponta Direita" },
            { name: "Raphinha", number: "11", pos: "Ponta Esquerda" },
            { name: "Ferran Torres", number: "7", pos: "Atacante" },
        ],
        meias: [
            { name: "Pedri", number: "8", pos: "Meio-Campista" },
            { name: "Gavi", number: "6", pos: "Meio-Campista Central"},
            { name: "Frenkie de Jong", number: "21", pos: "Meio-Campista" },
            { name: "Dani Olmo", number: "20", pos: "Meia-Atacante" }
        ],
        defensores: [
            { name: "Ronald Araujo", number: "4", pos: "Zagueiro" },
            { name: "Pau Cubarsí", number: "2", pos: "Zagueiro" },
            { name: "Jules Koundé", number: "23", pos: "Lateral / Zagueiro" },
            { name: "Alejandro Balde", number: "3", pos: "Lateral Esquerdo" }
        ]
    };

    const squadContainer = document.getElementById('squad-container');
    const tabBtns = document.querySelectorAll('.tab-btn');

    function renderSquad(category) {
        squadContainer.style.opacity = '0';
        
        setTimeout(() => {
            squadContainer.innerHTML = '';
            const players = squadData[category];
            
            players.forEach((player, index) => {
                const delay = index * 0.1;
                const cardHtml = `
                    <div class="player-card" style="animation: fadeInUp 0.5s ease forwards ${delay}s; opacity: 0; transform: translateY(20px);">
                        <div class="player-number">${player.number}</div>
                        <div class="player-img-placeholder" style="background-image: var(--barca-player-img, none);"></div>
                        <div class="player-info">
                            <h3 class="player-name">${player.name}</h3>
                            <p class="player-pos">${player.pos}</p>
                        </div>
                    </div>
                `;
                squadContainer.innerHTML += cardHtml;
            });
            squadContainer.style.opacity = '1';
        }, 300);
    }

    // Add CSS rule for the animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Tab Clicks
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderSquad(e.target.getAttribute('data-target'));
        });
    });

    // Initial Render
    renderSquad('atacantes');
});
