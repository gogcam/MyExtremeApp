/// <reference path="../ts/knockout.mappings.d.ts" />
/// <reference path="../data/TrackerType.ts" />
var MyExtremeApp;
(function (MyExtremeApp) {
    function TrackerEdit(params) {
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
                MyGlobals.oTrackerManager.updateTracker(request).done(function (data) {
                    MyExtremeApp.app.back();
                });
            }
        };
    }
    MyExtremeApp.TrackerEdit = TrackerEdit;
})(MyExtremeApp || (MyExtremeApp = {}));
//# sourceMappingURL=TrackerEdit.js.map