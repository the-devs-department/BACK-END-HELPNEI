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
    sponsorBar.start(10, 0);
    const sponsors: Sponsor[] = [];

    const empresasReais = [
      {
        name: "Nubank",
        description: "Banco digital brasileiro focado em tecnologia e inovação financeira.",
        logo: "https://s2.glbimg.com/jSjr-G312XxUPZPlUoPKYusnrpI=/620x350/e.glbimg.com/og/ed/f/original/2021/05/17/novo_logo.png"
      },
      {
        name: "Petrobras",
        description: "Maior empresa de energia do Brasil, atuando na exploração e produção de petróleo.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeifK_nn1moY1vNZSS1A77jgfgjeCX-nPGhw&s"
      },
      {
        name: "Ambev",
        description: "Líder no setor de bebidas na América Latina, dona de marcas como Skol e Brahma.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Logo_Ambev.png/1599px-Logo_Ambev.png"
      },
      {
        name: "Magazine Luiza",
        description: "Gigante do varejo brasileiro com forte presença no e-commerce.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Magalu_-_novo_logo.png"
      },
      {
        name: "Itaú Unibanco",
        description: "Um dos maiores bancos da América Latina.",
        logo: "https://logospng.org/wp-content/uploads/itau.jpg"
      },
      {
        name: "Embraer",
        description: "Empresa aeroespacial brasileira, referência mundial em jatos regionais.",
        logo: "https://www.cnnbrasil.com.br/wp-content/uploads/2021/06/41152_476791AAE41C3D25.jpg"
      },
      {
        name: "Vale",
        description: "Uma das maiores mineradoras do mundo, com forte atuação no setor de logística.",
        logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/c/cc/Logotipo_Vale.svg/2560px-Logotipo_Vale.svg.png"
      },
      {
        name: "Santander Brasil",
        description: "Subsidiária do banco espanhol com presença significativa no Brasil.",
        logo: "https://gkpb.com.br/wp-content/uploads/2018/03/novo-logo-santander-fundo-vermelho.jpg"
      },
      {
        name: "Bradesco",
        description: "Um dos bancos mais tradicionais do Brasil, com presença em todo o país.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Banco_Bradesco_logo_%28horizontal%29.png/1280px-Banco_Bradesco_logo_%28horizontal%29.png"
      },
      {
        name: "Stone",
        description: "Empresa brasileira de tecnologia financeira, referência em meios de pagamento.",
        logo: "https://logodownload.org/wp-content/uploads/2022/10/stone-logo-0.png"
      }
    ];

    for (let i = 0; i < empresasReais.length; i++) {
      const empresa = empresasReais[i];
      const sponsor = sponsorRepo.create({
        nameSponsor: empresa.name,
        descriptionSponsor: empresa.description,
        highSponsorLogo: empresa.logo,
      });
      sponsors.push(await sponsorRepo.save(sponsor));
      sponsorBar.update(i + 1);
    }

    sponsorBar.stop();


    // Lista de siglas dos estados brasileiros
    const estadosBrasil: string[] = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
      "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
      "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    // Create Locations
    console.log('🔨 Criando Locations...');
    const locationBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    locationBar.start(50000, 0);
    const locations: Location[] = [];

    for (let i = 1; i <= 50000; i++) {
      const randomEstado = estadosBrasil[Math.floor(Math.random() * estadosBrasil.length)];
      
      const location = locationRepo.create({
        bairro: `Bairro ${i}`,
        cidade: `Cidade ${i}`,
        estado: randomEstado,
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
        email: `usuario${i}@example.com`,
        password: `senha${i}`,
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