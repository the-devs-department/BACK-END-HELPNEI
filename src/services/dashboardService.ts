import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { CreatedStore } from '../entities/CreatedStore';
import { UserLocation } from '../entities/UserLocation';

export const DashboardData = async (companyId: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const storeRepo = AppDataSource.getRepository(CreatedStore);
    const userLocationRepo = AppDataSource.getRepository(UserLocation);

    // Total de usuários associados à empresa mãe
    const impactedUsers = await userRepo
        .createQueryBuilder('user')
        .where('user.sponsorId = :companyId', { companyId })
        .getCount();

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
    const cities = await userLocationRepo
        .createQueryBuilder('userLocation')
        .innerJoin('userLocation.location', 'location')
        .select('DISTINCT location.cidade', 'city')
        .where('userLocation.userId IN (SELECT userId FROM user WHERE sponsorId = :companyId)', { companyId })
        .getRawMany();

    return {
        citiesCount: cities.length,
        impactedUsers,
        totalAffiliates,
        mediumGrowth: 0,
        createdStores,
        citiesServed: cities.map((city) => city.city),
    };
};
