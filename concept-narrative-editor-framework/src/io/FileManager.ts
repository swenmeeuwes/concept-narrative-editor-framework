import * as electron from 'electron';
import * as fs from 'fs';

const { dialog } = electron.remote;

class FileManager {
    private static _instance: FileManager;

    public static get Instance() {
        return this._instance || (this._instance = new FileManager());
    }

    public saveAs() {
        const options = {
            filters: [
                { name: 'Story Files', extensions: ['sty'] }
            ]
        };
        dialog.showSaveDialog(options, (fileName) => {
            console.log(fs);
        });
    }

    private constructor() {

    }
}

export default FileManager;