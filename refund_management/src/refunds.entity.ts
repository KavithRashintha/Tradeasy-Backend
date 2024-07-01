import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity()
export class CustomerRefund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  orderId: number;

  @Column()
  customerName: string;

  @Column()
  customerId: string;

  @Column()
  contact: string;

  @Column()
  accountDetails: string;

  @Column()
  item: string;

  @Column()
  quantity: string;

  @Column()
  reason: string;

  @Column()
  totalPrice: string;

  @CreateDateColumn({ type: 'date' })
  createdDate: Date;  
     

  @Column({default: 'pending'})
  status: string;

  @Column({ nullable: true })
    denialReason: string;
}


@Entity()
export class InventoryRefund {
  @PrimaryGeneratedColumn()
     inventory_id: number;

  @Column()
       supplierId: string;   

  @Column() 
     supplierName: string;

  @Column()
     orderId: string;   

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
