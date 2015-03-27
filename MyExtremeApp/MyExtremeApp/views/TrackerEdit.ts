/// <reference path="../ts/knockout.mappings.d.ts" />

module MyExtremeApp {
    export function TrackerEdit(params: { obj: any }) {

        var t = new TrackerType(params.obj);

        return {
            test: t,

            dsGPSSystems: new DevExpress.data.DataSource({
                store: MyGlobals.oGPSSystemsManager.getGPSSystemsCustomStore()
            }),

            btnSaveClick: function (e) {
                var request = ko.mapping.toJS(this.test);

                //params.obj.Bezeichnung = viewModel.Bezeichnung();
                //params.obj.MaxRunawayTime = viewModel.MaxRunawayTime();

                MyGlobals.oTrackerManager.updateTracker(request).done(function(data: JSON) {
                    MyExtremeApp.app.back();
                });
            }
            //  Put the binding properties here
        };
    }
}