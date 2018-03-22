import * as Ajv from 'ajv';
import * as RefParser from 'json-schema-ref-parser';

import AssetLocator from './AssetLocator';

import isElectron from 'is-electron';

var electron, fs;

if (isElectron()) {
    electron = (window as any).require('electron');
    fs = electron.remote.require('fs');
}

class ContentTypeFactory {
    private static _instance: ContentTypeFactory;

    private _schemaValidator: Ajv.Ajv;
    private _refParser: RefParser;

    public static Instance(): ContentTypeFactory {
        return this._instance || (this._instance = new this());
    }

    public initialize() {
        this.readSchema()
            .then((jsonSchema) => {
                // var valid = this._schemaValidator.validate(jsonSchema);
                // if (!valid) console.log(validate.errors);
                // this._schemaValidator.addSchema(jsonSchema);
                this._schemaValidator.validate(jsonSchema, {});
            })
            .catch((error) => {
                throw error;
            });
    }

    public readSchema(dereference: boolean = false): Promise<Object> {
        return new Promise((resolve, reject) => {
            const schemaResourcePath = AssetLocator.resolvePath(AssetLocator.RELATIVE_CONTENT_SCHEMA_PATH);
            fs.readFile(schemaResourcePath, 'utf8', (err, data) => {
                if (err)
                    reject({ error: err });

                // todo: fix promise hell
                try {
                    const jsonData = JSON.parse(data);

                    if (dereference) {
                        this._refParser.dereference(jsonData)
                            .then((schema) => {
                                resolve(schema);
                            })
                            .catch((err2) => {
                                reject({ error: err2 });
                            });
                    } else {
                        resolve(jsonData);
                    }
                } catch (e) {
                    reject({ error: e });
                }
            });
        });
    }

    private constructor() {
        this._schemaValidator = new Ajv();
        this._refParser = new RefParser();
    }
}

export default ContentTypeFactory;