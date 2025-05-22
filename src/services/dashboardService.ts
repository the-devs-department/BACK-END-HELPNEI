import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { CreatedStore } from '../entities/CreatedStore';
import { StatesInfos } from '../entities/StatesInfos';
import { Sponsor } from '../entities/Sponsor';
import CalcMedGrowth from './MediumGrowthCalc';


export const DashboardData = async (companyId: string) => {
    const sponsorRepo = AppDataSource.getRepository(Sponsor)
    const userRepo = AppDataSource.getRepository(User);
    const storeRepo = AppDataSource.getRepository(CreatedStore);
    const citiesRepo = AppDataSource.getRepository(StatesInfos);

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
    const totalAffiliates = await userRepo
        .createQueryBuilder('user')
        .where('user.indicadoPor = :companyId', { companyId })
        .getCount();

    // Total de lojas criadas pela empresa mãe
    const createdStores = await storeRepo
        .createQueryBuilder('store')
        .where('store.storeOwnerId = :companyId', { companyId })
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