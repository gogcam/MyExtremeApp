MyExtremeApp.notification = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    registerPushPlugin();

    return viewModel;
};

function errorHandler(error) {
    alert('Error: ' + error);
}
function successHandler(result) {
    alert('Result: ' + result);
}

function onNotificationGCM(e) {
    alert('onNotifictionGCM');
    if (e.regid.length > 0) {

        function replaceAll(find, replace, str) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

        var regid = e.regid;
        regid = replaceAll('l', '?', regid);
        regid = replaceAll('I', ':', regid);

        alert(regid);
    }

    //MyExtremeApp.MessageContent(PushTest.MessageContent() + '<li>EVENT -> RECEIVED: ' + e.event + '</li>');
    //switch (e.event) {
    //    case 'registered':
    //        if (e.regid.length > 0) {
    //            PushTest.MessageContent(PushTest.MessageContent() + '<li>REGISTERED -> REGID: ' + e.regid + "</li>");
    //        }
    //        break;

    //    case 'message':
    //        if (e.foreground) {
    //            PushTest.MessageContent(PushTest.MessageContent() + '<li>--INLINE NOTIFICATION--' + '</li>');
    //        }
    //        else {
    //            if (e.coldstart) {
    //                PushTest.MessageContent(PushTest.MessageContent() + '<li>--COLDSTART NOTIFICATION--' + '</li>');
    //            }
    //            else {
    //                PushTest.MessageContent(PushTest.MessageContent() + '<li>--BACKGROUND NOTIFICATION--' + '</li>');
    //            }
    //        }
    //        PushTest.MessageContent(PushTest.MessageContent() + '<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
    //        break;

    //    case 'error':
    //        PushTest.MessageContent(PushTest.MessageContent() + '<li>ERROR -> MSG: ' + e.msg + '</li>');
    //        break;

    //    default:
    //        PushTest.MessageContent(PushTest.MessageContent() + '<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    //        break;
    //}
}
function registerPushPlugin() {
    MyExtremeApp.PushNotification = window.plugins.pushNotification;
    if (DevExpress.devices.current().platform == 'android' || DevExpress.devices.current().platform == 'Android') {
        alert('register starts');
        MyExtremeApp.PushNotification.register(
            successHandler,
            errorHandler, {
                "senderID": "831496746003",
                "ecb": "onNotificationGCM"
            });
    }
}