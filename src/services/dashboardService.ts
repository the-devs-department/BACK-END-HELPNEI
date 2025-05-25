import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { CreatedStore } from '../entities/CreatedStore';
import { StatesInfos } from '../entities/StatesInfos';
import { Sponsor } from '../entities/Sponsor';
import CalcMedGrowth from './MediumGrowthCalc';
import { SponsoredAccountRequest } from '../entities/SponsoredAccountRequest';


export const DashboardData = async (companyId: string) => {
    const sponsorRepo = AppDataSource.getRepository(Sponsor)
    const userRepo = AppDataSource.getRepository(User);
    const storeRepo = AppDataSource.getRepository(CreatedStore);
    const citiesRepo = AppDataSource.getRepository(StatesInfos);
    const requestRepo = AppDataSource.getRepository(SponsoredAccountRequest)

    const sponsorInfos = await sponsorRepo
        .createQueryBuilder('sponsor')
        .where('sponsor.sponsorId = :companyId', {companyId})
        .getOne();
    // Total de usuários associados à empresa mãe
    const impactedUsers = await userRepo
        .createQueryBuilder('user')
        .where('user.sponsorId = :companyId', { companyId })
        .getCount();
    
    const mediumGrowth = CalcMedGrowth(impactedUsers)

    // Total de afiliados (usuários que foram indicados)
     const totalAffiliates = await requestRepo
        .createQueryBuilder('request')
        .where('request.sponsorId = :companyId', { companyId: parseInt(companyId) })
        .andWhere('request.approved = :approved', { approved: true })
        .getCount();

    // Total de lojas criadas pela empresa mãe
    const createdStores = await storeRepo
        .createQueryBuilder('store')
        .innerJoin('store.storeOwner', 'user') 
        .where('user.sponsorId = :companyId', { companyId }) 
        .getCount();

    // Cidades atendidas pela empresa mãe
    const Estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'DF', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
];
    let totalCities = 0
    const cities = await citiesRepo
    .createQueryBuilder('StatesInfos')
    .where('StatesInfos.sponsorId = :companyId', { companyId }).getOne();
    if (cities) {
        for (let estado of Estados){
            totalCities += cities[estado]
        }
    } 

    return {
        sponsorInfos,
        impactedUsers,
        totalAffiliates,
        mediumGrowth,
        createdStores,
        totalCities,
        cities
    };
};