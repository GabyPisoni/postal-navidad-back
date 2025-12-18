import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsPositive,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreatePostalRequest {
  @IsNotEmpty({ message: 'fromName must not be empty' })
  @IsString({ message: 'fromName must be a string' })
  @MaxLength(50, { message: 'fromName must be at most 50 characters' })
  @MinLength(8, { message: 'fromName must be at least 8 characters' })
  fromName: string;
  @IsNotEmpty({ message: 'toName must not be empty' })
  @IsString({ message: 'toName must be a string' })
  @MaxLength(50, { message: 'toName must be at most 50 characters' })
  @MinLength(8, { message: 'toName must be at least 8 characters' })
  toName: string;
  @IsNotEmpty({ message: 'message must not be empty' })
  @IsString({ message: 'message must be a string' })
  @MaxLength(50, { message: 'message must be at most 50 characters' })
  @MinLength(8, { message: 'message must be at least 8 characters' })
  message: string;
}

export class CreatePostalResponse {
  @IsNotEmpty({ message: 'slug must not be empty' })
  @IsString({ message: 'slug must be a string' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must only contain lowercase letters, numbers, and hyphens',
  })
  slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }
}

export class PostalOutput {
  @IsNotEmpty({ message: 'id must not be empty' })
  @IsNumber({}, { message: 'id must be a number' })
  @IsPositive({ message: 'id must be a positive number' })
  id: number;

  @IsNotEmpty({ message: 'slug must not be empty' })
  @IsString({ message: 'slug must be a string' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must only contain lowercase letters, numbers, and hyphens',
  })
  slug: string;
  @IsNotEmpty({ message: 'fromName must not be empty' })
  @IsString({ message: 'fromName must be a string' })
  @MaxLength(50, { message: 'fromName must be at most 50 characters' })
  @MinLength(8, { message: 'fromName must be at least 8 characters' })
  fromName: string;
  @IsNotEmpty({ message: 'toName must not be empty' })
  @IsString({ message: 'toName must be a string' })
  @MaxLength(50, { message: 'toName must be at most 50 characters' })
  @MinLength(8, { message: 'toName must be at least 8 characters' })
  toName: string;
  @IsNotEmpty({ message: 'message must not be empty' })
  @IsString({ message: 'message must be a string' })
  @MaxLength(50, { message: 'message must be at most 50 characters' })
  @MinLength(8, { message: 'message must be at least 8 characters' })
  message: string;
  @IsNotEmpty({ message: 'imageUrl must not be empty' })
  @IsString({ message: 'imageUrl must be a string' })
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  imageUrl: string;
  constructor(
    id: number,
    slug: string,
    fromName: string,
    toName: string,
    message: string,
    imageUrl: string,
  ) {
    this.id = id;
    this.slug = slug;
    this.fromName = fromName;
    this.toName = toName;
    this.message = message;
    this.imageUrl = imageUrl;
  }
}
