const OxidizerEfficiencies = liquid => {
	switch (true) {
	case liquid == Liquids.ozone:
		return 1;
	case liquid == Vars.content.liquid("ttm-fluorine"):
		return 1.5;
	case liquid.flammability > 1 && liquid != Liquids.cyanogen && liquid.gas:
		return liquid.flammability;
	default:
		return 0;
	}
}
const OEF = liq => OxidizerEfficiencies(liq)

const ConsumeOxidizer = extend(ConsumeLiquidFilter, liquid => OxidizerEfficiencies(liquid) > 0, 0.033333333333, {
	display(stats) {
		stats.add(Stat.booster, StatValues.liquidEffMultiplier(l => OxidizerEfficiencies(l), this.amount * 60, this.filter));
	},
	liquidEfficiencyMultiplier(liquid) {
		return OxidizerEfficiencies(liquid)
	}
})

const combustionChamber = extend(ConsumeGenerator, "combustion-chamber", {})
combustionChamber.buildType = () => extend(ConsumeGenerator.ConsumeGeneratorBuild, combustionChamber, {
	setStats() {
		this.stats.timePeriod = this.itemDuration;
		this.stats.add(Stat.productionTime, itemDuration / 60, StatUnit.seconds);
		this.stats.add(Stat.booster, StatValues.liquidEffMultiplier(l => OxidizerEfficiencies(l), 0.033333333333 * 60, liq => OxidizerEfficiencies(liq) > 0));
	},
	updateEfficiencyMultiplier() {
		let item = combustionChamber.filterItem.getConsumed(this)
		let liquid = combustionChamber.filterLiquid.getConsumed(this)
		let eff = (item==null ? 0 : combustionChamber.filterItem.itemEfficiencyMultiplier(item)) * (liquid==null ? 0 : combustionChamber.filterLiquid.liquidEfficiencyMultiplier(liquid))
		if (eff > 0) this.efficiencyMultiplier = eff;
	}
})

combustionChamber.consume(ConsumeOxidizer)
