var adaptationMultiplier = 1

const myocytiteWall = extend(Wall, "myocytite-wall", {
  maxAdaptation: 6600,
  health: 600,
  setBars() {
    this.super$setBars()
    this.addBar("adaptation", (entity) => {
      return new Bar(
        () => Core.bundle.get("bar.adaptation", "Adaptation"),
        () => Color.valueOf("ff9999"),
        () => {
          return (entity.maxHealth == undefined ? 0.5 : (entity.maxHealth - this.health) / this.maxAdaptation);
        }
      );
    })
  }
})

myocytiteWall.buildType = () => extend(Wall.WallBuild, myocytiteWall, {
  adaptation: 0,
  created() {
    this.super$created();
    if (this.adaptation == undefined) this.adaptation = 0;
  },
  write(write) {
    this.super$write(write)
    write.i(this.adaptation)
    write.i(this.maxHealth)
  },
  read(read, version) {
    this.super$read(read, version)
    this.adaptation = read.i()
    if (version >= 2) {
      this.maxHealth = read.i()
    } else {
      this.maxHealth = myocytiteWall.health
    }
    print(this.maxHealth)
  },
  collision(bullet) {
    let result = this.super$collision(bullet)
    let gains = (this.adaptation + Math.ceil(bullet.damage / 4)) * adaptationMultiplier
    this.adaptation = gains > myocytiteWall.maxAdaptation ? myocytiteWall.maxAdaptation : gains
    this.maxHealth = myocytiteWall.health + this.adaptation
    return result
  }
})