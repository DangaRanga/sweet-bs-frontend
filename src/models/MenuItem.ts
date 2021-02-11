class MenuItem {
    private price: number;
    private name: string;
    private desc: string;
    private imgUrl: string;
    private flavours: string[];
    private selectedFlavour: string;

    constructor(
        price: number,
        name: string,
        desc: string,
        imgUrl: string,
        flavours: string[],
        selectedFlavour?:string
    ) {
        this.price = price;
        this.name = name;
        this.desc = desc;
        this.imgUrl = imgUrl;
        this.flavours = flavours;
        this.selectedFlavour = selectedFlavour || this.flavours[0];
    }

    public get getPrice(): number {
        return this.price;
    }

    public get getName(): string {
        return this.name;
    }

    public get getDesc(): string {
        return this.desc;
    }

    public get getImgUrl(): string {
        return this.imgUrl;
    }

    public get getFlavours(): string[] {
        return this.flavours;
    }

    public get getSelectedFlavour(): string {
        return this.selectedFlavour;
    }

    public set setSelectedFlavour(flav: string) {
        if (this.isValidFlavour(flav)) {
            this.selectedFlavour = flav;
        } else {
            console.error('Not a flavour');
        }
    }

    private isValidFlavour(flav: string) {
        return flav in this.getFlavours;
    }
}

export default MenuItem;
