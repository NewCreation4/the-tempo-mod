const pipeBridge = extend(LiquidBridge, "pipe-bridge", {
	drawer: new DrawMulti(
		new DrawRegion("-bottom"),
		(() => {
			const tmp = DrawLiquidTile();
			tmp.padding = 2;
			return tmp;
		})(),
		new DrawDefault()
	),
	load() {
		this.super$load()
		this.drawer.load(this)
	},
	drawBase(tile) {
		if (tile.build != null) {
			this.drawer.draw(tile.build);
			this.super$drawBase(tile);
		} else {
			this.super$drawBase(tile);
		}
	},
	icons() {
        return [Core.atlas.find(this.name + "-preview")];
    },
})

// all of this just to add a bottom region btw
