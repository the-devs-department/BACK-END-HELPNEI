CREATE DATABASE IF NOT EXISTS HelpneiDB;
USE HelpneiDB;
CREATE TABLE IF NOT EXISTS Sponsor (
    sponsorId INT AUTO_INCREMENT PRIMARY KEY,
    nameSponsor VARCHAR(255) NOT NULL,
    descriptionSponsor TEXT,
    descriptionTitle VARCHAR(255),
    exclusiveUrl VARCHAR(255),
    facebook TEXT,
    instagram TEXT,
    linkedin TEXT,
    tiktok TEXT,
    x TEXT,
    kawai TEXT,
    whatsapp TEXT,
    site_web TEXT,
    urlSponsor TEXT,
    highSponsorLogo TEXT,
    lowSponsorLogo TEXT
);
CREATE TABLE IF NOT EXISTS Location (
    locationId INT AUTO_INCREMENT PRIMARY KEY,
    bairro VARCHAR(255),
    cep VARCHAR(20),
    cidade VARCHAR(255),
    condominio VARCHAR(255),
    endereco TEXT,
    estado VARCHAR(255),
    geoPoint VARCHAR(50),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    placeId VARCHAR(255),
    tipoLocal VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS User (
    userId VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nomeExibicao VARCHAR(255),
    dataNascimento BIGINT,
    indicadoPor VARCHAR(50),
    localId INT,
    sponsorId INT,
    FOREIGN KEY (sponsorId) REFERENCES Sponsor(sponsorId) ON DELETE SET NULL,
    FOREIGN KEY (localId) REFERENCES Location(locationId) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS UserLocation (
    userId VARCHAR(50),
    locationId INT,
    PRIMARY KEY (userId, locationId),
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE,
    FOREIGN KEY (locationId) REFERENCES Location(locationId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS CreatedStore (
    storeId VARCHAR(50) PRIMARY KEY,
    storeOwnerId VARCHAR(50) NOT NULL,
    isActive BOOLEAN NOT NULL,
    storeCategory VARCHAR(100),
    FOREIGN KEY (storeOwnerId) REFERENCES User(userId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS UserAppUsage (
    userId VARCHAR(50),
    appUsageTime INT NOT NULL,
    appUsageDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, appUsageDate),
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Transaction (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    storeId VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE,
    FOREIGN KEY (storeId) REFERENCES CreatedStore(storeId) ON DELETE CASCADE
);