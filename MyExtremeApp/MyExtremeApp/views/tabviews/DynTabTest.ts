module MyExtremeApp {
    export function DynTabTest(params: { id: any }) {
        var myViewModel = {
            tabs: [
                { text: 'Tab 0' },
                { text: 'Tab 1' },
                { text: 'Tab 2' }
            ],
            selectedTab: ko.observable(0),
            onButtonClick: function (e) {
                alert('Hello');
            },
            currentDate: ko.observable(new Date()),
            textValue: ko.observable('test'),

            listDataSource: new DevExpress.data.DataSource({
                store: MyGlobals.oGPSSystemsManager.getGPSSystemsCustomStore()
            }),
        }

        //myViewModel.tabContent = ko.computed(() => {
        //    return myViewModel.tabs[myViewModel.selectedTab()].content;
        //}, myViewModel);

        return myViewModel;
    }
}