import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { CreatedStore } from '../entities/CreatedStore';
import { UserLocation } from '../entities/UserLocation';
import { Sponsor } from '../entities/Sponsor';
import { SponsoredAccountRequest } from '../entities/SponsoredAccountRequest';

export const DashboardData = async (companyId: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const storeRepo = AppDataSource.getRepository(CreatedStore);
    const userLocationRepo = AppDataSource.getRepository(UserLocation);
    const sponsorRepo = AppDataSource.getRepository(Sponsor);
    const requestRepo = AppDataSource.getRepository(SponsoredAccountRequest);

    // Buscar informações do patrocinador
    const sponsor = await sponsorRepo.findOne({
        where: { sponsorId: parseInt(companyId) }
    });

    if (!sponsor) {
        throw new Error('Patrocinador não encontrado');
    }

    // Total de usuários impactados (usuários com lojas ativas e solicitações aprovadas)
    const impactedUsers = await requestRepo
        .createQueryBuilder('request')
        .innerJoin('request.user', 'user')
        .innerJoin(CreatedStore, 'store', 'store.storeOwnerId = user.userId')
        .where('request.sponsorId = :companyId', { companyId: parseInt(companyId) })
        .andWhere('request.approved = :approved', { approved: true })
        .andWhere('store.isActive = :isActive', { isActive: true })
        .getCount();

    // Total de afiliados (usuários com solicitações aprovadas)
    const totalAffiliates = await requestRepo
        .createQueryBuilder('request')
        .where('request.sponsorId = :companyId', { companyId: parseInt(companyId) })
        .andWhere('request.approved = :approved', { approved: true })
        .getCount();

    // Total de lojas criadas por usuários aprovados
    const createdStores = await storeRepo
        .createQueryBuilder('store')
        .innerJoin('store.storeOwner', 'user')
        .innerJoin(SponsoredAccountRequest, 'request', 'request.userId = user.userId')
        .where('request.sponsorId = :companyId', { companyId: parseInt(companyId) })
        .andWhere('request.approved = :approved', { approved: true })
        .andWhere('store.isActive = :isActive', { isActive: true })
        .getCount();

    // Cidades atendidas por usuários aprovados
    const cities = await userLocationRepo
        .createQueryBuilder('userLocation')
        .innerJoin('userLocation.location', 'location')
        .innerJoin('userLocation.user', 'user')
        .innerJoin(SponsoredAccountRequest, 'request', 'request.userId = user.userId')
        .select([
            'DISTINCT location.cidade as city',
            'location.estado as state'
        ])
        .where('request.sponsorId = :companyId', { companyId: parseInt(companyId) })
        .andWhere('request.approved = :approved', { approved: true })
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

    // Calcular crescimento médio baseado na proporção de afiliados aprovados
    const totalApprovedRequests = await requestRepo
        .createQueryBuilder('request')
        .where('request.approved = :approved', { approved: true })
        .getCount();

    const mediumGrowth = totalApprovedRequests > 0 
        ? Math.round((totalAffiliates / totalApprovedRequests) * 100) 
        : 0;

    return {
        companyName: sponsor.nameSponsor,
        companyDescription: sponsor.descriptionSponsor || '',
        citiesCount: cities.length,
        impactedUsers,
        totalAffiliates,
        mediumGrowth,
        createdStores,
        citiesByState: Object.values(citiesByState),
    };
};