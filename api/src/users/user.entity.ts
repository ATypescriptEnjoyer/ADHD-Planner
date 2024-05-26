import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column("varchar", {unique: true})
  email: string;

  @Column("varchar")
  password: string;
}