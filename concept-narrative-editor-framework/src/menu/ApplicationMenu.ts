import * as Electron from 'electron'; // needed for types

const electron = (window as any).require('electron');
const app = electron.remote.app;
const Menu = electron.remote.Menu;

// This could heavily profit from a global event system
// In this system, events will be dispatched in this class and handled in other classes
// Currently: Items are added from other class -> this is not a future-proof and maintainable solution
class ApplicationMenu {
    private static _instance: ApplicationMenu;

    private _menu: Electron.Menu;

    private _template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Export',
                    accelerator: 'CmdOrCtrl+E',
                    click() {
                        ApplicationMenu.instance.handleExport();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Insert',
                    accelerator: 'CmdOrCtrl+I',
                    click() {
                        ApplicationMenu.instance.handleInsert();
                    }
                },
                {
                    label: 'Delete',
                    accelerator: 'CmdOrCtrl+D',
                    click() {
                        ApplicationMenu.instance.handleDelete();
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

    // Methods to be overwritten, a bit hacky atm... fix: proper event dispatcher
    public handleInsert = (): void => { throw '[ApplicationMenu] Insert not implemented'; };
    public handleDelete = (): void => { throw '[ApplicationMenu] Delete not implemented'; };
    public handleExport = (): void => { throw '[ApplicationMenu] Export not implemented'; };

    public static get instance(): ApplicationMenu {
        return this._instance || (this._instance = new ApplicationMenu());
    }

    public get menu() {
        return this._menu;
    }

    public construct() {
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

        this._menu = Menu.buildFromTemplate(this._template);
        Menu.setApplicationMenu(this._menu);
    }

    private constructor() {
        this.construct();
    }
}

export default ApplicationMenu;