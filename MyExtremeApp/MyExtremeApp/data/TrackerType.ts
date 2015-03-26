class TrackerType {

    public ID = ko.observable('');
    public INR = ko.observable('');
    public Bezeichnung = ko.observable('');
    public Stamm = ko.observable('');
    public SerialNumber = ko.observable('');
    public ID_GPSSystem = ko.observable(0);
    public KundenNr = ko.observable('36373');
    public Domain = ko.observable('KMUmitKST14');
    public Icon = ko.observable('');
    public Run1AsRunTime = ko.observable(false);
    public Run2AsRunTime = ko.observable(false);
    public Run3AsRunTime = ko.observable(false);
    public Run1Mapping = ko.observable('');
    public Run2Mapping = ko.observable('');
    public Run3Mapping = ko.observable('');
    public MinTimeOnConstructionSite = ko.observable(0);
    public MaxRunawayTime = ko.observable(0);
    public PositionDataCorrectionPriority = ko.observable(0);

    constructor(data?: any) {
        if (data) {
            for (var k in data) this[k] = ko.observable(data[k]);
        }
    }


}