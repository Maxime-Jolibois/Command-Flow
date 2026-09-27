## Prisma files

- contract.prisma → décrit le modèle de données
- contract.json → contrat Prisma généré
- contract.d.ts → types TypeScript générés
- db.ts → crée la connexion Prisma que l'application va utiliser

## Useful commands

- npx prisma COMMAND --help: Behind each command, type --help to get documentation
- npx prisma contract emit: emit contract.d.ts & contract.json from you contract.prisma file
- npx prisma db init: init your database => Need to be empty
