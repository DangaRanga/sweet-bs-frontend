import { ProcessOrder } from "../views";
import ViewController from "./ViewHooks";

export default class ProcessOrderController extends ViewController {
    private _processOrderView :any;

    constructor(processOrder:any,appCtrl:any) {
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