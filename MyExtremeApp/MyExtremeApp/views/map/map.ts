/// <reference path="../../ts/dx.all.d.ts" />
/// <reference path="../../ts/knockout.d.ts" />
module MyExtremeApp {
    export function map(params: { id: any }) {

        var viewModel = {
            mapMarkers: ko.observableArray([]),

            isMapReady: ko.observable(false),
            isDataReady: ko.observable(false),

            mapReady: function () {
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

                    //var bla = ;

                    //var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAAK/INwWK6QAAFStJREFUaEPtWQdwVOe1vupIQhLqQr2uVmVXdVddq77qva16723VVl1a9YKEBEKAEE30XgwO1RSDbQw4gIGAE4opxo9g7MTYJDb4e/9dhJOXcV6eGWdeMpNv5sy/e3f3/t855zvn3HuX+g/+g38TSM+tHGkpWcGC+YoJmgsUDKRlpMxkZOc++ReCG0XJ1WvM11zsaGm7OoATsjnUq2BHtF/Xnmi/FXsjvXft5rsd28ljv73Vgzmz0c26ex2XUbqKy4xb7sHyXuzCtOlztl1Yb2+tUuzgIBtIzjc7NvHqxP8M7NVXo+LlpeRHnazMt8SHxB4syex5t71290cDbb++OtL5+W+G25/f7Gv84UZnFa43FuBqpQBXiuJwKSccFzNC8KEgEO8l8nAy2uP7I6EuXx/wZz/a7cW8sdXN8txSlrGIbCFVbaT9arNfEou5ttSIC1N1Z3pU9gc9ot03Vy66+2Dzyj8/3rEaT7Ysx+OZYTxa0o6Hww2431+D+31VxKpxt6sMN+qz8VFBDN5L9sOpCA6OB7Jw1Ncah7wssdfTGlu5FtjiaPz9JNtkgGwlVWOm/2rTXxJ7QrjUtmBu1E1R/vPn25fjTzuW49utS/Bsy/gr2zZBjLzftlSyfr6iBxcqBDgYwsFOFzPsZBtgt4sJdnPNsdbNFl38cDRmlCKjoB2epiyIFOXvNpgbWgkNtKhl7b1zu/6CWOtpR63xtA/4ICvy2e8GmvF4agBfrxrCn9cvwsstE/hhxyT+MN6ML3srcb8pF7MO5hjVUUafkQ5aWGxUB0YhJbYIIUaWSLNwRuXMKaw8+wg5y09Az8oXdYryX7Ya6XFE+v8E+Ygdbai1Xg7ECXZ0m5/X84LutVi05wrGNp/B1PqjmF33Fvas2YH17YNYLuzASEkTWhj2iPdJgKBxBcqXHUb7zkvgtWyGiT4bqfpMiDZ8gOmzD+HTvAXqjnGoUVZ80WWok9yhqTK36xui0UKfGrDUkU9xdhFGsRxHRc4sfZGTPd0WpTcEcFYJAsMw8PZNbLr6HOsuPcPMR19j5fk/oOngPbgNvw+73rNw6TyO+tB0pDaswOixO5g4fgd1G89BJ3UYhhaeSNM0QcnSw+g7cANWxSuxgFeEsgVqGDDUbp0iXXb7/rNzbN4ADcSBEjV51SXtjR+KheXPBqNCuYMBXtQiO1PzpTzXW5GZQix57wmmPngqseXnvkT7oYfwHb8Ih/4PwB78ELzKNWgIiEPW8F707r8O8d6r8G7aDJWEISxkhSJNVQ9ZfTtRteE8DHKnoB7VglzdhRg11F5HTW+Xqg0ImGPzBqgnDuQqyqiuX9RzbnGn6NlIfDR3JtyfmvFg5dR5cF6k9G7ByLtPMHTyMYZP/R6igw/gM/FrOA5dgPPIRVi1HkFCSjPKggXIW34SzdsvoXD6XRhkL4VG2gR0uSnIUNZASvM6CJadgl7uSmgJFiHRhIFJE51T2a7OypUujnNs3gC1lgZU9nxZ1bUj3efGOhqfDcXHcJwoSnbag70n1icIpZsuo+PII3QcfoT6Aw8ROHUVzosuwXXsMuw6T8C4fDOqI/MgiKlAwer3UTl7HoHivdDOnIQuIavrX4Ss+QuQUDmJsOGj0C9cA738VQi24WClmc7NGhbToMbeeo7NG6CaOJChJPOjA4OJcS6DTGO7QRebz/1ShKja9wDC/Q9Qs/8holZ/As74VXCJ2YtPwUy4C3ZVW9DuF42InH7krHofWSvOwLZmo4SkfvE66EU0IFdNHUkFQ/DuOQyj8k0wrNgMNxc+Ziz0nnayGC7tthZzbN4Aze5OVLWtpc66sb4ri8XNz3tTEnlLWJbCYpYdgju2oWjPZyja9QDJG+/CY/ImuBPXYN91Epb1+8FoOYLAqvXo4PojqHYtBMvPImLkGEzKN8CodAOMK7ZAP7kXuZpaSE1vh3PnIZjV7IRZ3V6wArIxw9D/ftSBkbDExmSOzRugJymaEsdHuOxct+LpxHA3RkuL20asjY4FufIQM30F6dseIHXLA/hP34br6GXYth+HdfOvJPJhD3yI7Pwh1DgHIKBrP2InTsNL/CuYVG6FafV2mNXugmHuJLIWGiArsQ72HUdgJToIRttRWMY3Y5mNMaadrUWnbbQpsbBljtHPREdSFNUWH8HdNbvyqyFxE0bTU3Y3Gek8cU0WIWbTZ4iZ/ZTo/jocSLu0bTtGon8ajqT7uJI6cJ/4DRoiC5DhnQzewHHwF52EY9tBmNftgWXDPkL2AEzLZ5FmYonC2HJYk3ZrXrMNjIxBeHlGYR0Zfhs5zGkKoKoSUucY/Ux0JMdQbQnR3J3EgUFxM4aC/Z/Ga2m+tIgXwTK6Grqu4VAyd4WihRs03JNglj4I555T8Jl5AP7UJ+h08Ud4XCO8hsixwZOwazsEBsmQNelOzI53iFx2I4HBRg2RmbufAPmOHKzg2uNEEAdnA12xwc12B5UilGkqKJ9j9DPRShxoJg7sWL/iqyXdTdhXlo/lWakYLSvCYGku6gsykRYVAk8WE/rqqpCXk4fCQitY5YwioetX6DC3g0/JSnAHz4DTfxq2XSdg3U4kItwOq9QecDxi0WBhir0uTBwL8cS5uGAcDvLAGpYFlpnrEQlZHfAOjZEv/EezoJTFpHIsTOZV+3iYlDrZq9PHQtSUSfZADSdGxry/aebZo1OH8fLWTeDhXeAzYg9u4eXta/j28nt4dHgXPpwcxHReMgRkc2P1BQg1Z0FoZA37wikwK2dhXboKVokd4HCikMlgYczBFkci/HExNwWnMhKwxc8Diy2NMLBwAYb1F2DSVAvrONZHE/mhisV+PAnPn4TQx5MqZFoqL2lvW7xk0aJ7Q+3t7w4UF3kPBvuYHG+qFt/buvbT7y+fw8s71/Dd7Sv48/X38ez9t/HFwQ34bP0Y7oy14GZrMT4uT8aFjDAcCydEmMYQzpNHrYIS0vVMkGdkjjITMwyxbHA4lo8rNSW4UFeB3QlRGLe3RreuOsSa89Gvq4pFBuqYMNHCtJUudnjanhJGRyrXhdC3Nn8HXVkZVFdmuou4o/OpqFOMofFJbGxt/Phae9XVb3au+gEXj+LziyfwzpG3sXvbRtzcN4v7U534RFyGS2WJOB3ni73uNlhtoYdRjfnolpdFpxSFDopCi6wMIaWJU0lRuNvXjvMt9dglSMKoIwutWupomq+AdjVF9GipYFBvAbl80MBiY02SAXUM6qphtzvzPXFYgEqtt/sc259AS3Ii1ZOZbh0bEflpeHwyOts7MZnAx/6sGByvysS1xa3YuXo56ts60do3iG0z0ziWHoGtHBssNdBGn5ICOqSk0EYIN5O1VkEeearzEamlAUdtTQQY6WGvHxe/GxtEh6kxqmSlUT9PFi0q89CpoYwebRUM6KmhT0dV8r5RWQFVcjIYI1I6FOh0NNrHV7Hc13OO7U8gn4zqcnlKujIxMbtYkHamzc/tT1WCZHS1t2O0twfrOpogKimCs5cvesYm0JSUgk4FEjk6wsTqZGRQqqyEbAM9JNhZIcjJDjw3R4QFeyEilAcfCyPs9XXGjf4udOjroUFJHq0k6jTZLpKx9gVKEJFM1M6Tg1BBDvXkc9q5nSxjbA7mdCNKl4rMLphj+3cgZppRNSwLqsPByqff1fqr0rxcxCckICk5GbX1DVjf0YySsFAIo2IgVNdAESEeLycHf3U1eFsYI9jDidygBKE4Nx6N1TkQCfMhLM9GWkoU/BimOODnik+GutFtrC+RTTMhSEea3LhIjH7dRpwaINlYRmQ0a22Ag96O2BrDP7I+PlI0mRCT3Bod6RrkwpUP53rMsf4bLHFlUIMOFulDwZ4vi4uKkJKSAoFAgB6xGAcKUjGgqoxqWVnYSUvDSEMNDraWiOB7ozQvER2NRRA3l6GuMgfZaTEI8nMj1zM2cHGygp+lAbnPtcfR3Ay0EUnVkUi/Jk1ngiY9ZaSJzUxCmmuD06HeuCSIxq3iDNyrzMNtcs6P8hNfHIj1e9zt7yFAOpdyc/aeYz2HTLYd9U2YNTXuyugbTo1BaXk5srOzkZOTg1UTi7GfRLeLFGYyibzmAlUUZMehSVgAUU0+SvNTkRLPRwjROc/TAQHeDuB7sxFByETbmSFOmxSnyUKs8nJDM5kVTST63UQ6S0m32cRYiAPOljgRwMH5pHDcKM7E/foyfCYqx52aXJzPILVG7qNX+7Kw35+N7Xy3GxV+3uyeIC/COuIVeRoFLg6UizVLfoU3a99YZTHKKyslDuQVFOCtmRXYRojRmk8mRaqhqkIizwM/wAP+3k7g+7siKsQNMcFcxPs6IsmVSaarESL1tRCgroL8hVpYbamPjY7WWGqsg3Vm2tjHMsFRLxbORPnjcp4Atxsr8VlnA+63VuHj4hQcjPZBn5sNBI42iOD5oLq0BD3Fedgd4Yk1fI+9iTw/jXwf2ok5lBEHapztF67le1yfEHegqLQUWcSB2vp6nJ+dxoyloaTLpJGC1dFYAHdCMoKM+6QwTwgIeYEXGymODMRaGSFQXxt+2upIJA40WRliI9scu6wX4i1bAxxyscI7gW44lx6PG/WEdH87HvW34rf1RTiTFo615Fx1Pi6I8/EEz8cHHl7eyMzKQnh4OAqKijFGfrcpwOlZE9+f38Jzm2NPUMd1pOo5bMf1gZwn28uysW90ADtmVmLfnj24tmwE40QGtANZpHDN9XURQWSSynNCuicbSU5MhNuYg88wQwqpCxGbgWknBnaxzQhpQxy0N8Yhd3ucIgPscnUx7g/34PdLh3CvR4SPSLTfig/AEpKJmrgI0ghiEMznIzk1FRkZGRKj6zAwMBDBwcFoqq19WOLtXpjH89HI4fnMsSfIJzWQ5mA/X2jLWN1rboglZJJu53viaGkGzmTHol9ZEa3EgXx5OXiYGiDG1RbRXDZiPZyR7euGNn9PrOJxsIMU7i7SQXZZ6GKPnSkOBZDrm8Is3BnuxRerl+G/CPHrDcU4lsLHbGwARnNS0FBSiMzMTASFhCCb1FxJSYmk9goLC1FKlJCWloaxsTGkEqdqhbUXg/xDNAL9g+eYzyGT40r5MayV9mbE7toe4ks6xDy0qCpikaEmVlobok9NGa2kiIvmKcDT1gopgd7oTIjETAwf27xdsZlIZz2ZnrNE4ztc7HBCEI+b/WJ8sXENnm5chTv9LXg3OwYbQt0xFOkPUU46Koiu4xISEUIiXkS6Hu0EHXGRSISWlhYIhUL09vZKHEom7Zx2pKy0fIbQVSQmQ0yK5k5Z6ltQq2OCqAE+L+RKXswfryQHYS3DGKMGmlhM2tsycx2sZupj0kADbYoK6HN1xKyfF1ZbmWJKSw3LNFXIZYQR9ocH41JnCx5v3YCv9+/Ao+lxXKjKxrYwdwz4OKA6PBBFmRkSTdPRpqWRnp7+41pdXY3W1lZ0d3dDTFp3Q0ODxOhs0C29tLTsUUhIaBShTD8skiP2yoEYDpeiNC3kdiWFrr9bHIcHpQm4EOuHXc5MbGVbYgfR8x4uEwc8bbCNdI8lmqqYJDZrZYwNbCbeKcjGvfUz+Oadw/hyz2Zc764nuvbHMIeBUo490sNDkEZIxicmIioqSiKLvLw8SZejydNRryRdj452f3+/hHRTU5PEGTozyckp35WWVfw6ITGFHse6xJSJ0c/lXznQH+ZPtQT6cj7MiXr8oCRe4sCjimTcyovBB9E8HAvg4gjPVbKeDPHAO0FuOE0G2IWEEDJwIvBJRRY+JQV5pjQNk24MFFnqIYJtg0h+iIR0eESERB60JKqqqpCUlIRyMmfo17Q8aLK0A/Tng4ODkugXEuIFBYXPqqqFJ9Mzc8pt7Fg2hKoqsXnE/iKfOK6kFUltSQwdvU2if584QNtv86NxrzQRX9Rm4EltJj6vSiPvU3CrIAE3c2JxNSMKV1LD8TFx4DeZ0biUn4AWOyOwzU0llx/1DY2SaEcQ8q81TEuEJldPWnNHR4eEdE1NDerq6tDY2CiJOJ2dqpqaJxVVNbsTklMFBobGpoQfHXF5YjKE9Svir5Hp7UUleXnpb43yu3YjO4JEPx53C6KwxsMGrS4sjLuxsSfUCxczI/GwJgPfdJTgRW8VviP2dVsJPq/OxJ2KTBwnPTzLi4MKQrKnp0cij+Hh4R81TR9rJxeH4+PjkgKtra2VRJwmX0N+k5Ob+7K2rv5eeWX1dER0XOh8FbWFhJ4SMXlpAiUlJSlFRUVKRoYO/l8h0d2DivH1U8hnWleXWZreFttbYBMhX2RvjujISHDsWQhzdUW+rw9qPd0x6OOG/eSy4VtxBTBUBwzW4quRZtISSWepqUJXlxhMJhNaWloIDQ2VODE6OoqpqSlJ1OlI01mgLYsUc05O7neNouZrZZU1/d68AE9pGVlNQovuMnI0cXl5eSkGg0GpqPwvD3lVHD0okJVpZulruED9LENZ6Y8LVVV+SCRaDSLDI4AMkSTSBfLz858X5uZfX5ub9vT73mpgQAiMivBJZxWa+b4YGBqSFCX5Hjo7O8Hj8TAyMiKRzPLlyzExMSF5TUiTteHb5ta2s0Ul5UJ7B2cW2V6NGK1vWTk5OWltbW1KU5P25R+ATayKGOlJUqoqKjLmpuZGRobGkbraur0+Xt5HamuE9yvKKx6VFBUf4geH1FuYmWeuzM+6daOvGd9M9uDFmlHsFISDz3VBH+kgdIHSkmlra0N8fLyEOC2d5uZmIps6dIm7vxQ1t76VkZWbZWJmQT9yo0OrICUlJUsgkYmCggI59DNAN1Q6Z6Q66D8T6WJRkpGWVp+nMM/EkeXg6eLkEjhv3jxnctxZSlrag73QoCqR5bCv0s/vy6XJschlGMLCwlzSAouLi5FIOk9YWJjkNa1xsbj7h47OrocNTS1rSWFGqalrGJBzSQqT7CkjS9iT/Shpqf9Znz8LcrKylLycHEVORJ+FdoTus3Qo6EKi00v3X2NiVsRspGVknHR19MS6KqqPNJWVXsxXUZF0FDry9NChyTeKml60d3bdbGxqGQnih/nKyMrpkN/+WJjKysqSiP/iIBqkSPFQdEppkEN06b9OFJ1yWpz68grzzHUNjEN09Y2EGlo66719eRcXj088WTo5+YdFY4vPVQvrRC4cdzpz9GOaHwuTJv1PIf5/wN9mh5YBPVw05eUVDJTmq7I8vH1D4xNTIs2trOln4q8HD/391/91/0vhr7NDE6UdojNEy4R28C8T898Ar7NDk6bXfxvi/4+gqP8GprYspxbwY20AAAAASUVORK5CYII=";
                    //var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACW9GRnMAAAAAAAAA4ACEVEUiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOElEQVRYw+ 3VQQoAIAgAQf//6XqBhwgpdAa8LwgaAfC5dTlNAk4JKA3I9i1AwJwAd+BJwOhvCJTbFlpB273IBPcAAAAASUVORK5CYII=";
                    var sContent = "<div id=\"blub\" style=\"width:200px; height:100px;\">" + k.info.title + "<br />" + k.info.content + "</div>";
                
                    viewModel.mapMarkers.push({
                        title: 'test',
                        tooltip: { text: sContent, isShown: false },
                        location: mapPosition,
                        iconSrc: {url: img},
                        clickAction: function () {
                            DevExpress.ui.notify("Marker 'C' clicked!", "info", 1000);
                        }
                    });
                }
            }
        })

        

        return viewModel;
    }
}