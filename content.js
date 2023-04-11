function waitLoad() {
    // iframe要素が読み込まれるまで待つ
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);

    function jsLoaded() {
        let iframeEl = document.getElementById("main-frame-if");
        let iframeDocument = iframeEl.contentDocument || iframeEl.contentWindow.document;
    
        // 読み込まれた後の処理
        if (iframeDocument != null) {
            clearInterval(jsInitCheckTimer);

            keyHandler(iframeDocument, document);
        }
    }
}

function keyHandler(innerDocument, outerDocument) {
    // キーハンドラー登録（iframe内のdocumentと外側のdocumentどちらにも登録する必要がある（マウスフォーカスしてる方がよばれる））
    [innerDocument, outerDocument].forEach((document) => {
        document.addEventListener("keydown", (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'ArrowLeft') {
                event.preventDefault();
                if (innerDocument.referrer !== outerDocument.referrer) {
                    window.location.href = outerDocument.referrer;
                }
            }
        }, true);
        document.addEventListener("keyup", (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'ArrowLeft') {
                event.preventDefault();
                if (innerDocument.referrer !== outerDocument.referrer) {
                    window.location.href = outerDocument.referrer;
                }
            }
        }, true);
    })

}

window.addEventListener("load", waitLoad, false);
