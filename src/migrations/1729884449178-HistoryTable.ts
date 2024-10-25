import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class HistoryTable1729884449178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create history table
    await queryRunner.createTable(
      new Table({
        name: 'history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'entityId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'entityType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'previousState',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'newState',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop history table
    await queryRunner.dropTable('history');
  }
}
