using Serilog.Core;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Utils
{
    public class LoggingService
    {
        public readonly LoggingLevelSwitch _loggingLevelSwitch;

        public LoggingService()
        {
            _loggingLevelSwitch = Startup.loggingLevelSwitch;
        }

        public bool SetLoggingLevel(string logEventLevel)
        {
            //https://github.com/serilog/serilog/wiki/Configuration-Basics
            if (logEventLevel == "Verbose")
            {
                _loggingLevelSwitch.MinimumLevel = LogEventLevel.Verbose;
                return true;
            }
            else if (logEventLevel == "Debug")
            {
                _loggingLevelSwitch.MinimumLevel = LogEventLevel.Debug;
                return true;
            }
            else if (logEventLevel == "Information")
            {
                _loggingLevelSwitch.MinimumLevel = LogEventLevel.Information;
                return true;
            }
            else if (logEventLevel == "Warning")
            {
                _loggingLevelSwitch.MinimumLevel = LogEventLevel.Warning;
                return true;
            }
            else if (logEventLevel == "Error")
            {
                _loggingLevelSwitch.MinimumLevel = LogEventLevel.Error;
                return true;
            }
            else if (logEventLevel == "Fatal")
            {
                _loggingLevelSwitch.MinimumLevel = LogEventLevel.Fatal;
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
