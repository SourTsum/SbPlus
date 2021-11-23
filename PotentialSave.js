//Features Lists
var features = {"mining_speed_sound":true,"current_mining_event":true,"raffle_closing":true,"fishing_tracker":true}
var features_settings = {"msb_time":"&cnot available","active_mining_event":"none"}
var fishing_feature_setting = {
  "Creatures Caught": 0, 
  "Good Catches": 0, 
  "Great Catches": 0, 
  "Squids": 0,
  "Sea Walkers": 0, 
  "Night Squids": 0, 
  "Sea Guardians": 0, 
  "Sea Witches":0,
  "Sea Archers": 0,
  "Monster of the Deep":0,
  "Catfish":0,
  "Carrot King":0,
  "Sea Leech":0,
  "Guardian Defender":0,
  "Deep Sea Protector":0,
  "Hydra":0,
  "Sea Emperor":0,
  "Creature Since Emperor":0
}
//Display Var
var SpeedBoostDisplay = new Display();
var MinesEventDisplay = new Display();
var RaffleCountDown = new Display();
var fishingTracker = new Display();
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


//Fishing Tracker
if (features['fishing_tracker'] == true){
  fishingTracker.setBackground(DisplayHandler.Background.FULL);
  fishingTracker.setLine(0,"&bCreatures Caught:        " + fishing_feature_setting['Creatures Caught']);
  fishingTracker.setLine(1,"&6Good Catches:              " + fishing_feature_setting['Good Catches']);
  fishingTracker.setLine(2,"&5Great Catches:             " + fishing_feature_setting['Great Catches']);
  fishingTracker.setLine(3,"&7Squids:                       " + fishing_feature_setting['Squids']);
  fishingTracker.setLine(4,"&aSea Walkers:                " + fishing_feature_setting['Sea Walkers']);
  fishingTracker.setLine(5,"&0Night Squids:                " + fishing_feature_setting['Night Squids']);
  fishingTracker.setLine(6,"&3Sea Guardians:             " + fishing_feature_setting['Sea Guardians']);
  fishingTracker.setLine(7,"&9Sea Witches:                " + fishing_feature_setting['Sea Witches']);
  fishingTracker.setLine(8,"&aSea Archers:               " + fishing_feature_setting['Sea Archers']);
  fishingTracker.setLine(9,"&aMonster of the Deep:     " + fishing_feature_setting['Monster of the Deep']);
  fishingTracker.setLine(10,"&eCatfishes:                   " + fishing_feature_setting['Catfish']);
  fishingTracker.setLine(11,"&7Sea Leeches:               " + fishing_feature_setting['Sea Leech']);
  fishingTracker.setLine(13,"Carrot King:          " + fishing_feature_setting['Carrot King']);
  fishingTracker.setLine(13,"&5Gaurdian Defenders:      " + fishing_feature_setting['Guardian Defender']);
  fishingTracker.setLine(14,"&5Deep Sea Protectors:    " + fishing_feature_setting['Deep Sea Protector']);
  fishingTracker.setLine(15,"&6Hydras:                       " + fishing_feature_setting['Hydra']);
  fishingTracker.setLine(16,"&6Sea Emperors:              " + fishing_feature_setting['Sea Emperor']);
  fishingTracker.setLine(17,"&bCreature Since Emperor: " + fishing_feature_setting['Creature Since Emperor']);
  fishingTracker.setRenderLoc(10,10);
}

register("chat", function(event){
  fishing_feature_setting['Squids'] += 1;
  fishingTracker.setLine(3,"&7Squids:                      " + fishing_feature_setting['Squids']);
}).setCriteria("&r&aA Squid appeared.").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Sea Walkers'] += 1;
  fishingTracker.setLine(4,"&aSea Walkers:                " + fishing_feature_setting['Sea Walkers']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Night Squids'] += 1;
  fishingTracker.setLine(5,"&0Night Squids:                " + fishing_feature_setting['Night Squids']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Sea Guardians'] += 1;
  fishingTracker.setLine(6,"&3Sea Guardians:             " + fishing_feature_setting['Sea Guardians']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Sea Witches'] += 1;
  fishingTracker.setLine(7,"&9Sea Witches:                " + fishing_feature_setting['Sea Witches']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Sea Archers'] += 1;
  fishingTracker.setLine(8,"&aSea Archers:               " + fishing_feature_setting['Sea Archers']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Monster of the Deep'] += 1;
  fishingTracker.setLine(9,"&aMonster of the Deep:     " + fishing_feature_setting['Monster of the Deep']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Catfish'] += 1;
  fishingTracker.setLine(10,"&eCatfishes:                   " + fishing_feature_setting['Catfish']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Sea Leech'] += 1;
  fishingTracker.setLine(11,"&7Sea Leeches:               " + fishing_feature_setting['Sea Leech']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Carrot King'] += 1;
  fishingTracker.setLine(13,"Carrot King:          " + fishing_feature_setting['Carrot King']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Guardian Defender'] += 1;
  fishingTracker.setLine(13,"&5Gaurdian Defenders:      " + fishing_feature_setting['Guardian Defender']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Deep Sea Protector'] += 1;
  fishingTracker.setLine(14,"&5Deep Sea Protectors:    " + fishing_feature_setting['Deep Sea Protector']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Hydra'] += 1;
  fishingTracker.setLine(15,"&6Hydras:                       " + fishing_feature_setting['Hydra']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

register("chat", function(event){
  fishing_feature_setting['Sea Emperor'] += 1;
  fishingTracker.setLine(16,"&6Sea Emperors:              " + fishing_feature_setting['Sea Emperor']);
}).setCriteria("[INSERT FISH UP MSG HERE]").setParameter("contains");

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
