const waitForElm = (selector) => {
	return new Promise((resolve) => {
		let queryResult, observer;

		queryResult = document.querySelector(selector);

		if (queryResult) {
			return resolve(queryResult);
		}

		observer = new MutationObserver((mutations) => {
			queryResult = document.querySelector(selector);

			if (queryResult) {
				resolve(queryResult);
				observer.disconnect();
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
	});
};

const main = () => {
	const _RTCIceCandidatePrototype = window.RTCIceCandidate.prototype;

	window.RTCIceCandidate = function (candidateInfo) {
		const ip = candidateInfo.candidate.split(' ')[4];

		if (null != ip.match(/(?:(?:[0-9]+)\.){3}[0-9]+/)) {
			waitForElm('div.chatbox-view > div.log.ps').then((chatbox) => {
				console.log(`IP: ${ip}`);
				const p = document.createElement('p');
				p.innerText = `IP: ${ip}`;
				chatbox.append(p);
			});
		}

		return new _RTCIceCandidatePrototype.constructor(candidateInfo);
	};

	window.RTCIceCandidate.prototype = _RTCIceCandidatePrototype;
};

main();
