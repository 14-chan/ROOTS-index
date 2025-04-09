
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
    if (headings.length === 0) {
        console.warn("見出しが見つからないため目次を生成しません");
        return;
    }

    const tocList = document.createElement("ul");
    tocList.classList.add("roots-index-toc-list");

    let idCounter = 1;

    headings.forEach((heading) => {
        const id = `toc-${idCounter++}`;
    
        // <li>要素と <a> 要素の作成
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = heading.text;
    
        // 見出しにIDを付ける（テキストが一致する最初の未設定要素）
        const candidates = document.querySelectorAll(`h${heading.level}.wp-block-heading`);
        for (const el of candidates) {
            // すでにIDがある or テキストが一致しない場合はスキップ
            if (el.id || el.textContent.trim() !== heading.text.trim()) continue;
            el.id = id;
            break; // 一致した要素にだけ付与したら次へ
        }
    
        // linkをitemに追加
        item.appendChild(link); // linkをitemに追加
    
        // 目次の項目を <ul> に追加
        tocList.appendChild(item); // itemをtocListに追加
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

    // スムーズスクロール機能を追加
    document.querySelectorAll(".roots-index-toc-list a").forEach(link => {
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
