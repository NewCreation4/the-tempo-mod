const { chromium, cobalt, fluorite, magnesium, sulphur, metaAlloy } = require("items")
const { brine, fluorine } = require("liquids")
const { exponentiation } = require("blocks/exponentiation")
const { lavon } = require("planets/lavon")

lavon.techTree = TechTree.nodeRoot("Lavon", exponentiation, true, () => {
	TechTree.nodeProduce(Items.beryllium, () => {
		TechTree.nodeProduce(Items.silicon, () => {})
		TechTree.nodeProduce(Items.scrap, () => {})
		TechTree.nodeProduce(Items.titanium, () => {
			TechTree.nodeProduce(fluorite, () => {
				TechTree.nodeProduce(fluorine, () => {})
			})
			TechTree.nodeProduce(chromium, () => {
				TechTree.nodeProduce(cobalt, () => {
					TechTree.nodeProduce(metaAlloy, () => {})
				})
				TechTree.nodeProduce(Items.tungsten, () => {
					TechTree.nodeProduce(Items.carbide, () => {})
				})
			})
		})
		TechTree.nodeProduce(brine, () => {
			TechTree.nodeProduce(magnesium, () => {})
			TechTree.nodeProduce(sulphur, () => {})
			TechTree.nodeProduce(Liquids.water, () => {
				TechTree.nodeProduce(Liquids.ozone, () => {})
				TechTree.nodeProduce(Liquids.hydrogen, () => {})
			})
		})
	})
})
