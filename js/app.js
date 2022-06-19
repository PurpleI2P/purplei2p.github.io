function renderDownloadButton() {
	var downloadCount = 0, dl_btn = document.getElementById("dl-btn");

	if (window.navigator.platform.toUpperCase().startsWith("WIN")) {
		dl_btn.innerText = document.webL10n.get("header-dl-btn-bundle", null, "Download I2PdBrowser");
		dl_btn.setAttribute("href", "https://github.com/PurpleI2P/i2pdbrowser/releases/latest");

	} else if (window.navigator.userAgent.toUpperCase().indexOf("ANDROID") !== -1) {
		dl_btn.innerText = document.webL10n.get("header.dl-btn-android", null, "Download for Android");
		dl_btn.setAttribute("href", "https://github.com/PurpleI2P/i2pd-android/releases/latest");

	} else {
		dl_btn.innerText = document.webL10n.get("header-dl-btn", null, "Downloads");
	}
}

window.addEventListener('localized', function() {
	renderDownloadButton();
}, false);
