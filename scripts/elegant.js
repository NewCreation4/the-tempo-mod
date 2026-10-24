function hexSkyMesh({ planet, seed, speed, radius, divisions, color,
	octaves, persistence, scl, thresh }) {
	return new HexSkyMesh(
		planet, seed, speed, radius, divisions, color, octaves,
		persistence, scl, thresh
	);
}

function noiseMesh2({ planet, seed, divisions, radius, octaves,
	persistence, scale, mag, color1, color2, coct, cper, cscl,
	cthresh }) {
	return new NoiseMesh(
		planet, seed, divisions, radius, octaves, persistence, scale,
		mag, color1, color2, coct, cper, cscl, cthresh
	)
}

module.exports = {
	hexSkyMesh: hexSkyMesh,
	noiseMesh2: noiseMesh2
}
