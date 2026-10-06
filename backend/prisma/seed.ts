import { randomUUID } from 'node:crypto';
import { db } from '../src/prisma/db';

const series = [
  {
    name: 'One Piece',
    volumes: 100,
    price: 7.2,
    description: 'Le Roi des pirates !',
  },
  {
    name: 'Naruto',
    volumes: 72,
    price: 7.3,
    description: 'Le prochain Hokage !',
  },
  {
    name: 'Haikyu!! - edition smash',
    volumes: 19,
    price: 12.5,
    description: 'Le petit géant !',
  },
];

async function seed() {
  const promises = series.flatMap((serie) =>
    Array.from({ length: serie.volumes }, (_, volume) => {
      return db.orm.public.Product.create({
        id: randomUUID(),
        name: `${serie.name} Tome ${volume + 1}`,
        price: serie.price,
        stock: 5000,
        description: serie.description,
      });
    }),
  );

  await Promise.all(promises);
}

// Lancement de la seed
seed();
