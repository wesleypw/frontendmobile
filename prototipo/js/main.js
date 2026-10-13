/**
 * Portal Esportivo - JavaScript Principal
 * Interações nativas integradas com Bootstrap 5.3
 */

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initSmoothScroll();
  initActiveNavLink();
  initDynamicListDelegation();
  initPointerEvents();
});

/**
 * Formulário de Contato
 * Validação nativa com Bootstrap
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formReset = document.getElementById('form-reset');

  if (!form) return;

  // Validação em tempo real com Bootstrap
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.checkValidity()) {
        this.classList.remove('is-invalid');
        const feedback = this.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.textContent = '';
      }
    });
  });

  function validateField(field) {
    if (field.checkValidity()) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      const feedback = field.parentElement.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = '';
      return true;
    }

    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
      if (field.validity.valueMissing) {
        feedback.textContent = 'Este campo é obrigatório';
      } else if (field.validity.typeMismatch && field.type === 'email') {
        feedback.textContent = 'Por favor, insira um email válido';
      } else if (field.validity.tooShort) {
        feedback.textContent = `Mínimo de ${field.minLength} caracteres`;
      } else {
        feedback.textContent = 'Valor inválido';
      }
    }

    return false;
  }

  // Submit do formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        form.classList.add('d-none');
        formSuccess.classList.remove('d-none');

        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensagem';
      }, 1500);
    }
  });

  // Reset do formulário
  if (formReset) {
    formReset.addEventListener('click', function() {
      form.reset();
      form.classList.remove('d-none');
      formSuccess.classList.add('d-none');

      inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.textContent = '';
      });

      inputs[0].focus();
    });
  }
}

/**
 * Smooth Scroll para links âncora
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Fechar menu mobile se estiver aberto
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }

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
}

/**
 * Atualizar link ativo no menu ao scroll
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
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

        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Console log informativo
 */
console.log('Portal Esportivo - JavaScript carregado com sucesso');
console.log('Versão: 1.0.0');
console.log('Bootstrap: 5.3.3');
console.log('Acessibilidade: WCAG 2.2 AA');

/**
 * Delegação em Lista Dinâmica (T07)
 * Demonstração de event delegation para itens criados dinamicamente
 */
function initDynamicListDelegation() {
  const addMatchBtn = document.getElementById('add-match');
  const matchesList = document.querySelector('.matches-list');

  if (!addMatchBtn || !matchesList) return;

  let matchCount = 0;

  // Delegação de evento no container pai
  matchesList.addEventListener('click', function(e) {
    // Verificar se o clique foi em um botão de detalhes
    const detailsBtn = e.target.closest('.btn-details-match');
    if (detailsBtn) {
      const matchCard = detailsBtn.closest('.match-card');
      const matchId = matchCard.dataset.matchId;
      console.log(`Detalhes do jogo ${matchId} clicado (via delegação)`);
      announceToScreenReader(`Detalhes do jogo ${matchId} exibidos`);
    }
  });

  // Adicionar novo jogo dinamicamente
  addMatchBtn.addEventListener('click', function() {
    matchCount++;
    const newMatch = createMatchCard(matchCount);
    matchesList.appendChild(newMatch);

    // Anunciar para leitores de tela
    announceToScreenReader(`Novo jogo adicionado: Rodada ${matchCount}`);
  });

  function createMatchCard(id) {
    const article = document.createElement('article');
    article.className = 'card shadow match-card border-start border-4 border-info match-container';
    article.dataset.matchId = id;

    article.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <span class="badge bg-info">Agendado</span>
          <time class="text-muted small">Próximo domingo, 16:00</time>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div class="text-center">
              <img src="img/escudo-centro.svg"
                width="60" height="60" class="team-crest mb-2" alt="Escudo do Aurora Central"
                 loading="lazy">
            <div class="fw-bold small">Aurora Central</div>
          </div>
          <div class="text-center">
            <div class="display-6 fw-bold text-muted">VS</div>
          </div>
          <div class="text-center">
              <img src="img/escudo-norte.svg"
                 width="60" height="60" class="team-crest mb-2" alt="Escudo dos Falcões do Norte"
                 loading="lazy">
            <div class="fw-bold small">Falcões</div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
          <span class="text-muted small">Estádio Teste</span>
          <button type="button" class="btn btn-sm btn-outline-primary btn-details-match">Detalhes</button>
        </div>
      </div>
    `;

    return article;
  }

  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

/**
 * Pointer Events (T07)
 * Implementação de gesto com Pointer Events e alternativa por botão
 */
function initPointerEvents() {
  const matchesList = document.querySelector('.matches-list');

  if (!matchesList) return;

  let startX = 0;
  let isDragging = false;
  let currentMatch = null;

  // Pointer down - início do gesto
  matchesList.addEventListener('pointerdown', function(e) {
    const matchCard = e.target.closest('.match-card');
    if (!matchCard) return;

    currentMatch = matchCard;
    startX = e.clientX;
    isDragging = true;
    matchesList.setPointerCapture(e.pointerId);

    // Feedback visual
    matchCard.style.transition = 'transform 0.1s';
  });

  // Pointer move - durante o gesto
  matchesList.addEventListener('pointermove', function(e) {
    if (!isDragging || !currentMatch) return;

    const diff = e.clientX - startX;
    const threshold = 50;

    // Feedback visual de arraste
    if (Math.abs(diff) < threshold) {
      currentMatch.style.transform = `translateX(${diff}px)`;
    }
  });

  // Pointer up - fim do gesto
  matchesList.addEventListener('pointerup', function(e) {
    if (!isDragging || !currentMatch) return;

    const diff = e.clientX - startX;
    const threshold = 50;

    // Swipe para direita - favoritar
    if (diff > threshold) {
      toggleMatchFavorite(currentMatch);
    }
    // Swipe para esquerda - remover
    else if (diff < -threshold) {
      removeMatch(currentMatch);
    }

    // Reset visual
    currentMatch.style.transform = '';
    currentMatch.style.transition = '';
    isDragging = false;
    currentMatch = null;
    matchesList.releasePointerCapture(e.pointerId);
  });

  // Pointer cancel - gesto cancelado
  matchesList.addEventListener('pointercancel', function(e) {
    if (currentMatch) {
      currentMatch.style.transform = '';
      currentMatch.style.transition = '';
    }
    isDragging = false;
    currentMatch = null;
    matchesList.releasePointerCapture(e.pointerId);
  });

  function toggleMatchFavorite(matchCard) {
    matchCard.classList.toggle('border-warning');
    matchCard.classList.toggle('border-info');

    const isFavorite = matchCard.classList.contains('border-warning');
    const message = isFavorite ? 'Jogo adicionado aos favoritos' : 'Jogo removido dos favoritos';
    announceToScreenReader(message);
  }

  function removeMatch(matchCard) {
    matchCard.style.opacity = '0';
    matchCard.style.transform = 'translateX(-100%)';

    setTimeout(() => {
      matchCard.remove();
      announceToScreenReader('Jogo removido da lista');
    }, 300);
  }

  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}
