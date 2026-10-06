#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/97568c50a9ba3d38289c3c4b3ca8f4dd79eecc35f3b5f6a40e9d8a8626e807bd/contract';
import startContract from '../../snapshots/97568c50a9ba3d38289c3c4b3ca8f4dd79eecc35f3b5f6a40e9d8a8626e807bd/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/bef2ea2b78c859c68406c858963ec97cdc1e12252258aae53fbee38abfa7615b/contract';
import endContract from '../../snapshots/bef2ea2b78c859c68406c858963ec97cdc1e12252258aae53fbee38abfa7615b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('customerEmail', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Order-customerEmail', {
        check: () => placeholder('backfill-Order-customerEmail:check'),
        run: () => placeholder('backfill-Order-customerEmail:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Order', column: 'customerEmail' }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('customerName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Order-customerName', {
        check: () => placeholder('backfill-Order-customerName:check'),
        run: () => placeholder('backfill-Order-customerName:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Order', column: 'customerName' }),
      this.addColumn({
        schema: 'public',
        table: 'Order',
        column: col('totalPrice', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Order-totalPrice', {
        check: () => placeholder('backfill-Order-totalPrice:check'),
        run: () => placeholder('backfill-Order-totalPrice:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Order', column: 'totalPrice' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
