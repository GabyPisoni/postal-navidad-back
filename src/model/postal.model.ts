import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';

//Structure of Postal Entity in DB
@Entity()
export class PostalEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  slug: string;
  @Column({ name: 'image_key' })
  imageKey: string;
  @Column({ name: 'from_name' })
  fromName: string;
  @Column({ name: 'to_name' })
  toName: string;
  @Column({ name: 'message' })
  message: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = uuid().substring(0, 8);
  }
}
