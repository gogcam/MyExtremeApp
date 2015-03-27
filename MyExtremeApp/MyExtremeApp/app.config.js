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
		],
		"commandMapping": {
			"ios-header-toolbar": {
				"commands": [
					{
						"id": "search",
						"location": "before"
					}
				]
			},
			"android-footer-toolbar": {
				"commands": [
					{
						"id": "search",
						"location": "center"
					}
				]
			},
			"tizen-footer-toolbar": {
				"commands": [
					{
						"id": "search",
						"location": "center"
					}
				]
			},
			"generic-view-footer": {
				"commands": [
					{
						"id": "search",
						"location": "center"
					}
				]
			},
			"win8-phone-appbar": {
				"commands": [
					{
						"id": "search",
						"location": "center"
					}
				]
			},
			"android-simple-toolbar": {
				"commands": [
					{
						"id": "search",
						"location": "center"
					}
				]
			},
			"tizen-simple-toolbar": {
				"commands": [
					{
						"id": "search",
						"location": "center"
					}
				]
			}
		}
	}
});