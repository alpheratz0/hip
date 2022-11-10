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

const getIPAddressInfo = async (ipAddr) => {
	const resp = await fetch(`https://ipwho.is/${ipAddr}?fields=country,city,flag.emoji`);
	const json = await resp.json();
	return {
		country: json.country,
		city: json.city,
		flag: json.flag.emoji
	};
}

const main = () => {
	const _RTCIceCandidatePrototype = window.RTCIceCandidate.prototype;

	window.RTCIceCandidate = function (candidateInfo) {
		const ip = candidateInfo.candidate.split(' ')[4];

		if (null != ip.match(/(?:(?:[0-9]+)\.){3}[0-9]+/)) {
			waitForElm('div.chatbox-view > div.log.ps').then((chatbox) => {
				getIPAddressInfo(ip).then(info => {
					const msg = `IP: ${ip}\nCountry: ${info.flag} (${info.country})\nCity: ${info.city}`;
					const p = document.createElement('p');
					p.innerText = msg;
					chatbox.append(p);
					console.log(msg);
				});
			});
		}

		return new _RTCIceCandidatePrototype.constructor(candidateInfo);
	};

	window.RTCIceCandidate.prototype = _RTCIceCandidatePrototype;
};

main();
