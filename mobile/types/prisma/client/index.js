
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  findSync
} = require('@prisma/client/runtime/library')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.11.0
 * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
 */
Prisma.prismaVersion = {
  client: "4.11.0",
  engine: "8fde8fef4033376662cad983758335009d522acb"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "node_modules/.prisma/client",
    ".prisma/client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.EventsScalarFieldEnum = makeEnum({
  id: 'id',
  userid: 'userid',
  description: 'description',
  time: 'time'
});

exports.Prisma.InventoryItemDataScalarFieldEnum = makeEnum({
  id: 'id',
  active: 'active',
  description: 'description',
  imageURL: 'imageURL',
  cost: 'cost',
  name: 'name'
});

exports.Prisma.InventoryItemScalarFieldEnum = makeEnum({
  id: 'id',
  dataId: 'dataId',
  warehouseId: 'warehouseId',
  userId: 'userId'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TaskScalarFieldEnum = makeEnum({
  id: 'id',
  label: 'label',
  done: 'done'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserRoleScalarFieldEnum = makeEnum({
  id: 'id',
  value: 'value'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  username: 'username',
  password: 'password',
  email: 'email',
  imageURL: 'imageURL',
  active: 'active'
});

exports.Prisma.UserTokenScalarFieldEnum = makeEnum({
  id: 'id',
  token: 'token',
  userId: 'userId',
  expires: 'expires'
});

exports.Prisma.WarehouseScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  address: 'address',
  latitude: 'latitude',
  longitude: 'longitude'
});


exports.Prisma.ModelName = makeEnum({
  Events: 'Events',
  User: 'User',
  UserToken: 'UserToken',
  UserRole: 'UserRole',
  Task: 'Task',
  InventoryItem: 'InventoryItem',
  InventoryItemData: 'InventoryItemData',
  Warehouse: 'Warehouse'
});

const dmmfString = "{\"datamodel\":{\"enums\":[],\"models\":[{\"name\":\"Events\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"User\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageURL\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserRole\",\"relationName\":\"UserToUserRole\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"items\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InventoryItem\",\"relationName\":\"InventoryItemToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UserToken\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UserRole\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserRole\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Task\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"done\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"InventoryItem\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dataId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InventoryItemData\",\"relationName\":\"InventoryItemToInventoryItemData\",\"relationFromFields\":[\"dataId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"warehouseId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"warehouse\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Warehouse\",\"relationName\":\"InventoryItemToWarehouse\",\"relationFromFields\":[\"warehouseId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"User\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"InventoryItemToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"InventoryItemData\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageURL\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"item\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InventoryItem\",\"relationName\":\"InventoryItemToInventoryItemData\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Warehouse\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"items\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InventoryItem\",\"relationName\":\"InventoryItemToWarehouse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"Events\",\"plural\":\"events\",\"findUnique\":\"findUniqueEvents\",\"findUniqueOrThrow\":\"findUniqueEventsOrThrow\",\"findFirst\":\"findFirstEvents\",\"findFirstOrThrow\":\"findFirstEventsOrThrow\",\"findMany\":\"findManyEvents\",\"create\":\"createOneEvents\",\"createMany\":\"createManyEvents\",\"delete\":\"deleteOneEvents\",\"update\":\"updateOneEvents\",\"deleteMany\":\"deleteManyEvents\",\"updateMany\":\"updateManyEvents\",\"upsert\":\"upsertOneEvents\",\"aggregate\":\"aggregateEvents\",\"groupBy\":\"groupByEvents\"},{\"model\":\"User\",\"plural\":\"users\",\"findUnique\":\"findUniqueUser\",\"findUniqueOrThrow\":\"findUniqueUserOrThrow\",\"findFirst\":\"findFirstUser\",\"findFirstOrThrow\":\"findFirstUserOrThrow\",\"findMany\":\"findManyUser\",\"create\":\"createOneUser\",\"createMany\":\"createManyUser\",\"delete\":\"deleteOneUser\",\"update\":\"updateOneUser\",\"deleteMany\":\"deleteManyUser\",\"updateMany\":\"updateManyUser\",\"upsert\":\"upsertOneUser\",\"aggregate\":\"aggregateUser\",\"groupBy\":\"groupByUser\"},{\"model\":\"UserToken\",\"plural\":\"userTokens\",\"findUnique\":\"findUniqueUserToken\",\"findUniqueOrThrow\":\"findUniqueUserTokenOrThrow\",\"findFirst\":\"findFirstUserToken\",\"findFirstOrThrow\":\"findFirstUserTokenOrThrow\",\"findMany\":\"findManyUserToken\",\"create\":\"createOneUserToken\",\"createMany\":\"createManyUserToken\",\"delete\":\"deleteOneUserToken\",\"update\":\"updateOneUserToken\",\"deleteMany\":\"deleteManyUserToken\",\"updateMany\":\"updateManyUserToken\",\"upsert\":\"upsertOneUserToken\",\"aggregate\":\"aggregateUserToken\",\"groupBy\":\"groupByUserToken\"},{\"model\":\"UserRole\",\"plural\":\"userRoles\",\"findUnique\":\"findUniqueUserRole\",\"findUniqueOrThrow\":\"findUniqueUserRoleOrThrow\",\"findFirst\":\"findFirstUserRole\",\"findFirstOrThrow\":\"findFirstUserRoleOrThrow\",\"findMany\":\"findManyUserRole\",\"create\":\"createOneUserRole\",\"createMany\":\"createManyUserRole\",\"delete\":\"deleteOneUserRole\",\"update\":\"updateOneUserRole\",\"deleteMany\":\"deleteManyUserRole\",\"updateMany\":\"updateManyUserRole\",\"upsert\":\"upsertOneUserRole\",\"aggregate\":\"aggregateUserRole\",\"groupBy\":\"groupByUserRole\"},{\"model\":\"Task\",\"plural\":\"tasks\",\"findUnique\":\"findUniqueTask\",\"findUniqueOrThrow\":\"findUniqueTaskOrThrow\",\"findFirst\":\"findFirstTask\",\"findFirstOrThrow\":\"findFirstTaskOrThrow\",\"findMany\":\"findManyTask\",\"create\":\"createOneTask\",\"createMany\":\"createManyTask\",\"delete\":\"deleteOneTask\",\"update\":\"updateOneTask\",\"deleteMany\":\"deleteManyTask\",\"updateMany\":\"updateManyTask\",\"upsert\":\"upsertOneTask\",\"aggregate\":\"aggregateTask\",\"groupBy\":\"groupByTask\"},{\"model\":\"InventoryItem\",\"plural\":\"inventoryItems\",\"findUnique\":\"findUniqueInventoryItem\",\"findUniqueOrThrow\":\"findUniqueInventoryItemOrThrow\",\"findFirst\":\"findFirstInventoryItem\",\"findFirstOrThrow\":\"findFirstInventoryItemOrThrow\",\"findMany\":\"findManyInventoryItem\",\"create\":\"createOneInventoryItem\",\"createMany\":\"createManyInventoryItem\",\"delete\":\"deleteOneInventoryItem\",\"update\":\"updateOneInventoryItem\",\"deleteMany\":\"deleteManyInventoryItem\",\"updateMany\":\"updateManyInventoryItem\",\"upsert\":\"upsertOneInventoryItem\",\"aggregate\":\"aggregateInventoryItem\",\"groupBy\":\"groupByInventoryItem\"},{\"model\":\"InventoryItemData\",\"plural\":\"inventoryItemData\",\"findUnique\":\"findUniqueInventoryItemData\",\"findUniqueOrThrow\":\"findUniqueInventoryItemDataOrThrow\",\"findFirst\":\"findFirstInventoryItemData\",\"findFirstOrThrow\":\"findFirstInventoryItemDataOrThrow\",\"findMany\":\"findManyInventoryItemData\",\"create\":\"createOneInventoryItemData\",\"createMany\":\"createManyInventoryItemData\",\"delete\":\"deleteOneInventoryItemData\",\"update\":\"updateOneInventoryItemData\",\"deleteMany\":\"deleteManyInventoryItemData\",\"updateMany\":\"updateManyInventoryItemData\",\"upsert\":\"upsertOneInventoryItemData\",\"aggregate\":\"aggregateInventoryItemData\",\"groupBy\":\"groupByInventoryItemData\"},{\"model\":\"Warehouse\",\"plural\":\"warehouses\",\"findUnique\":\"findUniqueWarehouse\",\"findUniqueOrThrow\":\"findUniqueWarehouseOrThrow\",\"findFirst\":\"findFirstWarehouse\",\"findFirstOrThrow\":\"findFirstWarehouseOrThrow\",\"findMany\":\"findManyWarehouse\",\"create\":\"createOneWarehouse\",\"createMany\":\"createManyWarehouse\",\"delete\":\"deleteOneWarehouse\",\"update\":\"updateOneWarehouse\",\"deleteMany\":\"deleteManyWarehouse\",\"updateMany\":\"updateManyWarehouse\",\"upsert\":\"upsertOneWarehouse\",\"aggregate\":\"aggregateWarehouse\",\"groupBy\":\"groupByWarehouse\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/robertsale/Code/Personal/Stocker/Stocker-Server/server/node_modules/@prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": []
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../prisma/.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "4.11.0",
  "engineVersion": "8fde8fef4033376662cad983758335009d522acb",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "dataProxy": false
}
config.dirname = dirname
config.document = dmmf




const { warnEnvConflicts } = require('@prisma/client/runtime/library')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})


const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "node_modules/.prisma/client/schema.prisma")
