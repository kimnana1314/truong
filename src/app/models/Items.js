class Items {
    constructor(
        Item_Id,
        Item_Name,
        Img,
        Price,
        Size_M,
        Weigth_M,
        Size_D,
        Quantity,
        Container_Valume,
        Voltage,
        Wattage,
        Cryogenics,
        Cooling_Sys,
        Star
    ) {
        this.Item_Id = Item_Id;
        this.Item_Name = Item_Name;
        this.Img = Img;
        this.Price = Price;
        this.Size_M = Size_M;
        this.Weigth_M = Weigth_M;
        this.Size_D = Size_D;
        this.Quantity = Quantity;
        this.Container_Valume = Container_Valume;
        this.Voltage = Voltage;
        this.Wattage = Wattage;
        this.Cryogenics = Cryogenics;
        this.Cooling_Sys = Cooling_Sys;
        this.Star = Star;
    }
}
module.exports = Items;
