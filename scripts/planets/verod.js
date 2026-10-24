const { hexSkyMesh } = require("elegant")
const { kathom } = require("planets/kathom")

const verod = new Planet("verod", kathom, 4, 2)
verod.localizedName = "Verod"
verod.generator = new SerpuloPlanetGenerator();
verod.meshLoader = () => new NoiseMesh(
	verod, 777, 4, 4, 7, 0.9, 1, 0.2, Color.valueOf("ff61fc"),
	Color.valueOf("e960ff"), 1, 1.2, 1.25, 0.45
);
verod.cloudMeshLoader = () => MultiMesh(
	hexSkyMesh({ // highest clouds
		planet: verod,
		seed: 1,
		speed: 1,
		radius: 0.01,
		divisions: 5,
		color: Color.valueOf("c560FFDD"),
		octaves: 3,
		persistence: 0.75,
		scl: 1,
		thresh: 0.5
	}),
	hexSkyMesh({
		planet: verod,
		seed: 2,
		speed: 1.5,
		radius: 0.085,
		divisions: 5,
		color: Color.valueOf("ff61fcDE"),
		octaves: 3,
		persistence: 0.75,
		scl: 1,
		thresh: 0.55
	}),
	hexSkyMesh({
		planet: verod,
		seed: 4,
		speed: 2,
		radius: 0.07,
		divisions: 5,
		color: Color.valueOf("FF60CAEE"),
		octaves: 3,
		persistence: 0.75,
		scl: 1,
		thresh: 0.6
	}),
	hexSkyMesh({
		planet: verod,
		seed: 8,
		speed: 2.5,
		radius: 0.055,
		divisions: 5,
		color: Color.valueOf("ca60FFEF"),
		octaves: 3,
		persistence: 0.8,
		scl: 1,
		thresh: 0.7
	})
)
verod.solarSystem = kathom
verod.alwaysUnlocked = false
verod.accessible = false

verod.orbitRadius = 125
verod.updateLighting = false
verod.iconColor = Color.valueOf("ff2ad0")

/*verod.cloudMeshLoader = () => MultiMesh(
	new HexSkyMesh(verod, 2, 1, 3.35, 5, Color.valueOf())
);*/

module.exports = {
	verod: verod
}
