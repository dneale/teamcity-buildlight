#teamcity-buildlight

A node.js build light for TeamCity that works on Raspberry Pi as well as Linux, Mac and PC.  Drives a
[Declom Visual Indicator](http://www.delcomproducts.com/products_usblmp.asp).  The light will be solid
green if all monitored configurations that have canTurnRed: true have been built successfully and nothing is currently
building.  The light will blink blue if any monitored configuration is building.  If any monitored configuration with
canTurnRed: true has failed and nothing is building, the light will blink red.

A development roadmap is located on our [teamcity-buildlight Trello board](https://trello.com/b/UlUeTCM2/teamcity-buildlight)

##Configuration
Open config.json and setup for your environment.  You will need TeamCity's build configuration id for each configuration
you want to monitor.  You can obtain the build configuration id on the general settings tab of TeamCity's configuration
editor.  If you want failed builds for a given configuration make the light blink red, set canTurnRed: true in
the config file.

You may want to set canTurnRed:false for configuration designed to build unstable branches.

##Supported Platforms
This application leverages the [delcom-indicator project](https://github.com/SouthsideSoftware/delcom-indicator) and
should work wherever it does including Mac, PC and Linux (including Raspberry Pi).  When working on Linux, you may
be required to grant access to the USB device.  See the documentaiton on the delcom-indicator site for instructions.

##Development Prerequisites
You need to install gulp-cli globally using:

```shell
npm install gulp-cli -g
```

You can then run tests using:

```shell
gulp
```

If you are developing for this project, we suggest setting TEAM_CITY_USER and TEAM_CITY_PASS environment variables
instead of embedding in config.json. if you are using Webstorm, you need to set it in the environment variables section 
of your run configuration.