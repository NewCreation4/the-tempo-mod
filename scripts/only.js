const ConsumeOxidizer = extend(ConsumeLiquidFilter, liquid => OxidizerEfficiencies(liquid)>0, 0.033333333333, {
  display(stats) {
    stats.add(this.booster ? Stat.booster : Stat.input, StatValues.liquidEffMultiplier(l => OxidizerEfficiencies(l), this.amount * 60, this.filter));
  },
  liquidEfficiencyMultiplier(liquid) {
    return OxidizerEfficiencies(liquid)
  }
})
