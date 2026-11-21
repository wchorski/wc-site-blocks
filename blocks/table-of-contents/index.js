(function (blocks, blockEditor, components, element, i18n) {
  const registerBlockType = blocks.registerBlockType;
  const useBlockProps = blockEditor.useBlockProps;
  const InspectorControls = blockEditor.InspectorControls;

  const PanelBody = components.PanelBody;
  const TextControl = components.TextControl;
  const ToggleControl = components.ToggleControl;
  const Placeholder = components.Placeholder;

  const createElement = element.createElement;
  const Fragment = element.Fragment;
  const __ = i18n.__;
  const sprintf = i18n.sprintf;

  registerBlockType("site-blocks/table-of-contents", {
    edit: function (props) {
      const attributes = props.attributes;
      const setAttributes = props.setAttributes;

      const blockProps = useBlockProps({
        className: "auto-toc-editor-preview",
      });

      const headingLevels = [];

      if (attributes.includeH2) {
        headingLevels.push("H2");
      }

      if (attributes.includeH3) {
        headingLevels.push("H3");
      }

      return createElement(
        Fragment,
        null,

        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            {
              title: __("Table of Contents Settings", "site-blocks"),
              initialOpen: true,
            },

            createElement(TextControl, {
              label: __("Title", "site-blocks"),
              value: attributes.title,
              onChange: function (value) {
                setAttributes({
                  title: value,
                });
              },
            }),

            createElement(ToggleControl, {
              label: __("Include H2 headings", "site-blocks"),
              checked: attributes.includeH2,
              onChange: function (value) {
                setAttributes({
                  includeH2: value,
                });
              },
            }),

            createElement(ToggleControl, {
              label: __("Include H3 headings", "site-blocks"),
              checked: attributes.includeH3,
              onChange: function (value) {
                setAttributes({
                  includeH3: value,
                });
              },
            }),
          ),
        ),

        createElement(
          "div",
          blockProps,

          createElement(Placeholder, {
            icon: "list-view",
            label: attributes.title || __("Table of Contents", "site-blocks"),
            instructions: headingLevels.length
              ? sprintf(
                  /* translators: %s: list of heading levels, e.g. "H2 and H3" */
                  __(
                    "Links will be generated automatically from %s headings on the published page.",
                    "site-blocks",
                  ),
                  headingLevels.join(" / "),
                )
              : __(
                  "Select at least one heading level in the block settings.",
                  "site-blocks",
                ),
          }),
        ),
      );
    },

    save: function () {
      return null;
    },
  });
})(
  window.wp.blocks,
  window.wp.blockEditor,
  window.wp.components,
  window.wp.element,
  window.wp.i18n,
);
