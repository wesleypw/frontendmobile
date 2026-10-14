/**
 * Portal Esportivo - JavaScript Principal
 * Interações nativas integradas com Bootstrap 5.3
 */

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initSmoothScroll();
  initActiveNavLink();
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
