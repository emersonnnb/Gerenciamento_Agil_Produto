export interface ProdutoModel {
  id: number,
  descricaoResumida: string,
  descricaoCompleta: string,
  category: number,
  group: number,
  subGroup: number,
  situation?: boolean,
  salePrice: number,
  costPrice: number,
  margin: number,
  unitOfMeasurement: string,
  eanCode: number
}
