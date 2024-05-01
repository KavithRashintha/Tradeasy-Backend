import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './inventory.entity';
import {FindOptionsWhere, Repository} from 'typeorm';
import { InventoryItemDTO } from './dto/InventoryItemDTO';
import { UpdateInventoryItemDTO } from './dto/UpdateInventoryItemDTO';
import {stringify} from "ts-jest";
import {FindInventoryItemDTO} from "./dto/FindInventoryItemDTO";

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

  async getInventoryItemByCategory(itemCategory:string):Promise<Item[]>{
    return await this.itemRepository
        .createQueryBuilder('item')
        .where('item.itemCategory = :itemCategory', {itemCategory})
        .getMany();
  }

}
