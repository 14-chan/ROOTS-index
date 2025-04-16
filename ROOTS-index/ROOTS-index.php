<?php
/*
Plugin Name: ROOTS-index
Description: ショートコードで目次を表示するプラグイン
Version: 1.0.0
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

    global $post; // 現在の投稿データを取得
    $singular_content = get_post_field('post_content', $post->ID); // 投稿の本文を取得
    $headings = [];

    // 設定取得
    $options = get_option('roots_index_settings', []);
    $allowed_headings = isset($options['headings']) ? $options['headings'] : ['h2', 'h3']; // デフォルト h2, h3

    foreach (parse_blocks($singular_content) as $block) {
        if ($block['blockName'] === 'core/heading') {
            if (preg_match('/<h([1-6])[^>]*>(.*?)<\\/h\\1>/si', $block['innerHTML'], $matches)) {
                $level = 'h' . $matches[1];
                if (in_array($level, $allowed_headings)) { // 設定された見出しのみ追加
                    $headings[] = [
                        'level' => (int)$matches[1],
                        'text' => strip_tags($matches[2])
                    ];
                }
            }
        }
    }

    $plugin_url = plugin_dir_url(__FILE__);

    // `toc.js` は必ず読み込む
    wp_enqueue_script('index-script', $plugin_url . 'assets/js/roots-index-toc.js', [], '1.0', true);
    wp_localize_script('index-script', 'tocData', [
        'headings' => $headings,
        'label' => isset($options['label']) ? esc_js($options['label']) : 'このページの目次',
        'accordionOpen' => isset($options['accordion_open']) ? (bool)$options['accordion_open'] : false
    ]);

    // 「最低限のCSSとJavaScriptを使用する」がオンの場合
    if (!empty($options['minimal_css_js'])) {
        wp_enqueue_script('accordions-script', $plugin_url . 'assets/js/roots-index-accordion.js', [], '1.0', true);
        wp_enqueue_style('accordions-style', $plugin_url . 'assets/css/roots-index-accordion.css', [], '1.0');
    }

    // 「テーマのCSSを適用する」がオンの場合は全てのCSSとJSを読み込む
    if (!empty($options['theme_css'])) {
        wp_enqueue_style('index-style', $plugin_url . 'assets/css/roots-index-toc.css', [], '1.0');

        // `minimal_css_js` に関係なく `accordions.js` も必ず読み込む
        wp_enqueue_script('accordions-script', $plugin_url . 'assets/js/roots-index-accordion.js', [], '1.0', true);
        wp_enqueue_style('accordions-style', $plugin_url . 'assets/css/roots-index-accordion.css', [], '1.0');
    }
}
add_action('wp_enqueue_scripts', 'roots_index_enqueue_scripts');

// 設定ページの作成
function roots_index_add_admin_menu() {
    add_options_page(
        'ROOTS-index 設定',  // ページタイトル
        'ROOTS-index', // メニュー名
        'manage_options', // 権限(管理者のみアクセス可能)
        'roots-index', // スラッグ
        'roots_index_settings_page' // 表示する関数
    );
}
add_action('admin_menu', 'roots_index_add_admin_menu');

// 設定ページの内容
function roots_index_settings_page() {
    ?>
    <div class="wrap">
        <h1>ROOTS-index 設定</h1>
        <form method="post" action="options.php"> 
            <?php
            settings_fields('roots_index_settings_group'); // 設定を保存するための非表示フィールドを自動出力
            do_settings_sections('roots-index'); // 設定フィールドを表示
            check_admin_referer('roots_index_settings_group'); // ここで手動で確認
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
        'roots_index_settings', // roots_index_settings_group に roots_index_settings という設定オプションを登録
        'roots_index_sanitize_settings' // サニタイズ関数を追加
    ); 

    add_settings_section( // 新しい設定セクションを追加
        'roots_index_main_section', // セクションID
        '全体設定', // セクションのタイトル
        null, // 説明文はなし
        'roots-index' // roots-indexに追加
    );

    add_settings_field(
    'roots_index_headings', // フィールドのID
    '目次に含める見出し', // ラベル
    'roots_index_headings_callback', // コールバック関数
    'roots-index', // スラッグ
    'roots_index_main_section' // 設定セクションのID
    );
    add_settings_field(
        'roots_index_theme_css', 
        'テーマのCSSを適用する', 
        function() { roots_index_option_checkbox('theme_css'); }, 
        'roots-index', 
        'roots_index_main_section'
    );
    add_settings_field(
        'roots_index_minimal_css_js', // オプションID
        'アコーディオンを実装する最低限のCSSとJavaScriptを使用する', // 管理画面のラベル
        function() { roots_index_option_checkbox('minimal_css_js'); }, // チェックボックスを出力
        'roots-index', // スラッグ
        'roots_index_main_section' //セクションID
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

// H1~H6 の取得対象を選択
function roots_index_headings_callback() {
    $options = get_option('roots_index_settings', []); // 設定を取得
    $headings = isset($options['headings']) ? $options['headings'] : ['h2', 'h3']; // h2,h3をデフォルト
    $levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    foreach ($levels as $level) {
        $checked = in_array($level, $headings) ? 'checked' : ''; // ループしてチェックボックスを作成
        echo '<label><input type="checkbox" name="roots_index_settings[headings][]" value="' . esc_attr($level) . '" ' . checked(in_array($level, $headings), true, false) . '> ' . esc_html(strtoupper($level)) . '</label> '; //HTMLを生成
    }
}

// チェックボックスの出力
function roots_index_option_checkbox($option_name) {
    $options = get_option('roots_index_settings', []);
    $checked = isset($options[$option_name]) ? 'checked' : ''; // 保存された設定を取得 し、チェックを適用
    echo '<label><input type="checkbox" name="roots_index_settings[' . esc_attr($option_name) . ']" value="1" ' . checked(isset($options[$option_name]), true, false) . '> ' . esc_html(ucfirst(str_replace('_', ' ', $option_name))) . '</label>';
}

// 目次のラベル入力
function roots_index_label_callback() {
    $options = get_option('roots_index_settings', []);
    $label = isset($options['label']) ? esc_attr($options['label']) : 'このページの目次'; // 'このページの目次'をデフォルト
    echo '<input type="text" name="roots_index_settings[label]" value="' . $label . '" class="regular-text">'; // 入力フィールドを作成
    echo '<p class="description">目次の見出しをカスタマイズできます。</p>';
}

// サニタイズ関数を追加
function roots_index_sanitize_settings($input) {
    $sanitized_input = []; // サニタイズ後のデータを入れる配列

    // h1～h6 のチェックボックスのサニタイズ
    if (isset($input['headings']) && is_array($input['headings'])) {
        $sanitized_input['headings'] = array_map('sanitize_text_field', $input['headings']);
    }

    // テーマのCSS適用 (チェックボックス)
    if (isset($input['theme_css'])) {
        $sanitized_input['theme_css'] = (bool) $input['theme_css']; // boolean に変換→true（1）または false（0） に変換
    }

    // 最低限のCSSとJSを使用する (チェックボックス)
    if (isset($input['minimal_css_js'])) {
        $sanitized_input['minimal_css_js'] = (bool) $input['minimal_css_js'];
    }

    // アコーディオンを最初から開いた状態にする (チェックボックス)
    if (isset($input['accordion_open'])) {
        $sanitized_input['accordion_open'] = (bool) $input['accordion_open'];
    }

    // 目次のラベルのサニタイズ (テキスト入力)
    if (isset($input['label'])) {
        $sanitized_input['label'] = sanitize_text_field($input['label']);
    }

    return $sanitized_input; // サニタイズ済みのデータを返す
}
