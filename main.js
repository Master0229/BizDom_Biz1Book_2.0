const { app, BrowserWindow, Menu } = require('electron')
const url = require("url");
const path = require("path");
const electron = require('electron');
const { PosPrinter } = require("electron-pos-printer");
const database = require('./database')

// Print
// global.testPrint = function (count, printer, template) {

//     const options = {
//         preview: false,                                 // Preview in window or print
//         width: '300px',                                 //  width of content body
//         margin: '0 0 0 0',                              // margin of content body
//         copies: 1,                                      // Number of copies to print
//         printerName: printer,         // printerName: string, check it at webContent.getPrinters()
//         timeOutPerLine: 400,
//         silent: true
//     }
//     console.log(options)
//     var obj = {
//         type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image'
//         value: `${template}`,
//         style: ``,
//         css: {}
//     };
//     const data = [{
//         type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image'
//         value: `${template}`,
//         style: ``,
//         css: {}
//     }];
//     for (let i = 0; i <= count; i++) {
//         // data.push(obj);
//         PosPrinter.print(data, options)
//             .then(() => { })
//             .catch((error) => {
//                 console.error(error);
//             });

//     }
//     // for (let i = 0; i <= 100; i++) {
//     PosPrinter.print(data, options)
//         .then(() => { })
//         .catch((error) => {
//             console.error(error);
//         });
// }

let mainWindow
function redirect() {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
}

function createWindow() {
    mainWindow = new BrowserWindow({
        // backgroundColor: ' rgb(27, 69, 160)',
        titleBarStyle: "hiddenInset",
        width: 800,
        height: 600,
        // titleBarStyle: "hidden", 
        // frame: false,
        // transparent: true,
        icon: __dirname + `/dist/favicon.png`,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        vibrancy: 'ultra-dark'
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    //   Hide Menu Bar Electron
    mainWindow.setMenu(null)

    var menu = Menu.buildFromTemplate([
        {
            label: 'Biz1Book POS',
            submenu: [
                {
                    label: 'Reload',
                    // accelerator: "F5", 
                    accelerator: process.platform === 'darwin' ? 'Ctrl+R' : 'F5',
                    click() { redirect(); }
                },
                {
                    role: 'toggledevtools',
                    accelerator: process.platform === 'darwin' ? 'Ctrl+T' : 'F12',

                },
                { role: 'togglefullscreen' },
                {
                    role: 'close',
                    accelerator: process.platform === 'darwin' ? 'F10' : 'Ctrl+Q',
                },
            ]
        }
    ])
    Menu.setApplicationMenu(menu);

}
// function toggleFullscreen() {
//     if (mainWindow.isFullScreen()) {
//         mainWindow.setFullScreen(false);
//     } else {
//         mainWindow.setFullScreen(true);
//     }
// }

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})


//////////////////////////////////////PRINT/////////////////////////////////////////////////////////////
global.GetPrinters = function () {
    return mainWindow.webContents.getPrinters()
}

// Print
global.print = function (count, printers, template) {
    console.log(printers)
    printers.forEach(printer => {
        const options = {
            preview: false,               // Preview in window or print
            width: '300px',               //  width of content body
            margin: '0 0 0 0',            // margin of content body
            copies: count,                // Number of copies to print
            printerName: printer,         // printerName: string, check with webContent.getPrinters()
            timeOutPerLine: 5000,
            silent: true
            // pageSize: { height: 301000, width: 71000 }  // page size
        }
        const data = [
            {
                type: 'text',             // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                value: template,
                style: ``,
                css: {}
            }
        ]
        if (printer) {
            PosPrinter.print(data, options)
                .then(() => {
                    console.log("Print Successfull")
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
}