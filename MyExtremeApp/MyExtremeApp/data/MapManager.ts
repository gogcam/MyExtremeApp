/// <reference path="../ts/jquery.d.ts" />
/// <reference path="db.ts" />
/// <reference path="Globals.ts" />

class MapManager {

    public _csMap: DevExpress.data.CustomStore;
    public _dbOptions: DevExpress.data.CustomStoreOptions;
    private SERVICE_URL_GET_POSITION_DATA_MOBILE: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/GetPositionDataMobile/%7B%22KundenNr%22:%2236373%22,%22Domain%22:%22KMUmitKST14%22%7D'
    //private SERVICE_URL_GET_POSITION_DATA_MOBILE: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/GetPositionDataMobile/%7B%22KundenNr%22:%2236373%22,%22Domain%22:%22KMUmitKST14%22%7D'

    public mydata: any;

    //constructor() {
    //    this.initMapCustomStoreSettings();
    //}

    //private initMapCustomStoreSettings(): void {
    //    this._dbOptions = {
    //        load: (loadOptions: DevExpress.data.LoadOptions) => {
    //            var deferred = $.Deferred();
    //            function onComplete(data: any) {
    //                var query = DevExpress.data.query(data.PositionDataMobile.markers);
    //                deferred.resolve(query.toArray());
    //            }

    //            MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_POSITION_DATA_MOBILE, null);
    //            return deferred;

    //            //var d: JQueryDeferred<any> = jQuery.Deferred<any>();

    //            //function onComplete(data: any) {
    //            //    deferred.resolve(data.TrackerList);
    //            //}
    //            //var deferred: JQueryDeferred<any> = MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_TRACKERS, null).done(function (data) {
    //            //    var query = DevExpress.data.query(data);
                  
    //            //    if (loadOptions.filter) {
    //            //        var l = [];
    //            //        l.push(loadOptions.filter);

    //            //        if (loadOptions.filter)
    //            //            query = query.filter(l);
    //            //    }
    //            //    var x: any = d.state();
    //            //    var x2: any = deferred.state();
    //            //    query = query.sortBy("Bezeichnung");
                  
    //            //    d.resolve(query.toArray());
    //            //});

    //            //return d;
    //        }
    //    };
    //}

    //public getMapCustomStore(): DevExpress.data.CustomStore {
    //    this._csMap = new DevExpress.data.CustomStore(this._dbOptions);
    //    return this._csMap;
    //}

    public getPositionDataMobile(): any {
        var deferred = $.Deferred();
        function onComplete(data: any) {
            MyGlobals.oMapManager.mydata = data;
            //var query = DevExpress.data.query(data.PositionDataMobile.markers);
            //deferred.resolve(query.toArray());

            deferred.resolve(data);
        }

        MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_POSITION_DATA_MOBILE, null);
        return deferred;
    }
}
