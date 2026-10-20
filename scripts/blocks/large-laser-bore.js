const { fluorine } = require("liquids/fluorine")

const largeLaserBore = extend(BeamDrill, "large-laser-bore", {})
largeLaserBore.consumeLiquid(Liquids.hydrogen, 1 / 60)
largeLaserBore.consumeLiquid(fluorine, 1 / 60).boost()
largeLaserBore.consumePower(54 / 60)
