import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductReview } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './DTO/ProductDTO';
import { UpdateProductDTO } from "./DTO/UpdateProductDTO";
import { CreateProductReviewDTO } from "./DTO/ProductReviewDTO";
import { ProductQuantityDTO } from "./DTO/ProductQuantityDTO";

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,

      @InjectRepository(ProductReview)
      private readonly productReviewRepository: Repository<ProductReview>,
  ) {}

  async createProducts(createProductDTO: ProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDTO);
    return await this.productRepository.save(newProduct);
  }

  async findProduct(id: any): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    return product ? { ...product, productSellingPrice: parseFloat(product.productSellingPrice as any) } : null;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map(product => ({
      ...product,
      productSellingPrice: parseFloat(product.productSellingPrice as any),
    }));
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDTO): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    const product = await this.productRepository.findOne({ where: { id } });
    return product ? { ...product, productSellingPrice: parseFloat(product.productSellingPrice as any) } : null;
  }

  async updateProductQuantity(id: number, productQuantityDto: ProductQuantityDTO): Promise<Product> {
    await this.productRepository
        .createQueryBuilder()
        .update(Product)
        .set({ productQuantity: productQuantityDto.productQuantity })
        .where("id = :id", { id })
        .execute();

    const product = await this.productRepository.findOne({ where: { id } });
    return product ? { ...product, productSellingPrice: parseFloat(product.productSellingPrice as any) } : null;
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete(id);
    return result.affected ? "Successfully Deleted" : "Not Deleted";
  }

  async getProductsCount() {
    return await this.productRepository.count();
  }

  async getProductsCategoryCount(): Promise<number> {
    const result = await this.productRepository
        .createQueryBuilder('product')
        .select('COUNT(DISTINCT product.productCategory)', 'categoryCount')
        .getRawOne();

    return parseInt(result.categoryCount, 10);
  }

  async getProductByName(productName: string): Promise<Product | null> {
    const result = await this.productRepository
        .createQueryBuilder('product')
        .where('product.productName = :productName', { productName })
        .getOne();

    return result ? { ...result, productSellingPrice: parseFloat(result.productSellingPrice as any) } : null;
  }

  async createProductsReview(createProductReviewDTO: CreateProductReviewDTO): Promise<ProductReview> {
    const newProductReview = this.productReviewRepository.create(createProductReviewDTO);
    return await this.productReviewRepository.save(newProductReview);
  }

  async getAllProductsReview(): Promise<ProductReview[]> {
    return await this.productReviewRepository.find();
  }
}
