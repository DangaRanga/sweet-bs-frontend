import { AppController } from ".";
import { ProcessOrder } from "../views";
import ViewController from "./ViewController";

export default class ProcessOrderController extends ViewController {
    private _processOrderView :ProcessOrder;

    constructor(processOrder:ProcessOrder,appCtrl:any) {
        super(appCtrl);
        this._processOrderView = processOrder;
    }

    public placeOrder(): void {
        if (this.appCtrl.sendOrder()) {
            this.appCtrl.emptyCart();
        } else {
            console.log('failed');
        }
    }
}