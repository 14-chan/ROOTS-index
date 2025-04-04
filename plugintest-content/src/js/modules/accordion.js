"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("アコーディオンスクリプトが実行されました");

    const tocAccordion = document.querySelector(".toc-accordion");
    if (!tocAccordion) return;

    const tocList = tocAccordion.nextElementSibling;

    if (tocData.accordionOpen) { // trueの場合開いた状態に
        tocAccordion.classList.add("active");
        tocList.style.maxHeight = tocList.scrollHeight + "px";
    }

    tocAccordion.addEventListener("click", () => {
        tocAccordion.classList.toggle("active");
        tocList.style.maxHeight = tocList.style.maxHeight ? null : `${tocList.scrollHeight}px`;
    });
});
