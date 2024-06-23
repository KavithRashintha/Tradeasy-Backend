import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";


@Entity()
export class InventoryRefund {
  @PrimaryGeneratedColumn()
     inventory_id: number;

  @Column()
       supplierId: string;   

  @Column() 
     supplierName: string;

  @Column()
      orderId:string;   

  @Column() 
     item: string;

  @Column({default: 'pending'}) 
    phone: string;  

  @Column()
     quantity: string;  
       
  @Column()
     price: string;  
     
  @Column()
     reason: string;  
     
  @Column({default: 'pending'})
     status: string;    
     
  @CreateDateColumn({ type: 'date' })
     createdDate: Date;         
}