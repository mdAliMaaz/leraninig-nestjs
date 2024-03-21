import {
  IsNumber,
  IsString,
  IsLongitude,
  IsLatitude,
  Min,
  Max,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(100000)
  readonly price: number;

  @IsString()
  readonly make: string;

  @IsString()
  readonly model: string;

  @IsNumber()
  readonly year: number;

  @IsLongitude()
  readonly lng: number;

  @IsLatitude()
  readonly lat: number;

  @IsNumber()
  readonly mileage: number;
}
