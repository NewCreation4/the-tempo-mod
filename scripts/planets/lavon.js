const { hexSkyMesh } = require("elegant")
const { kathom } = require("planets/kathom")
const { verod } = require("planets/verod")

const lavon = new Planet("lavon", verod, 0.9, 2)
lavon.localizedName = "Lavon"
lavon.solarSystem = kathom
lavon.generator = new SerpuloPlanetGenerator();
lavon.defaultEnv = Env.terrestrial | Env.groundWater

lavon.allowCampaignRules = true
lavon.allowLaunchSchematics = true
lavon.allowLaunchLoadout = true
lavon.allowLaunchToNumbered = true // true for finding visually matching sectors
lavon.enemyInfiniteItems = false
lavon.ruleSetter = r => {
	r.waveTeam = Team.blue
	r.coreDestroyClear = true
	r.wavesSpawnAtCores = false
	r.planet = lavon
	r.lighting = true
	r.ambientLight = Color.valueOf("1c1c703b")
	r.unitLight = false
	r.solarMultiplier = 0.04
	r.hideSpawns = false
}

lavon.startSector = 47
lavon.sectorSeed = 4
lavon.alwaysUnlocked = true
lavon.accessible = true

lavon.atmosphereColor = Color.valueOf("000030")
lavon.atmosphereRadIn = 0.02
lavon.atmosphereRadOut = 0.065
lavon.orbitRadius = 13

lavon.updateLighting = false

lavon.launchMusic = Vars.tree.loadMusic("military-maneuvers-a")
lavon.darkMusic = Seq.with(
	Musics.boss1,
	Musics.boss2,
	Vars.tree.loadMusic("military-maneuvers-a")
)

lavon.meshLoader = () => new NoiseMesh(
	lavon, 69, 5, 0.9, 3, 0.8, 1, 0.5, Color.valueOf("c2bffb"),
	Color.valueOf("e9ebff"), 1, 1.2, 1.25, 0.45
);
lavon.cloudMeshLoader = () => hexSkyMesh({
	planet: lavon,
	seed: 92,
	speed: 1.25,
	radius: 0.09,
	divisions: 5,
	color: Color.valueOf("ffffff77"),
	octaves: 3,
	persistence: 0.3,
	scl: 2,
	thresh: 0.4
})
