"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("目次スクリプトが実行されました");

    const tocArea = document.querySelector("#roots-index-toc");

    if (!tocArea) {
        console.warn("目次の挿入場所が見つからないため処理を中断");
        return;
    }

    const headings = tocData.headings;
    if (headings.length === 0) {
        console.warn("見出しが見つからないため目次を生成しません");
        return;
    }

    const tocList = document.createElement("ul");
    tocList.classList.add("toc-list");

    headings.forEach((heading, i) => {
        const id = `toc-${i + 1}`;
        const item = document.createElement("li");
        item.innerHTML = `<a href="#${id}">${heading.text}</a>`;
        tocList.appendChild(item);

        // 見出しにIDを付与
        const targetHeading = document.querySelector(`h${heading.level}`);
        if (targetHeading) targetHeading.id = id;
    });

    const tocBox = document.createElement("div");
    tocBox.classList.add("toc-box");
    tocBox.innerHTML = `<div class='toc-accordion'>${tocData.label}<div class='toc-btn'><span></span></div></div>`;
    tocBox.appendChild(tocList);

    const tocNav = document.createElement("nav");
    tocNav.classList.add("toc-nav");
    tocNav.id = "tocnav";
    tocNav.appendChild(tocBox);

    tocArea.appendChild(tocNav);

    console.log("目次の挿入完了");

    // スムーズスクロール機能を追加
    document.querySelectorAll(".toc-list a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50, // 上部に50pxのマージン
                    behavior: "smooth"
                });
            }
        });
    });

    console.log("目次スクリプトの適用が完了しました");
});
