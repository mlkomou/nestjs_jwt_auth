import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  token: string;
  @Column()
  userId: number;
  @Column()
  expiryDate: Date;


  constructor(token: string, userId: number, expiryDate: Date) {
    this.token = token;
    this.userId = userId;
    this.expiryDate = expiryDate;
  }
}