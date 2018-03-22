import isElectron from 'is-electron';

var electron, path, app;

if (isElectron()) {
    const windowObject = window as any;

    electron = windowObject.require('electron');
    path = electron.remote.require('path');
    app = electron.remote.app;
}

class AssetLocator {
    // todo: FIX THIS PATH FOR PRODUCTION!
    public static RELATIVE_CONTENT_SCHEMA_PATH: string = 'src/assets/content-schema.json';

    public static resolvePath(relativeAssetPath: string): string {
        const appPath = app.getAppPath();
        const absolutePath = path.join(appPath, relativeAssetPath);
        
        return absolutePath;
    }
}

export default AssetLocator;