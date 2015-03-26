// NOTE object below must be a valid JSON
window.MyExtremeApp = $.extend(true, window.MyExtremeApp, {
  "config": {
    "layoutSet": "navbar",
    "navigation": [
      {
        "title": "Home",
        "action": "#home",
        "icon": "home"
      },
      {
        "title": "About",
        "action": "#about",
        "icon": "info"
      },
      {
        "title": "Trackers",
        "onExecute": "#Trackers",
        "icon": "trackers"
      }
    ]
  }
});