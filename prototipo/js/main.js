/**
 * Torneio FIFA - JavaScript Principal
 * Sorteador de times para torneio de FIFA
 */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initPlayersForm();
  initTeamsForm();
  initDraw();
  initResults();
});

/**
 * Menu Mobile
 * Toggle de navegação com aria-expanded
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('open');
  });

  // Fechar menu ao clicar em link
  const navLinks = mainNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
      }
    });
  });

  // Fechar menu ao pressionar Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('open');
      menuToggle.focus();
    }
  });
}

/**
 * Estado Global
 */
let players = [];
let teams = [];
let drawResults = [];

/**
 * Formulário de Jogadores
 */
function initPlayersForm() {
  const form = document.getElementById('players-form');
  const playersList = document.getElementById('players-list');
  const playersCount = document.getElementById('players-count');
  const emptyPlayers = document.getElementById('empty-players');
  const clearPlayersBtn = document.getElementById('clear-players');

  if (!form) return;

  // Carregar jogadores do localStorage
  loadPlayers();

  // Adicionar jogador
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('player-name');
    const name = input.value.trim();

    if (name) {
      players.push(name);
      savePlayers();
      renderPlayers();
      input.value = '';
      input.focus();
      updateDrawInfo();
    }
  });

  // Limpar lista
  if (clearPlayersBtn) {
    clearPlayersBtn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja limpar a lista de jogadores?')) {
        players = [];
        savePlayers();
        renderPlayers();
        updateDrawInfo();
      }
    });
  }

  function renderPlayers() {
    playersList.innerHTML = '';
    playersCount.textContent = players.length;

    if (players.length === 0) {
      playersList.innerHTML = '<li class="empty-message" id="empty-players">Nenhum jogador cadastrado ainda</li>';
      return;
    }

    players.forEach((player, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${player}</span>
        <button type="button" class="remove-btn" data-index="${index}" aria-label="Remover ${player}">Remover</button>
      `;
      playersList.appendChild(li);
    });

    // Adicionar eventos de remoção
    playersList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        players.splice(index, 1);
        savePlayers();
        renderPlayers();
        updateDrawInfo();
      });
    });
  }

  function savePlayers() {
    try {
      localStorage.setItem('fifa-players', JSON.stringify(players));
    } catch (e) {
      console.warn('Não foi possível salvar jogadores:', e);
    }
  }

  function loadPlayers() {
    try {
      const stored = localStorage.getItem('fifa-players');
      if (stored) {
        players = JSON.parse(stored);
        renderPlayers();
        updateDrawInfo();
      }
    } catch (e) {
      console.warn('Não foi possível carregar jogadores:', e);
    }
  }
}

/**
 * Formulário de Times
 */
function initTeamsForm() {
  const form = document.getElementById('teams-form');
  const teamsList = document.getElementById('teams-list');
  const teamsCount = document.getElementById('teams-count');
  const emptyTeams = document.getElementById('empty-teams');
  const clearTeamsBtn = document.getElementById('clear-teams');

  if (!form) return;

  // Carregar times do localStorage
  loadTeams();

  // Adicionar time
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('team-name');
    const name = input.value.trim();

    if (name) {
      teams.push(name);
      saveTeams();
      renderTeams();
      input.value = '';
      input.focus();
      updateDrawInfo();
    }
  });

  // Limpar lista
  if (clearTeamsBtn) {
    clearTeamsBtn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja limpar a lista de times?')) {
        teams = [];
        saveTeams();
        renderTeams();
        updateDrawInfo();
      }
    });
  }

  function renderTeams() {
    teamsList.innerHTML = '';
    teamsCount.textContent = teams.length;

    if (teams.length === 0) {
      teamsList.innerHTML = '<li class="empty-message" id="empty-teams">Nenhum time adicionado ainda</li>';
      return;
    }

    teams.forEach((team, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${team}</span>
        <button type="button" class="remove-btn" data-index="${index}" aria-label="Remover ${team}">Remover</button>
      `;
      teamsList.appendChild(li);
    });

    // Adicionar eventos de remoção
    teamsList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        teams.splice(index, 1);
        saveTeams();
        renderTeams();
        updateDrawInfo();
      });
    });
  }

  function saveTeams() {
    try {
      localStorage.setItem('fifa-teams', JSON.stringify(teams));
    } catch (e) {
      console.warn('Não foi possível salvar times:', e);
    }
  }

  function loadTeams() {
    try {
      const stored = localStorage.getItem('fifa-teams');
      if (stored) {
        teams = JSON.parse(stored);
        renderTeams();
        updateDrawInfo();
      }
    } catch (e) {
      console.warn('Não foi possível carregar times:', e);
    }
  }
}

/**
 * Atualizar informações do sorteio
 */
function updateDrawInfo() {
  const playersCount = document.getElementById('draw-players-count');
  const teamsCount = document.getElementById('draw-teams-count');
  const startDrawBtn = document.getElementById('start-draw');

  if (playersCount) playersCount.textContent = players.length;
  if (teamsCount) teamsCount.textContent = teams.length;

  if (startDrawBtn) {
    startDrawBtn.disabled = players.length === 0 || teams.length === 0;
  }
}

/**
 * Sorteio de Times
 */
function initDraw() {
  const startDrawBtn = document.getElementById('start-draw');
  const resetDrawBtn = document.getElementById('reset-draw');
  const drawStatus = document.getElementById('draw-status');

  if (!startDrawBtn) return;

  // Iniciar sorteio
  startDrawBtn.addEventListener('click', function() {
    if (players.length === 0 || teams.length === 0) {
      alert('É necessário ter pelo menos 1 jogador e 1 time para realizar o sorteio.');
      return;
    }

    // Desabilitar botão
    this.disabled = true;
    this.textContent = 'Sorteando...';

    // Mostrar status
    if (drawStatus) {
      drawStatus.hidden = false;
      drawStatus.textContent = 'Realizando sorteio...';
    }

    // Simular tempo de sorteio
    setTimeout(() => {
      performDraw();
      this.disabled = false;
      this.textContent = 'Iniciar Sorteio';

      if (drawStatus) {
        drawStatus.textContent = 'Sorteio realizado com sucesso!';
        setTimeout(() => {
          drawStatus.hidden = true;
        }, 3000);
      }

      // Scroll para resultados
      document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  });

  // Reiniciar sorteio
  if (resetDrawBtn) {
    resetDrawBtn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja reiniciar o sorteio? Os resultados atuais serão perdidos.')) {
        drawResults = [];
        renderResults();
      }
    });
  }

  function performDraw() {
    // Embaralhar times
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

    // Distribuir times entre jogadores
    drawResults = players.map((player, index) => {
      const teamIndex = index % shuffledTeams.length;
      return {
        player: player,
        team: shuffledTeams[teamIndex]
      };
    });

    // Salvar resultados
    try {
      localStorage.setItem('fifa-results', JSON.stringify(drawResults));
    } catch (e) {
      console.warn('Não foi possível salvar resultados:', e);
    }

    renderResults();
  }
}

/**
 * Resultados do Sorteio
 */
function initResults() {
  const printBtn = document.getElementById('print-results');
  const newDrawBtn = document.getElementById('new-draw');

  // Carregar resultados salvos
  loadResults();

  // Imprimir resultados
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }

  // Novo sorteio
  if (newDrawBtn) {
    newDrawBtn.addEventListener('click', function() {
      if (confirm('Deseja iniciar um novo sorteio? Os dados de jogadores e times serão mantidos.')) {
        drawResults = [];
        localStorage.removeItem('fifa-results');
        renderResults();
        document.getElementById('sorteio').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  function loadResults() {
    try {
      const stored = localStorage.getItem('fifa-results');
      if (stored) {
        drawResults = JSON.parse(stored);
        renderResults();
      }
    } catch (e) {
      console.warn('Não foi possível carregar resultados:', e);
    }
  }
}

/**
 * Renderizar Resultados
 */
function renderResults() {
  const resultsContainer = document.getElementById('results-container');
  const emptyResults = document.getElementById('empty-results');
  const resultsActions = document.getElementById('results-actions');

  if (!resultsContainer) return;

  if (drawResults.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-message" id="empty-results">
        <p>Realize o sorteio para ver os resultados</p>
      </div>
    `;
    if (resultsActions) resultsActions.hidden = true;
    return;
  }

  resultsContainer.innerHTML = '';
  if (resultsActions) resultsActions.hidden = false;

  drawResults.forEach((result, index) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <span class="result-player">${result.player}</span>
      <span class="result-team">${result.team}</span>
    `;
    resultsContainer.appendChild(card);
  });
}

/**
 * Smooth Scroll para links âncora
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      history.pushState(null, null, targetId);
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
    }
  });
});

/**
 * Atualizar link ativo no menu ao scroll
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

let ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      updateActiveNavLink();
      ticking = false;
    });
    ticking = true;
  }
});

console.log('Torneio FIFA - JavaScript carregado com sucesso');
console.log('Versão: 1.0.0');
