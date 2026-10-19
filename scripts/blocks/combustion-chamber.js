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

const combustionChamber = extend(ConsumeGenerator, "combustion-chamber", {
	warmupSpeed: 0.005, // both visual and somewhat exponential
	cooldownSpeed: 0.007,
	drawer: new DrawMulti(
		new DrawRegion("-bottom"),
		new DrawLiquidTile(null),
		new DrawDefault(),
		extend(DrawGlowRegion, {
			lastItem: null,
			draw(build) {
				const liq = build.liquids.current()
				const item = build.items.first()
				if (liq == null || build.liquids.currentAmount <= 0.001 || build.warmup <= 0.001) return;
				this.color = liq.color
				this.suffix = "-glow"
				if (this.lastItem != null || item != null) {
					const f = item != null ? item.flammability : this.lastItem.flammability
					this.glowScale = f * 10
					this.alpha = f
				}
				this.super$draw(build)
				if (item != null)
					this.lastItem = item;
			}
		})
	)
})
combustionChamber.buildType = () => extend(ConsumeGenerator.ConsumeGeneratorBuild, combustionChamber, {
	setStats() {
		this.stats.timePeriod = this.itemDuration;
		this.stats.add(Stat.productionTime, itemDuration / 60, StatUnit.seconds);
		this.stats.add(Stat.booster, StatValues.liquidEffMultiplier(l => OxidizerEfficiencies(l), 0.033333333333 * 60, liq => OxidizerEfficiencies(liq) > 0));
	},
	updateEfficiencyMultiplier() {
		let item = combustionChamber.filterItem.getConsumed(this)
		let liquid = combustionChamber.filterLiquid.getConsumed(this)
		let eff = (
			item==null ?
				0 :
				combustionChamber.filterItem.itemEfficiencyMultiplier(item)) * (liquid==null ? 0 : combustionChamber.filterLiquid.liquidEfficiencyMultiplier(liquid)
			)
		if (eff > 0) this.efficiencyMultiplier = eff;
	},
	updateTile() {
		const valid = this.efficiency > 0;
		if (valid)
			this.warmup += combustionChamber.warmupSpeed * ( 1 + this.warmup) * Time.delta;
		else
			this.warmup -= combustionChamber.cooldownSpeed * (1 + this.warmup) * Time.delta;

		if (this.warmup > 1.0)
			this.warmup = 1;
		else if (this.warmup < 0)
			this.warmup = 0;

		this.productionEfficiency = this.efficiency * this.efficiencyMultiplier;
		this.totalTime += this.warmup * Time.delta;

		if(valid && Mathf.chanceDelta(combustionChamber.effectChance))
			combustionChamber.generateEffect.at(this.x + Mathf.range(combustionChamber.generateEffectRange), this.y + Mathf.range(combustionChamber.generateEffectRange));
		if(combustionChamber.filterItem != null && valid && combustionChamber.itemDurationMultipliers.size > 0 && combustionChamber.filterItem.getConsumed(this) != null)
			this.itemDurationMultiplier = combustionChamber.itemDurationMultipliers.get(combustionChamber.filterItem.getConsumed(this), 1);

		if(valid && this.generateTime <= 0){
			this.consume();
			this.generateTime = 1;
		}

		this.generateTime -= Time.delta / (combustionChamber.itemDuration * this.itemDurationMultiplier);
	}
})

combustionChamber.consume(ConsumeOxidizer)
