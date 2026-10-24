const kathom = new Planet("kathom", null, 6)
kathom.localizedName = "Kathom"
kathom.bloom = true
kathom.accessible = false
kathom.meshLoader = () => new SunMesh(kathom, 3, 4, 0.6, 1, 1, 0.5, 1,
	Color.valueOf("ffe06f"),
	Color.valueOf("ffe790"),
	Color.valueOf("ffedae"),
	Color.valueOf("fff8c8"),
	Color.valueOf("ffe53b")
);

module.exports = {
	kathom: kathom
}
