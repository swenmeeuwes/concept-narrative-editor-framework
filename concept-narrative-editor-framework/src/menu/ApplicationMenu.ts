const electron = (window as any).require('electron');
const app = electron.remote.app;
const Menu = electron.remote.Menu;

// This could heavily profit from a global event system
// In this system, events will be dispatched in this class and handled in other classes
// Currently: Items are added from other class -> this is not a future-proof and maintainable solution
class ApplicationMenu {
    private static _instance: ApplicationMenu;

    private _template = [{
        label: 'Edit',
        submenu: [
            {
                label: 'Insert',
                accelerator: 'CmdOrCtrl+I',
                click() {
                    ApplicationMenu.Instance.handleInsert();
                }
            }
            // { role: 'undo' },
            // { role: 'redo' },
            // { type: 'separator' },
            // { role: 'cut' },
            // { role: 'copy' },
            // { role: 'paste' },
            // { role: 'pasteandmatchstyle' },
            // { role: 'delete' },
            // { role: 'selectall' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            // { type: 'separator' },
            // { role: 'resetzoom' },
            // { role: 'zoomin' },
            // { role: 'zoomout' },
            // { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    }
    ];

    public handleInsert = (): void => { throw '[ApplicationMenu] Insert not implemented'; };

    public static get Instance(): ApplicationMenu {
        return this._instance || (this._instance = new ApplicationMenu());
    }

    constructor() {
        // Mac doesn't take the first menu item in account, 
        // so here we add our app name as the first item 
        if (process.platform === 'darwin') {
            this._template.unshift({
                label: app.getName(),
                submenu: [
                    // { role: 'about' },
                    // { type: 'separator' },
                    // { role: 'services', submenu: [] },
                    // { type: 'separator' },
                    // { role: 'hide' },
                    // { role: 'hideothers' },
                    // { role: 'unhide' },
                    // { type: 'separator' },
                    // { role: 'quit' }
                ]
            });
        }

        const menu = Menu.buildFromTemplate(this._template);
        Menu.setApplicationMenu(menu);
    }
}

export default ApplicationMenu;