/// <reference path="../data/Globals.ts" />
module MyExtremeApp {
    export function Trackers(params: { id: any }) {

        var viewModel = {
            dsTrackers: new DevExpress.data.DataSource({
                store: MyGlobals.oTrackerManager.getTrackerCustomStore(),
            }),

            btnAddClick: function (e) {
                MyExtremeApp.app.navigate({ view: 'TrackerAdd' });
            },

            onItemClick: function (e) {
                MyExtremeApp.app.navigate({ view: 'TrackerEdit', obj: e.itemData });
            },

            viewShown: function (e) {
                if (e.direction == 'backward') {
                    if (MyGlobals.refreshView) {
                        this.dsTrackers.load();
                        MyGlobals.refreshView = false;
                    }
                }
            },

            searchString: ko.observable(''),
            find: function () {
                this.showSearch(!this.showSearch());
                this.searchString('');
            },
            showSearch: ko.observable(false),

            valueChanged: function (e) {
                alert('test');
            }
        };
        
        ko.computed(() => {
            return viewModel.searchString();
        }).extend({
            throttle: 500
        }).subscribe((value) => {
            var x: string[] = [];
            x.push('Bezeichnung');
            x.push('contains');
            x.push(value);
            
            viewModel.dsTrackers.filter(x);
            viewModel.dsTrackers.pageIndex(0);
            viewModel.dsTrackers.load();
            
        });
        
        return viewModel;
    }
}