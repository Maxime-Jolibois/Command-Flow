# NestJS utils

## Create Module

nest (generate|g) module MODULE_NAME
nest (generate|g) controller MODULE_NAME
nest (generate|g) (service|s) MODULE_NAME

## Create whole resource
nest g resource RESOURCE_NAME

src/
└── RESSOURCE_NAME/
    │
    ├── dto/                         ← Données entrantes
    │   ├── create-RESSOURCE_NAME.dto.ts
    │   └── update-RESSOURCE_NAME.dto.ts
    │
    ├── entities/                    ← Structure de la ressource
    │   └── RESSOURCE_NAME.entity.ts
    │
    ├── RESSOURCE_NAME.controller.ts ← Routes HTTP
    ├── RESSOURCE_NAME.service.ts    ← Logique métier
    ├── RESSOURCE_NAME.module.ts     ← Assemblage du module
    ├── RESSOURCE_NAME.controller.spec.ts ← Tests controller
    └── RESSOURCE_NAME.service.spec.ts    ← Tests service
