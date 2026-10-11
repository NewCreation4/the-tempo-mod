const wall = extend(Wall, "cad-myocytite-wall", {})

Events.on(BuildDamageEvent, event => {
  if (event.build.block == "cad-myocytite-wall") {
    if (event.build.maxHealth < 2560) {
      event.build.maxHealth = event.build.maxHealth + Math.floor(event.source.damage / 2)
    } else {
      event.build.maxHealth = 2560
    }
  }
})

print("LOADED (hopefully)")