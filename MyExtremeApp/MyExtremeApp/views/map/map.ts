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
                viewModel.originalMap = s.originalMap;
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
                        iconSrc: { url: img },
                        clickAction: function () {
                            DevExpress.ui.notify("Marker 'C' clicked!", "info", 1000);
                        }
                    });


                    var oMap: google.maps.Map = viewModel.originalMap;

                    var blub: number = oMap.getZoom();
                }

                var oMap: google.maps.Map = viewModel.originalMap;

                for (var i = 0; i < x.PositionDataMobile.regions.length; i++) {
                    var k = x.PositionDataMobile.regions[i];

                    var polygonCoords = [];

                    for (var c = 0; c < k.coordinates.length; c++) {
                        var point = k.coordinates[c];
                        var oLatLng: google.maps.LatLng = new google.maps.LatLng(point.lat, point.lng);
                        polygonCoords.push(oLatLng);
                    }

                    // Construct the polygon.
                    var myPolygon: google.maps.Polygon = new google.maps.Polygon({
                        paths: polygonCoords,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        name: k.name
                    });

                    // Add a listener for the click event.
                    google.maps.event.addListener(myPolygon, 'click', showArrays);

                    myPolygon.setMap(oMap);



                    var infoWindow = new google.maps.InfoWindow();
                }

                function showArrays(event) {

                    // Since this polygon has only one path, we can call getPath()
                    // to return the MVCArray of LatLngs.
                    var vertices = this.getPath();

                    var contentString = '<div style="width: 200px; height: auto;">' + this.name + '</div>';

                    //// Iterate over the vertices.
                    //for (var i = 0; i < vertices.getLength(); i++) {
                    //    var xy = vertices.getAt(i);
                    //    contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                    //    xy.lng();
                    //}

                    // Replace the info window's content and position.
                    var bla: google.maps.InfoWindowOptions;

                    var myObj: google.maps.InfoWindowOptions = { maxWidth: 250, position: event.latLng, content: contentString };

                    infoWindow.setOptions(myObj);

                    var oMap: google.maps.Map = viewModel.originalMap;
                    infoWindow.open(oMap);
                }
            }
        })

        

        return viewModel;
    }
}