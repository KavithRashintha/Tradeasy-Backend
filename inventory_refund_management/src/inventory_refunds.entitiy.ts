import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class InventoryRefund {
  @PrimaryGeneratedColumn()
     inventory_id: number;

  @Column() 
     supplier: string;

  @Column() 
     item: string;

  @Column({default: 'pending'}) 
    phone: string;  

  @Column()
     quantity: number;  
       
  @Column()
     price: number;  
     
  @Column()
     reason: string;  
     
  @Column({default: 'pending'})
     status: string;    
     
    
}