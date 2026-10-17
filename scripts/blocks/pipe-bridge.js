const pipeBridge = extend(LiquidBridge, "pipe-bridge", {
	noAcceptDisabled: true,
	fadeIn: false,
	moveArrows: false,
	arrowSpacing: 6,
	squareSprite: false,
	floating: true,
	hasPower: false,
	liquidCapacity: 120,
	range: 4,
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
		//print("load done")
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

/*pipeBridge.buildType = () => extend(ItemBridge.ItemBridgeBuild, {
    updateTransport(other) {
        if (this.warmup >= 0.25) {
            this.moved |= this.moveLiquid(other, this.liquids.current()) > 0.05;
        }
    },

    doDump() {
        this.dumpLiquid(this.liquids.current(), 1);
    },

    draw() {
        this.block.drawer.draw(this);
        this.super$draw();
    }
});*/

/*pipeBridge.buildType = () => extend(ItemBridge.ItemBridgeBuild, {
	draw() {
		this.block.drawer.draw(this)
		this.super$draw()
		print("draw done")
	}
})*/

//const pipeBridgeDrawer = new DrawMulti() 

// all of this just to add a bottom region btw
