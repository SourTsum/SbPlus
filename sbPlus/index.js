var features = {"mining_speed_sound":true}
var features_settings = {"msb_time":"&cnot available"}
var Minesdisplay = new Display();
//Dwarvin Display
Minesdisplay.addLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
Minesdisplay.setBackground(DisplayHandler.Background.FULL);
Minesdisplay.setRenderLoc(10, 10);
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
  ChatLib.chat(scrBoard)
}).setName("sbp")