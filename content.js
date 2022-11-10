function main() {
	if (window.frameElement && window.frameElement.classList.contains("gameframe")) {
		const script = document.createElement('script');
		script.src = chrome.runtime.getURL('injected.js');
		document.documentElement.appendChild(script);
	}
}

main();
