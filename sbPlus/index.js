var features = {"mining_speed_sound":true}
var features_settings = {"msb_time":"&cnot available"}
var Minesdisplay = new Display();
var serverVal = 0
//Server Registration
const WarpLocationList = ["The Lift", "The Forge", "Dwarven Mines", "Dwarven Village"];
const CheckForLocation = register('tick', () => {
  serverVal = 0
  features_settings['msb_time'] = "&cnot available"
  features['mining_speed_sound'] = false 
  if(TabList.getFooter().length > 100) { // only checks if the tab list is fully loaded
        Scoreboard.getLines().forEach(name => {
            name = ChatLib.removeFormatting(name).replace(/[^a-zA-Z -]/g, "").trim(); // trim to remove the whitespaces 
            if(WarpLocationList.includes(name) == true) {
              serverVal += 1
            }
            if(serverVal == 1){
              features['mining_speed_sound'] = true
              Minesdisplay.setRenderLoc(10,10);
            } else {
              Minesdisplay.setRenderLoc(1000,1000);
            }
        });
        if(name !== "None") CheckForLocation.unregister(); // can happen if you move between areas (Lift entrance)
    }
});

register("worldLoad", () => {
    CheckForLocation.register();
});
//Dwarvin Display
Minesdisplay.addLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
Minesdisplay.setBackground(DisplayHandler.Background.FULL);
Minesdisplay.setRenderLoc(1000, 1000);
//Dwarvin Features
register("chat", function(event) {
  if (features['mining_speed_sound'] == true){
    World.playSound("mob.silverfish.say", 100, 1);
    features_settings['msb_time'] = "&anow available"
    Minesdisplay.setLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
  }
}).setCriteria("&r&a&r&6Mining Speed Boost &r&ais now available!&r").setParameter("contains");
register("chat", function(event) {
  if (features['mining_speed_sound'] == true){
  features_settings['msb_time'] = "&cnot available"
  Minesdisplay.setLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
  }
}).setCriteria("&r&aYou used your &r&6Mining Speed Boost &r&aPickaxe Ability!&r").setParameter("contains");

register("command",function(event){
  ChatLib.chat("Yo")
}).setName("sbp")
