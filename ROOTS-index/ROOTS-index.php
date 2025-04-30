<?php
/*
Plugin Name: ROOTS-index
Description: ショートコードで目次を表示するプラグイン
Version: 1.0.1
Author: 14chan
License: GPLv2
*/

if (!defined('ABSPATH')) exit; // 直接アクセス禁止

// ショートコードの登録
function roots_index_shortcode($atts) {
    ob_start();
    echo '<div id="roots-index-toc"></div>';
    return ob_get_clean();
}
add_shortcode('roots_index', 'roots_index_shortcode');

// スクリプトとスタイルを登録
function roots_index_enqueue_scripts() {
    if (!is_singular()) return;

    global $post;
    $singular_content = get_post_field('post_content', $post->ID);
    $headings = [];

    // 設定取得
    $options = get_option('roots_index_settings', []);
    $allowed_headings = isset($options['headings']) ? $options['headings'] : ['h2', 'h3'];

    foreach (parse_blocks($singular_content) as $block) {
        if ($block['blockName'] === 'core/heading') {
            if (preg_match('/<h([1-6])[^>]*>(.*?)<\\/h\\1>/si', $block['innerHTML'], $matches)) {
                $level = 'h' . $matches[1];
                if (in_array($level, $allowed_headings)) {
                    $headings[] = [
                        'level' => (int)$matches[1],
                        'text' => strip_tags($matches[2])
                    ];
                }
            }
        }
    }

    $plugin_url = plugin_dir_url(__FILE__);

    // 必ず読み込む
    wp_enqueue_script('index-script', $plugin_url . 'assets/js/roots-index-toc.js', [], '1.0', true);
    wp_localize_script('index-script', 'tocData', [
        'headings' => $headings,
        'label' => isset($options['label']) ? esc_js($options['label']) : 'このページの目次',
        'accordionOpen' => isset($options['accordion_open']) ? (bool)$options['accordion_open'] : false
    ]);

    // 必ず読み込む
    wp_enqueue_script('accordions-script', $plugin_url . 'assets/js/roots-index-accordion.js', [], '1.0', true);
    wp_enqueue_style('accordions-style', $plugin_url . 'assets/css/roots-index-accordion.css', [], '1.0');
    wp_enqueue_style('index-style', $plugin_url . 'assets/css/roots-index-toc.css', [], '1.0');
}
add_action('wp_enqueue_scripts', 'roots_index_enqueue_scripts');

// 管理画面メニューの追加
function roots_index_add_admin_menu() {
    add_options_page(
        'ROOTS-index 設定',
        'ROOTS-index',
        'manage_options',
        'roots-index',
        'roots_index_settings_page'
    );
}
add_action('admin_menu', 'roots_index_add_admin_menu');

// 管理画面フォームの出力
function roots_index_settings_page() {
    ?>
    <div class="wrap">
        <h1>ROOTS-index 設定</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('roots_index_settings_group');
            do_settings_sections('roots-index');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// 設定の登録
function roots_index_register_settings() {
    register_setting(
        'roots_index_settings_group',
        'roots_index_settings',
        'roots_index_sanitize_settings'
    );

    add_settings_section(
        'roots_index_main_section',
        '全体設定',
        null,
        'roots-index'
    );

    add_settings_field(
        'roots_index_headings',
        '目次に含める見出し',
        'roots_index_headings_callback',
        'roots-index',
        'roots_index_main_section'
    );

    add_settings_field(
        'roots_index_minimal_css_js',
        '目次をアコーディオンにする',
        function() { roots_index_option_checkbox('minimal_css_js'); },
        'roots-index',
        'roots_index_main_section'
    );

    add_settings_field(
        'roots_index_accordion_open',
        'アコーディオンを最初から開いた状態にする',
        function() { roots_index_option_checkbox('accordion_open'); },
        'roots-index',
        'roots_index_main_section'
    );

    add_settings_field(
        'roots_index_label',
        '目次のラベル',
        'roots_index_label_callback',
        'roots-index',
        'roots_index_main_section'
    );
}
add_action('admin_init', 'roots_index_register_settings');

// チェックボックス: H1-H6
function roots_index_headings_callback() {
    $options = get_option('roots_index_settings', []);
    $headings = isset($options['headings']) ? $options['headings'] : ['h2', 'h3'];
    $levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    foreach ($levels as $level) {
        echo '<label><input type="checkbox" name="roots_index_settings[headings][]" value="' . esc_attr($level) . '" ' . checked(in_array($level, $headings), true, false) . '> ' . esc_html(strtoupper($level)) . '</label> ';
    }
}

// 汎用チェックボックス
function roots_index_option_checkbox($option_name) {
    $options = get_option('roots_index_settings', []);
    echo '<label><input type="checkbox" name="roots_index_settings[' . esc_attr($option_name) . ']" value="1" ' . checked(isset($options[$option_name]), true, false) . '> ' . esc_html(ucfirst(str_replace('_', ' ', $option_name))) . '</label>';
}

// ラベル入力
function roots_index_label_callback() {
    $options = get_option('roots_index_settings', []);
    $label = isset($options['label']) ? esc_attr($options['label']) : 'このページの目次';
    echo '<input type="text" name="roots_index_settings[label]" value="' . $label . '" class="regular-text">';
    echo '<p class="description">目次の見出しをカスタマイズできます。</p>';
}

// サニタイズ
function roots_index_sanitize_settings($input) {
    $sanitized_input = [];

    if (isset($input['headings']) && is_array($input['headings'])) {
        $sanitized_input['headings'] = array_map('sanitize_text_field', $input['headings']);
    }

    if (isset($input['minimal_css_js'])) {
        $sanitized_input['minimal_css_js'] = (bool) $input['minimal_css_js'];
    }

    if (isset($input['accordion_open'])) {
        $sanitized_input['accordion_open'] = (bool) $input['accordion_open'];
    }

    if (isset($input['label'])) {
        $sanitized_input['label'] = sanitize_text_field($input['label']);
    }

    return $sanitized_input;
}
