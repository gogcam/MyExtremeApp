/// <reference path="../../ts/dx.all.d.ts" />
/// <reference path="../../ts/knockout.d.ts" />
/// <reference path="../../ts/google.maps.d.ts" />
module MyExtremeApp {
    export function map(params: { id: any }) {

        var viewModel = {
            mapMarkers: ko.observableArray([]),

            isMapReady: ko.observable(false),
            isDataReady: ko.observable(false),

            originalMap: null,

            mapReady: function (s) {
                //https://www.devexpress.com/Support/Center/Question/Details/KA18782
                var map: google.maps.Map = s.originalMap;
                viewModel.originalMap = map;
                viewModel.isMapReady(true);
            }
        }

        MyGlobals.oMapManager.getPositionDataMobile().done(function(data: any) {
            viewModel.isDataReady(true);
        });

        var test = ko.computed(() => {
            if (viewModel.isMapReady() && viewModel.isDataReady()) {
                var x = MyGlobals.oMapManager.mydata;

                for (var i = 0; i < x.PositionDataMobile.markers.length; i++) {
                    var k = x.PositionDataMobile.markers[i];
                    var mapPosition = k.lat + "," + k.lng;

                    //var sContent = k.info.content;
                    var img = "";

                    for (var y = 0; y < x.PositionDataMobile.icons.length; y++) {
                        var icon = x.PositionDataMobile.icons[y];
                        if (k.iconID == icon.id) {
                            img = "data:image/png;base64," + icon.img;
                            break;
                        }
                    }

                    function replaceAll(find, replace, str) {
                        return str.replace(new RegExp(find, 'g'), replace);
                    }

                    var sContent = k.info.content;
                    //var sContent: any = '<div id=&quot;content&quot; style=&quot;width:300px; height:50px;&quot;>' + k.info.title + '<br />Zeit: 20.03.2015 12:06:16</div>';
                    sContent = replaceAll('&quot;', '"', sContent);
                    
                    viewModel.mapMarkers.push({
                        title: 'test',
                        tooltip: { text: sContent, isShown: false },
                        location: mapPosition,
                        iconSrc: {url: img},
                        clickAction: function () {
                            DevExpress.ui.notify("Marker 'C' clicked!", "info", 1000);
                        }
                    });


                    var oMap: google.maps.Map = viewModel.originalMap;

                    var blub: number = oMap.getZoom();
                    blub = blub;
                }
            }
        })

        

        return viewModel;
    }
}