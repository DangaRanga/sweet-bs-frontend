import { AppController } from '.';

/**
 * Base class for all controllers for views
 */
export default abstract class ViewController {
    private _appCtrl: any;

    constructor(controller: any) {
        this._appCtrl = controller;
    }

    protected get appCtrl(): any {
        return this._appCtrl;
    }
}
