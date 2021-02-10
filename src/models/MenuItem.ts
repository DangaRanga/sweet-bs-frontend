class MenuItem {
    private price: number;
    private name: string;
    private desc: string;
    private imgUrl: string;
    private flavours: string[];

    constructor(
        price: number,
        name: string,
        desc: string,
        imgUrl: string,
        flavours: string[]
    ) {
        this.price = price;
        this.name = name;
        this.desc = desc;
        this.imgUrl = imgUrl;
        this.flavours = flavours;
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
}

export default MenuItem;
