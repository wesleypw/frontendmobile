<?php
/**
 * Template Name: Página Inicial - Portal Esportivo
 *
 * Template personalizado para a página inicial do portal
 */

get_header();
?>

<main id="primary" class="site-main">
  <section class="hero-section">
    <div class="container">
      <h1 class="hero-title"><?php the_title(); ?></h1>
      <p class="hero-subtitle">Acompanhe a temporada 2026</p>
    </div>
  </section>

  <section class="games-section">
    <div class="container">
      <h2>Próximos Jogos</h2>
      <?php
      // Query customizada para jogos
      $games_query = new WP_Query(array(
        'post_type' => 'jogo',
        'posts_per_page' => 3,
        'orderby' => 'meta_value',
        'meta_key' => 'data_jogo',
        'order' => 'ASC'
      ));

      if ($games_query->have_posts()) :
        while ($games_query->have_posts()) : $games_query->the_post();
          ?>
          <div class="game-card">
            <h3><?php the_title(); ?></h3>
            <p><?php echo get_post_meta(get_the_ID(), 'data_jogo', true); ?></p>
          </div>
          <?php
        endwhile;
        wp_reset_postdata();
      endif;
      ?>
    </div>
  </section>

  <section class="standings-section">
    <div class="container">
      <h2>Classificação</h2>
      <?php
      // Taxonomia customizada para times
      $teams = get_terms(array(
        'taxonomy' => 'time',
        'hide_empty' => false,
        'orderby' => 'meta_value_num',
        'meta_key' => 'pontos',
        'order' => 'DESC'
      ));

      if ($teams && !is_wp_error($teams)) :
        ?>
        <table class="standings-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Time</th>
              <th>P</th>
              <th>J</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($teams as $index => $team) : ?>
              <tr>
                <td><?php echo $index + 1; ?></td>
                <td><?php echo esc_html($team->name); ?></td>
                <td><?php echo get_term_meta($team->term_id, 'pontos', true); ?></td>
                <td><?php echo get_term_meta($team->term_id, 'jogos', true); ?></td>
                <td><?php echo get_term_meta($team->term_id, 'vitorias', true); ?></td>
                <td><?php echo get_term_meta($team->term_id, 'empates', true); ?></td>
                <td><?php echo get_term_meta($team->term_id, 'derrotas', true); ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>
  </section>
</main>

<?php
get_footer();
