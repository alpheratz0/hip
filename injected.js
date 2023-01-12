/*
	Copyright (C) 2022 <alpheratz99@protonmail.com>

	This program is free software; you can redistribute it and/or modify it under
	the terms of the GNU General Public License version 2 as published by the
	Free Software Foundation.

	This program is distributed in the hope that it will be useful, but WITHOUT ANY
	WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along with
	this program; if not, write to the Free Software Foundation, Inc., 59 Temple
	Place, Suite 330, Boston, MA 02111-1307 USA

*/

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
		country: json.country || 'Unknown',
		city: json.city || 'Unknown',
		flag: json.flag?.emoji || '??'
	};
}

const main = () => {
	const _RTCIceCandidatePrototype = window.RTCIceCandidate.prototype;

	window.RTCIceCandidate = function (candidateInfo) {
		const instance = new _RTCIceCandidatePrototype.constructor(candidateInfo);
		const ip = instance.address;
		const port = instance.port;

		if (null != ip.match(/(?:(?:[0-9]+)\.){3}[0-9]+/)) {
			waitForElm('div.chatbox-view > div.log.ps').then((chatbox) => {
				getIPAddressInfo(ip).then(info => {
					const msg = `IP: ${ip} Port: ${port} From: ${info.city}, ${info.flag} ${info.country}`;
					const p = document.createElement('p');
					p.innerText = msg;
					chatbox.append(p);
					console.log(msg);
				});
			});
		}

		return instance;
	};

	window.RTCIceCandidate.prototype = _RTCIceCandidatePrototype;
};

main();
