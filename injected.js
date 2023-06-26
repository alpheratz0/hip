/*
	Copyright (C) 2022-2023 <alpheratz99@protonmail.com>

	This program is free software; you can redistribute it and/or modify it
	under the terms of the GNU General Public License version 2 as published by
	the Free Software Foundation.

	This program is distributed in the hope that it will be useful, but WITHOUT
	ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
	FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
	more details.

	You should have received a copy of the GNU General Public License along
	with this program; if not, write to the Free Software Foundation, Inc., 59
	Temple Place, Suite 330, Boston, MA 02111-1307 USA

*/

console.clear();

window.originalRTCPeerConnection = window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
	const conn = new window.originalRTCPeerConnection(...args);
	conn.originalAddIceCandidate = conn.addIceCandidate;
	conn.addIceCandidate = function (iceCandidate, ...args) {
		const candidateInfo = iceCandidate.candidate.split(" ");
		const candidateAddress = candidateInfo[4];
		const candidateType = candidateInfo[7];

		if (candidateType == "srflx") {
			console.log("%c%s", "color:blue;", candidateAddress);
		}

		return conn.originalAddIceCandidate(iceCandidate, ...args);
	}

	return conn;
}
