// NOTE object below must be a valid JSON
window.MyExtremeApp = $.extend(true, window.MyExtremeApp, {
  "config": {
    "layoutSet": "navbar",
    "navigation": [
      {
        "title": "Home",
        "action": "#home",
        "icon": "home",
        "badge": ""
      },
      {
        "title": "Trackers",
        "onExecute": "#Trackers",
        "icon": "user"
      },
      {
        "title": "GPS-Systeme",
        "onExecute": "#GPSSystems",
        "icon": "preferences"
      },
      {
        "title": "DynTabTest",
        "onExecute": "#DynTabTest",
        "icon": "bookmark"
      },
      {
        "title": "map",
        "onExecute": "#map",
        "icon": "map"
      }
    ],
    "commandMapping": {
      "ios-header-toolbar": {
        "commands": [
          {
            "id": "search",
            "location": "before"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      },
      "android-footer-toolbar": {
        "commands": [
          {
            "id": "search",
            "location": "center"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      },
      "tizen-footer-toolbar": {
        "commands": [
          {
            "id": "search",
            "location": "center"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      },
      "generic-view-footer": {
        "commands": [
          {
            "id": "search",
            "location": "center"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      },
      "win8-phone-appbar": {
        "commands": [
          {
            "id": "search",
            "location": "center"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      },
      "android-simple-toolbar": {
        "commands": [
          {
            "id": "search",
            "location": "center"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      },
      "tizen-simple-toolbar": {
        "commands": [
          {
            "id": "search",
            "location": "center"
          },
          {
            "id": "AddTracker",
            "location": "after"
          }
        ]
      }
    }
  }
});