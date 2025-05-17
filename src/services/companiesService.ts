import { AppDataSource } from '../config/data-source';
import { Sponsor } from '../entities/Sponsor';

export const getAllCompanies = async () => {
  const sponsorRepo = AppDataSource.getRepository(Sponsor);

  const  companies = await sponsorRepo.createQueryBuilder('sponsor').select('sponsor').getMany();


  return companies;
}