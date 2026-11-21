<?php
/**
 * Plugin Name: Site Blocks
 * Description: Custom Gutenberg blocks for this website.
 * Version: 1.0.0
 * Author: William Chorski (MOEITS)
 */

defined( 'ABSPATH' ) || exit;

function site_blocks_register_blocks() {

    // register_block_type(
    //     __DIR__ . '/blocks/table-of-contents'
    // );
    foreach ( glob( __DIR__ . '/blocks/*/block.json' ) as $block_json ) {
       register_block_type( dirname( $block_json ) );
    }

}

add_action( 'init', 'site_blocks_register_blocks' );