//Features Lists
var features = {"mining_speed_sound":true,"current_mining_event":true,"raffle_closing":true}
var features_settings = {"msb_time":"&cnot available","active_mining_event":"none"}
//Display Var
var SpeedBoostDisplay = new Display();
var MinesEventDisplay = new Display();
var RaffleCountDown = new Display();
//Server Registration
var serverVal = 0
const WarpLocationList = ["The Lift", "The Forge", "Dwarven Mines", "Dwarven Village"];
const CheckForLocation = register('tick', () => {
  serverVal = 0
  features_settings['msb_time'] = "&cnot available"
  features_settings['msb_time'] = "none"
  features['mining_speed_sound'] = false 
  if(TabList.getFooter().length > 100) { // only checks if the tab list is fully loaded
        Scoreboard.getLines().forEach(name => {
            name = ChatLib.removeFormatting(name).replace(/[^a-zA-Z -]/g, "").trim(); // trim to remove the whitespaces 
            if(WarpLocationList.includes(name) == true) {
              serverVal += 1
            }
            if(serverVal == 1){
              features['mining_speed_sound'] = true
              SpeedBoostDisplay.setRenderLoc(10,10);
              MinesEventDisplay.setRenderLoc(10,20);
            } else {
              SpeedBoostDisplay.setRenderLoc(1000,1000);
              MinesEventDisplay.setRenderLoc(1000,1000);
            }
        });
        if(name !== "None") CheckForLocation.unregister(); // can happen if you move between areas (Lift entrance)
    }
});

register("worldLoad", () => {
    CheckForLocation.register();
});
//Dwarvin Display
if (features['mining_speed_sound'] == true){
  SpeedBoostDisplay.addLine("&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
}
if (features['current_mining_event'] == true){
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}

RaffleCountDown.addLine(0,"&r&c&lRAFFLE CLOSING!");
RaffleCountDown.addLine(1,"&r&7in 20 seconds&r");
RaffleCountDown.setAlign("center");
RaffleCountDown.setRenderLoc(1000,1000);

MinesEventDisplay.setBackground(DisplayHandler.Background.FULL);
MinesEventDisplay.setRenderLoc(1000, 1000);

SpeedBoostDisplay.setBackground(DisplayHandler.Background.FULL);
SpeedBoostDisplay.setRenderLoc(1000, 1000);
//Dwarvin Features
//Mining Speed Boost
register("chat", function(event) {
  if (features['mining_speed_sound'] == true){
    World.playSound("mob.silverfish.say", 100, 1);
    features_settings['msb_time'] = "&anow available"
    SpeedBoostDisplay.setLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
  }
}).setCriteria("&r&a&r&6Mining Speed Boost &r&ais now available!&r").setParameter("contains");
register("chat", function(event) {
  features_settings['msb_time'] = "&cnot available"
  SpeedBoostDisplay.setLine(0,"&r&a&r&6Mining Speed Boost&7: " + features_settings['msb_time']);
}).setCriteria("&r&aYou used your &r&6Mining Speed Boost &r&aPickaxe Ability!&r").setParameter("contains");
//Current Mining Event
register("chat", function(event){
  features_settings['active_mining_event'] = "none";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("ENDED!&r").setParameter("contains");
//Gourmand
register("chat", function(event){
  features_settings['active_mining_event'] = "&bMithril Gourmand";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("&eThe &bMithril Gourmand &eevent starts in").setParameter("contains");
//Better Together
register("chat", function(event){
  features_settings['active_mining_event'] = "&dBetter Together";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("&eThe &dBetter Together &eevent starts in").setParameter("contains");
//Raffle
register("chat", function(event){
  features_settings['active_mining_event'] = "&6Raffle";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("&eThe &6Raffle &eevent starts in").setParameter("contains");
//Raffle Warning
register("chat", (event) => {
  if(features["raffle_closing"] == true){
    RaffleCountDown.setRenderLoc(Renderer.screen.getWidth() / 2,Renderer.screen.getHeight() / 2 + 75)
    new Thread(() => {
      for (let index = 20; index >= 0; index--) {
        if(index <= 10){
          World.playSound("random.orb", 100, 1);
        }
        RaffleCountDown.setLine(1,"&r&7in " + index + " seconds&r");
        Thread.sleep(1000);
      }
      RaffleCountDown.setRenderLoc(1000,1000)
    }).start(); 
  }
}).setCriteria("&r&c&lRAFFLE CLOSING! &r&7in 10 seconds&r").setParameter("contains");
//Gone with the Wind
register("chat", function(event){
  features_settings['active_mining_event'] = "&9Gone with the Wind";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("&eThe &9Gone with the Wind &eevent starts in").setParameter("contains");
//Goblin Raid
register("chat", function(event){
  features_settings['active_mining_event'] = "&cGoblin Raid";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("&eThe &cGoblin Raid &eevent starts in").setParameter("contains");
//2x powder
register("chat", function(event){
  features_settings['active_mining_event'] = "&b2x Powder";
  MinesEventDisplay.setLine(0,"&r&eActive Event&7: " + features_settings['active_mining_event']);
}).setCriteria("&eThe &b2x Powder &eevent starts in").setParameter("contains");


//Commisions
//Monolith Stuff (&r&5You found the mysterious Dark Monolith.&r)

//Fallen Star Location
//&r&5&l✯ &r&eA &r&5Fallen Star &r&ehas crashed at &r&bRoyal Mines&r&e! Nearby ore and Powder drops are amplified!&r

//toggles
register("command",function(event){
  features['mining_speed_sound'] = !(features['mining_speed_sound'])
  if (features['mining_speed_sound'] == true){
    var msbToggleConfig = "ON"
    SpeedBoostDisplay.setRenderLoc(10,10);
  } else {
    var msbToggleConfig = "OFF"
    SpeedBoostDisplay.setRenderLoc(1000,1000);
  }
  ChatLib.chat('&f[&eSKYBLOCK &l&6+&f]&a: Toggled "Mining Speed Boost sound" ' + msbToggleConfig)
}).setName("msb_notifier")

register("command",function(event){
  features['current_mining_event'] = !(features['current_mining_event'])
  if (features['current_mining_event'] == true){
    var current_mining_event = "ON"
    MinesEventDisplay.setRenderLoc(10,20);
  } else {
    var current_mining_event = "OFF"
    MinesEventDisplay.setRenderLoc(1000,1000);
  }
  ChatLib.chat('&f[&eSKYBLOCK &l&6+&f]&a: Toggled "Current Dwarven Mines Event!" ' + current_mining_event)
}).setName("mines_event")

register("command",function(event){
  features['raffle_closing'] = !(features['raffle_closing'])
  if (features['raffle_closing'] == true){
    var raffle_closing = "ON"
    RaffleCountDown.setRenderLoc(10,20);
  } else {
    var raffle_closing = "OFF"
    RaffleCountDown.setRenderLoc(1000,1000);
  }
  ChatLib.chat('&f[&eSKYBLOCK &l&6+&f]&a: Toggled "Raffle Warning!" ' + raffle_closing)
}).setName("raffle_warning")
