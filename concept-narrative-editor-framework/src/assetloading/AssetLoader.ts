import * as RefParser from 'json-schema-ref-parser';

import ContentSchema from '../schema/ContentSchema';
import AssetLocator from './AssetLocator';

import isElectron from 'is-electron';
import ContentSchemaWrapper from '../schema/ContentSchemaWrapper';
import AssetLibrary from './AssetLibrary';

var electron, fs;

if (isElectron()) {
    electron = (window as any).require('electron');
    fs = electron.remote.require('fs');
}

class AssetLoader {
    private static _instance: AssetLoader;

    private _refParser: RefParser;

    private _library: AssetLibrary;

    public static get Instance() {
        return this._instance || (this._instance = new AssetLoader());
    }

    public get Library(): AssetLibrary {
        return this._library;
    }

    public LoadContentSchema(): Promise<ContentSchemaWrapper> {
        const absoluteContentSchemaPath = AssetLocator.resolvePath(AssetLocator.RELATIVE_CONTENT_SCHEMA_PATH);
        return new Promise((resolve, reject) => {
            fs.readFile(absoluteContentSchemaPath, 'utf8', (fileReadError, data) => {
                if (fileReadError)
                    reject({ error: fileReadError });

                try {
                    const jsonData = JSON.parse(data);

                    this._refParser.dereference(jsonData)
                        .then((schema: ContentSchema) => {
                            const schemaWrapper = new ContentSchemaWrapper(schema);
                            this._library.contentSchemaWrapper = schemaWrapper; // Cache (should probably happen with id/ paired)
                            resolve(schemaWrapper);
                        })
                        .catch((refParseError) => {
                            reject({ error: refParseError });
                        });
                } catch (jsonParseError) {
                    reject({ error: jsonParseError });
                }
            });
        });
    }

    private constructor() {
        this._refParser = new RefParser();
        this._library = new AssetLibrary();
    }
}

export default AssetLoader;