/// <reference path="../data/Globals.ts" />
module MyExtremeApp {
    export function Trackers(params: { id: any }) {
        return {
            dsTrackers: new DevExpress.data.DataSource({
                store: MyGlobals.oTrackerManager.getTrackerCustomStore(),
                searchExpr: "Bezeichnung"
            }),

            onItemClick: function (e) {
                MyExtremeApp.app.navigate({ view: 'TrackerEdit', obj: e.itemData });
            },

            viewShown: function (e) {
                if (e.direction == 'backward')
                    this.dsTrackers.load();
            },
        };
    }
}