//module MyGlobals {
    class MyGlobals {
        public static oTrackerManager: TrackerManager = new TrackerManager();
        public static oGPSSystemsManager: GPSSystemManager = new GPSSystemManager();
        public static oMapManager: MapManager = new MapManager();
        public static mydb = new db();

        public static refreshView: boolean = false;

        constructor() {
             
        }
    }
//}
