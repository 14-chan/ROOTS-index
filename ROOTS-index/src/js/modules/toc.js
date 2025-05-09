/**
 * @package ROOTS-index
 * @license GPL-2.0-or-later
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("目次スクリプトが実行されました");

    if (typeof tocData === "undefined") {
        console.warn("tocData が未定義のため、スクリプトを終了します");
        return;
    }

    const tocArea = document.querySelector("#roots-index-toc");

    if (!tocArea) {
        console.warn("目次の挿入場所が見つからないため処理を中断");
        return;
    }

    const headings = tocData.headings;
    
    // ここで中身を確認
    console.log("取得したheadingsの内容:", headings);

    if (headings.length === 0) {
        console.warn("見出しが見つからないため目次を生成しません");
        return;
    }

    const tocList = document.createElement("ul");
    tocList.classList.add("roots-index-toc-list");

    // 最小見出しレベル（例: h2 〜 h4 → 2）
    const minLevel = Math.min(...headings.map(h => h.level));
    const counters = [];

    let idCounter = 1;

    headings.forEach((heading) => {
        const level = heading.level;
        const levelIndex = level - minLevel;

        // 番号生成のためのカウンター制御
        counters[levelIndex] = (counters[levelIndex] || 0) + 1;
        counters.length = levelIndex + 1; // 上位階層より下はリセット

        const numberLabel = counters.join(".");
        const id = `toc-${idCounter++}`;

        const item = document.createElement("li");
        item.classList.add(`toc-depth-${levelIndex}`);

        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = `${numberLabel} ${heading.text}`;

        // 対象見出しにIDを設定
        const candidates = document.querySelectorAll(`h${heading.level}.wp-block-heading`);
        let matched = false;
        for (const el of candidates) {
            if (!el.id && el.textContent.trim() === heading.text.trim()) {
                el.id = id;
                matched = true;
                break;
            }
        }
        if (!matched && candidates.length > 0) {
            candidates[0].id = id; // fallback
        }

        item.appendChild(link);
        tocList.appendChild(item);
    });

    const tocBox = document.createElement("div");
    tocBox.classList.add("roots-index-toc-box");
    tocBox.innerHTML = `<div class='roots-index-toc-accordion'>${tocData.label}<div class='roots-index-toc-btn'><span></span></div></div>`;
    tocBox.appendChild(tocList);

    const tocNav = document.createElement("nav");
    tocNav.classList.add("roots-index-toc-nav");
    tocNav.id = "tocnav";
    tocNav.appendChild(tocBox);

    tocArea.appendChild(tocNav);

    console.log("目次の挿入完了");

    // スムーズスクロール機能
    document.querySelectorAll(".roots-index-toc-list a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    console.log("目次スクリプトの適用が完了しました");
});
