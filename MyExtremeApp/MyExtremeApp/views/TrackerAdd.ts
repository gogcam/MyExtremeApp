module MyExtremeApp {
    export function TrackerAdd(params: { id: any }) {

        var t = new TrackerType(null);
        t.ID_GPSSystem = ko.observable(1);

        return {
            test: t,

            dsGPSSystems: new DevExpress.data.DataSource({
                store: MyGlobals.oGPSSystemsManager.getGPSSystemsCustomStore()
            }),

            btnSaveClick: function (e) {
                var request = ko.mapping.toJS(this.test);

                MyGlobals.oTrackerManager.updateTracker(request).done(function (data) {
                    MyExtremeApp.app.back();
                });
            }

        };
    }
}