async function fetchArtists() {
    const grid = document.getElementById('artistsGrid');

    grid.innerHTML = '<p style="padding: 20px; color: var(--warm-gray);">Carregando talentos...</p>';

    try {
        const response = await fetch('/api/artistas');

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const artistas = await response.json();

        renderArtists(artistas);
        updateCount(artistas.length);

    } catch (error) {
        console.error('Erro ao buscar artistas:', error);
        grid.innerHTML = '<p>Erro ao carregar artistas. Tente novamente mais tarde.</p>';
    }
}

function renderArtists(artistas) {
    const grid = document.getElementById('artistsGrid');
    grid.innerHTML = '';

    artistas.forEach((artista, index) => {
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.setAttribute('data-category', artista.categoria.toLowerCase());
        
        
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-image">
                ${artista.imagem_url 
                    ? `<img src="${artista.imagem_url}" alt="${artista.nome}">` 
                    : `<div class="card-image-placeholder"><svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/></svg></div>`
                }
                <span class="card-tag">${artista.categoria}</span>
            </div>
            <div class="card-body">
                <div class="card-name">${artista.nome}</div>
                <div class="card-meta">
                    ${artista.localizacao} <span class="dot"></span> Ativo desde ${artista.ano_inicio}
                </div>
                <p class="card-desc">${artista.descricao}</p>
                <div class="card-footer">
                    <a href="#" class="card-link">
                        Ver perfil
                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}


function updateCount(total) {
    const badge = document.querySelector('.count-badge');
    if (badge) badge.innerText = `${total} artistas`;
}


function filterArtists(category, btn) {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const cards = document.querySelectorAll(".artist-card");
    cards.forEach((card) => {
        const match = category === "todos" || card.getAttribute('data-category') === category.toLowerCase();
        card.style.display = match ? "block" : "none";
    });
}

document.addEventListener('DOMContentLoaded', fetchArtists);