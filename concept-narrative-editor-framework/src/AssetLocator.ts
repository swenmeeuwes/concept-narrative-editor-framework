const electron = (window as any).require('electron');
const path = electron.remote.require('path');
const app = electron.remote.app;

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