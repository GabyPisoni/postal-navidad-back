import { InjectRepository } from "@nestjs/typeorm";
import { PostalEntity } from "src/model/postal.model";
import { Repository } from "typeorm/browser/repository/Repository.js";


export class PostalRepository {
 
 constructor(
    @InjectRepository(PostalEntity)
    private readonly postalRepository: Repository<PostalEntity>
 ){}
 async findPostalBySlug(slug: string): Promise<PostalEntity | null> {
    return this.postalRepository.findOne({where: {slug}});
 }
  async savePostal(data: Partial<PostalEntity>): Promise<PostalEntity | null> {
    return this.postalRepository.save(data);
 }
}