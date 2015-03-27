module MyExtremeApp {
    export function GPSSystems(params: { id: any }) {
        return {
            listDataSource: new DevExpress.data.DataSource({
                store: MyGlobals.oGPSSystemsManager.getGPSSystemsCustomStore()
            }),
        };
    }
}