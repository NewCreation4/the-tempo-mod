const { noiseMesh2 } = require("elegant")
const { idaeus } = require("planets/idaeus")

const yarok = new Planet("yarok", idaeus, 0.4, 2)
yarok.localizedName = "Yarok"
yarok.generator = new SerpuloPlanetGenerator()
yarok.defaultEnv = Env.terrestrial | Env.groundWater
yarok.startSector = 21
yarok.sectorSeed = 7
yarok.orbitRadius = 6
yarok.tidalLock = true
yarok.accessible = false
yarok.alwaysUnlocked = false
yarok.updateLighting = true

yarok.hasAtmosphere = false
yarok.allowLaunchSchematics = true
yarok.allowLaunchLoadout = true
yarok.allowSectorInvasion = false
yarok.allowLaunchToNumbered = true

yarok.meshLoader = () => noiseMesh2({
	planet: yarok,
	seed: 95,
	divisions: 5,
	radius: 0.4,
	octaves: 3,
	persistence: 0.5,
	scale: 1,
	mag: 0.5,
	color1: Color.valueOf("1A1A1A"),
	color2: Color.valueOf("004C38"),
	coct: 1,
	cper: 1.125,
	cscl: 1.25,
	cthresh: 0.5
})
