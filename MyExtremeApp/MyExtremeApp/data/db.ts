module db {
    export class db {

        constructor() {

        }

        public SendRequest_GET(url: string, json_data?: string): any {
            var deferred: JQueryDeferred<void> = jQuery.Deferred<void>();

            var requestSettings: any = {
                url: $.trim(url),
                type: 'GET',
                success: function (data) {
                    var x = data;
                    deferred.resolve(data);
                }
            };

            //if (params) {
            //    var json_data = JSON.stringify(params);
            //    json_data = '{"Tracker":' + json_data + '}';

            //    requestSettings.contentType = 'application/json';
            //    requestSettings.dataType = "Text";
            //    requestSettings.data = json_data;
            //}

            //$.ajax(requestSettings);

            return deferred;
        }

        public SendRequest_POST(url: string, json_data?: string): JQueryDeferred<any> {
            var deferred: JQueryDeferred<any> = jQuery.Deferred<any>();

            var requestSettings: any = {
                url: $.trim(url),
                type: 'POST',
                success: function (data: loadResponse) {
                    var x = data;
                    deferred.resolve(data);
                }
            };

            if (json_data) {
                requestSettings.contentType = 'application/json';
                requestSettings.dataType = "Text";
                requestSettings.data = json_data;
            }

            $.ajax(requestSettings);

            return deferred;
        }

    }
}