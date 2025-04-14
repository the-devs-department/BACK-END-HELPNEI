// src/seeders/seederAll.ts
import { AppDataSource } from '../config/data-source';
import { Sponsor } from '../entities/Sponsor';
import { Location } from '../entities/Location';
import { User } from '../entities/User';
import { UserLocation } from '../entities/UserLocation';
import { CreatedStore } from '../entities/CreatedStore';
import { UserAppUsage } from '../entities/UserAppUsage';
import { Transaction } from '../entities/Transaction';
import { SponsoredAccountRequest } from '../entities/SponsoredAccountRequest';

export const runSeeders = async () => {
  console.log('🔁 Iniciando seeders...');

  const sponsorRepo = AppDataSource.getRepository(Sponsor);
  const sponsorCount = await sponsorRepo.count();

  if (sponsorCount === 0) {
    const locationRepo = AppDataSource.getRepository(Location);
    const userRepo = AppDataSource.getRepository(User);
    const userLocationRepo = AppDataSource.getRepository(UserLocation);
    const storeRepo = AppDataSource.getRepository(CreatedStore);
    const usageRepo = AppDataSource.getRepository(UserAppUsage);
    const transactionRepo = AppDataSource.getRepository(Transaction);
    const requestRepo = AppDataSource.getRepository(SponsoredAccountRequest);

    // Create Sponsors
    const sponsors: Sponsor[] = [];
    for (let i = 1; i <= 4; i++) {
      const sponsor = sponsorRepo.create({
        nameSponsor: `Sponsor ${i}`,
        descriptionSponsor: `Descrição do patrocinador ${i}`,
      });
      sponsors.push(await sponsorRepo.save(sponsor));
    }

    // Create Locations
    const locations: Location[] = [];
    for (let i = 1; i <= 5; i++) {
      const location = locationRepo.create({
        bairro: `Bairro ${i}`,
        cidade: `Cidade ${i}`,
        estado: `SP`,
        cep: `0100${i}-000`,
        endereco: `Rua ${i}`,
        latitude: -23.550520 + i * 0.001,
        longitude: -46.633308 + i * 0.001,
      });
      locations.push(await locationRepo.save(location));
    }

    // Create Users
    const users: User[] = [];
    for (let i = 1; i <= 5; i++) {
      const user = userRepo.create({
        nome: `Usuário ${i}`,
        nomeExibicao: `Usu ${i}`,
        dataNascimento: new Date(1990 + i, 1, 1).getTime(),
        sponsor: sponsors[i % sponsors.length],
        location: locations[i % locations.length],
      });
      users.push(await userRepo.save(user));
    }

    // Create User Locations (2)
    for (let i = 0; i < 2; i++) {
      const userLocation = userLocationRepo.create({
        user: users[i],
        location: locations[i],
      });
      await userLocationRepo.save(userLocation);
    }

    // Create Stores (3)
    const stores: CreatedStore[] = [];
    for (let i = 0; i < 3; i++) {
      const store = storeRepo.create({
        storeOwner: users[i],
        isActive: true,
        storeCategory: `Categoria ${i}`,
      });
      stores.push(await storeRepo.save(store));
    }

    // Create App Usage (5)
    for (let i = 0; i < 5; i++) {
      const usage = usageRepo.create({
        user: users[i],
        appUsageTime: 100 + i * 10,
      });
      await usageRepo.save(usage);
    }

    // Create Transactions (20)
    for (let i = 0; i < 20; i++) {
      const transaction = transactionRepo.create({
        user: users[i % users.length],
        store: stores[Math.floor(Math.random() * stores.length)],
        amount: 50 + i * 2.5,
      });
      await transactionRepo.save(transaction);
    }

    for (let i = 0; i < 10; i++) {
      const user = users[i % users.length];
      const sponsor = sponsors[i % sponsors.length];
    
      // Check if request for this user already exists
      const existing = await requestRepo.findOneBy({ user: { userId: user.userId } });
    
      if (!existing) {
        const request = requestRepo.create({
          user,
          sponsor,
        });
        await requestRepo.save(request);
      }
    }
    

    console.log('✅ Dados iniciais inseridos com sucesso!');
  } else {
    console.log('📦 Seeders não executados: dados já existem.');
  }
};