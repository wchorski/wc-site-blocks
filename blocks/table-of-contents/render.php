<?php
/**
 * Render callback for the Table of Contents block.
 *
 * Available variables:
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Saved block content.
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$title = isset( $attributes['title'] )
	? trim( $attributes['title'] )
	: 'On this page';

$include_h2 = ! empty( $attributes['includeH2'] );
$include_h3 = ! empty( $attributes['includeH3'] );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'           => 'auto-toc',
		'data-include-h2' => $include_h2 ? 'true' : 'false',
		'data-include-h3' => $include_h3 ? 'true' : 'false',
	)
);
?>
<?php // Hidden until view.js finds headings, so no empty box is ever shown. ?>
<nav
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped by core. ?>
	aria-label="<?php esc_attr_e( 'Table of contents', 'site-blocks' ); ?>"
	hidden
>
	<?php if ( '' !== $title ) : ?>
		<h2 class="auto-toc__title"><?php echo esc_html( $title ); ?></h2>
	<?php endif; ?>

	<div class="auto-toc__content"></div>
</nav>
<noscript>
	<p class="auto-toc__noscript">
		<?php esc_html_e( 'JavaScript is required to display this table of contents.', 'site-blocks' ); ?>
	</p>
</noscript>
