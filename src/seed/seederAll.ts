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
import cliProgress from 'cli-progress';

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
    console.log('🔨 Criando Sponsors...');
    const sponsorBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    sponsorBar.start(40, 0);
    const sponsors: Sponsor[] = [];
    for (let i = 1; i <= 40; i++) {
      const sponsor = sponsorRepo.create({
        nameSponsor: `Sponsor ${i}`,
        descriptionSponsor: `Descrição do patrocinador ${i}`,
      });
      sponsors.push(await sponsorRepo.save(sponsor));
      sponsorBar.update(i);
    }
    sponsorBar.stop();

    // Create Locations
    console.log('🔨 Criando Locations...');
    const locationBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    locationBar.start(50000, 0);
    const locations: Location[] = [];
    for (let i = 1; i <= 50000; i++) {
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
      locationBar.update(i);
    }
    locationBar.stop();

    // Create Users
    console.log('🔨 Criando Users...');
    const userBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    userBar.start(50000, 0);
    const users: User[] = [];
    for (let i = 1; i <= 50000; i++) {
      const user = userRepo.create({
        nome: `Usuário ${i}`,
        nomeExibicao: `Usu ${i}`,
        dataNascimento: new Date(1990 + i, 1, 1).getTime(),
        sponsor: sponsors[i % sponsors.length],
        location: locations[i % locations.length],
      });
      users.push(await userRepo.save(user));
      userBar.update(i);
    }
    userBar.stop();

    // Create User Locations
    console.log('🔨 Criando User Locations...');
    const userLocationBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    userLocationBar.start(50000, 0);
    for (let i = 0; i < 50000; i++) {
      const userLocation = userLocationRepo.create({
        user: users[i],
        location: locations[i],
      });
      await userLocationRepo.save(userLocation);
      userLocationBar.update(i + 1);
    }
    userLocationBar.stop();

    // Create Stores
    console.log('🔨 Criando Stores...');
    const storeBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    storeBar.start(50000, 0);
    const stores: CreatedStore[] = [];
    for (let i = 0; i < 50000; i++) {
      const store = storeRepo.create({
        storeOwner: users[i],
        isActive: true,
        storeCategory: `Categoria ${i}`,
      });
      stores.push(await storeRepo.save(store));
      storeBar.update(i + 1);
    }
    storeBar.stop();

    // Create App Usage
    console.log('🔨 Criando App Usage...');
    const usageBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    usageBar.start(50000, 0);
    for (let i = 0; i < 50000; i++) {
      const usage = usageRepo.create({
        user: users[i],
        appUsageTime: 100 + i * 10,
      });
      await usageRepo.save(usage);
      usageBar.update(i + 1);
    }
    usageBar.stop();

    // Create Transactions
    console.log('🔨 Criando Transactions...');
    const transactionBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    transactionBar.start(200000, 0);
    for (let i = 0; i < 200000; i++) {
      const transaction = transactionRepo.create({
        user: users[Math.floor(Math.random() * users.length)],
        store: stores[Math.floor(Math.random() * stores.length)],
        amount: Math.random() * 1000,
      });
      await transactionRepo.save(transaction);
      transactionBar.update(i + 1);
    }
    transactionBar.stop();

    // Create Sponsored Account Requests
    console.log('🔨 Criando Sponsored Account Requests...');
    const requestBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    requestBar.start(users.length, 0);
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];

      const existing = await requestRepo.findOneBy({ user: { userId: user.userId } });

      if (!existing) {
        const request = requestRepo.create({
          user,
          sponsor,
        });
        await requestRepo.save(request);
      }
      requestBar.update(i + 1);
    }
    requestBar.stop();

    console.log('✅ Dados iniciais inseridos com sucesso!');
  } else {
    console.log('📦 Seeders não executados: dados já existem.');
  }
};