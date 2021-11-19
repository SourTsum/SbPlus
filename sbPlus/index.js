var features = {"mining_speed_sound":true}
var features_settings = {"msb_time":"&cnot available"}
var Minesdisplay = new Display();
//Server Registration
var serverRec = 0
register("chat", function(event) {
    Scoreboard.getLines().forEach(name => {
    var formattedStr = ChatLib.removeFormatting(name).replace(/[^a-zA-Z -]/g, "")
    if(formattedStr.includes("The Lift") || formattedStr.includes("The Forge")|| formattedStr.includes("Dwarven Mines")) {
      serverRec += 1;
    } else {
      return
    }
  if(serverRec == 0){
    Minesdisplay.setRenderLoc(1000,1000);
  }
  if(serverRec == 1){
    Minesdisplay.setRenderLoc(10,10);
    serverRec = 0;
  }
  })
}).setCriteria("&r&7Warping...&r").setParameter("contains");
//Dwarvin Display
Minesdisplay.addLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
Minesdisplay.setBackground(DisplayHandler.Background.FULL);
Minesdisplay.setRenderLoc(1000, 1000);
//Dwarvin Features
register("chat", function(event) {
  World.playSound("mob.silverfish.say", 100, 1);
  features_settings['msb_time'] = "&anow available"
  Minesdisplay.setLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
}).setCriteria("&r&a&r&6Mining Speed Boost &r&ais now available!&r").setParameter("contains");
register("chat", function(event) {
  features_settings['msb_time'] = "&cnot available"
  Minesdisplay.setLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
}).setCriteria("&r&aYou used your &r&6Mining Speed Boost &r&aPickaxe Ability!&r").setParameter("contains");

register("command",function(event){
  ChatLib.chat("Yo")
}).setName("sbp")
