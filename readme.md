Let your smart home know when you're in a meeting — this extension tracks active Google Meet calls in your browser and sends real-time updates to Home Assistant.

### Notify your Home Assistant instance about your currently meeting status in four simple steps.

1. Create a «Long-lived access token» in your profile settings, on the «Security» tab at the most bottom of the page. Remember this token.
2. Create a binary sensor in «Settings» — «Devices & services» — «Helpers» tab. Click the «Create helper» button, choost the «Toggle» option and specify any name you like. Remember the Entity ID for this sensor.
3. Open the add-on settings and specify your Home Assistant base url, Token and Entity ID.
4. You're awesome! Now you can create any authomation based on the sensor state.

It is recommended to use separate sensors for browsers on different computers, otherwise they may conflict.

The add-on is open source, feel free to contribute!

The addon is available at addons.mozilla.org  
[![](https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png)](https://addons.mozilla.org/firefox/addon/meet-to-hass-integration/)