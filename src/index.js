const {app, BrowserWindow, Menu} = require('electron')
const url = require('url')
const path = require('path')

let mainWindow

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu))
    mainWindow.on('close', () => {
        app.quit();
    })
})

const templateMenu = [
    {
        label: 'Opciones',
        submenu: [
            {
                label: 'Pedido',
                accelerator: 'Ctrl+P',
                click(){
                    
                }
            },
            {
                label: 'Menu',
                accelerator: 'Ctrl+M',
                click(){
                    
                }
            },
            {
                label: 'Domicilio',
                accelerator: 'Ctrl+D',
                click(){
                    
                }
            },
            {
                label: 'Reporte diario',
                accelerator: 'Ctrl+T',
                click(){
                    
                }
            }
        ]
    }
]

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'mostrar/ocultar DevTools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}