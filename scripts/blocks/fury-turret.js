let maxFury = 6;

let getFury = (health, maxHealth) => {
  return Math.pow(maxFury, 1 - health / maxHealth)
}

const furyBullet = extend(BasicBulletType, {
   speed: 5,
   damage: 25,
   lifetime: 60,
   frontColor: Color.valueOf("ffffff"),
   backColor: Color.valueOf("2e74ff"),
   lightRadius: 40,
   lightColor: Color.valueOf("2e74ff"),
   lightOpacity: 0.7,
   width: 9,
   height: 12
});

const furyTurret = extend(ItemTurret, "fury-turret", {
  health: 3200,
  reload: 60,
  range: 360,
  setBars() {
    this.super$setBars()
    this.addBar("adaptation", (entity) => {
      return new Bar(
        () => Core.bundle.get("bar.fury", "Fury"),
        () => Color.valueOf("a865ff"),
        () => {
          return entity.maxHealth == undefined ? 0.5 : getFury(entity.health, this.health) / maxFury;
        }
      );
    })
  }
})
//furyTurret.ammo(Items.titanium, furyBullet);

furyTurret.buildType = () => extend(ItemTurret.ItemTurretBuild, furyTurret, {
  read(read, version) {
    this.super$read(read, version)
  },
  collision(bullet) {
    let result = this.super$collision(bullet)
    this.reload = furyTurret.reload / getFury(this.health, furyTurret.health)
    print(furyTurret.reload)
    print(this.health)
    print(furyTurret.health)
    print(getFury(this.health, furyTurret.health))
    print(this.reload)
    return result
  },
  updateShooting() {
    if (this.reloadCounter >= && !this.charging() && this.shootWarmup >= this.minWarmup) {
      let t = this.peekAmmo();
      this.shoot(t)
      this.reloadCounter %= furyTurret.reload / getFury(this.health, furyTurret.health)
    }
  }
})