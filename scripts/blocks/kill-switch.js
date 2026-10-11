const killSwitch = extend(SwitchBlock, "kill-switch", {})
killSwitch.buildType = () => extend(SwitchBlock.SwitchBuild, killSwitch, {
  configTapped() {
    if (Vars.player.unit()!=null) {
      Call.unitDestroy(Vars.player.unit().id)
    }
    this.super$configTapped()
  }
})