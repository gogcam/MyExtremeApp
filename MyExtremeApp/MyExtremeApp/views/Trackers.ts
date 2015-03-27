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

            searchString: ko.observable(''),
            find: function () {
                this.showSearch(!this.showSearch());
                this.searchString('');
            },
            showSearch: ko.observable(false),
        };

        ko.computed(() => {
            return this.searchString();
        }).extend({
            throttle: 500
        }).subscribe(function (value) {
            this.dsTrackers.filter("Bezeichnung", "contains", value);
            this.dsTrackers.pageIndex(0);
            this.dsTrackers.load();
        });
    }
}