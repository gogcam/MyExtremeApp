/// <reference path="db.ts" />

interface loadResponse {
    TrackerList: TrackerType[];
    StatusCode: number;
    StatusMessage: string;
}

class TrackerManager {

    public _csTrackers: DevExpress.data.CustomStore;
    public _dbOptions: DevExpress.data.CustomStoreOptions;
    //private SERVICE_URL_GET_TRACKERS: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/GetTrackers/%7B%22KundenNr%22:%2236373%22,%22Domain%22:%22KMUmitKST14%22%7D'
    //private SERVICE_URL_UPDATE_TRACKER: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/UpdateTracker'
    //private SERVICE_URL_GET_GPSSYSTEMS: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/GetGPSSystems'
    private SERVICE_URL_GET_TRACKERS: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/GetTrackers/%7B%22KundenNr%22:%2236373%22,%22Domain%22:%22KMUmitKST14%22%7D'
    private SERVICE_URL_UPDATE_TRACKER: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/UpdateTracker'
    private SERVICE_URL_GET_GPSSYSTEMS: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/GetGPSSystems'

    constructor() {
        this.initTrackersCustomStoreSettings();
    }

    private initTrackersCustomStoreSettings(): void {
        this._dbOptions = {
            load: (loadOptions) => {
                return this.SendRequestLoad(this.SERVICE_URL_GET_TRACKERS, 'GET');
            },
            update: (params) => {
                //postJson(SERVICE_URL_UPDATE_TRACKER, params, undefined, undefined);
                return this.SendRequest(this.SERVICE_URL_UPDATE_TRACKER, 'POST', params);
            },
            insert: (params) => {
                //postJson(SERVICE_URL_UPDATE_TRACKER, params, undefined, undefined);
                var mydb = new db.db();
                var json_data = JSON.stringify(params);
                json_data = '{"Tracker":' + json_data + '}';
                var deferred: JQueryDeferred<any> = mydb.SendRequest_POST(this.SERVICE_URL_UPDATE_TRACKER, json_data);

                return deferred;

                //return this.SendRequest(this.SERVICE_URL_UPDATE_TRACKER, 'POST', params);
            },
            //remove: (params) => {
            //    //return dbImpl._sendRequest('DELETE', params);
            //}
        };
    }

    public SendRequest(url: string, methodType: string, params?: any): any {
        var deferred: JQueryDeferred<void> = jQuery.Deferred<void>();
        //var deferred = new $.Deferred();

        var requestSettings: any = {
            url: $.trim(url),
            type: methodType,
            success: function (data) {
                var x = data;
                deferred.resolve(data);
            }
        };

        if (params) {
            var json_data = JSON.stringify(params);
            json_data = '{"Tracker":' + json_data + '}';

            requestSettings.contentType = 'application/json';
            requestSettings.dataType = "Text";
            requestSettings.data = json_data;
        }

        $.ajax(requestSettings);

        return deferred;
    }

    public SendRequestLoad(url: string, methodType: string, params?: any): JQueryDeferred<any> {
        var deferred: JQueryDeferred<any> = jQuery.Deferred<any>();
        //var deferred = new $.Deferred();

        var requestSettings: any = {
            url: $.trim(url),
            type: methodType,
            success: function (data: loadResponse) {
                var x = data;
                deferred.resolve(data.TrackerList);
            }
        };

        if (params) {
            var json_data = JSON.stringify(params);
            json_data = '{"Tracker":' + json_data + '}';

            requestSettings.contentType = 'application/json';
            requestSettings.dataType = "Text";
            requestSettings.data = json_data;
        }

        $.ajax(requestSettings);

        return deferred;
    }

    public getTrackerCustomStore(): DevExpress.data.CustomStore {
        this._csTrackers = new DevExpress.data.CustomStore(this._dbOptions);
        return this._csTrackers;
    }

    public updateTracker(request: any): JQueryPromise<JSON> {
        //return this._csTrackers.update(request, undefined);
        return this._csTrackers.insert(request);
    }
}
