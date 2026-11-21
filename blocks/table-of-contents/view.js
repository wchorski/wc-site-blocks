(function () {
  "use strict";

  function initialize() {
    document
      .querySelectorAll(".wp-block-site-blocks-table-of-contents")
      .forEach(buildTableOfContents);
  }

  function buildTableOfContents(toc) {
    const output = toc.querySelector(".auto-toc__content");

    if (!output) {
      return;
    }

    const content = findContentContainer(toc);

    if (!content) {
      hideTOC(toc);
      return;
    }

    const selectors = [];

    if (toc.dataset.includeH2 === "true") {
      selectors.push("h2");
    }

    if (toc.dataset.includeH3 === "true") {
      selectors.push("h3");
    }

    if (!selectors.length) {
      hideTOC(toc);
      return;
    }

    const headings = Array.from(
      content.querySelectorAll(selectors.join(",")),
    ).filter(function (heading) {
      return (
        !heading.closest(".wp-block-site-blocks-table-of-contents") &&
        heading.textContent.trim() !== ""
      );
    });

    if (!headings.length) {
      hideTOC(toc);
      return;
    }

    const list = document.createElement("ul");
    list.className = "auto-toc__list";

    headings.forEach(function (heading, index) {
      ensureHeadingId(heading, index);

      const item = document.createElement("li");
      const level = heading.tagName.toLowerCase();

      item.className = ["auto-toc__item", "auto-toc__item--" + level].join(" ");

      const link = document.createElement("a");

      link.className = "auto-toc__link";
      link.href = "#" + encodeURIComponent(heading.id);
      link.textContent = heading.textContent.trim();

      item.appendChild(link);
      list.appendChild(item);
    });

    output.replaceChildren(list);
    toc.hidden = false;
  }

  function findContentContainer(toc) {
    return (
      toc.closest(".entry-content") ||
      toc.closest(".wp-block-post-content") ||
      document.querySelector(".entry-content") ||
      document.querySelector(".wp-block-post-content") ||
      document.querySelector("main")
    );
  }

  function ensureHeadingId(heading, index) {
    if (heading.id) {
      return;
    }

    const baseId = slugify(heading.textContent) || "section-" + (index + 1);

    heading.id = createUniqueId(baseId);
  }

  function createUniqueId(baseId) {
    let candidate = baseId;
    let counter = 2;

    while (document.getElementById(candidate)) {
      candidate = baseId + "-" + counter;
      counter++;
    }

    return candidate;
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function hideTOC(toc) {
    toc.hidden = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
