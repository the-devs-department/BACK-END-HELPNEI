import { DataSource } from 'typeorm';
import {Metadata} from '../entities/Metadata';

export async function isDatabaseInitialized(dataSource: DataSource): Promise<boolean> {
  const hasMetadataTable = await dataSource.query(`
    SELECT COUNT(*) as count 
    FROM information_schema.tables 
    WHERE table_schema = ? AND table_name = 'metadata'
  `, [dataSource.options.database]);

  const tableExists = hasMetadataTable[0]?.count > 0;

  if (!tableExists) {
    return false;
  }

  const metadata = await dataSource.getRepository(Metadata).findOneBy({ key: 'initialized' });
  return !!metadata;
}

export async function markDatabaseAsInitialized(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Metadata);
  const exists = await repo.findOneBy({ key: 'initialized' });

  if (!exists) {
    const newMetadata = repo.create({ key: 'initialized', value: 'true' });
    await repo.save(newMetadata);
  }
}