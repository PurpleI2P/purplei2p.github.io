var url = "https://api.github.com/repos/PurpleI2P/i2pdbrowser/releases/latest";
//var url = "http://127.0.0.1:9889/latest.json";

function renderReleaseInfo(data) {
    if (!data) return;
    var release = JSON.parse(data);
    var downloadCount = 0, dl_btn = document.getElementById("dl-btn"), all_dls = document.getElementById("all-dls");

    for (var i = 0; i < release.assets.length; i++)
        downloadCount += release.assets[i].download_count;
    console.log(release.name+" downloaded "+downloadCount.toLocaleString()+" times.");

    if (window.navigator.platform.toUpperCase().startsWith("WIN")) {
        var win_asset = release.assets.filter(function(a) { 
            if (a.name.startsWith("I2PdBrowser") && a.name.endsWith("exe"))
                return true;
        });

        if (win_asset.length > 0) {
            dl_btn.innerText = document.webL10n.get("header-dl-btn-windows", null, "Download for Windows");
            dl_btn.setAttribute("href", win_asset[0].browser_download_url);
            all_dls.style.display = "block";
        }
        /*
    } else if (window.navigator.userAgent.toUpperCase().indexOf("ANDROID") !== -1) {
        var droid_asset = release.assets.filter(function(a) { 
            if (a.name.toUpperCase().indexOf("ANDROID") !== -1) return true;
        });

        if (droid_asset.length > 0) {
            dl_btn.text(document.webL10n.get("header.dl-btn-android"));
            dl_btn.setAttribute("href", droid_asset[0].browser_download_url);
            all_dls.show();
        }
        */
    } else {
        dl_btn.innerText = document.webL10n.get("header-dl-btn", null, "Downloads");
    }
}

window.addEventListener('localized', function() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState == XMLHttpRequest.DONE)
            renderReleaseInfo(httpRequest.responseText);
    }
    httpRequest.open('GET', url);
    httpRequest.send();
}, false);
