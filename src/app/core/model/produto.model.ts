export interface ProdutoModel {
  id: number,
  descricaoResumida: string,
  descricaoCompleta: string,
  category: string,
  group: string,
  subGroup: string,
  situation?: boolean,
  salePrice: number,
  costPrice: number,
  margin: number,
  unitOfMeasurement: string,
  eanCode: number
}
