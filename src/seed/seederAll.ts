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

// Real Brazilian cities by state
const brazilianCities = {
  "SP": [
    { name: "São Paulo", lat: -23.550520, lng: -46.633308 },
    { name: "Campinas", lat: -22.907104, lng: -47.063240 },
    { name: "Santos", lat: -23.960833, lng: -46.333889 },
    { name: "São José dos Campos", lat: -23.186111, lng: -45.885278 },
    { name: "Ribeirão Preto", lat: -21.176389, lng: -47.820833 }
  ],
  "RJ": [
    { name: "Rio de Janeiro", lat: -22.906847, lng: -43.172897 },
    { name: "Niterói", lat: -22.883333, lng: -43.103611 },
    { name: "São Gonçalo", lat: -22.826944, lng: -43.053889 },
    { name: "Duque de Caxias", lat: -22.785833, lng: -43.311667 },
    { name: "Nova Iguaçu", lat: -22.755833, lng: -43.450833 }
  ],
  "MG": [
    { name: "Belo Horizonte", lat: -19.916667, lng: -43.934444 },
    { name: "Uberlândia", lat: -18.918889, lng: -48.277222 },
    { name: "Contagem", lat: -19.931944, lng: -44.053889 },
    { name: "Juiz de Fora", lat: -21.764167, lng: -43.349444 },
    { name: "Betim", lat: -19.967778, lng: -44.197778 }
  ],
  "RS": [
    { name: "Porto Alegre", lat: -30.033056, lng: -51.230000 },
    { name: "Caxias do Sul", lat: -29.167778, lng: -51.178889 },
    { name: "Pelotas", lat: -31.771944, lng: -52.342778 },
    { name: "Canoas", lat: -29.917778, lng: -51.183889 },
    { name: "Santa Maria", lat: -29.683889, lng: -53.806944 }
  ],
  "PR": [
    { name: "Curitiba", lat: -25.428333, lng: -49.273333 },
    { name: "Londrina", lat: -23.310278, lng: -51.159722 },
    { name: "Maringá", lat: -23.425278, lng: -51.938889 },
    { name: "Ponta Grossa", lat: -25.095278, lng: -50.161944 },
    { name: "Cascavel", lat: -24.955833, lng: -53.455278 }
  ]
};

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

    // Create Locations with real cities
    console.log('🔨 Criando Locations...');
    const locationBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    const totalLocations = 1000; // Reduced number for more realistic data
    locationBar.start(totalLocations, 0);
    const locations: Location[] = [];

    const states = Object.keys(brazilianCities);
    for (let i = 0; i < totalLocations; i++) {
      const randomState = states[Math.floor(Math.random() * states.length)];
      const citiesInState = brazilianCities[randomState];
      const randomCity = citiesInState[Math.floor(Math.random() * citiesInState.length)];
      
      const location = locationRepo.create({
        bairro: `Bairro ${Math.floor(Math.random() * 100) + 1}`,
        cidade: randomCity.name,
        estado: randomState,
        cep: `${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 900) + 100}`,
        endereco: `Rua ${Math.floor(Math.random() * 1000) + 1}`,
        latitude: randomCity.lat + (Math.random() - 0.5) * 0.1,
        longitude: randomCity.lng + (Math.random() - 0.5) * 0.1,
      });

      locations.push(await locationRepo.save(location));
      locationBar.update(i + 1);
    }

    locationBar.stop();

    // Create Users with better distribution
    console.log('🔨 Criando Users...');
    const userBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    const totalUsers = 5000; // Reduced number for more realistic data
    userBar.start(totalUsers, 0);
    const users: User[] = [];

    for (let i = 1; i <= totalUsers; i++) {
      const randomSponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      const user = userRepo.create({
        nome: `Usuário ${i}`,
        nomeExibicao: `Usu ${i}`,
        dataNascimento: new Date(1990 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).getTime(),
        sponsor: randomSponsor,
        location: randomLocation,
        email: `usuario${i}@example.com`,
        password: `senha${i}`
      });
      users.push(await userRepo.save(user));
      userBar.update(i);
    }
    userBar.stop();

    // Create User Locations
    console.log('🔨 Criando User Locations...');
    const userLocationBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    userLocationBar.start(users.length, 0);
    for (let i = 0; i < users.length; i++) {
      const userLocation = userLocationRepo.create({
        user: users[i],
        location: users[i].location, // Use the same location as the user
      });
      await userLocationRepo.save(userLocation);
      userLocationBar.update(i + 1);
    }
    userLocationBar.stop();

    // Create Stores with better distribution
    console.log('🔨 Criando Stores...');
    const storeBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    const totalStores = 2000; // Reduced number for more realistic data
    storeBar.start(totalStores, 0);
    const stores: CreatedStore[] = [];

    const storeCategories = ['Alimentação', 'Vestuário', 'Eletrônicos', 'Serviços', 'Educação', 'Saúde', 'Beleza', 'Esportes', 'Casa', 'Automotivo'];
    
    for (let i = 0; i < totalStores; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const store = storeRepo.create({
        storeOwner: randomUser,
        isActive: Math.random() > 0.1, // 90% chance of being active
        storeCategory: storeCategories[Math.floor(Math.random() * storeCategories.length)],
      });
      stores.push(await storeRepo.save(store));
      storeBar.update(i + 1);
    }
    storeBar.stop();

    // Create App Usage with realistic data
    console.log('🔨 Criando App Usage...');
    const usageBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    usageBar.start(users.length, 0);
    for (let i = 0; i < users.length; i++) {
      const usage = usageRepo.create({
        user: users[i],
        appUsageTime: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
      });
      await usageRepo.save(usage);
      usageBar.update(i + 1);
    }
    usageBar.stop();

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