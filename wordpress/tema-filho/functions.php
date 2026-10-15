<?php
/**
 * Portal Esportivo - Tema Filho
 * Funções do tema filho
 */

// Enfileirar scripts e estilos
function portal_esportivo_enqueue_scripts() {
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );

    wp_enqueue_style(
        'portal-esportivo-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style'),
        '1.0.0'
    );

    wp_enqueue_script(
        'portal-esportivo-main',
        get_stylesheet_directory_uri() . '/js/main.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'portal_esportivo_enqueue_scripts');

// Custom Post Type: Jogos
function portal_esportivo_register_jogos() {
    register_post_type('jogo', array(
        'labels' => array(
            'name' => 'Jogos',
            'singular_name' => 'Jogo',
            'add_new' => 'Adicionar Novo',
            'add_new_item' => 'Adicionar Novo Jogo',
            'edit_item' => 'Editar Jogo',
            'view_item' => 'Ver Jogo',
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'portal_esportivo_register_jogos');

// Taxonomia: Times
function portal_esportivo_register_times() {
    register_taxonomy('time', 'jogo', array(
        'labels' => array(
            'name' => 'Times',
            'singular_name' => 'Time',
            'add_new' => 'Adicionar Novo',
            'add_new_item' => 'Adicionar Novo Time',
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ));
}
add_action('init', 'portal_esportivo_register_times');

// Meta Box: Data do Jogo
function portal_esportivo_add_jogo_meta() {
    add_meta_box(
        'jogo_meta',
        'Detalhes do Jogo',
        'portal_esportivo_jogo_meta_callback',
        'jogo',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'portal_esportivo_add_jogo_meta');

function portal_esportivo_jogo_meta_callback($post) {
    wp_nonce_field('jogo_meta_nonce', 'jogo_meta_nonce_field');

    $data_jogo = get_post_meta($post->ID, 'data_jogo', true);
    $horario = get_post_meta($post->ID, 'horario', true);
    $estadio = get_post_meta($post->ID, 'estadio', true);

    ?>
    <p>
        <label for="data_jogo">Data:</label>
        <input type="date" id="data_jogo" name="data_jogo" value="<?php echo esc_attr($data_jogo); ?>">
    </p>
    <p>
        <label for="horario">Horário:</label>
        <input type="time" id="horario" name="horario" value="<?php echo esc_attr($horario); ?>">
    </p>
    <p>
        <label for="estadio">Estádio:</label>
        <input type="text" id="estadio" name="estadio" value="<?php echo esc_attr($estadio); ?>">
    </p>
    <?php
}

function portal_esportivo_save_jogo_meta($post_id) {
    if (!isset($_POST['jogo_meta_nonce_field']) || !wp_verify_nonce($_POST['jogo_meta_nonce_field'], 'jogo_meta_nonce')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['data_jogo'])) {
        update_post_meta($post_id, 'data_jogo', sanitize_text_field($_POST['data_jogo']));
    }
    if (isset($_POST['horario'])) {
        update_post_meta($post_id, 'horario', sanitize_text_field($_POST['horario']));
    }
    if (isset($_POST['estadio'])) {
        update_post_meta($post_id, 'estadio', sanitize_text_field($_POST['estadio']));
    }
}
add_action('save_post', 'portal_esportivo_save_jogo_meta');
