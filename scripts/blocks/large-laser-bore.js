const { fluorine } = require("liquids/fluorine")

const largeLaserBore = extend(BeamDrill, "large-laser-bore", {})
largeLaserBore.consumeLiquid(Liquids.hydrogen, 2 / 60)
largeLaserBore.consumeLiquid(fluorine, 2 / 60).boost()
largeLaserBore.consumePower(54 / 60)
