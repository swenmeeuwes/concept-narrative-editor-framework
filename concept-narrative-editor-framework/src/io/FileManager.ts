const electron = (window as any).require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote;

class FileManager {
    private static _instance: FileManager;

    public static get Instance() {
        return this._instance || (this._instance = new FileManager());
    }

    public saveAs(data: string | Buffer | Uint8Array, filters: Electron.FileFilter[]) {
        const options = {
            filters: filters
        };
        dialog.showSaveDialog(options, (fileName) => {
            fs.writeFile(fileName, data, (error) => {
                if (error) throw error;
            });

            // Save completed!
        });
    }

    private constructor() {

    }
}

export default FileManager;