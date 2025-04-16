document.addEventListener("DOMContentLoaded", () => {
    console.log("アコーディオンスクリプトが実行されました");

    if (typeof tocData === "undefined") {
        console.warn("tocData が未定義のため、スクリプトを終了します");
        return;
    }    

    const tocAccordion = document.querySelector(".roots-index-toc-accordion");
    if (!tocAccordion) return;

    const tocList = tocAccordion.nextElementSibling;

    if (tocData.accordionOpen) { // trueの場合、アコーディオンを開いた状態に
        tocAccordion.classList.add("active");
        tocList.style.maxHeight = tocList.scrollHeight + "px";
    }

    tocAccordion.addEventListener("click", () => {
        tocAccordion.classList.toggle("active");
        tocList.style.maxHeight = tocList.style.maxHeight ? null : `${tocList.scrollHeight}px`;
    });
});
