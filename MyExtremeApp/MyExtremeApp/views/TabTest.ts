module MyExtremeApp {
    export function TabTest(params: { id: any }) {
        var myViewModel = {
            tabs: [
                { text: "user", icon: "user", content: "'User' tab content" },
                { text: "comment", icon: "comment", content: "'Comment' tab content" },
                { text: "find", icon: "find", content: "'Find' tab content" }
            ],
            selectedTab: ko.observable(1),
            tabContent: ko.observable('')
        }

        myViewModel.tabContent = ko.computed(() => {
            return myViewModel.tabs[myViewModel.selectedTab()].content;
        }, myViewModel);

        return myViewModel;
    }
}