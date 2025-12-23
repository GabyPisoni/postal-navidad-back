import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostalEntity } from "src/model/postal.model";
import { Repository } from "typeorm";

@Injectable()
export class PostalRepository {
   constructor(
      @InjectRepository(PostalEntity)
      private readonly postalRepository: Repository<PostalEntity>
   ) {}

   async findPostalBySlug(slug: string): Promise<PostalEntity | null> {
      return this.postalRepository.findOne({ where: { slug } });
   }

   async savePostal(data: Partial<PostalEntity>): Promise<PostalEntity> {
      const postal = this.postalRepository.create(data);
      return this.postalRepository.save(postal);
   }
}