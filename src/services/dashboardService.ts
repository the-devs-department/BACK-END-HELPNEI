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
        .select([
            'DISTINCT location.cidade as city',
            'location.estado as state'
        ])
        .where('userLocation.userId IN (SELECT userId FROM user WHERE sponsorId = :companyId)', { companyId })
        .getRawMany();

    // Agrupa cidades por estado
    const citiesByState = cities.reduce((acc, current) => {
        const state = current.state;
        if (!acc[state]) {
            acc[state] = {
                state: state,
                cities: [],
                totalCities: 0
            };
        }
        acc[state].cities.push(current.city);
        acc[state].totalCities++;
        return acc;
    }, {});

    return {
        citiesCount: cities.length,
        impactedUsers,
        totalAffiliates,
        mediumGrowth: 35,
        createdStores,
        citiesByState: Object.values(citiesByState),
    };
};
