/// <reference path="db.ts" />
/// <reference path="Globals.ts" />

class GPSSystemManager {

    public _csGPSSystem: DevExpress.data.CustomStore;
    public _dataGPSSystem: any;
    public _dbOptions: DevExpress.data.CustomStoreOptions;
    private SERVICE_URL_GET_GPSSYSTEMS: string = 'http://gpswebservice.sorba.ch/GPSWebService/Sys/rest/GetGPSSystems'    
    //private SERVICE_URL_GET_GPSSYSTEMS: string = 'http://devsk-nb1-win81/GPSWebService/Sys/rest/GetGPSSystems'

    constructor() {
        this.initGPSSystemCustomStoreSettings();
    }

    private initGPSSystemCustomStoreSettings(): void {
        this._dbOptions = {
            load: (loadOptions: DevExpress.data.LoadOptions) => {
                function onComplete(data: any) {
                    deferred.resolve(data.GPSSystems);
                }
                var deferred: JQueryDeferred<any> = MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_GPSSYSTEMS, null).done(function (data) {
                    this._dataGPSSystem = data;
                });

                //var deferred: JQueryDeferred<any> = MyGlobals.mydb.SendRequest_GET(onComplete, this.SERVICE_URL_GET_GPSSYSTEMS, null).done(function (data) {
                //    var query = DevExpress.data.query(data);

                //    if (loadOptions.filter) {
                //        var l = [];
                //        l.push(loadOptions.filter);

                //        if (loadOptions.filter)
                //            query = query.filter(l);
                //    }

                //    query = query.sortBy("Bezeichnung");

                //    deferred.resolve(query.toArray());
                //});

                return deferred;
            },
            byKey: (key) => {
                var dfd = $.Deferred();

                //var bla = MyGlobals.oGPSSystemsManager._dataGPSSystem;

                //for (var i = 0; i < this._dataGPSSystem.length; i++) {
                //    if (this._dataGPSSystem[i].ID == key) {
                //        dfd.resolve({
                //            ID: this._dataGPSSystem[i].ID,
                //            Bezeichnung: this._dataGPSSystem[i].Bezeichnung
                //        });
                //        return;
                //    }
                //}

                //return dfd.promise();

                var x = new DevExpress.data.DataSource({
                    store: this._csGPSSystem
                });

                x.load().done(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].ID == key) {
                            dfd.resolve({
                                ID: result[i].ID,
                                Bezeichnung: result[i].Bezeichnung
                            });
                            return;
                        }
                    }
                });

                return dfd.promise();
            }
        };
    }

    public getGPSSystemsCustomStore(): DevExpress.data.CustomStore {
        if (!this._csGPSSystem) {
            this._csGPSSystem = new DevExpress.data.CustomStore(this._dbOptions);    
        }
        
        return this._csGPSSystem;
    }
}
