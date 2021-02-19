import { AppController } from '.';

export default abstract class ViewController {
    private _appCtrl: AppController;

    constructor(controller: AppController) {
        this._appCtrl = controller;
    }

    public get appCtrl(): AppController {
        return this._appCtrl;
    }
}
