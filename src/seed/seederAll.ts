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
import { StatesInfos } from '../entities/StatesInfos';

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
    const statesInfosRepo = AppDataSource.getRepository(StatesInfos);

    // Create Sponsors
    console.log('🔨 Criando Sponsors...');
    const sponsorBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    sponsorBar.start(10, 0);
    const sponsors: Sponsor[] = [];

    //Pegar Instagram, LinkedIn e Web Site
    const empresasReais = [
      {
        id: 1,
        name: "Amazon",
        description: "A Amazon é uma das maiores varejistas online do mundo, oferecendo uma vasta gama de produtos que vão desde eletrônicos, roupas, livros até alimentos e serviços digitais. Fundada por Jeff Bezos em 1994, a empresa também é líder em tecnologia com serviços como a AWS (Amazon Web Services).",
        webSite: "https://www.amazon.com.br/",
        instagram: "https://www.instagram.com/amazonbrasil/",
        linkedin: "https://www.linkedin.com/company/amazon/",
        logo: "https://media.licdn.com/dms/image/v2/C560BAQHTvZwCx4p2Qg/company-logo_200_200/company-logo_200_200/0/1630640869849/amazon_logo?e=1753315200&v=beta&t=HTpP3CoCINZBc-rRWVA-_YwaSElK9385gSyyZOTBb1M",
        Highlogo: "https://assets.aboutamazon.com/dims4/default/c7f0d8d/2147483647/strip/true/crop/6110x2047+0+0/resize/645x216!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F2e%2Fd7%2Fac71f1f344c39f8949f48fc89e71%2Famazon-logo-squid-ink-smile-orange.png",
        rendaMinima:"ate3"
      },
      {
        id: 2,
        name: "Netshoes",
        description: "A Netshoes é uma empresa brasileira líder no comércio eletrônico de artigos esportivos, oferecendo uma vasta gama de produtos que incluem calçados, roupas e acessórios de diversas marcas. Fundada em fevereiro de 2000 por Marcio Kumruian e Hagop Chabab, a empresa iniciou suas atividades como uma loja física em São Paulo, mas rapidamente se tornou uma pioneira no e-commerce brasileiro ao migrar totalmente para o ambiente online em 2007. ",
        webSite: "https://www.netshoes.com.br/",
        instagram: "https://www.instagram.com/netshoes/",
        linkedin: "https://www.linkedin.com/company/gruponetshoes/",
        logo: "https://play-lh.googleusercontent.com/ADZLLcW0oIJ98VVHcxIGgmJ-Ex4m0SUUq9-XhGE5wsKJTRA2VxLdkg2kNGVQalbrm8E",
        Highlogo: "https://logodownload.org/wp-content/uploads/2020/02/netshoes-logo-5.png",
        rendaMinima:"ate1",
      },
      {
        id: 3,
        name: "Magazine Luiza",
        description: "O Magazine Luiza é uma das principais redes varejistas do Brasil, com atuação física e digital. A empresa vende desde móveis e eletrodomésticos até eletrônicos e produtos de beleza. É conhecida por sua forte presença no e-commerce e inovação digital.",
        webSite: "https://www.magazineluiza.com.br/",
        instagram: "https://www.instagram.com/magazineluiza/",
        linkedin: "https://www.linkedin.com/company/magazine-luiza/",
        logo: "https://assets.hgbrasil.com/finance/companies/big/magaz-luiza.png",
        Highlogo: "https://logodownload.org/wp-content/uploads/2014/06/magazine-luiza-logo-8.png",
        rendaMinima:"ate1",
      },
      {
        id: 4,
        name: "Natura",
        description: "A Natura é uma empresa brasileira líder no setor de cosméticos, higiene pessoal e perfumaria, reconhecida globalmente por seu compromisso com a sustentabilidade e o bem-estar. Fundada em 1969 por Luiz Seabra e Guilherme Leal, a empresa se destaca por seu modelo de venda direta, com uma vasta rede de consultoras e consultores que oferecem produtos inspirados na biodiversidade brasileira. Além da venda direta, a Natura expandiu sua atuação para o varejo físico e o e-commerce, e hoje faz parte do grupo Natura &Co.",
        webSite: "https://www.natura.com.br/",
        instagram: "https://www.instagram.com/naturabroficial/",
        linkedin: "https://www.linkedin.com/company/natura/",
        logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHLbk5HtPaFrA/company-logo_200_200/company-logo_200_200/0/1722945249128/natura_logo?e=1753315200&v=beta&t=1Yq0zKXuQlflM4N2mzCBSwSpsmLXDU6Clu9x-vVd7t8",
        Highlogo: "https://logopng.com.br/logos/natura-108.png",
        rendaMinima:"ate3",
      },
      {
        id: 5,
        name: "Tupperware",
        description: "A Tupperware é uma empresa globalmente reconhecida por seus produtos inovadores e duráveis para o lar, especialmente focada em soluções para armazenamento de alimentos, preparo e servir. Fundada em 1946 por Earl Tupper nos Estados Unidos, a empresa revolucionou o mercado com seus recipientes plásticos herméticos. A Tupperware se consolidou através do modelo de venda direta, utilizando as famosas 'festas Tupperware' como principal canal de distribuição, onde consultoras independentes demonstram os produtos e vendem diretamente aos consumidores.",
        webSite: "https://www.tupperware.com.br/",
        instagram: "https://www.instagram.com/tupperwarebrasil/",
        linkedin: "http://linkedin.com/company/tupperware-brands",
        logo: "https://media.licdn.com/dms/image/v2/D4E0BAQEMfx64Rqz7Xw/company-logo_200_200/B4EZasCPJPGYAI-/0/1746642990009/tupperware_brand_logo?e=1753315200&v=beta&t=EYjlAsxIyRYk_BksXb78NHcB-Ub25oSFplOmgfB8Dc8",
        Highlogo: "https://1000marcas.net/wp-content/uploads/2020/11/Tupperware-Logo-1994.png",
        rendaMinima:"mais3"
      },
      {
        id: 6,
        name: "Mercado Livre",
        description: "O Mercado Livre é a maior plataforma de e-commerce da América Latina, permitindo que empresas e pessoas físicas comprem e vendam produtos. Oferece uma grande variedade de itens novos e usados, além de serviços como pagamentos digitais via Mercado Pago.",
        webSite: "https://www.mercadolivre.com.br/",
        instagram: "https://www.instagram.com/mercadolivre/",
        linkedin: "https://www.linkedin.com/company/mercadolivre-com/",
        logo: "https://play-lh.googleusercontent.com/2uEptSnLOcFWnSjxLLIfGOWrf6lWSQ8pheDbGdzhqn0dcV93PBSrUkyjAKPgY7ejmA=w480-h960-rw",
        Highlogo: "https://anyhub.com.br/wp-content/uploads/2022/07/mercado-livre.png",
        rendaMinima:"ate3"
      },
      {
        id: 7,
        name: "Nike",
        description: "A Nike é uma multinacional americana líder mundial em design, desenvolvimento, fabricação e marketing de calçados, vestuário, equipamentos e acessórios esportivos. Fundada em 1964 como Blue Ribbon Sports por Bill Bowerman e Phil Knight, a empresa se tornou a Nike, Inc. em 1971, adotando o nome da deusa grega da vitória e o icônico \"swoosh\". Reconhecida por sua constante inovação tecnológica em produtos e suas poderosas campanhas de marketing com atletas de elite, a Nike atua globalmente através de vendas diretas, varejo próprio, parcerias com revendedores autorizados e um programa de afiliados.",
        webSite: "https://www.nike.com.br/",
        instagram: "http://instagram.com/nike",
        linkedin: "https://www.linkedin.com/company/nike/",
        logo: "https://play-lh.googleusercontent.com/gLAc2N-olmhgx-Tc_vPddFO98NBJhS2MUnIftI8QbNWCL0KcrhFpRzozR-2xwmxalCM=w480-h960-rw",
        Highlogo: "https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/001-nike-logos-swoosh-black.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjE5MjB9fX0%3D&s=4617fc4ca48a0336d90d25001a63e65147c95885bad727aa1b5473cf672dc459",
        rendaMinima:"mais3"
      },
      {
        id: 8,
        name: "Adidas",
        description: "A Adidas é uma multinacional alemã líder no design, desenvolvimento, produção e comercialização de calçados, vestuário e acessórios esportivos. Fundada em 1949 por Adi Dassler na Alemanha, a empresa se tornou um ícone global da cultura esportiva e da moda, conhecida por suas três listras e o logo do trevo. A Adidas atua em escala global, vendendo seus produtos através de lojas próprias, parceiros varejistas, seu e-commerce oficial e um programa de afiliados, que permite a criadores de conteúdo e parceiros digitais promoverem seus produtos em troca de comissões.",
        webSite: "https://www.adidas.com.br/",
        instagram: "https://www.instagram.com/adidas",
        linkedin: "https://www.linkedin.com/company/adidas/",
        logo: "https://play-lh.googleusercontent.com/fis-9rTH8zeCfMrHl-AQxY2wHP6ilz8pcOx_BiuMTKECK2Wz11u6Oui6poEAiVz3IlhB=w480-h960-rw",
        Highlogo: "https://cdn.freebiesupply.com/logos/large/2x/adidas-2-logo-png-transparent.png",
        rendaMinima:"mais3"
      },
      {
        id: 9,
        name: "Shein",
        description: "A Shein é uma varejista global de moda online, amplamente reconhecida por sua oferta de tendências rápidas (fast fashion) e preços acessíveis, com uma vasta gama de roupas, acessórios e itens de beleza. Fundada em 2008 por Chris Xu na China, a empresa se especializou em um modelo de negócio ágil, que permite lançar novos produtos em um ritmo acelerado, atendendo às demandas de um público jovem e antenado nas redes sociais. A Shein opera globalmente, vendendo diretamente aos consumidores através de seu aplicativo e website, e expandiu seu alcance com um popular programa de afiliados, que permite a influenciadores e criadores de conteúdo promoverem seus produtos e ganharem comissões, consolidando sua presença massiva no mercado de moda digital em diversos países, incluindo o Brasil.",        
        webSite: "https://br.shein.com/",
        instagram: "https://www.instagram.com/sheinbrasil",
        linkedin: "https://www.linkedin.com/company/shein/",
        logo: "https://media.licdn.com/dms/image/v2/C560BAQHemcXlbVKuvQ/company-logo_200_200/company-logo_200_200/0/1631353279026?e=1753315200&v=beta&t=9ZSOTSK3xTh0I1Z3jlBDPyVp3_ecEw8EjTAlGEMb9x4",
        Highlogo: "https://portaldaeconomia.com/wp-content/uploads/2024/05/image-28-1920x1024-1.png",
        rendaMinima:"ate3"
      },
      {
        id: 10,
        name: "Temu",
        description: "A Temu é uma plataforma global de e-commerce que se destaca por oferecer uma vasta gama de produtos a preços extremamente competitivos, conectando consumidores diretamente a fabricantes, principalmente na China. Lançada em setembro de 2022 pela PDD Holdings (empresa-mãe da Pinduoduo), a Temu rapidamente ganhou popularidade em diversos mercados, incluindo os Estados Unidos e o Brasil, com uma estratégia agressiva de marketing digital. Seu modelo de negócio permite a venda de produtos que vão desde vestuário e eletrônicos até itens para casa e acessórios, aproveitando a cadeia de suprimentos direta para minimizar custos.",
        webSite: "https://www.temu.com/br",
        instagram: "https://www.instagram.com/temu/",
        linkedin: "https://www.linkedin.com/company/temuapp/",
        logo: "https://play-lh.googleusercontent.com/Nz5sdWyh7jn4eTy_GSaRBDgaKhLC1pvYywC6fklDOlPGbopmeFN9NkqgKGjsvJMbKVEI=w480-h960-rw",
        Highlogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Temu_logo.svg/1024px-Temu_logo.svg.png",
        rendaMinima:"ate1"
      }
    ];

    for (let i = 0; i < empresasReais.length; i++) {
      const empresa = empresasReais[i];
      const sponsor = sponsorRepo.create({
        nameSponsor: empresa.name,
        descriptionSponsor: empresa.description,
        site_web: empresa.webSite,
        instagram: empresa.instagram,
        linkedin: empresa.linkedin,
        lowSponsorLogo: empresa.logo,
        highSponsorLogo: empresa.Highlogo,
        rendaMinima: empresa.rendaMinima as 'ate1' | 'ate3' | 'mais3', 
      });
      sponsors.push(await sponsorRepo.save(sponsor));
      sponsorBar.update(i + 1);
    }

    sponsorBar.stop();

    console.log('🔨 Criando informações de Cidades e Estados...');
    const citiesBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    citiesBar.start(10, 0)
    const states: StatesInfos[] = [];

    const estadosCidades = {
      "SP": 645, 
      "MG": 853, 
      "RJ": 92,  
      "BA": 417, 
      "RS": 497, 
      "PR": 399, 
      "PE": 185, 
      "CE": 184, 
      "PA": 144, 
      "MA": 217, 
      "GO": 246,
      "DF": 1, 
      "SC": 295, 
      "PB": 223,
      "ES": 78,  
      "AM": 62,  
      "RN": 167, 
      "MT": 141, 
      "AL": 102, 
      "PI": 224, 
      "MS": 79,  
      "SE": 75,  
      "TO": 139, 
      "RO": 52,  
      "AC": 22,  
      "AP": 16, 
      "RR": 15  
    };																								

    for (let i = 0; i < empresasReais.length; i++){
        let empresa = statesInfosRepo.create({
          sponsorId: empresasReais[i].id
        })
        for (let estado in estadosCidades){
          empresa[estado] = Math.floor(Math.random() * estadosCidades[estado]) + 1;
        }
        states.push(await statesInfosRepo.save(empresa));
        citiesBar.update(i + 1);
    }

    citiesBar.stop();

    // Lista de siglas dos estados brasileiros
    const estadosBrasil: string[] = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
      "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
      "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    // Create Locations
    console.log('🔨 Criando Locations...');
    const locationBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    locationBar.start(100, 0);
    const locations: Location[] = [];

    for (let i = 1; i <= 100; i++) {
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
    userBar.start(100, 0);
    const users: User[] = [];
    for (let i = 1; i <= 100; i++) {
      const randomSponsor = sponsors[Math.floor(Math.random() * sponsors.length)]
      const user = userRepo.create({
        nome: `Usuário ${i}`,
        nomeExibicao: `Usu ${i}`,
        dataNascimento: new Date(1990 + i, 1, 1).getTime(),
        sponsor: randomSponsor,
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
    userLocationBar.start(100, 0);
    for (let i = 0; i < 100; i++) {
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
    storeBar.start(100, 0);
    const stores: CreatedStore[] = [];
    for (let i = 0; i < 100; i++) {
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
    usageBar.start(100, 0);
    for (let i = 0; i < 100; i++) {
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
    transactionBar.start(100, 0);
    for (let i = 0; i < 100; i++) {
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