const { silver, cobalt, fluorite, sulphur, metaAlloy } = require("items")
const { purpleWater, fluorine, steam, acid } = require("liquids")
const { polity } = require("cores")
const { idaeus } = require("planets/idaeus")

idaeus.techTree = TechTree.nodeRoot("Idaeus", polity, true, () => {
	TechTree.nodeProduce(silver, () => {
		TechTree.nodeProduce(purpleWater, () => {
			TechTree.nodeProduce(Liquids.water, () => {
				TechTree.nodeProduce(steam, () => {})
				TechTree.nodeProduce(acid, () => {})
			})
			TechTree.nodeProduce(sulphur, () => {})
		})
		TechTree.nodeProduce(Items.coal, () => {
			TechTree.nodeProduce(Items.graphite, () => {
				TechTree.nodeProduce(Items.titanium, () => {
					TechTree.nodeProduce(Items.tungsten, () => {
						TechTree.nodeProduce(metaAlloy, () => {})
					})
					TechTree.nodeProduce(cobalt, () => {})
				})
			})
			TechTree.nodeProduce(Items.silicon, () => {})
		})
		TechTree.nodeProduce(Items.sand, () => {
			TechTree.nodeProduce(Items.metaglass, () => {})
			TechTree.nodeProduce(Liquids.oil, () => {})
			TechTree.nodeProduce(fluorite, () => {
				TechTree.nodeProduce(fluorine, () => {})
			})
		})
	})
})

