/// <reference path="db.ts" />
/// <reference path="Globals.ts" />

interface loadResponse {
    TrackerList?: TrackerType[];
    StatusCode?: number;
    StatusMessage?: string;
}

class TrackerManager {

    public _csTrackers: DevExpress.data.CustomStore;
    public _dbOptions: DevExpress.data.CustomStoreOptions;
    private SERVICE_URL_GET_TRACKERS: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/GetTrackers/%7B%22KundenNr%22:%2236373%22,%22Domain%22:%22KMUmitKST14%22%7D'
    private SERVICE_URL_UPDATE_TRACKER: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/UpdateTracker'
    //private SERVICE_URL_GET_TRACKERS: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/GetTrackers/%7B%22KundenNr%22:%2236373%22,%22Domain%22:%22KMUmitKST14%22%7D'
    //private SERVICE_URL_UPDATE_TRACKER: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/UpdateTracker'

    constructor() {
        this.initTrackersCustomStoreSettings();
    }

    private initTrackersCustomStoreSettings(): void {
        this._dbOptions = {
            load: (loadOptions: DevExpress.data.LoadOptions) => {
                var deferred = $.Deferred();
                function onComplete(data: any) {
                    var query = DevExpress.data.query(data.TrackerList);

                    if (loadOptions.filter) {
                        var l = [];
                        l.push(loadOptions.filter);

                        if (loadOptions.filter)
                            query = query.filter(l);
                    }

                    query = query.sortBy("Bezeichnung");
                    deferred.resolve(query.toArray());
                }

                MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_TRACKERS, null);
                return deferred;

                //var d: JQueryDeferred<any> = jQuery.Deferred<any>();

                //function onComplete(data: any) {
                //    deferred.resolve(data.TrackerList);
                //}
                //var deferred: JQueryDeferred<any> = MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_TRACKERS, null).done(function (data) {
                //    var query = DevExpress.data.query(data);
                  
                //    if (loadOptions.filter) {
                //        var l = [];
                //        l.push(loadOptions.filter);

                //        if (loadOptions.filter)
                //            query = query.filter(l);
                //    }
                //    var x: any = d.state();
                //    var x2: any = deferred.state();
                //    query = query.sortBy("Bezeichnung");
                  
                //    d.resolve(query.toArray());
                //});

                //return d;
            },
            //update: (params) => {
            //    //postJson(SERVICE_URL_UPDATE_TRACKER, params, undefined, undefined);
            //    return this.SendRequest(this.SERVICE_URL_UPDATE_TRACKER, 'POST', params);
            //},
            insert: (params) => {
                function onComplete(data: any) {
                    deferred.resolve(data);
                }

                var json_data = JSON.stringify(params);
                json_data = '{"Tracker":' + json_data + '}';
                var deferred: JQueryDeferred<any> = MyGlobals.mydb.SendRequest_POST(onComplete, this.SERVICE_URL_UPDATE_TRACKER, json_data);

                return deferred;
            },
            //remove: (params) => {
            //    //return dbImpl._sendRequest('DELETE', params);
            //}
        };
    }

    public getTrackerCustomStore(): DevExpress.data.CustomStore {
        this._csTrackers = new DevExpress.data.CustomStore(this._dbOptions);
        return this._csTrackers;
    }

    public updateTracker(request: any): JQueryPromise<JSON> {
        return this._csTrackers.insert(request);
    }
}
