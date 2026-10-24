const { hexSkyMesh, noiseMesh2 } = require("elegant")
const { kathom } = require("planets/kathom")

const idaeus = new Planet("idaeus", kathom, 1.1, 2)
idaeus.localizedName = "Idaeus"
idaeus.generator = new SerpuloPlanetGenerator()
idaeus.sectorSeed = 4
idaeus.startSector = 35
idaeus.solarSystem = kathom
idaeus.orbitRadius = 55
idaeus.alwaysUnlocked = false
idaeus.accessible = false
idaeus.defaultEnv = Env.terrestrial | Env.groundOil | Env.groundWater | Env.oxygen
idaeus.iconColor = Color.valueOf("ff5050")

idaeus.hasAtmosphere = true
idaeus.atmosphereRadIn = 0.02
idaeus.atmosphereRadOut = 0.3
idaeus.atmosphereColor = Color.valueOf("221990ef")

idaeus.allowLaunchSchematics = false
idaeus.allowLaunchLoadout = false
idaeus.allowSectorInvasion = true
idaeus.allowLaunchToNumbered = true
idaeus.enemyInfiniteItems = false

idaeus.ambientMusic = Seq.with(
    Vars.tree.loadMusic("heiwazima"),
    Vars.tree.loadMusic("tairitsu")
)

idaeus.meshLoader = () => new MultiMesh(
	noiseMesh2({ // red grass
		planet: idaeus,
		seed: 483,
		divisions: 5,
		radius: 1.1,
		octaves: 3,
		persistence: 0.8,
		scale: 1,
		mag: 0.35,
		color1: Color.valueOf("CD2D32"),
		color2: Color.valueOf("B22D32"),
		coct: 1,
		cper: 1.2,
		cscl: 1.25,
		cthresh: 0.45
	}),
	noiseMesh2({ // purple water
		planet: idaeus,
		divisions: 5,
		seed: 14,
		radius: 1.135,
		octaves: 3,
		persistence: 1,
		scale: 1,
		mag: 0.05,
		color1: Color.valueOf("B69BEC"),
		color2: Color.valueOf("A07DE7"),
		coct: 1,
		cper: 1.125,
		cscl: 1.25,
		cthresh: 1
	})
)
idaeus.cloudMeshLoader = () => hexSkyMesh({
	planet: idaeus,
	seed: 80,
	speed: 0.8,
	radius: 0.085,
	divisions: 5,
	color: Color.valueOf("ffffff75"),
	octaves: 2,
	persistence: 0.45,
	scl: 1,
	thresh: 0.44
})

module.exports = {
	idaeus: idaeus
}
