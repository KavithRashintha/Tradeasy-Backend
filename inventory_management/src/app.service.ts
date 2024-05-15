import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './inventory.entity';
import {FindOptionsWhere, Repository} from 'typeorm';
import { InventoryItemDTO } from './dto/InventoryItemDTO';
import { UpdateInventoryItemDTO } from './dto/UpdateInventoryItemDTO';
import {stringify} from "ts-jest";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async addInventoryItem(
    createInventoryItemDto: InventoryItemDTO,
  ): Promise<Item> {
    const newInventoryItem = this.itemRepository.create(createInventoryItemDto);
    return await this.itemRepository.save(newInventoryItem);
  }

  async getInventoryItem(id: number): Promise<Item> {
    return await this.itemRepository.findOneById(id);
  }

  async getAllInventoryItems(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async updateInventoryItem(
    id: number,
    updateInventoryItemDto: UpdateInventoryItemDTO,
  ): Promise<Item> {
    await this.itemRepository.update(id, updateInventoryItemDto);
    return await this.itemRepository.findOneById(id);
  }

  async deleteInventoryItem(id: number) {
    const result = await this.itemRepository.delete(id);
    if (!result) {
      return 'Not Deleted';
    } else {
      return 'Successfully Deleted';
    }
  }

  async getInventoryItemByCategory(productCategory:string):Promise<Item[]>{
    return await this.itemRepository
        .createQueryBuilder('item')
        .where('item.productCategory = :productCategory', {productCategory})
        .getMany();
  }

  async getNumberOfItems(): Promise<any>{
    return await this.itemRepository.count();
  }

  async getNumberOfItemsForCategory():Promise<any>{
    return await this.itemRepository
        .createQueryBuilder('item')
        .select('item.productCategory', 'category')
        .addSelect('COUNT(item.id)', 'count')
        .groupBy('item.productCategory')
        .getRawMany();
  }

  async getTheItemsOfLowStock():Promise<any>{
    return await this.itemRepository
        .createQueryBuilder('item')
        .select('item.productName, item.productQuantity')
        .where('item.productQuantity < 20')
        .getRawMany();
  }

  async getInventoryStatus():Promise<any>{
    const numberOfItems = await this.getNumberOfItems();
    const numberOfItemsForCategory = await this.getNumberOfItemsForCategory();
    const itemsOfLowStock = await this.getTheItemsOfLowStock();

    return {
      numberOfItems,
      numberOfItemsForCategory,
      itemsOfLowStock
    };
  }

}