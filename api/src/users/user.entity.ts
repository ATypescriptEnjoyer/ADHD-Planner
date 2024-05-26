import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column("varchar")
  username: string;

  @Column("varchar")
  password: string;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;
}