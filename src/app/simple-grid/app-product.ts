import { ProductImage } from "./product-image";

export class AppProduct {
  constructor(
    public ProductId: number,
    public ProductName: string,
    public Price: number,
    public IsAvailable: boolean,
    public Description: string,
    public ShowFromDate: any,
    public ProductCategoryId: number,
    public ProductImages: ProductImage[],
    public ProductAttributes: ProductAttribute[]
  ) {}
}

export class ProductAttribute {
  public ID: number;
  public Title: string;
  public IsRequired: boolean;
  public ControlType: number;
  public DisplayOrder: number;
  public ProductId: number;
  public ProductAttributeValues: ProductAttributeValue[];
}
export class ProductAttributeValue {
  ID: number;
  Title: string;
  ProductAttributeId: number;
}
