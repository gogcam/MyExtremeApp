//module db {
    class db {

        constructor() {

        }

        public SendRequest_GET(callback: any, url: string, json_data?: string): JQueryDeferred<any> {
            var deferred: JQueryDeferred<void> = jQuery.Deferred<void>();

            var requestSettings: any = {
                url: $.trim(url),
                type: 'GET',
                success: callback
            };

            $.ajax(requestSettings);

            return deferred;
        }

        public SendRequest_POST(callback: any, url: string, json_data?: string): JQueryDeferred<any> {
            var deferred: JQueryDeferred<any> = jQuery.Deferred<any>();

            var requestSettings: any = {
                url: $.trim(url),
                type: 'POST',
                success: callback
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
//}