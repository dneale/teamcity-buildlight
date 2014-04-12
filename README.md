#teamcity-buildlight

A node.js build light for TeamCity that works on Raspberry Pi as well as Linux, Mac and PC.  The light will be solid
green if all monitored configurations that have canTurnRed: true have been built successfully and nothing is currently
building.  The light will blink blue if any monitored configuration is building.  If any monitored configuration with
canTurnRed: true has failed and nothing is building, the light will blink red.

##Configuration
Open config.json and setup for your environment.  You will need TeamCity's build configuration id for each configuration
you want to monitor.  You can obtain the build configuration id on the general settings tab of TeamCity's configuration
editor.  If you want failed builds for a given configuration make the light blink red, set canTurnRed: true in
the config file.

You may want to set canTurnRed:false for configuration designed to build unstable brances.

##Supported Platforms
This application is known to work on Mac and Linux platforms where [node-hid](https://www.npmjs.org/package/node-hid) can
be installed.  It was designed and tested on Mac OS/X 10.9.2 and Raspian (all updates installed as of March 17, 2014).
It has not been tested on Windows but should work provided that node-hid can be installed.

Node-hid requires libudev-dev and libusb-1.0-0 to install successfully.  On Raspian, you can install these using:

```shell
sudo apt-get install libudev-dev libusb-1.0-0-dev
```
On Linux you also need to grant permissions to write to the Delcom device.  On Raspian, you can create a file:

```shell
sudo nano /etc/udev/rules.d/85-delcom.rules
```

With the following rule (replace the group name with a group of your choice):

```shell
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fc5", ATTRS{idProduct}=="b080", ACTION=="add", SYMLINK+="delcom", MODE="0666", GROUP="[your group]"
```

You will have to reboot to make the rule take effect.

##Development Prerequisites
You need to install grunt-cli globally using:

```shell
npm install grunt-cli -g
```

You can then run tests using:

```shell
grunt
```
