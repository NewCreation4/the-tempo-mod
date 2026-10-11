require("blocks/myocytite-wall")
require("blocks/fury-turret")
require("blocks/combustion-chamber")
//require("test")

Events.run(ClientLoadEvent, () => {
  let llb = Vars.content.block("ttm-large-laser-bore")
  llb.consumeLiquid(Vars.content.liquid("ttm-fluorine"), 2 / 60).boost()
  llb.init()
  //let mg = Vars.content.block("ttm-multi-gas")
  //llb.consumeLiquid(Vars.content.liquid("ttm-neon"), 15 / 60)
  //mg.init()

  let lavon = Vars.content.planet("ttm-lavon")
  lavon.ruleSetter = r => {
    r.waveTeam = Team.blue
    r.hideSpawns = true
    r.coreDestroyClear = true
    r.wavesSpawnAtCores = false
    //r.unitAmmo = true // i will miss you buddy :(
    r.planet = lavon
  }
  lavon.campaignRuleDefaults.hideSpawns = true
  lavon.campaignRuleDefaults.rtsAI = true
  lavon.campaignRuleDefaults.sectorInvasion = true

  const modItem = name => Vars.content.item("ttm-" + name),
  modPlanet = name => Vars.content.planet("ttm-" + name),
  modLiquid = name => Vars.content.liquid("ttm-" + name),
  modBlock = name => Vars.content.block("ttm-" + name),
  modUnit = name => Vars.content.unit("ttm-" + name);
  
  let moddedItems = ["chromium", "magnesium", "sulphur", "fluorite", "cobalt", "meta-alloy"]
  let moddedLiquids = ["brine", "fluorine"]
  let vanillaItems = [Items.silicon, Items.beryllium, Items.titanium, Items.tungsten, Items.scrap, Items.carbide, Items.fissileMatter]
  let vanillaLiquids = [Liquids.ozone, Liquids.hydrogen]
  
  let tt = lavon.techTree
  tt.children.add(
    TechTree.nodeProduce(Items.beryllium, ()=>{
    TechTree.nodeProduce(Items.silicon, ()=>{
      TechTree.nodeProduce(Items.scrap, ()=>{})
    })
    TechTree.nodeProduce(Items.titanium, ()=>{
      TechTree.nodeProduce(modItem("fluorite"), ()=>{
        TechTree.nodeProduce(modLiquid("fluorine"), ()=>{})
      })
      TechTree.nodeProduce(modItem("chromium"), ()=>{
        TechTree.nodeProduce(modItem("cobalt"), ()=>{
          TechTree.nodeProduce(modItem("meta-alloy"), ()=>{})
        })
        TechTree.nodeProduce(Items.tungsten, ()=>{
          TechTree.nodeProduce(Items.carbide, ()=>{})
        })
      })
      TechTree.nodeProduce(modLiquid("brine"), ()=>{
        TechTree.nodeProduce(modItem("magnesium"), ()=>{})
        TechTree.nodeProduce(modItem("sulphur"), ()=>{})
        TechTree.nodeProduce(Liquids.ozone, ()=>{})
        TechTree.nodeProduce(Liquids.hydrogen, ()=>{})
      })
    })
  }))
  
  moddedItems.forEach(item=>{
    modItem(item).databaseTabs.add(modPlanet("lavon"))
    modItem(item).shownPlanets.add(modPlanet("lavon"))
  })
  moddedLiquids.forEach(liquid=>{
    modLiquid(liquid).databaseTabs.add(modPlanet("lavon"))
    modLiquid(liquid).shownPlanets.add(modPlanet("lavon"))
  })
  vanillaItems.forEach(item=>{
    item.databaseTabs.add(modPlanet("lavon"))
    item.shownPlanets.add(modPlanet("lavon"))
  })
  vanillaLiquids.forEach(liquid=>{
    liquid.databaseTabs.add(modPlanet("lavon"))
    liquid.shownPlanets.add(modPlanet("lavon"))
  })
})

// in json put ConsumeGeneratorBuild