const _RTCIceCandidatePrototype = window.RTCIceCandidate.prototype;

window.RTCIceCandidate = function(candidateInfo) {
	const ip = candidateInfo.candidate.split(' ')[4];
	if (null != ip.match(/(?:(?:[0-9]+)\.){3}[0-9]+/))
		console.log(ip);
	return new _RTCIceCandidatePrototype.constructor(candidateInfo);
}

window.RTCIceCandidate.prototype = _RTCIceCandidatePrototype;
