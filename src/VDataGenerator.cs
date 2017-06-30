using System;
using System.IO;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared;

namespace vd_generator.server
{
    public class VDataGenerator : Script
    {

        public VDataGenerator()
        {
            API.consoleOutput("Starting vehicleData.json-generator...");

            API.onClientEventTrigger += this.OnClientEvent;
            API.onPlayerFinishedDownload += OnPlayerFinishedDownload;

        }

        private void OnPlayerFinishedDownload(Client player)
        {
            player.sendChatMessage("~b~To generate a new vehicleData.json, enter: /generatevd");
        }
        
        public void OnClientEvent(Client sender, string eventname, object[] args)
        {
            if (eventname != "vd_receiveresult") return;
            string result = Convert.ToString(args[0]);

            try
            {
                const string path = @"vd-generator/vehicleData.json";
                Directory.CreateDirectory(Path.GetDirectoryName(path));
                File.WriteAllText(path, result);
                sender.sendChatMessage("vehicleData.json created successfully");
            }
            catch (IOException e)
            {
                sender.sendChatMessage("An error occured: " + e.Message);
                API.consoleOutput(e.Message);
                API.consoleOutput(e.StackTrace);
            }
            
        }

        [Command]
        public void generatevd(Client sender)
        {
            sender.sendChatMessage("vehicleData.json-generation started...");

            uint[] values = (uint[]) Enum.GetValues(typeof(VehicleHash));
            sender.triggerEvent("vd_generate", API.toJson(values));   
        }
        
    
    }
}