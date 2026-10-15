/**
 * Interações jQuery (T08)
 * Demonstração de uso de jQuery 4.0 para uma interação específica
 *
 * Justificativa: jQuery é usado aqui para demonstrar conhecimento da biblioteca
 * em uma interação simples e isolada. A maioria das interações usa JavaScript nativo.
 *
 * Versão: jQuery 4.0.0
 * Licença: MIT
 * Tamanho: ~30KB (gzipped)
 * Manutenção: Ativa
 * Alternativa: JavaScript nativo (já implementado em main.js)
 * Plano de remoção: Se a interação não for necessária, pode ser removida sem impacto no core
 */

$(document).ready(function() {
  /**
   * Interação: Highlight nos cards de classificação ao passar o mouse
   * Demonstração de hover com jQuery usando namespace de eventos
   */
  initTableHighlight();

  /**
   * Interação: Scroll suave para links âncora (alternativa à implementação nativa)
   * Demonstração de animação jQuery com duration e easing
   */
  initSmoothScrollJQuery();

  /**
   * Highlight nos cards de classificação
   * Usa namespace de eventos para facilitar cleanup
   */
  function initTableHighlight() {
    $('.standings-table tbody tr').on('mouseenter.highlight', function() {
      $(this).addClass('table-active');
    }).on('mouseleave.highlight', function() {
      $(this).removeClass('table-active');
    });

    console.log('jQuery: Table highlight inicializado');
  }

  /**
   * Scroll suave com jQuery
   * Alternativa à implementação nativa em main.js
   */
  function initSmoothScrollJQuery() {
    $('a[href^="#"]').on('click.smoothscroll', function(e) {
      const target = $(this.getAttribute('href'));

      if (target.length) {
        e.preventDefault();

        // Animação jQuery com duration e easing
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 70
        }, 600, 'swing', function() {
          // Focar no elemento após scroll
          target.attr('tabindex', '-1');
          target.focus();
        });

        // Atualizar URL sem scroll
        if (history.pushState) {
          history.pushState(null, null, $(this).attr('href'));
        }
      }
    });

    console.log('jQuery: Smooth scroll inicializado');
  }

  /**
   * Cleanup de listeners (exemplo para T07)
   * Demonstração de como desmontar listeners quando necessário
   */
  function cleanupEventListeners() {
    // Remove listeners com namespace específico
    $('.standings-table tbody tr').off('.highlight');
    $('a[href^="#"]').off('.smoothscroll');

    console.log('jQuery: Event listeners removidos');
  }

  // Expor função para cleanup se necessário
  window.jqueryCleanup = cleanupEventListeners;
});
