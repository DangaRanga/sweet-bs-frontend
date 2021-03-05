import { AppController } from '.';

/**
 * Base class for all controllers for views
 */
export default abstract class ViewController {
    private _appCtrl: AppController;

    constructor(controller: AppController) {
        this._appCtrl = controller;
    }

    protected get appCtrl(): AppController {
        return this._appCtrl;
    }
}
