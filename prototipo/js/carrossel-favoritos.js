document.addEventListener('DOMContentLoaded', function() {
  const authKey = 'portalEsportivoAuthenticated';
  const favoritesKey = 'portalEsportivoFavorites';
  const favoriteTeamKey = 'portalEsportivoFavoriteTeam';
  const loginGate = document.getElementById('login-gate');
  const privateContent = document.getElementById('private-content');
  const loginForm = document.getElementById('login-form');
  const logoutButton = document.getElementById('logout-button');
  const favoritesList = document.getElementById('favorites-list');
  const favoritesEmpty = document.getElementById('favorites-empty');
  const favoriteTeamForm = document.getElementById('favorite-team-form');
  const favoriteTeamSelect = document.getElementById('favorite-team');
  const favoriteTeamDisplay = document.getElementById('favorite-team-display');

  const teams = {
    aurora: { name: 'Aurora Central', crest: 'img/escudo-centro.svg' },
    estrela: { name: 'Estrela do Oriente', crest: 'img/escudo-leste.svg' },
    'falcões': { name: 'Falcões do Norte', crest: 'img/escudo-norte.svg' },
    tempestade: { name: 'Tempestade Austral', crest: 'img/escudo-sul.svg' },
    'leões': { name: 'Leões do Oeste', crest: 'img/escudo-oeste.svg' }
  };

  const matches = {
    final: {
      title: 'Aurora Central x Estrela do Oriente',
      detail: 'Final do campeonato · Estádio Nacional'
    },
    'norte-sul': {
      title: 'Falcões do Norte x Tempestade Austral',
      detail: 'Rodada 38 · Sábado, 19:00'
    },
    'oeste-leste': {
      title: 'Leões do Oeste x Estrela do Oriente',
      detail: 'Rodada 37 · Estádio do Oeste'
    }
  };

  let favorites = new Set(JSON.parse(localStorage.getItem(favoritesKey) || '[]'));
  let favoriteTeam = localStorage.getItem(favoriteTeamKey);

  function showPrivateContent(isAuthenticated) {
    loginGate.classList.toggle('d-none', isAuthenticated);
    privateContent.classList.toggle('d-none', !isAuthenticated);
  }

  function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-toggle').forEach(function(button) {
      const isFavorite = favorites.has(button.dataset.matchId);
      const isCarouselButton = Boolean(button.closest('#match-carousel'));
      button.setAttribute('aria-pressed', String(isFavorite));
      button.textContent = isCarouselButton && !isFavorite
        ? 'Adicionar aos favoritos'
        : 'Remover dos favoritos';

      if (isCarouselButton) {
        button.classList.toggle('btn-primary', isFavorite);
        button.classList.toggle('btn-outline-primary', !isFavorite);
      }
    });
  }

  function renderFavorites() {
    favoritesList.replaceChildren();
    favoriteTeamDisplay.replaceChildren();

    if (favoriteTeam && teams[favoriteTeam]) {
      const card = document.createElement('article');
      card.className = 'card shadow-sm';

      const body = document.createElement('div');
      body.className = 'card-body d-flex flex-wrap align-items-center gap-3';

      const crest = document.createElement('img');
      crest.src = teams[favoriteTeam].crest;
      crest.width = 56;
      crest.height = 64;
      crest.className = 'team-crest';
      crest.alt = `Escudo do ${teams[favoriteTeam].name}`;

      const name = document.createElement('h4');
      name.className = 'h5 mb-0 me-auto';
      name.textContent = teams[favoriteTeam].name;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'btn btn-sm btn-outline-danger';
      removeButton.dataset.removeFavoriteTeam = '';
      removeButton.textContent = 'Remover time favorito';
      removeButton.setAttribute('aria-label', `Remover ${teams[favoriteTeam].name} dos favoritos`);

      body.append(crest, name, removeButton);
      card.append(body);
      favoriteTeamDisplay.append(card);
      favoriteTeamSelect.value = favoriteTeam;
    } else {
      favoriteTeam = null;
      localStorage.removeItem(favoriteTeamKey);
      favoriteTeamSelect.value = '';
    }

    favorites.forEach(function(matchId) {
      const match = matches[matchId];
      if (!match) return;

      const item = document.createElement('li');
      item.className = 'col-12 col-md-6 col-lg-4';

      const card = document.createElement('article');
      card.className = 'card h-100 shadow-sm';

      const body = document.createElement('div');
      body.className = 'card-body d-flex flex-column align-items-start';

      const title = document.createElement('h4');
      title.className = 'h5 card-title';
      title.textContent = match.title;

      const detail = document.createElement('p');
      detail.className = 'card-text text-muted';
      detail.textContent = match.detail;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'btn btn-sm btn-outline-danger mt-auto favorite-toggle';
      removeButton.dataset.matchId = matchId;
      removeButton.textContent = 'Remover dos favoritos';
      removeButton.setAttribute('aria-pressed', 'true');
      removeButton.setAttribute('aria-label', `Remover ${match.title} dos favoritos`);

      body.append(title, detail, removeButton);
      card.append(body);
      item.append(card);
      favoritesList.append(item);
    });

    favoritesEmpty.classList.toggle('d-none', favorites.size > 0 || Boolean(favoriteTeam));
    updateFavoriteButtons();
  }

  function saveFavorites() {
    localStorage.setItem(favoritesKey, JSON.stringify(Array.from(favorites)));
    renderFavorites();
  }

  showPrivateContent(sessionStorage.getItem(authKey) === 'true');
  renderFavorites();

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!loginForm.reportValidity()) return;

    sessionStorage.setItem(authKey, 'true');
    loginForm.reset();
    showPrivateContent(true);
    document.getElementById('carousel-heading').focus();
  });

  favoriteTeamForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!favoriteTeamForm.reportValidity()) return;

    favoriteTeam = favoriteTeamSelect.value;
    localStorage.setItem(favoriteTeamKey, favoriteTeam);
    renderFavorites();
  });

  document.addEventListener('click', function(event) {
    const removeTeamButton = event.target.closest('[data-remove-favorite-team]');
    if (removeTeamButton) {
      favoriteTeam = null;
      localStorage.removeItem(favoriteTeamKey);
      renderFavorites();
      return;
    }

    const button = event.target.closest('.favorite-toggle');
    if (!button || !matches[button.dataset.matchId]) return;

    const matchId = button.dataset.matchId;
    if (favorites.has(matchId)) {
      favorites.delete(matchId);
    } else {
      favorites.add(matchId);
    }

    saveFavorites();
  });

  logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem(authKey);
    showPrivateContent(false);
    document.getElementById('login-email').focus();
  });
});
