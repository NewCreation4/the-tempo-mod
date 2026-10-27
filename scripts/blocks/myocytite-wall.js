const adaptationMultiplier = 1

const myocytiteWall = extend(Wall, "myocytite-wall", {
	maxAdaptation: 7200,
	setBars() {
		this.super$setBars()
		this.addBar("adaptation", (entity) => {
			return new Bar(
				() => Core.bundle.get("bar.adaptation", "Adaptation"),
				() => Color.valueOf("ff9999"),
				() => {
					return (entity.maxHealth == undefined ? 0.5 : (entity.maxHealth - this.health) / (this.maxAdaptation - this.health));
				}
			);
		})
	}
})

myocytiteWall.buildType = () => extend(Wall.WallBuild, myocytiteWall, {
	created() {
		this.super$created();
	},
	write(write) {
		this.super$write(write)
		write.i(this.maxHealth)
		write.i(this.health)
	},
	read(read, version) {
		this.super$read(read, version)
		this.maxHealth = read.i()
		this.health = read.i()
	},
	collision(bullet) {
		let result = this.super$collision(bullet)
		let gains = (this.maxHealth + Math.ceil(bullet.damage * bullet.buildingDamageMultiplier / 2)) * adaptationMultiplier
		this.maxHealth = gains > myocytiteWall.maxAdaptation ? myocytiteWall.maxAdaptation : gains
		return result
	}
})
