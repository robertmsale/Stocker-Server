
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Events
 * 
 */
export type Events = {
  id: number
  userid: number
  description: string
  time: Date
}

/**
 * Model User
 * 
 */
export type User = {
  id: number
  username: string
  password: string
  email: string
  imageURL: string
  active: boolean
}

/**
 * Model UserToken
 * 
 */
export type UserToken = {
  id: number
  token: string
  userId: number
  expires: Date
}

/**
 * Model UserRole
 * 
 */
export type UserRole = {
  id: number
  value: string
}

/**
 * Model Task
 * 
 */
export type Task = {
  id: number
  label: string
  done: boolean
}

/**
 * Model InventoryItem
 * 
 */
export type InventoryItem = {
  id: number
  dataId: number
  warehouseId: number | null
  userId: number | null
}

/**
 * Model InventoryItemData
 * 
 */
export type InventoryItemData = {
  id: number
  active: boolean
  description: string
  imageURL: string
  cost: number
  name: string
}

/**
 * Model Warehouse
 * 
 */
export type Warehouse = {
  id: number
  name: string
  address: string
  latitude: string | null
  longitude: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Events
 * const events = await prisma.events.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Events
   * const events = await prisma.events.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.events`: Exposes CRUD operations for the **Events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.events.findMany()
    * ```
    */
  get events(): Prisma.EventsDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.userToken`: Exposes CRUD operations for the **UserToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTokens
    * const userTokens = await prisma.userToken.findMany()
    * ```
    */
  get userToken(): Prisma.UserTokenDelegate<GlobalReject>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<GlobalReject>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<GlobalReject>;

  /**
   * `prisma.inventoryItem`: Exposes CRUD operations for the **InventoryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryItems
    * const inventoryItems = await prisma.inventoryItem.findMany()
    * ```
    */
  get inventoryItem(): Prisma.InventoryItemDelegate<GlobalReject>;

  /**
   * `prisma.inventoryItemData`: Exposes CRUD operations for the **InventoryItemData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryItemData
    * const inventoryItemData = await prisma.inventoryItemData.findMany()
    * ```
    */
  get inventoryItemData(): Prisma.InventoryItemDataDelegate<GlobalReject>;

  /**
   * `prisma.warehouse`: Exposes CRUD operations for the **Warehouse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warehouses
    * const warehouses = await prisma.warehouse.findMany()
    * ```
    */
  get warehouse(): Prisma.WarehouseDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.11.0
   * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Events: 'Events',
    User: 'User',
    UserToken: 'UserToken',
    UserRole: 'UserRole',
    Task: 'Task',
    InventoryItem: 'InventoryItem',
    InventoryItemData: 'InventoryItemData',
    Warehouse: 'Warehouse'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    roles: number
    items: number
  }

  export type UserCountOutputTypeSelect = {
    roles?: boolean
    items?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type UserRoleCountOutputType
   */


  export type UserRoleCountOutputType = {
    users: number
  }

  export type UserRoleCountOutputTypeSelect = {
    users?: boolean
  }

  export type UserRoleCountOutputTypeGetPayload<S extends boolean | null | undefined | UserRoleCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserRoleCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserRoleCountOutputTypeArgs)
    ? UserRoleCountOutputType 
    : S extends { select: any } & (UserRoleCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserRoleCountOutputType ? UserRoleCountOutputType[P] : never
  } 
      : UserRoleCountOutputType




  // Custom InputTypes

  /**
   * UserRoleCountOutputType without action
   */
  export type UserRoleCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserRoleCountOutputType
     */
    select?: UserRoleCountOutputTypeSelect | null
  }



  /**
   * Count Type InventoryItemDataCountOutputType
   */


  export type InventoryItemDataCountOutputType = {
    item: number
  }

  export type InventoryItemDataCountOutputTypeSelect = {
    item?: boolean
  }

  export type InventoryItemDataCountOutputTypeGetPayload<S extends boolean | null | undefined | InventoryItemDataCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InventoryItemDataCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (InventoryItemDataCountOutputTypeArgs)
    ? InventoryItemDataCountOutputType 
    : S extends { select: any } & (InventoryItemDataCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof InventoryItemDataCountOutputType ? InventoryItemDataCountOutputType[P] : never
  } 
      : InventoryItemDataCountOutputType




  // Custom InputTypes

  /**
   * InventoryItemDataCountOutputType without action
   */
  export type InventoryItemDataCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemDataCountOutputType
     */
    select?: InventoryItemDataCountOutputTypeSelect | null
  }



  /**
   * Count Type WarehouseCountOutputType
   */


  export type WarehouseCountOutputType = {
    items: number
  }

  export type WarehouseCountOutputTypeSelect = {
    items?: boolean
  }

  export type WarehouseCountOutputTypeGetPayload<S extends boolean | null | undefined | WarehouseCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WarehouseCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WarehouseCountOutputTypeArgs)
    ? WarehouseCountOutputType 
    : S extends { select: any } & (WarehouseCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof WarehouseCountOutputType ? WarehouseCountOutputType[P] : never
  } 
      : WarehouseCountOutputType




  // Custom InputTypes

  /**
   * WarehouseCountOutputType without action
   */
  export type WarehouseCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WarehouseCountOutputType
     */
    select?: WarehouseCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Events
   */


  export type AggregateEvents = {
    _count: EventsCountAggregateOutputType | null
    _avg: EventsAvgAggregateOutputType | null
    _sum: EventsSumAggregateOutputType | null
    _min: EventsMinAggregateOutputType | null
    _max: EventsMaxAggregateOutputType | null
  }

  export type EventsAvgAggregateOutputType = {
    id: number | null
    userid: number | null
  }

  export type EventsSumAggregateOutputType = {
    id: number | null
    userid: number | null
  }

  export type EventsMinAggregateOutputType = {
    id: number | null
    userid: number | null
    description: string | null
    time: Date | null
  }

  export type EventsMaxAggregateOutputType = {
    id: number | null
    userid: number | null
    description: string | null
    time: Date | null
  }

  export type EventsCountAggregateOutputType = {
    id: number
    userid: number
    description: number
    time: number
    _all: number
  }


  export type EventsAvgAggregateInputType = {
    id?: true
    userid?: true
  }

  export type EventsSumAggregateInputType = {
    id?: true
    userid?: true
  }

  export type EventsMinAggregateInputType = {
    id?: true
    userid?: true
    description?: true
    time?: true
  }

  export type EventsMaxAggregateInputType = {
    id?: true
    userid?: true
    description?: true
    time?: true
  }

  export type EventsCountAggregateInputType = {
    id?: true
    userid?: true
    description?: true
    time?: true
    _all?: true
  }

  export type EventsAggregateArgs = {
    /**
     * Filter which Events to aggregate.
     */
    where?: EventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: Enumerable<EventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventsMaxAggregateInputType
  }

  export type GetEventsAggregateType<T extends EventsAggregateArgs> = {
        [P in keyof T & keyof AggregateEvents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvents[P]>
      : GetScalarType<T[P], AggregateEvents[P]>
  }




  export type EventsGroupByArgs = {
    where?: EventsWhereInput
    orderBy?: Enumerable<EventsOrderByWithAggregationInput>
    by: EventsScalarFieldEnum[]
    having?: EventsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventsCountAggregateInputType | true
    _avg?: EventsAvgAggregateInputType
    _sum?: EventsSumAggregateInputType
    _min?: EventsMinAggregateInputType
    _max?: EventsMaxAggregateInputType
  }


  export type EventsGroupByOutputType = {
    id: number
    userid: number
    description: string
    time: Date
    _count: EventsCountAggregateOutputType | null
    _avg: EventsAvgAggregateOutputType | null
    _sum: EventsSumAggregateOutputType | null
    _min: EventsMinAggregateOutputType | null
    _max: EventsMaxAggregateOutputType | null
  }

  type GetEventsGroupByPayload<T extends EventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<EventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventsGroupByOutputType[P]>
            : GetScalarType<T[P], EventsGroupByOutputType[P]>
        }
      >
    >


  export type EventsSelect = {
    id?: boolean
    userid?: boolean
    description?: boolean
    time?: boolean
  }


  export type EventsGetPayload<S extends boolean | null | undefined | EventsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Events :
    S extends undefined ? never :
    S extends { include: any } & (EventsArgs | EventsFindManyArgs)
    ? Events 
    : S extends { select: any } & (EventsArgs | EventsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Events ? Events[P] : never
  } 
      : Events


  type EventsCountArgs = 
    Omit<EventsFindManyArgs, 'select' | 'include'> & {
      select?: EventsCountAggregateInputType | true
    }

  export interface EventsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Events that matches the filter.
     * @param {EventsFindUniqueArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EventsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Events'> extends True ? Prisma__EventsClient<EventsGetPayload<T>> : Prisma__EventsClient<EventsGetPayload<T> | null, null>

    /**
     * Find one Events that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EventsFindUniqueOrThrowArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EventsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EventsFindUniqueOrThrowArgs>
    ): Prisma__EventsClient<EventsGetPayload<T>>

    /**
     * Find the first Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsFindFirstArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EventsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Events'> extends True ? Prisma__EventsClient<EventsGetPayload<T>> : Prisma__EventsClient<EventsGetPayload<T> | null, null>

    /**
     * Find the first Events that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsFindFirstOrThrowArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EventsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EventsFindFirstOrThrowArgs>
    ): Prisma__EventsClient<EventsGetPayload<T>>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.events.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.events.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventsWithIdOnly = await prisma.events.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EventsFindManyArgs>(
      args?: SelectSubset<T, EventsFindManyArgs>
    ): Prisma.PrismaPromise<Array<EventsGetPayload<T>>>

    /**
     * Create a Events.
     * @param {EventsCreateArgs} args - Arguments to create a Events.
     * @example
     * // Create one Events
     * const Events = await prisma.events.create({
     *   data: {
     *     // ... data to create a Events
     *   }
     * })
     * 
    **/
    create<T extends EventsCreateArgs>(
      args: SelectSubset<T, EventsCreateArgs>
    ): Prisma__EventsClient<EventsGetPayload<T>>

    /**
     * Create many Events.
     *     @param {EventsCreateManyArgs} args - Arguments to create many Events.
     *     @example
     *     // Create many Events
     *     const events = await prisma.events.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EventsCreateManyArgs>(
      args?: SelectSubset<T, EventsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Events.
     * @param {EventsDeleteArgs} args - Arguments to delete one Events.
     * @example
     * // Delete one Events
     * const Events = await prisma.events.delete({
     *   where: {
     *     // ... filter to delete one Events
     *   }
     * })
     * 
    **/
    delete<T extends EventsDeleteArgs>(
      args: SelectSubset<T, EventsDeleteArgs>
    ): Prisma__EventsClient<EventsGetPayload<T>>

    /**
     * Update one Events.
     * @param {EventsUpdateArgs} args - Arguments to update one Events.
     * @example
     * // Update one Events
     * const events = await prisma.events.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventsUpdateArgs>(
      args: SelectSubset<T, EventsUpdateArgs>
    ): Prisma__EventsClient<EventsGetPayload<T>>

    /**
     * Delete zero or more Events.
     * @param {EventsDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.events.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventsDeleteManyArgs>(
      args?: SelectSubset<T, EventsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const events = await prisma.events.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventsUpdateManyArgs>(
      args: SelectSubset<T, EventsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Events.
     * @param {EventsUpsertArgs} args - Arguments to update or create a Events.
     * @example
     * // Update or create a Events
     * const events = await prisma.events.upsert({
     *   create: {
     *     // ... data to create a Events
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Events we want to update
     *   }
     * })
    **/
    upsert<T extends EventsUpsertArgs>(
      args: SelectSubset<T, EventsUpsertArgs>
    ): Prisma__EventsClient<EventsGetPayload<T>>

    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.events.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventsCountArgs>(
      args?: Subset<T, EventsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventsAggregateArgs>(args: Subset<T, EventsAggregateArgs>): Prisma.PrismaPromise<GetEventsAggregateType<T>>

    /**
     * Group by Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventsGroupByArgs['orderBy'] }
        : { orderBy?: EventsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Events.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EventsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Events base type for findUnique actions
   */
  export type EventsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * Filter, which Events to fetch.
     */
    where: EventsWhereUniqueInput
  }

  /**
   * Events findUnique
   */
  export interface EventsFindUniqueArgs extends EventsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Events findUniqueOrThrow
   */
  export type EventsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * Filter, which Events to fetch.
     */
    where: EventsWhereUniqueInput
  }


  /**
   * Events base type for findFirst actions
   */
  export type EventsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: Enumerable<EventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: Enumerable<EventsScalarFieldEnum>
  }

  /**
   * Events findFirst
   */
  export interface EventsFindFirstArgs extends EventsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Events findFirstOrThrow
   */
  export type EventsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: Enumerable<EventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: Enumerable<EventsScalarFieldEnum>
  }


  /**
   * Events findMany
   */
  export type EventsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: Enumerable<EventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: Enumerable<EventsScalarFieldEnum>
  }


  /**
   * Events create
   */
  export type EventsCreateArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * The data needed to create a Events.
     */
    data: XOR<EventsCreateInput, EventsUncheckedCreateInput>
  }


  /**
   * Events createMany
   */
  export type EventsCreateManyArgs = {
    /**
     * The data used to create many Events.
     */
    data: Enumerable<EventsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Events update
   */
  export type EventsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * The data needed to update a Events.
     */
    data: XOR<EventsUpdateInput, EventsUncheckedUpdateInput>
    /**
     * Choose, which Events to update.
     */
    where: EventsWhereUniqueInput
  }


  /**
   * Events updateMany
   */
  export type EventsUpdateManyArgs = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventsUpdateManyMutationInput, EventsUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventsWhereInput
  }


  /**
   * Events upsert
   */
  export type EventsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * The filter to search for the Events to update in case it exists.
     */
    where: EventsWhereUniqueInput
    /**
     * In case the Events found by the `where` argument doesn't exist, create a new Events with this data.
     */
    create: XOR<EventsCreateInput, EventsUncheckedCreateInput>
    /**
     * In case the Events was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventsUpdateInput, EventsUncheckedUpdateInput>
  }


  /**
   * Events delete
   */
  export type EventsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
    /**
     * Filter which Events to delete.
     */
    where: EventsWhereUniqueInput
  }


  /**
   * Events deleteMany
   */
  export type EventsDeleteManyArgs = {
    /**
     * Filter which Events to delete
     */
    where?: EventsWhereInput
  }


  /**
   * Events without action
   */
  export type EventsArgs = {
    /**
     * Select specific fields to fetch from the Events
     */
    select?: EventsSelect | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    email: string | null
    imageURL: string | null
    active: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    email: string | null
    imageURL: string | null
    active: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    email: number
    imageURL: number
    active: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    imageURL?: true
    active?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    imageURL?: true
    active?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    imageURL?: true
    active?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    imageURL?: boolean
    active?: boolean
    roles?: boolean | User$rolesArgs
    items?: boolean | User$itemsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    roles?: boolean | User$rolesArgs
    items?: boolean | User$itemsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'roles' ? Array < UserRoleGetPayload<S['include'][P]>>  :
        P extends 'items' ? Array < InventoryItemGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'roles' ? Array < UserRoleGetPayload<S['select'][P]>>  :
        P extends 'items' ? Array < InventoryItemGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    roles<T extends User$rolesArgs= {}>(args?: Subset<T, User$rolesArgs>): Prisma.PrismaPromise<Array<UserRoleGetPayload<T>>| Null>;

    items<T extends User$itemsArgs= {}>(args?: Subset<T, User$itemsArgs>): Prisma.PrismaPromise<Array<InventoryItemGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.roles
   */
  export type User$rolesArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    where?: UserRoleWhereInput
    orderBy?: Enumerable<UserRoleOrderByWithRelationInput>
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserRoleScalarFieldEnum>
  }


  /**
   * User.items
   */
  export type User$itemsArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    where?: InventoryItemWhereInput
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    cursor?: InventoryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<InventoryItemScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
  }



  /**
   * Model UserToken
   */


  export type AggregateUserToken = {
    _count: UserTokenCountAggregateOutputType | null
    _avg: UserTokenAvgAggregateOutputType | null
    _sum: UserTokenSumAggregateOutputType | null
    _min: UserTokenMinAggregateOutputType | null
    _max: UserTokenMaxAggregateOutputType | null
  }

  export type UserTokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserTokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserTokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    userId: number | null
    expires: Date | null
  }

  export type UserTokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    userId: number | null
    expires: Date | null
  }

  export type UserTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expires: number
    _all: number
  }


  export type UserTokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserTokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expires?: true
  }

  export type UserTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expires?: true
  }

  export type UserTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type UserTokenAggregateArgs = {
    /**
     * Filter which UserToken to aggregate.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTokens
    **/
    _count?: true | UserTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTokenMaxAggregateInputType
  }

  export type GetUserTokenAggregateType<T extends UserTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateUserToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserToken[P]>
      : GetScalarType<T[P], AggregateUserToken[P]>
  }




  export type UserTokenGroupByArgs = {
    where?: UserTokenWhereInput
    orderBy?: Enumerable<UserTokenOrderByWithAggregationInput>
    by: UserTokenScalarFieldEnum[]
    having?: UserTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTokenCountAggregateInputType | true
    _avg?: UserTokenAvgAggregateInputType
    _sum?: UserTokenSumAggregateInputType
    _min?: UserTokenMinAggregateInputType
    _max?: UserTokenMaxAggregateInputType
  }


  export type UserTokenGroupByOutputType = {
    id: number
    token: string
    userId: number
    expires: Date
    _count: UserTokenCountAggregateOutputType | null
    _avg: UserTokenAvgAggregateOutputType | null
    _sum: UserTokenSumAggregateOutputType | null
    _min: UserTokenMinAggregateOutputType | null
    _max: UserTokenMaxAggregateOutputType | null
  }

  type GetUserTokenGroupByPayload<T extends UserTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTokenGroupByOutputType[P]>
            : GetScalarType<T[P], UserTokenGroupByOutputType[P]>
        }
      >
    >


  export type UserTokenSelect = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expires?: boolean
  }


  export type UserTokenGetPayload<S extends boolean | null | undefined | UserTokenArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserToken :
    S extends undefined ? never :
    S extends { include: any } & (UserTokenArgs | UserTokenFindManyArgs)
    ? UserToken 
    : S extends { select: any } & (UserTokenArgs | UserTokenFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserToken ? UserToken[P] : never
  } 
      : UserToken


  type UserTokenCountArgs = 
    Omit<UserTokenFindManyArgs, 'select' | 'include'> & {
      select?: UserTokenCountAggregateInputType | true
    }

  export interface UserTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one UserToken that matches the filter.
     * @param {UserTokenFindUniqueArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserToken'> extends True ? Prisma__UserTokenClient<UserTokenGetPayload<T>> : Prisma__UserTokenClient<UserTokenGetPayload<T> | null, null>

    /**
     * Find one UserToken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserTokenFindUniqueOrThrowArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserTokenFindUniqueOrThrowArgs>
    ): Prisma__UserTokenClient<UserTokenGetPayload<T>>

    /**
     * Find the first UserToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindFirstArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserToken'> extends True ? Prisma__UserTokenClient<UserTokenGetPayload<T>> : Prisma__UserTokenClient<UserTokenGetPayload<T> | null, null>

    /**
     * Find the first UserToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindFirstOrThrowArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserTokenFindFirstOrThrowArgs>
    ): Prisma__UserTokenClient<UserTokenGetPayload<T>>

    /**
     * Find zero or more UserTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTokens
     * const userTokens = await prisma.userToken.findMany()
     * 
     * // Get first 10 UserTokens
     * const userTokens = await prisma.userToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userTokenWithIdOnly = await prisma.userToken.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserTokenFindManyArgs>(
      args?: SelectSubset<T, UserTokenFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserTokenGetPayload<T>>>

    /**
     * Create a UserToken.
     * @param {UserTokenCreateArgs} args - Arguments to create a UserToken.
     * @example
     * // Create one UserToken
     * const UserToken = await prisma.userToken.create({
     *   data: {
     *     // ... data to create a UserToken
     *   }
     * })
     * 
    **/
    create<T extends UserTokenCreateArgs>(
      args: SelectSubset<T, UserTokenCreateArgs>
    ): Prisma__UserTokenClient<UserTokenGetPayload<T>>

    /**
     * Create many UserTokens.
     *     @param {UserTokenCreateManyArgs} args - Arguments to create many UserTokens.
     *     @example
     *     // Create many UserTokens
     *     const userToken = await prisma.userToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserTokenCreateManyArgs>(
      args?: SelectSubset<T, UserTokenCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserToken.
     * @param {UserTokenDeleteArgs} args - Arguments to delete one UserToken.
     * @example
     * // Delete one UserToken
     * const UserToken = await prisma.userToken.delete({
     *   where: {
     *     // ... filter to delete one UserToken
     *   }
     * })
     * 
    **/
    delete<T extends UserTokenDeleteArgs>(
      args: SelectSubset<T, UserTokenDeleteArgs>
    ): Prisma__UserTokenClient<UserTokenGetPayload<T>>

    /**
     * Update one UserToken.
     * @param {UserTokenUpdateArgs} args - Arguments to update one UserToken.
     * @example
     * // Update one UserToken
     * const userToken = await prisma.userToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserTokenUpdateArgs>(
      args: SelectSubset<T, UserTokenUpdateArgs>
    ): Prisma__UserTokenClient<UserTokenGetPayload<T>>

    /**
     * Delete zero or more UserTokens.
     * @param {UserTokenDeleteManyArgs} args - Arguments to filter UserTokens to delete.
     * @example
     * // Delete a few UserTokens
     * const { count } = await prisma.userToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserTokenDeleteManyArgs>(
      args?: SelectSubset<T, UserTokenDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTokens
     * const userToken = await prisma.userToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserTokenUpdateManyArgs>(
      args: SelectSubset<T, UserTokenUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserToken.
     * @param {UserTokenUpsertArgs} args - Arguments to update or create a UserToken.
     * @example
     * // Update or create a UserToken
     * const userToken = await prisma.userToken.upsert({
     *   create: {
     *     // ... data to create a UserToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserToken we want to update
     *   }
     * })
    **/
    upsert<T extends UserTokenUpsertArgs>(
      args: SelectSubset<T, UserTokenUpsertArgs>
    ): Prisma__UserTokenClient<UserTokenGetPayload<T>>

    /**
     * Count the number of UserTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenCountArgs} args - Arguments to filter UserTokens to count.
     * @example
     * // Count the number of UserTokens
     * const count = await prisma.userToken.count({
     *   where: {
     *     // ... the filter for the UserTokens we want to count
     *   }
     * })
    **/
    count<T extends UserTokenCountArgs>(
      args?: Subset<T, UserTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTokenAggregateArgs>(args: Subset<T, UserTokenAggregateArgs>): Prisma.PrismaPromise<GetUserTokenAggregateType<T>>

    /**
     * Group by UserToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTokenGroupByArgs['orderBy'] }
        : { orderBy?: UserTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserTokenClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserToken base type for findUnique actions
   */
  export type UserTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * Filter, which UserToken to fetch.
     */
    where: UserTokenWhereUniqueInput
  }

  /**
   * UserToken findUnique
   */
  export interface UserTokenFindUniqueArgs extends UserTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserToken findUniqueOrThrow
   */
  export type UserTokenFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * Filter, which UserToken to fetch.
     */
    where: UserTokenWhereUniqueInput
  }


  /**
   * UserToken base type for findFirst actions
   */
  export type UserTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * Filter, which UserToken to fetch.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTokens.
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTokens.
     */
    distinct?: Enumerable<UserTokenScalarFieldEnum>
  }

  /**
   * UserToken findFirst
   */
  export interface UserTokenFindFirstArgs extends UserTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserToken findFirstOrThrow
   */
  export type UserTokenFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * Filter, which UserToken to fetch.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTokens.
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTokens.
     */
    distinct?: Enumerable<UserTokenScalarFieldEnum>
  }


  /**
   * UserToken findMany
   */
  export type UserTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * Filter, which UserTokens to fetch.
     */
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     */
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTokens.
     */
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     */
    skip?: number
    distinct?: Enumerable<UserTokenScalarFieldEnum>
  }


  /**
   * UserToken create
   */
  export type UserTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * The data needed to create a UserToken.
     */
    data: XOR<UserTokenCreateInput, UserTokenUncheckedCreateInput>
  }


  /**
   * UserToken createMany
   */
  export type UserTokenCreateManyArgs = {
    /**
     * The data used to create many UserTokens.
     */
    data: Enumerable<UserTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserToken update
   */
  export type UserTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * The data needed to update a UserToken.
     */
    data: XOR<UserTokenUpdateInput, UserTokenUncheckedUpdateInput>
    /**
     * Choose, which UserToken to update.
     */
    where: UserTokenWhereUniqueInput
  }


  /**
   * UserToken updateMany
   */
  export type UserTokenUpdateManyArgs = {
    /**
     * The data used to update UserTokens.
     */
    data: XOR<UserTokenUpdateManyMutationInput, UserTokenUncheckedUpdateManyInput>
    /**
     * Filter which UserTokens to update
     */
    where?: UserTokenWhereInput
  }


  /**
   * UserToken upsert
   */
  export type UserTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * The filter to search for the UserToken to update in case it exists.
     */
    where: UserTokenWhereUniqueInput
    /**
     * In case the UserToken found by the `where` argument doesn't exist, create a new UserToken with this data.
     */
    create: XOR<UserTokenCreateInput, UserTokenUncheckedCreateInput>
    /**
     * In case the UserToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserTokenUpdateInput, UserTokenUncheckedUpdateInput>
  }


  /**
   * UserToken delete
   */
  export type UserTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
    /**
     * Filter which UserToken to delete.
     */
    where: UserTokenWhereUniqueInput
  }


  /**
   * UserToken deleteMany
   */
  export type UserTokenDeleteManyArgs = {
    /**
     * Filter which UserTokens to delete
     */
    where?: UserTokenWhereInput
  }


  /**
   * UserToken without action
   */
  export type UserTokenArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     */
    select?: UserTokenSelect | null
  }



  /**
   * Model UserRole
   */


  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _avg: UserRoleAvgAggregateOutputType | null
    _sum: UserRoleSumAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleAvgAggregateOutputType = {
    id: number | null
  }

  export type UserRoleSumAggregateOutputType = {
    id: number | null
  }

  export type UserRoleMinAggregateOutputType = {
    id: number | null
    value: string | null
  }

  export type UserRoleMaxAggregateOutputType = {
    id: number | null
    value: string | null
  }

  export type UserRoleCountAggregateOutputType = {
    id: number
    value: number
    _all: number
  }


  export type UserRoleAvgAggregateInputType = {
    id?: true
  }

  export type UserRoleSumAggregateInputType = {
    id?: true
  }

  export type UserRoleMinAggregateInputType = {
    id?: true
    value?: true
  }

  export type UserRoleMaxAggregateInputType = {
    id?: true
    value?: true
  }

  export type UserRoleCountAggregateInputType = {
    id?: true
    value?: true
    _all?: true
  }

  export type UserRoleAggregateArgs = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: Enumerable<UserRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs = {
    where?: UserRoleWhereInput
    orderBy?: Enumerable<UserRoleOrderByWithAggregationInput>
    by: UserRoleScalarFieldEnum[]
    having?: UserRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleCountAggregateInputType | true
    _avg?: UserRoleAvgAggregateInputType
    _sum?: UserRoleSumAggregateInputType
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }


  export type UserRoleGroupByOutputType = {
    id: number
    value: string
    _count: UserRoleCountAggregateOutputType | null
    _avg: UserRoleAvgAggregateOutputType | null
    _sum: UserRoleSumAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect = {
    id?: boolean
    value?: boolean
    users?: boolean | UserRole$usersArgs
    _count?: boolean | UserRoleCountOutputTypeArgs
  }


  export type UserRoleInclude = {
    users?: boolean | UserRole$usersArgs
    _count?: boolean | UserRoleCountOutputTypeArgs
  }

  export type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserRole :
    S extends undefined ? never :
    S extends { include: any } & (UserRoleArgs | UserRoleFindManyArgs)
    ? UserRole  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'users' ? Array < UserGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserRoleCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserRoleArgs | UserRoleFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'users' ? Array < UserGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserRoleCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof UserRole ? UserRole[P] : never
  } 
      : UserRole


  type UserRoleCountArgs = 
    Omit<UserRoleFindManyArgs, 'select' | 'include'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserRoleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserRoleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserRole'> extends True ? Prisma__UserRoleClient<UserRoleGetPayload<T>> : Prisma__UserRoleClient<UserRoleGetPayload<T> | null, null>

    /**
     * Find one UserRole that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserRoleFindUniqueOrThrowArgs>
    ): Prisma__UserRoleClient<UserRoleGetPayload<T>>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserRoleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserRoleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserRole'> extends True ? Prisma__UserRoleClient<UserRoleGetPayload<T>> : Prisma__UserRoleClient<UserRoleGetPayload<T> | null, null>

    /**
     * Find the first UserRole that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs>
    ): Prisma__UserRoleClient<UserRoleGetPayload<T>>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserRoleFindManyArgs>(
      args?: SelectSubset<T, UserRoleFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserRoleGetPayload<T>>>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
    **/
    create<T extends UserRoleCreateArgs>(
      args: SelectSubset<T, UserRoleCreateArgs>
    ): Prisma__UserRoleClient<UserRoleGetPayload<T>>

    /**
     * Create many UserRoles.
     *     @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     *     @example
     *     // Create many UserRoles
     *     const userRole = await prisma.userRole.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserRoleCreateManyArgs>(
      args?: SelectSubset<T, UserRoleCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
    **/
    delete<T extends UserRoleDeleteArgs>(
      args: SelectSubset<T, UserRoleDeleteArgs>
    ): Prisma__UserRoleClient<UserRoleGetPayload<T>>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserRoleUpdateArgs>(
      args: SelectSubset<T, UserRoleUpdateArgs>
    ): Prisma__UserRoleClient<UserRoleGetPayload<T>>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserRoleDeleteManyArgs>(
      args?: SelectSubset<T, UserRoleDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserRoleUpdateManyArgs>(
      args: SelectSubset<T, UserRoleUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
    **/
    upsert<T extends UserRoleUpsertArgs>(
      args: SelectSubset<T, UserRoleUpsertArgs>
    ): Prisma__UserRoleClient<UserRoleGetPayload<T>>

    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserRoleClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    users<T extends UserRole$usersArgs= {}>(args?: Subset<T, UserRole$usersArgs>): Prisma.PrismaPromise<Array<UserGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserRole base type for findUnique actions
   */
  export type UserRoleFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findUnique
   */
  export interface UserRoleFindUniqueArgs extends UserRoleFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }


  /**
   * UserRole base type for findFirst actions
   */
  export type UserRoleFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: Enumerable<UserRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: Enumerable<UserRoleScalarFieldEnum>
  }

  /**
   * UserRole findFirst
   */
  export interface UserRoleFindFirstArgs extends UserRoleFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: Enumerable<UserRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: Enumerable<UserRoleScalarFieldEnum>
  }


  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: Enumerable<UserRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: Enumerable<UserRoleScalarFieldEnum>
  }


  /**
   * UserRole create
   */
  export type UserRoleCreateArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
  }


  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs = {
    /**
     * The data used to create many UserRoles.
     */
    data: Enumerable<UserRoleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
  }


  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
  }


  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
  }


  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
  }


  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput
  }


  /**
   * UserRole.users
   */
  export type UserRole$usersArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * UserRole without action
   */
  export type UserRoleArgs = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoleInclude | null
  }



  /**
   * Model Task
   */


  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    label: string | null
    done: boolean | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    label: string | null
    done: boolean | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    label: number
    done: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    label?: true
    done?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    label?: true
    done?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    label?: true
    done?: true
    _all?: true
  }

  export type TaskAggregateArgs = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: Enumerable<TaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs = {
    where?: TaskWhereInput
    orderBy?: Enumerable<TaskOrderByWithAggregationInput>
    by: TaskScalarFieldEnum[]
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }


  export type TaskGroupByOutputType = {
    id: number
    label: string
    done: boolean
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect = {
    id?: boolean
    label?: boolean
    done?: boolean
  }


  export type TaskGetPayload<S extends boolean | null | undefined | TaskArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Task :
    S extends undefined ? never :
    S extends { include: any } & (TaskArgs | TaskFindManyArgs)
    ? Task 
    : S extends { select: any } & (TaskArgs | TaskFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Task ? Task[P] : never
  } 
      : Task


  type TaskCountArgs = 
    Omit<TaskFindManyArgs, 'select' | 'include'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TaskFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TaskFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Task'> extends True ? Prisma__TaskClient<TaskGetPayload<T>> : Prisma__TaskClient<TaskGetPayload<T> | null, null>

    /**
     * Find one Task that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TaskFindUniqueOrThrowArgs>
    ): Prisma__TaskClient<TaskGetPayload<T>>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TaskFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TaskFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Task'> extends True ? Prisma__TaskClient<TaskGetPayload<T>> : Prisma__TaskClient<TaskGetPayload<T> | null, null>

    /**
     * Find the first Task that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TaskFindFirstOrThrowArgs>
    ): Prisma__TaskClient<TaskGetPayload<T>>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TaskFindManyArgs>(
      args?: SelectSubset<T, TaskFindManyArgs>
    ): Prisma.PrismaPromise<Array<TaskGetPayload<T>>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
    **/
    create<T extends TaskCreateArgs>(
      args: SelectSubset<T, TaskCreateArgs>
    ): Prisma__TaskClient<TaskGetPayload<T>>

    /**
     * Create many Tasks.
     *     @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     *     @example
     *     // Create many Tasks
     *     const task = await prisma.task.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TaskCreateManyArgs>(
      args?: SelectSubset<T, TaskCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
    **/
    delete<T extends TaskDeleteArgs>(
      args: SelectSubset<T, TaskDeleteArgs>
    ): Prisma__TaskClient<TaskGetPayload<T>>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TaskUpdateArgs>(
      args: SelectSubset<T, TaskUpdateArgs>
    ): Prisma__TaskClient<TaskGetPayload<T>>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TaskDeleteManyArgs>(
      args?: SelectSubset<T, TaskDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TaskUpdateManyArgs>(
      args: SelectSubset<T, TaskUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
    **/
    upsert<T extends TaskUpsertArgs>(
      args: SelectSubset<T, TaskUpsertArgs>
    ): Prisma__TaskClient<TaskGetPayload<T>>

    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TaskClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Task base type for findUnique actions
   */
  export type TaskFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUnique
   */
  export interface TaskFindUniqueArgs extends TaskFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }


  /**
   * Task base type for findFirst actions
   */
  export type TaskFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: Enumerable<TaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: Enumerable<TaskScalarFieldEnum>
  }

  /**
   * Task findFirst
   */
  export interface TaskFindFirstArgs extends TaskFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: Enumerable<TaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: Enumerable<TaskScalarFieldEnum>
  }


  /**
   * Task findMany
   */
  export type TaskFindManyArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: Enumerable<TaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: Enumerable<TaskScalarFieldEnum>
  }


  /**
   * Task create
   */
  export type TaskCreateArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }


  /**
   * Task createMany
   */
  export type TaskCreateManyArgs = {
    /**
     * The data used to create many Tasks.
     */
    data: Enumerable<TaskCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Task update
   */
  export type TaskUpdateArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }


  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
  }


  /**
   * Task upsert
   */
  export type TaskUpsertArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }


  /**
   * Task delete
   */
  export type TaskDeleteArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }


  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
  }


  /**
   * Task without action
   */
  export type TaskArgs = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect | null
  }



  /**
   * Model InventoryItem
   */


  export type AggregateInventoryItem = {
    _count: InventoryItemCountAggregateOutputType | null
    _avg: InventoryItemAvgAggregateOutputType | null
    _sum: InventoryItemSumAggregateOutputType | null
    _min: InventoryItemMinAggregateOutputType | null
    _max: InventoryItemMaxAggregateOutputType | null
  }

  export type InventoryItemAvgAggregateOutputType = {
    id: number | null
    dataId: number | null
    warehouseId: number | null
    userId: number | null
  }

  export type InventoryItemSumAggregateOutputType = {
    id: number | null
    dataId: number | null
    warehouseId: number | null
    userId: number | null
  }

  export type InventoryItemMinAggregateOutputType = {
    id: number | null
    dataId: number | null
    warehouseId: number | null
    userId: number | null
  }

  export type InventoryItemMaxAggregateOutputType = {
    id: number | null
    dataId: number | null
    warehouseId: number | null
    userId: number | null
  }

  export type InventoryItemCountAggregateOutputType = {
    id: number
    dataId: number
    warehouseId: number
    userId: number
    _all: number
  }


  export type InventoryItemAvgAggregateInputType = {
    id?: true
    dataId?: true
    warehouseId?: true
    userId?: true
  }

  export type InventoryItemSumAggregateInputType = {
    id?: true
    dataId?: true
    warehouseId?: true
    userId?: true
  }

  export type InventoryItemMinAggregateInputType = {
    id?: true
    dataId?: true
    warehouseId?: true
    userId?: true
  }

  export type InventoryItemMaxAggregateInputType = {
    id?: true
    dataId?: true
    warehouseId?: true
    userId?: true
  }

  export type InventoryItemCountAggregateInputType = {
    id?: true
    dataId?: true
    warehouseId?: true
    userId?: true
    _all?: true
  }

  export type InventoryItemAggregateArgs = {
    /**
     * Filter which InventoryItem to aggregate.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryItems
    **/
    _count?: true | InventoryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventoryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryItemMaxAggregateInputType
  }

  export type GetInventoryItemAggregateType<T extends InventoryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryItem[P]>
      : GetScalarType<T[P], AggregateInventoryItem[P]>
  }




  export type InventoryItemGroupByArgs = {
    where?: InventoryItemWhereInput
    orderBy?: Enumerable<InventoryItemOrderByWithAggregationInput>
    by: InventoryItemScalarFieldEnum[]
    having?: InventoryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryItemCountAggregateInputType | true
    _avg?: InventoryItemAvgAggregateInputType
    _sum?: InventoryItemSumAggregateInputType
    _min?: InventoryItemMinAggregateInputType
    _max?: InventoryItemMaxAggregateInputType
  }


  export type InventoryItemGroupByOutputType = {
    id: number
    dataId: number
    warehouseId: number | null
    userId: number | null
    _count: InventoryItemCountAggregateOutputType | null
    _avg: InventoryItemAvgAggregateOutputType | null
    _sum: InventoryItemSumAggregateOutputType | null
    _min: InventoryItemMinAggregateOutputType | null
    _max: InventoryItemMaxAggregateOutputType | null
  }

  type GetInventoryItemGroupByPayload<T extends InventoryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<InventoryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryItemGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryItemGroupByOutputType[P]>
        }
      >
    >


  export type InventoryItemSelect = {
    id?: boolean
    dataId?: boolean
    warehouseId?: boolean
    userId?: boolean
    data?: boolean | InventoryItemDataArgs
    warehouse?: boolean | WarehouseArgs
    User?: boolean | UserArgs
  }


  export type InventoryItemInclude = {
    data?: boolean | InventoryItemDataArgs
    warehouse?: boolean | WarehouseArgs
    User?: boolean | UserArgs
  }

  export type InventoryItemGetPayload<S extends boolean | null | undefined | InventoryItemArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InventoryItem :
    S extends undefined ? never :
    S extends { include: any } & (InventoryItemArgs | InventoryItemFindManyArgs)
    ? InventoryItem  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'data' ? InventoryItemDataGetPayload<S['include'][P]> :
        P extends 'warehouse' ? WarehouseGetPayload<S['include'][P]> | null :
        P extends 'User' ? UserGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (InventoryItemArgs | InventoryItemFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'data' ? InventoryItemDataGetPayload<S['select'][P]> :
        P extends 'warehouse' ? WarehouseGetPayload<S['select'][P]> | null :
        P extends 'User' ? UserGetPayload<S['select'][P]> | null :  P extends keyof InventoryItem ? InventoryItem[P] : never
  } 
      : InventoryItem


  type InventoryItemCountArgs = 
    Omit<InventoryItemFindManyArgs, 'select' | 'include'> & {
      select?: InventoryItemCountAggregateInputType | true
    }

  export interface InventoryItemDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one InventoryItem that matches the filter.
     * @param {InventoryItemFindUniqueArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InventoryItemFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InventoryItemFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InventoryItem'> extends True ? Prisma__InventoryItemClient<InventoryItemGetPayload<T>> : Prisma__InventoryItemClient<InventoryItemGetPayload<T> | null, null>

    /**
     * Find one InventoryItem that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InventoryItemFindUniqueOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InventoryItemFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InventoryItemFindUniqueOrThrowArgs>
    ): Prisma__InventoryItemClient<InventoryItemGetPayload<T>>

    /**
     * Find the first InventoryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InventoryItemFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InventoryItemFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InventoryItem'> extends True ? Prisma__InventoryItemClient<InventoryItemGetPayload<T>> : Prisma__InventoryItemClient<InventoryItemGetPayload<T> | null, null>

    /**
     * Find the first InventoryItem that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InventoryItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InventoryItemFindFirstOrThrowArgs>
    ): Prisma__InventoryItemClient<InventoryItemGetPayload<T>>

    /**
     * Find zero or more InventoryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany()
     * 
     * // Get first 10 InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryItemWithIdOnly = await prisma.inventoryItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InventoryItemFindManyArgs>(
      args?: SelectSubset<T, InventoryItemFindManyArgs>
    ): Prisma.PrismaPromise<Array<InventoryItemGetPayload<T>>>

    /**
     * Create a InventoryItem.
     * @param {InventoryItemCreateArgs} args - Arguments to create a InventoryItem.
     * @example
     * // Create one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.create({
     *   data: {
     *     // ... data to create a InventoryItem
     *   }
     * })
     * 
    **/
    create<T extends InventoryItemCreateArgs>(
      args: SelectSubset<T, InventoryItemCreateArgs>
    ): Prisma__InventoryItemClient<InventoryItemGetPayload<T>>

    /**
     * Create many InventoryItems.
     *     @param {InventoryItemCreateManyArgs} args - Arguments to create many InventoryItems.
     *     @example
     *     // Create many InventoryItems
     *     const inventoryItem = await prisma.inventoryItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InventoryItemCreateManyArgs>(
      args?: SelectSubset<T, InventoryItemCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InventoryItem.
     * @param {InventoryItemDeleteArgs} args - Arguments to delete one InventoryItem.
     * @example
     * // Delete one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.delete({
     *   where: {
     *     // ... filter to delete one InventoryItem
     *   }
     * })
     * 
    **/
    delete<T extends InventoryItemDeleteArgs>(
      args: SelectSubset<T, InventoryItemDeleteArgs>
    ): Prisma__InventoryItemClient<InventoryItemGetPayload<T>>

    /**
     * Update one InventoryItem.
     * @param {InventoryItemUpdateArgs} args - Arguments to update one InventoryItem.
     * @example
     * // Update one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InventoryItemUpdateArgs>(
      args: SelectSubset<T, InventoryItemUpdateArgs>
    ): Prisma__InventoryItemClient<InventoryItemGetPayload<T>>

    /**
     * Delete zero or more InventoryItems.
     * @param {InventoryItemDeleteManyArgs} args - Arguments to filter InventoryItems to delete.
     * @example
     * // Delete a few InventoryItems
     * const { count } = await prisma.inventoryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InventoryItemDeleteManyArgs>(
      args?: SelectSubset<T, InventoryItemDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InventoryItemUpdateManyArgs>(
      args: SelectSubset<T, InventoryItemUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InventoryItem.
     * @param {InventoryItemUpsertArgs} args - Arguments to update or create a InventoryItem.
     * @example
     * // Update or create a InventoryItem
     * const inventoryItem = await prisma.inventoryItem.upsert({
     *   create: {
     *     // ... data to create a InventoryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryItem we want to update
     *   }
     * })
    **/
    upsert<T extends InventoryItemUpsertArgs>(
      args: SelectSubset<T, InventoryItemUpsertArgs>
    ): Prisma__InventoryItemClient<InventoryItemGetPayload<T>>

    /**
     * Count the number of InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemCountArgs} args - Arguments to filter InventoryItems to count.
     * @example
     * // Count the number of InventoryItems
     * const count = await prisma.inventoryItem.count({
     *   where: {
     *     // ... the filter for the InventoryItems we want to count
     *   }
     * })
    **/
    count<T extends InventoryItemCountArgs>(
      args?: Subset<T, InventoryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventoryItemAggregateArgs>(args: Subset<T, InventoryItemAggregateArgs>): Prisma.PrismaPromise<GetInventoryItemAggregateType<T>>

    /**
     * Group by InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventoryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryItemGroupByArgs['orderBy'] }
        : { orderBy?: InventoryItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventoryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InventoryItemClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    data<T extends InventoryItemDataArgs= {}>(args?: Subset<T, InventoryItemDataArgs>): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T> | Null>;

    warehouse<T extends WarehouseArgs= {}>(args?: Subset<T, WarehouseArgs>): Prisma__WarehouseClient<WarehouseGetPayload<T> | Null>;

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InventoryItem base type for findUnique actions
   */
  export type InventoryItemFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem findUnique
   */
  export interface InventoryItemFindUniqueArgs extends InventoryItemFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InventoryItem findUniqueOrThrow
   */
  export type InventoryItemFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: InventoryItemWhereUniqueInput
  }


  /**
   * InventoryItem base type for findFirst actions
   */
  export type InventoryItemFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: Enumerable<InventoryItemScalarFieldEnum>
  }

  /**
   * InventoryItem findFirst
   */
  export interface InventoryItemFindFirstArgs extends InventoryItemFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InventoryItem findFirstOrThrow
   */
  export type InventoryItemFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: Enumerable<InventoryItemScalarFieldEnum>
  }


  /**
   * InventoryItem findMany
   */
  export type InventoryItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * Filter, which InventoryItems to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    distinct?: Enumerable<InventoryItemScalarFieldEnum>
  }


  /**
   * InventoryItem create
   */
  export type InventoryItemCreateArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * The data needed to create a InventoryItem.
     */
    data: XOR<InventoryItemCreateInput, InventoryItemUncheckedCreateInput>
  }


  /**
   * InventoryItem createMany
   */
  export type InventoryItemCreateManyArgs = {
    /**
     * The data used to create many InventoryItems.
     */
    data: Enumerable<InventoryItemCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * InventoryItem update
   */
  export type InventoryItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * The data needed to update a InventoryItem.
     */
    data: XOR<InventoryItemUpdateInput, InventoryItemUncheckedUpdateInput>
    /**
     * Choose, which InventoryItem to update.
     */
    where: InventoryItemWhereUniqueInput
  }


  /**
   * InventoryItem updateMany
   */
  export type InventoryItemUpdateManyArgs = {
    /**
     * The data used to update InventoryItems.
     */
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyInput>
    /**
     * Filter which InventoryItems to update
     */
    where?: InventoryItemWhereInput
  }


  /**
   * InventoryItem upsert
   */
  export type InventoryItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * The filter to search for the InventoryItem to update in case it exists.
     */
    where: InventoryItemWhereUniqueInput
    /**
     * In case the InventoryItem found by the `where` argument doesn't exist, create a new InventoryItem with this data.
     */
    create: XOR<InventoryItemCreateInput, InventoryItemUncheckedCreateInput>
    /**
     * In case the InventoryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryItemUpdateInput, InventoryItemUncheckedUpdateInput>
  }


  /**
   * InventoryItem delete
   */
  export type InventoryItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    /**
     * Filter which InventoryItem to delete.
     */
    where: InventoryItemWhereUniqueInput
  }


  /**
   * InventoryItem deleteMany
   */
  export type InventoryItemDeleteManyArgs = {
    /**
     * Filter which InventoryItems to delete
     */
    where?: InventoryItemWhereInput
  }


  /**
   * InventoryItem without action
   */
  export type InventoryItemArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
  }



  /**
   * Model InventoryItemData
   */


  export type AggregateInventoryItemData = {
    _count: InventoryItemDataCountAggregateOutputType | null
    _avg: InventoryItemDataAvgAggregateOutputType | null
    _sum: InventoryItemDataSumAggregateOutputType | null
    _min: InventoryItemDataMinAggregateOutputType | null
    _max: InventoryItemDataMaxAggregateOutputType | null
  }

  export type InventoryItemDataAvgAggregateOutputType = {
    id: number | null
    cost: number | null
  }

  export type InventoryItemDataSumAggregateOutputType = {
    id: number | null
    cost: number | null
  }

  export type InventoryItemDataMinAggregateOutputType = {
    id: number | null
    active: boolean | null
    description: string | null
    imageURL: string | null
    cost: number | null
    name: string | null
  }

  export type InventoryItemDataMaxAggregateOutputType = {
    id: number | null
    active: boolean | null
    description: string | null
    imageURL: string | null
    cost: number | null
    name: string | null
  }

  export type InventoryItemDataCountAggregateOutputType = {
    id: number
    active: number
    description: number
    imageURL: number
    cost: number
    name: number
    _all: number
  }


  export type InventoryItemDataAvgAggregateInputType = {
    id?: true
    cost?: true
  }

  export type InventoryItemDataSumAggregateInputType = {
    id?: true
    cost?: true
  }

  export type InventoryItemDataMinAggregateInputType = {
    id?: true
    active?: true
    description?: true
    imageURL?: true
    cost?: true
    name?: true
  }

  export type InventoryItemDataMaxAggregateInputType = {
    id?: true
    active?: true
    description?: true
    imageURL?: true
    cost?: true
    name?: true
  }

  export type InventoryItemDataCountAggregateInputType = {
    id?: true
    active?: true
    description?: true
    imageURL?: true
    cost?: true
    name?: true
    _all?: true
  }

  export type InventoryItemDataAggregateArgs = {
    /**
     * Filter which InventoryItemData to aggregate.
     */
    where?: InventoryItemDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItemData to fetch.
     */
    orderBy?: Enumerable<InventoryItemDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryItemDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItemData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItemData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryItemData
    **/
    _count?: true | InventoryItemDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryItemDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventoryItemDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryItemDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryItemDataMaxAggregateInputType
  }

  export type GetInventoryItemDataAggregateType<T extends InventoryItemDataAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryItemData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryItemData[P]>
      : GetScalarType<T[P], AggregateInventoryItemData[P]>
  }




  export type InventoryItemDataGroupByArgs = {
    where?: InventoryItemDataWhereInput
    orderBy?: Enumerable<InventoryItemDataOrderByWithAggregationInput>
    by: InventoryItemDataScalarFieldEnum[]
    having?: InventoryItemDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryItemDataCountAggregateInputType | true
    _avg?: InventoryItemDataAvgAggregateInputType
    _sum?: InventoryItemDataSumAggregateInputType
    _min?: InventoryItemDataMinAggregateInputType
    _max?: InventoryItemDataMaxAggregateInputType
  }


  export type InventoryItemDataGroupByOutputType = {
    id: number
    active: boolean
    description: string
    imageURL: string
    cost: number
    name: string
    _count: InventoryItemDataCountAggregateOutputType | null
    _avg: InventoryItemDataAvgAggregateOutputType | null
    _sum: InventoryItemDataSumAggregateOutputType | null
    _min: InventoryItemDataMinAggregateOutputType | null
    _max: InventoryItemDataMaxAggregateOutputType | null
  }

  type GetInventoryItemDataGroupByPayload<T extends InventoryItemDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<InventoryItemDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryItemDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryItemDataGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryItemDataGroupByOutputType[P]>
        }
      >
    >


  export type InventoryItemDataSelect = {
    id?: boolean
    active?: boolean
    description?: boolean
    imageURL?: boolean
    cost?: boolean
    name?: boolean
    item?: boolean | InventoryItemData$itemArgs
    _count?: boolean | InventoryItemDataCountOutputTypeArgs
  }


  export type InventoryItemDataInclude = {
    item?: boolean | InventoryItemData$itemArgs
    _count?: boolean | InventoryItemDataCountOutputTypeArgs
  }

  export type InventoryItemDataGetPayload<S extends boolean | null | undefined | InventoryItemDataArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InventoryItemData :
    S extends undefined ? never :
    S extends { include: any } & (InventoryItemDataArgs | InventoryItemDataFindManyArgs)
    ? InventoryItemData  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'item' ? Array < InventoryItemGetPayload<S['include'][P]>>  :
        P extends '_count' ? InventoryItemDataCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (InventoryItemDataArgs | InventoryItemDataFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'item' ? Array < InventoryItemGetPayload<S['select'][P]>>  :
        P extends '_count' ? InventoryItemDataCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof InventoryItemData ? InventoryItemData[P] : never
  } 
      : InventoryItemData


  type InventoryItemDataCountArgs = 
    Omit<InventoryItemDataFindManyArgs, 'select' | 'include'> & {
      select?: InventoryItemDataCountAggregateInputType | true
    }

  export interface InventoryItemDataDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one InventoryItemData that matches the filter.
     * @param {InventoryItemDataFindUniqueArgs} args - Arguments to find a InventoryItemData
     * @example
     * // Get one InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InventoryItemDataFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InventoryItemDataFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InventoryItemData'> extends True ? Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>> : Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T> | null, null>

    /**
     * Find one InventoryItemData that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InventoryItemDataFindUniqueOrThrowArgs} args - Arguments to find a InventoryItemData
     * @example
     * // Get one InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InventoryItemDataFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InventoryItemDataFindUniqueOrThrowArgs>
    ): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>>

    /**
     * Find the first InventoryItemData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataFindFirstArgs} args - Arguments to find a InventoryItemData
     * @example
     * // Get one InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InventoryItemDataFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InventoryItemDataFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InventoryItemData'> extends True ? Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>> : Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T> | null, null>

    /**
     * Find the first InventoryItemData that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataFindFirstOrThrowArgs} args - Arguments to find a InventoryItemData
     * @example
     * // Get one InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InventoryItemDataFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InventoryItemDataFindFirstOrThrowArgs>
    ): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>>

    /**
     * Find zero or more InventoryItemData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.findMany()
     * 
     * // Get first 10 InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryItemDataWithIdOnly = await prisma.inventoryItemData.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InventoryItemDataFindManyArgs>(
      args?: SelectSubset<T, InventoryItemDataFindManyArgs>
    ): Prisma.PrismaPromise<Array<InventoryItemDataGetPayload<T>>>

    /**
     * Create a InventoryItemData.
     * @param {InventoryItemDataCreateArgs} args - Arguments to create a InventoryItemData.
     * @example
     * // Create one InventoryItemData
     * const InventoryItemData = await prisma.inventoryItemData.create({
     *   data: {
     *     // ... data to create a InventoryItemData
     *   }
     * })
     * 
    **/
    create<T extends InventoryItemDataCreateArgs>(
      args: SelectSubset<T, InventoryItemDataCreateArgs>
    ): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>>

    /**
     * Create many InventoryItemData.
     *     @param {InventoryItemDataCreateManyArgs} args - Arguments to create many InventoryItemData.
     *     @example
     *     // Create many InventoryItemData
     *     const inventoryItemData = await prisma.inventoryItemData.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InventoryItemDataCreateManyArgs>(
      args?: SelectSubset<T, InventoryItemDataCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InventoryItemData.
     * @param {InventoryItemDataDeleteArgs} args - Arguments to delete one InventoryItemData.
     * @example
     * // Delete one InventoryItemData
     * const InventoryItemData = await prisma.inventoryItemData.delete({
     *   where: {
     *     // ... filter to delete one InventoryItemData
     *   }
     * })
     * 
    **/
    delete<T extends InventoryItemDataDeleteArgs>(
      args: SelectSubset<T, InventoryItemDataDeleteArgs>
    ): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>>

    /**
     * Update one InventoryItemData.
     * @param {InventoryItemDataUpdateArgs} args - Arguments to update one InventoryItemData.
     * @example
     * // Update one InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InventoryItemDataUpdateArgs>(
      args: SelectSubset<T, InventoryItemDataUpdateArgs>
    ): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>>

    /**
     * Delete zero or more InventoryItemData.
     * @param {InventoryItemDataDeleteManyArgs} args - Arguments to filter InventoryItemData to delete.
     * @example
     * // Delete a few InventoryItemData
     * const { count } = await prisma.inventoryItemData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InventoryItemDataDeleteManyArgs>(
      args?: SelectSubset<T, InventoryItemDataDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryItemData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InventoryItemDataUpdateManyArgs>(
      args: SelectSubset<T, InventoryItemDataUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InventoryItemData.
     * @param {InventoryItemDataUpsertArgs} args - Arguments to update or create a InventoryItemData.
     * @example
     * // Update or create a InventoryItemData
     * const inventoryItemData = await prisma.inventoryItemData.upsert({
     *   create: {
     *     // ... data to create a InventoryItemData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryItemData we want to update
     *   }
     * })
    **/
    upsert<T extends InventoryItemDataUpsertArgs>(
      args: SelectSubset<T, InventoryItemDataUpsertArgs>
    ): Prisma__InventoryItemDataClient<InventoryItemDataGetPayload<T>>

    /**
     * Count the number of InventoryItemData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataCountArgs} args - Arguments to filter InventoryItemData to count.
     * @example
     * // Count the number of InventoryItemData
     * const count = await prisma.inventoryItemData.count({
     *   where: {
     *     // ... the filter for the InventoryItemData we want to count
     *   }
     * })
    **/
    count<T extends InventoryItemDataCountArgs>(
      args?: Subset<T, InventoryItemDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryItemDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryItemData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventoryItemDataAggregateArgs>(args: Subset<T, InventoryItemDataAggregateArgs>): Prisma.PrismaPromise<GetInventoryItemDataAggregateType<T>>

    /**
     * Group by InventoryItemData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventoryItemDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryItemDataGroupByArgs['orderBy'] }
        : { orderBy?: InventoryItemDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventoryItemDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryItemDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryItemData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InventoryItemDataClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    item<T extends InventoryItemData$itemArgs= {}>(args?: Subset<T, InventoryItemData$itemArgs>): Prisma.PrismaPromise<Array<InventoryItemGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InventoryItemData base type for findUnique actions
   */
  export type InventoryItemDataFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * Filter, which InventoryItemData to fetch.
     */
    where: InventoryItemDataWhereUniqueInput
  }

  /**
   * InventoryItemData findUnique
   */
  export interface InventoryItemDataFindUniqueArgs extends InventoryItemDataFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InventoryItemData findUniqueOrThrow
   */
  export type InventoryItemDataFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * Filter, which InventoryItemData to fetch.
     */
    where: InventoryItemDataWhereUniqueInput
  }


  /**
   * InventoryItemData base type for findFirst actions
   */
  export type InventoryItemDataFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * Filter, which InventoryItemData to fetch.
     */
    where?: InventoryItemDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItemData to fetch.
     */
    orderBy?: Enumerable<InventoryItemDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItemData.
     */
    cursor?: InventoryItemDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItemData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItemData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItemData.
     */
    distinct?: Enumerable<InventoryItemDataScalarFieldEnum>
  }

  /**
   * InventoryItemData findFirst
   */
  export interface InventoryItemDataFindFirstArgs extends InventoryItemDataFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InventoryItemData findFirstOrThrow
   */
  export type InventoryItemDataFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * Filter, which InventoryItemData to fetch.
     */
    where?: InventoryItemDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItemData to fetch.
     */
    orderBy?: Enumerable<InventoryItemDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItemData.
     */
    cursor?: InventoryItemDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItemData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItemData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItemData.
     */
    distinct?: Enumerable<InventoryItemDataScalarFieldEnum>
  }


  /**
   * InventoryItemData findMany
   */
  export type InventoryItemDataFindManyArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * Filter, which InventoryItemData to fetch.
     */
    where?: InventoryItemDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItemData to fetch.
     */
    orderBy?: Enumerable<InventoryItemDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryItemData.
     */
    cursor?: InventoryItemDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItemData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItemData.
     */
    skip?: number
    distinct?: Enumerable<InventoryItemDataScalarFieldEnum>
  }


  /**
   * InventoryItemData create
   */
  export type InventoryItemDataCreateArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * The data needed to create a InventoryItemData.
     */
    data: XOR<InventoryItemDataCreateInput, InventoryItemDataUncheckedCreateInput>
  }


  /**
   * InventoryItemData createMany
   */
  export type InventoryItemDataCreateManyArgs = {
    /**
     * The data used to create many InventoryItemData.
     */
    data: Enumerable<InventoryItemDataCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * InventoryItemData update
   */
  export type InventoryItemDataUpdateArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * The data needed to update a InventoryItemData.
     */
    data: XOR<InventoryItemDataUpdateInput, InventoryItemDataUncheckedUpdateInput>
    /**
     * Choose, which InventoryItemData to update.
     */
    where: InventoryItemDataWhereUniqueInput
  }


  /**
   * InventoryItemData updateMany
   */
  export type InventoryItemDataUpdateManyArgs = {
    /**
     * The data used to update InventoryItemData.
     */
    data: XOR<InventoryItemDataUpdateManyMutationInput, InventoryItemDataUncheckedUpdateManyInput>
    /**
     * Filter which InventoryItemData to update
     */
    where?: InventoryItemDataWhereInput
  }


  /**
   * InventoryItemData upsert
   */
  export type InventoryItemDataUpsertArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * The filter to search for the InventoryItemData to update in case it exists.
     */
    where: InventoryItemDataWhereUniqueInput
    /**
     * In case the InventoryItemData found by the `where` argument doesn't exist, create a new InventoryItemData with this data.
     */
    create: XOR<InventoryItemDataCreateInput, InventoryItemDataUncheckedCreateInput>
    /**
     * In case the InventoryItemData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryItemDataUpdateInput, InventoryItemDataUncheckedUpdateInput>
  }


  /**
   * InventoryItemData delete
   */
  export type InventoryItemDataDeleteArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
    /**
     * Filter which InventoryItemData to delete.
     */
    where: InventoryItemDataWhereUniqueInput
  }


  /**
   * InventoryItemData deleteMany
   */
  export type InventoryItemDataDeleteManyArgs = {
    /**
     * Filter which InventoryItemData to delete
     */
    where?: InventoryItemDataWhereInput
  }


  /**
   * InventoryItemData.item
   */
  export type InventoryItemData$itemArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    where?: InventoryItemWhereInput
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    cursor?: InventoryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<InventoryItemScalarFieldEnum>
  }


  /**
   * InventoryItemData without action
   */
  export type InventoryItemDataArgs = {
    /**
     * Select specific fields to fetch from the InventoryItemData
     */
    select?: InventoryItemDataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemDataInclude | null
  }



  /**
   * Model Warehouse
   */


  export type AggregateWarehouse = {
    _count: WarehouseCountAggregateOutputType | null
    _avg: WarehouseAvgAggregateOutputType | null
    _sum: WarehouseSumAggregateOutputType | null
    _min: WarehouseMinAggregateOutputType | null
    _max: WarehouseMaxAggregateOutputType | null
  }

  export type WarehouseAvgAggregateOutputType = {
    id: number | null
  }

  export type WarehouseSumAggregateOutputType = {
    id: number | null
  }

  export type WarehouseMinAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    latitude: string | null
    longitude: string | null
  }

  export type WarehouseMaxAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    latitude: string | null
    longitude: string | null
  }

  export type WarehouseCountAggregateOutputType = {
    id: number
    name: number
    address: number
    latitude: number
    longitude: number
    _all: number
  }


  export type WarehouseAvgAggregateInputType = {
    id?: true
  }

  export type WarehouseSumAggregateInputType = {
    id?: true
  }

  export type WarehouseMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    latitude?: true
    longitude?: true
  }

  export type WarehouseMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    latitude?: true
    longitude?: true
  }

  export type WarehouseCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    latitude?: true
    longitude?: true
    _all?: true
  }

  export type WarehouseAggregateArgs = {
    /**
     * Filter which Warehouse to aggregate.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: Enumerable<WarehouseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Warehouses
    **/
    _count?: true | WarehouseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WarehouseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WarehouseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarehouseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarehouseMaxAggregateInputType
  }

  export type GetWarehouseAggregateType<T extends WarehouseAggregateArgs> = {
        [P in keyof T & keyof AggregateWarehouse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarehouse[P]>
      : GetScalarType<T[P], AggregateWarehouse[P]>
  }




  export type WarehouseGroupByArgs = {
    where?: WarehouseWhereInput
    orderBy?: Enumerable<WarehouseOrderByWithAggregationInput>
    by: WarehouseScalarFieldEnum[]
    having?: WarehouseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarehouseCountAggregateInputType | true
    _avg?: WarehouseAvgAggregateInputType
    _sum?: WarehouseSumAggregateInputType
    _min?: WarehouseMinAggregateInputType
    _max?: WarehouseMaxAggregateInputType
  }


  export type WarehouseGroupByOutputType = {
    id: number
    name: string
    address: string
    latitude: string | null
    longitude: string | null
    _count: WarehouseCountAggregateOutputType | null
    _avg: WarehouseAvgAggregateOutputType | null
    _sum: WarehouseSumAggregateOutputType | null
    _min: WarehouseMinAggregateOutputType | null
    _max: WarehouseMaxAggregateOutputType | null
  }

  type GetWarehouseGroupByPayload<T extends WarehouseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WarehouseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarehouseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarehouseGroupByOutputType[P]>
            : GetScalarType<T[P], WarehouseGroupByOutputType[P]>
        }
      >
    >


  export type WarehouseSelect = {
    id?: boolean
    name?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    items?: boolean | Warehouse$itemsArgs
    _count?: boolean | WarehouseCountOutputTypeArgs
  }


  export type WarehouseInclude = {
    items?: boolean | Warehouse$itemsArgs
    _count?: boolean | WarehouseCountOutputTypeArgs
  }

  export type WarehouseGetPayload<S extends boolean | null | undefined | WarehouseArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Warehouse :
    S extends undefined ? never :
    S extends { include: any } & (WarehouseArgs | WarehouseFindManyArgs)
    ? Warehouse  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'items' ? Array < InventoryItemGetPayload<S['include'][P]>>  :
        P extends '_count' ? WarehouseCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WarehouseArgs | WarehouseFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'items' ? Array < InventoryItemGetPayload<S['select'][P]>>  :
        P extends '_count' ? WarehouseCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Warehouse ? Warehouse[P] : never
  } 
      : Warehouse


  type WarehouseCountArgs = 
    Omit<WarehouseFindManyArgs, 'select' | 'include'> & {
      select?: WarehouseCountAggregateInputType | true
    }

  export interface WarehouseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Warehouse that matches the filter.
     * @param {WarehouseFindUniqueArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WarehouseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WarehouseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Warehouse'> extends True ? Prisma__WarehouseClient<WarehouseGetPayload<T>> : Prisma__WarehouseClient<WarehouseGetPayload<T> | null, null>

    /**
     * Find one Warehouse that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WarehouseFindUniqueOrThrowArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WarehouseFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WarehouseFindUniqueOrThrowArgs>
    ): Prisma__WarehouseClient<WarehouseGetPayload<T>>

    /**
     * Find the first Warehouse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindFirstArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WarehouseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WarehouseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Warehouse'> extends True ? Prisma__WarehouseClient<WarehouseGetPayload<T>> : Prisma__WarehouseClient<WarehouseGetPayload<T> | null, null>

    /**
     * Find the first Warehouse that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindFirstOrThrowArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WarehouseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WarehouseFindFirstOrThrowArgs>
    ): Prisma__WarehouseClient<WarehouseGetPayload<T>>

    /**
     * Find zero or more Warehouses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warehouses
     * const warehouses = await prisma.warehouse.findMany()
     * 
     * // Get first 10 Warehouses
     * const warehouses = await prisma.warehouse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warehouseWithIdOnly = await prisma.warehouse.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WarehouseFindManyArgs>(
      args?: SelectSubset<T, WarehouseFindManyArgs>
    ): Prisma.PrismaPromise<Array<WarehouseGetPayload<T>>>

    /**
     * Create a Warehouse.
     * @param {WarehouseCreateArgs} args - Arguments to create a Warehouse.
     * @example
     * // Create one Warehouse
     * const Warehouse = await prisma.warehouse.create({
     *   data: {
     *     // ... data to create a Warehouse
     *   }
     * })
     * 
    **/
    create<T extends WarehouseCreateArgs>(
      args: SelectSubset<T, WarehouseCreateArgs>
    ): Prisma__WarehouseClient<WarehouseGetPayload<T>>

    /**
     * Create many Warehouses.
     *     @param {WarehouseCreateManyArgs} args - Arguments to create many Warehouses.
     *     @example
     *     // Create many Warehouses
     *     const warehouse = await prisma.warehouse.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WarehouseCreateManyArgs>(
      args?: SelectSubset<T, WarehouseCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Warehouse.
     * @param {WarehouseDeleteArgs} args - Arguments to delete one Warehouse.
     * @example
     * // Delete one Warehouse
     * const Warehouse = await prisma.warehouse.delete({
     *   where: {
     *     // ... filter to delete one Warehouse
     *   }
     * })
     * 
    **/
    delete<T extends WarehouseDeleteArgs>(
      args: SelectSubset<T, WarehouseDeleteArgs>
    ): Prisma__WarehouseClient<WarehouseGetPayload<T>>

    /**
     * Update one Warehouse.
     * @param {WarehouseUpdateArgs} args - Arguments to update one Warehouse.
     * @example
     * // Update one Warehouse
     * const warehouse = await prisma.warehouse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WarehouseUpdateArgs>(
      args: SelectSubset<T, WarehouseUpdateArgs>
    ): Prisma__WarehouseClient<WarehouseGetPayload<T>>

    /**
     * Delete zero or more Warehouses.
     * @param {WarehouseDeleteManyArgs} args - Arguments to filter Warehouses to delete.
     * @example
     * // Delete a few Warehouses
     * const { count } = await prisma.warehouse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WarehouseDeleteManyArgs>(
      args?: SelectSubset<T, WarehouseDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warehouses
     * const warehouse = await prisma.warehouse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WarehouseUpdateManyArgs>(
      args: SelectSubset<T, WarehouseUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Warehouse.
     * @param {WarehouseUpsertArgs} args - Arguments to update or create a Warehouse.
     * @example
     * // Update or create a Warehouse
     * const warehouse = await prisma.warehouse.upsert({
     *   create: {
     *     // ... data to create a Warehouse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warehouse we want to update
     *   }
     * })
    **/
    upsert<T extends WarehouseUpsertArgs>(
      args: SelectSubset<T, WarehouseUpsertArgs>
    ): Prisma__WarehouseClient<WarehouseGetPayload<T>>

    /**
     * Count the number of Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseCountArgs} args - Arguments to filter Warehouses to count.
     * @example
     * // Count the number of Warehouses
     * const count = await prisma.warehouse.count({
     *   where: {
     *     // ... the filter for the Warehouses we want to count
     *   }
     * })
    **/
    count<T extends WarehouseCountArgs>(
      args?: Subset<T, WarehouseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarehouseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warehouse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WarehouseAggregateArgs>(args: Subset<T, WarehouseAggregateArgs>): Prisma.PrismaPromise<GetWarehouseAggregateType<T>>

    /**
     * Group by Warehouse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WarehouseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WarehouseGroupByArgs['orderBy'] }
        : { orderBy?: WarehouseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WarehouseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarehouseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Warehouse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WarehouseClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    items<T extends Warehouse$itemsArgs= {}>(args?: Subset<T, Warehouse$itemsArgs>): Prisma.PrismaPromise<Array<InventoryItemGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Warehouse base type for findUnique actions
   */
  export type WarehouseFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse findUnique
   */
  export interface WarehouseFindUniqueArgs extends WarehouseFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Warehouse findUniqueOrThrow
   */
  export type WarehouseFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where: WarehouseWhereUniqueInput
  }


  /**
   * Warehouse base type for findFirst actions
   */
  export type WarehouseFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: Enumerable<WarehouseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warehouses.
     */
    distinct?: Enumerable<WarehouseScalarFieldEnum>
  }

  /**
   * Warehouse findFirst
   */
  export interface WarehouseFindFirstArgs extends WarehouseFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Warehouse findFirstOrThrow
   */
  export type WarehouseFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: Enumerable<WarehouseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warehouses.
     */
    distinct?: Enumerable<WarehouseScalarFieldEnum>
  }


  /**
   * Warehouse findMany
   */
  export type WarehouseFindManyArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * Filter, which Warehouses to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: Enumerable<WarehouseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    distinct?: Enumerable<WarehouseScalarFieldEnum>
  }


  /**
   * Warehouse create
   */
  export type WarehouseCreateArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * The data needed to create a Warehouse.
     */
    data: XOR<WarehouseCreateInput, WarehouseUncheckedCreateInput>
  }


  /**
   * Warehouse createMany
   */
  export type WarehouseCreateManyArgs = {
    /**
     * The data used to create many Warehouses.
     */
    data: Enumerable<WarehouseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Warehouse update
   */
  export type WarehouseUpdateArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * The data needed to update a Warehouse.
     */
    data: XOR<WarehouseUpdateInput, WarehouseUncheckedUpdateInput>
    /**
     * Choose, which Warehouse to update.
     */
    where: WarehouseWhereUniqueInput
  }


  /**
   * Warehouse updateMany
   */
  export type WarehouseUpdateManyArgs = {
    /**
     * The data used to update Warehouses.
     */
    data: XOR<WarehouseUpdateManyMutationInput, WarehouseUncheckedUpdateManyInput>
    /**
     * Filter which Warehouses to update
     */
    where?: WarehouseWhereInput
  }


  /**
   * Warehouse upsert
   */
  export type WarehouseUpsertArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * The filter to search for the Warehouse to update in case it exists.
     */
    where: WarehouseWhereUniqueInput
    /**
     * In case the Warehouse found by the `where` argument doesn't exist, create a new Warehouse with this data.
     */
    create: XOR<WarehouseCreateInput, WarehouseUncheckedCreateInput>
    /**
     * In case the Warehouse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WarehouseUpdateInput, WarehouseUncheckedUpdateInput>
  }


  /**
   * Warehouse delete
   */
  export type WarehouseDeleteArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
    /**
     * Filter which Warehouse to delete.
     */
    where: WarehouseWhereUniqueInput
  }


  /**
   * Warehouse deleteMany
   */
  export type WarehouseDeleteManyArgs = {
    /**
     * Filter which Warehouses to delete
     */
    where?: WarehouseWhereInput
  }


  /**
   * Warehouse.items
   */
  export type Warehouse$itemsArgs = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InventoryItemInclude | null
    where?: InventoryItemWhereInput
    orderBy?: Enumerable<InventoryItemOrderByWithRelationInput>
    cursor?: InventoryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<InventoryItemScalarFieldEnum>
  }


  /**
   * Warehouse without action
   */
  export type WarehouseArgs = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WarehouseInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const EventsScalarFieldEnum: {
    id: 'id',
    userid: 'userid',
    description: 'description',
    time: 'time'
  };

  export type EventsScalarFieldEnum = (typeof EventsScalarFieldEnum)[keyof typeof EventsScalarFieldEnum]


  export const InventoryItemDataScalarFieldEnum: {
    id: 'id',
    active: 'active',
    description: 'description',
    imageURL: 'imageURL',
    cost: 'cost',
    name: 'name'
  };

  export type InventoryItemDataScalarFieldEnum = (typeof InventoryItemDataScalarFieldEnum)[keyof typeof InventoryItemDataScalarFieldEnum]


  export const InventoryItemScalarFieldEnum: {
    id: 'id',
    dataId: 'dataId',
    warehouseId: 'warehouseId',
    userId: 'userId'
  };

  export type InventoryItemScalarFieldEnum = (typeof InventoryItemScalarFieldEnum)[keyof typeof InventoryItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TaskScalarFieldEnum: {
    id: 'id',
    label: 'label',
    done: 'done'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserRoleScalarFieldEnum: {
    id: 'id',
    value: 'value'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    email: 'email',
    imageURL: 'imageURL',
    active: 'active'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expires: 'expires'
  };

  export type UserTokenScalarFieldEnum = (typeof UserTokenScalarFieldEnum)[keyof typeof UserTokenScalarFieldEnum]


  export const WarehouseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude'
  };

  export type WarehouseScalarFieldEnum = (typeof WarehouseScalarFieldEnum)[keyof typeof WarehouseScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type EventsWhereInput = {
    AND?: Enumerable<EventsWhereInput>
    OR?: Enumerable<EventsWhereInput>
    NOT?: Enumerable<EventsWhereInput>
    id?: IntFilter | number
    userid?: IntFilter | number
    description?: StringFilter | string
    time?: DateTimeFilter | Date | string
  }

  export type EventsOrderByWithRelationInput = {
    id?: SortOrder
    userid?: SortOrder
    description?: SortOrder
    time?: SortOrder
  }

  export type EventsWhereUniqueInput = {
    id?: number
  }

  export type EventsOrderByWithAggregationInput = {
    id?: SortOrder
    userid?: SortOrder
    description?: SortOrder
    time?: SortOrder
    _count?: EventsCountOrderByAggregateInput
    _avg?: EventsAvgOrderByAggregateInput
    _max?: EventsMaxOrderByAggregateInput
    _min?: EventsMinOrderByAggregateInput
    _sum?: EventsSumOrderByAggregateInput
  }

  export type EventsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EventsScalarWhereWithAggregatesInput>
    OR?: Enumerable<EventsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EventsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    userid?: IntWithAggregatesFilter | number
    description?: StringWithAggregatesFilter | string
    time?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    username?: StringFilter | string
    password?: StringFilter | string
    email?: StringFilter | string
    imageURL?: StringFilter | string
    active?: BoolFilter | boolean
    roles?: UserRoleListRelationFilter
    items?: InventoryItemListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    active?: SortOrder
    roles?: UserRoleOrderByRelationAggregateInput
    items?: InventoryItemOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    active?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    username?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    imageURL?: StringWithAggregatesFilter | string
    active?: BoolWithAggregatesFilter | boolean
  }

  export type UserTokenWhereInput = {
    AND?: Enumerable<UserTokenWhereInput>
    OR?: Enumerable<UserTokenWhereInput>
    NOT?: Enumerable<UserTokenWhereInput>
    id?: IntFilter | number
    token?: StringFilter | string
    userId?: IntFilter | number
    expires?: DateTimeFilter | Date | string
  }

  export type UserTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type UserTokenWhereUniqueInput = {
    id?: number
    token?: string
  }

  export type UserTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: UserTokenCountOrderByAggregateInput
    _avg?: UserTokenAvgOrderByAggregateInput
    _max?: UserTokenMaxOrderByAggregateInput
    _min?: UserTokenMinOrderByAggregateInput
    _sum?: UserTokenSumOrderByAggregateInput
  }

  export type UserTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserTokenScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    token?: StringWithAggregatesFilter | string
    userId?: IntWithAggregatesFilter | number
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserRoleWhereInput = {
    AND?: Enumerable<UserRoleWhereInput>
    OR?: Enumerable<UserRoleWhereInput>
    NOT?: Enumerable<UserRoleWhereInput>
    id?: IntFilter | number
    value?: StringFilter | string
    users?: UserListRelationFilter
  }

  export type UserRoleOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type UserRoleWhereUniqueInput = {
    id?: number
  }

  export type UserRoleOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    _count?: UserRoleCountOrderByAggregateInput
    _avg?: UserRoleAvgOrderByAggregateInput
    _max?: UserRoleMaxOrderByAggregateInput
    _min?: UserRoleMinOrderByAggregateInput
    _sum?: UserRoleSumOrderByAggregateInput
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserRoleScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserRoleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserRoleScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    value?: StringWithAggregatesFilter | string
  }

  export type TaskWhereInput = {
    AND?: Enumerable<TaskWhereInput>
    OR?: Enumerable<TaskWhereInput>
    NOT?: Enumerable<TaskWhereInput>
    id?: IntFilter | number
    label?: StringFilter | string
    done?: BoolFilter | boolean
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    done?: SortOrder
  }

  export type TaskWhereUniqueInput = {
    id?: number
  }

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    done?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TaskScalarWhereWithAggregatesInput>
    OR?: Enumerable<TaskScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TaskScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    label?: StringWithAggregatesFilter | string
    done?: BoolWithAggregatesFilter | boolean
  }

  export type InventoryItemWhereInput = {
    AND?: Enumerable<InventoryItemWhereInput>
    OR?: Enumerable<InventoryItemWhereInput>
    NOT?: Enumerable<InventoryItemWhereInput>
    id?: IntFilter | number
    dataId?: IntFilter | number
    warehouseId?: IntNullableFilter | number | null
    userId?: IntNullableFilter | number | null
    data?: XOR<InventoryItemDataRelationFilter, InventoryItemDataWhereInput>
    warehouse?: XOR<WarehouseRelationFilter, WarehouseWhereInput> | null
    User?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type InventoryItemOrderByWithRelationInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
    data?: InventoryItemDataOrderByWithRelationInput
    warehouse?: WarehouseOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type InventoryItemWhereUniqueInput = {
    id?: number
  }

  export type InventoryItemOrderByWithAggregationInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
    _count?: InventoryItemCountOrderByAggregateInput
    _avg?: InventoryItemAvgOrderByAggregateInput
    _max?: InventoryItemMaxOrderByAggregateInput
    _min?: InventoryItemMinOrderByAggregateInput
    _sum?: InventoryItemSumOrderByAggregateInput
  }

  export type InventoryItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InventoryItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<InventoryItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InventoryItemScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    dataId?: IntWithAggregatesFilter | number
    warehouseId?: IntNullableWithAggregatesFilter | number | null
    userId?: IntNullableWithAggregatesFilter | number | null
  }

  export type InventoryItemDataWhereInput = {
    AND?: Enumerable<InventoryItemDataWhereInput>
    OR?: Enumerable<InventoryItemDataWhereInput>
    NOT?: Enumerable<InventoryItemDataWhereInput>
    id?: IntFilter | number
    active?: BoolFilter | boolean
    description?: StringFilter | string
    imageURL?: StringFilter | string
    cost?: FloatFilter | number
    name?: StringFilter | string
    item?: InventoryItemListRelationFilter
  }

  export type InventoryItemDataOrderByWithRelationInput = {
    id?: SortOrder
    active?: SortOrder
    description?: SortOrder
    imageURL?: SortOrder
    cost?: SortOrder
    name?: SortOrder
    item?: InventoryItemOrderByRelationAggregateInput
  }

  export type InventoryItemDataWhereUniqueInput = {
    id?: number
  }

  export type InventoryItemDataOrderByWithAggregationInput = {
    id?: SortOrder
    active?: SortOrder
    description?: SortOrder
    imageURL?: SortOrder
    cost?: SortOrder
    name?: SortOrder
    _count?: InventoryItemDataCountOrderByAggregateInput
    _avg?: InventoryItemDataAvgOrderByAggregateInput
    _max?: InventoryItemDataMaxOrderByAggregateInput
    _min?: InventoryItemDataMinOrderByAggregateInput
    _sum?: InventoryItemDataSumOrderByAggregateInput
  }

  export type InventoryItemDataScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InventoryItemDataScalarWhereWithAggregatesInput>
    OR?: Enumerable<InventoryItemDataScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InventoryItemDataScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    active?: BoolWithAggregatesFilter | boolean
    description?: StringWithAggregatesFilter | string
    imageURL?: StringWithAggregatesFilter | string
    cost?: FloatWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type WarehouseWhereInput = {
    AND?: Enumerable<WarehouseWhereInput>
    OR?: Enumerable<WarehouseWhereInput>
    NOT?: Enumerable<WarehouseWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    address?: StringFilter | string
    latitude?: StringNullableFilter | string | null
    longitude?: StringNullableFilter | string | null
    items?: InventoryItemListRelationFilter
  }

  export type WarehouseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    items?: InventoryItemOrderByRelationAggregateInput
  }

  export type WarehouseWhereUniqueInput = {
    id?: number
  }

  export type WarehouseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    _count?: WarehouseCountOrderByAggregateInput
    _avg?: WarehouseAvgOrderByAggregateInput
    _max?: WarehouseMaxOrderByAggregateInput
    _min?: WarehouseMinOrderByAggregateInput
    _sum?: WarehouseSumOrderByAggregateInput
  }

  export type WarehouseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WarehouseScalarWhereWithAggregatesInput>
    OR?: Enumerable<WarehouseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WarehouseScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    address?: StringWithAggregatesFilter | string
    latitude?: StringNullableWithAggregatesFilter | string | null
    longitude?: StringNullableWithAggregatesFilter | string | null
  }

  export type EventsCreateInput = {
    userid: number
    description: string
    time: Date | string
  }

  export type EventsUncheckedCreateInput = {
    id?: number
    userid: number
    description: string
    time: Date | string
  }

  export type EventsUpdateInput = {
    userid?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventsCreateManyInput = {
    id?: number
    userid: number
    description: string
    time: Date | string
  }

  export type EventsUpdateManyMutationInput = {
    userid?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    roles?: UserRoleCreateNestedManyWithoutUsersInput
    items?: InventoryItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    roles?: UserRoleUncheckedCreateNestedManyWithoutUsersInput
    items?: InventoryItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    roles?: UserRoleUpdateManyWithoutUsersNestedInput
    items?: InventoryItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    roles?: UserRoleUncheckedUpdateManyWithoutUsersNestedInput
    items?: InventoryItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserTokenCreateInput = {
    token: string
    userId: number
    expires?: Date | string
  }

  export type UserTokenUncheckedCreateInput = {
    id?: number
    token: string
    userId: number
    expires?: Date | string
  }

  export type UserTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenCreateManyInput = {
    id?: number
    token: string
    userId: number
    expires?: Date | string
  }

  export type UserTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateInput = {
    value: string
    users?: UserCreateNestedManyWithoutRolesInput
  }

  export type UserRoleUncheckedCreateInput = {
    id?: number
    value: string
    users?: UserUncheckedCreateNestedManyWithoutRolesInput
  }

  export type UserRoleUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutRolesNestedInput
  }

  export type UserRoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type UserRoleCreateManyInput = {
    id?: number
    value: string
  }

  export type UserRoleUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    label: string
    done?: boolean
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    label: string
    done?: boolean
  }

  export type TaskUpdateInput = {
    label?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateManyInput = {
    id?: number
    label: string
    done?: boolean
  }

  export type TaskUpdateManyMutationInput = {
    label?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InventoryItemCreateInput = {
    data: InventoryItemDataCreateNestedOneWithoutItemInput
    warehouse?: WarehouseCreateNestedOneWithoutItemsInput
    User?: UserCreateNestedOneWithoutItemsInput
  }

  export type InventoryItemUncheckedCreateInput = {
    id?: number
    dataId: number
    warehouseId?: number | null
    userId?: number | null
  }

  export type InventoryItemUpdateInput = {
    data?: InventoryItemDataUpdateOneRequiredWithoutItemNestedInput
    warehouse?: WarehouseUpdateOneWithoutItemsNestedInput
    User?: UserUpdateOneWithoutItemsNestedInput
  }

  export type InventoryItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InventoryItemCreateManyInput = {
    id?: number
    dataId: number
    warehouseId?: number | null
    userId?: number | null
  }

  export type InventoryItemUpdateManyMutationInput = {

  }

  export type InventoryItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InventoryItemDataCreateInput = {
    active?: boolean
    description: string
    imageURL: string
    cost: number
    name: string
    item?: InventoryItemCreateNestedManyWithoutDataInput
  }

  export type InventoryItemDataUncheckedCreateInput = {
    id?: number
    active?: boolean
    description: string
    imageURL: string
    cost: number
    name: string
    item?: InventoryItemUncheckedCreateNestedManyWithoutDataInput
  }

  export type InventoryItemDataUpdateInput = {
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    item?: InventoryItemUpdateManyWithoutDataNestedInput
  }

  export type InventoryItemDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    item?: InventoryItemUncheckedUpdateManyWithoutDataNestedInput
  }

  export type InventoryItemDataCreateManyInput = {
    id?: number
    active?: boolean
    description: string
    imageURL: string
    cost: number
    name: string
  }

  export type InventoryItemDataUpdateManyMutationInput = {
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type InventoryItemDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type WarehouseCreateInput = {
    name: string
    address: string
    latitude?: string | null
    longitude?: string | null
    items?: InventoryItemCreateNestedManyWithoutWarehouseInput
  }

  export type WarehouseUncheckedCreateInput = {
    id?: number
    name: string
    address: string
    latitude?: string | null
    longitude?: string | null
    items?: InventoryItemUncheckedCreateNestedManyWithoutWarehouseInput
  }

  export type WarehouseUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
    items?: InventoryItemUpdateManyWithoutWarehouseNestedInput
  }

  export type WarehouseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
    items?: InventoryItemUncheckedUpdateManyWithoutWarehouseNestedInput
  }

  export type WarehouseCreateManyInput = {
    id?: number
    name: string
    address: string
    latitude?: string | null
    longitude?: string | null
  }

  export type WarehouseUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WarehouseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type EventsCountOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    description?: SortOrder
    time?: SortOrder
  }

  export type EventsAvgOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
  }

  export type EventsMaxOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    description?: SortOrder
    time?: SortOrder
  }

  export type EventsMinOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    description?: SortOrder
    time?: SortOrder
  }

  export type EventsSumOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput
    some?: UserRoleWhereInput
    none?: UserRoleWhereInput
  }

  export type InventoryItemListRelationFilter = {
    every?: InventoryItemWhereInput
    some?: InventoryItemWhereInput
    none?: InventoryItemWhereInput
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InventoryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    active?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    active?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    active?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type UserTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type UserTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type UserTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type UserTokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRoleCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type UserRoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type UserRoleMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type UserRoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    done?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    done?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    done?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type InventoryItemDataRelationFilter = {
    is?: InventoryItemDataWhereInput
    isNot?: InventoryItemDataWhereInput
  }

  export type WarehouseRelationFilter = {
    is?: WarehouseWhereInput | null
    isNot?: WarehouseWhereInput | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InventoryItemCountOrderByAggregateInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
  }

  export type InventoryItemAvgOrderByAggregateInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
  }

  export type InventoryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
  }

  export type InventoryItemMinOrderByAggregateInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
  }

  export type InventoryItemSumOrderByAggregateInput = {
    id?: SortOrder
    dataId?: SortOrder
    warehouseId?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type InventoryItemDataCountOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
    description?: SortOrder
    imageURL?: SortOrder
    cost?: SortOrder
    name?: SortOrder
  }

  export type InventoryItemDataAvgOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
  }

  export type InventoryItemDataMaxOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
    description?: SortOrder
    imageURL?: SortOrder
    cost?: SortOrder
    name?: SortOrder
  }

  export type InventoryItemDataMinOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
    description?: SortOrder
    imageURL?: SortOrder
    cost?: SortOrder
    name?: SortOrder
  }

  export type InventoryItemDataSumOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type WarehouseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type WarehouseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WarehouseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type WarehouseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type WarehouseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserRoleCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<UserRoleCreateWithoutUsersInput>, Enumerable<UserRoleUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<UserRoleCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<UserRoleWhereUniqueInput>
  }

  export type InventoryItemCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutUserInput>, Enumerable<InventoryItemUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutUserInput>
    createMany?: InventoryItemCreateManyUserInputEnvelope
    connect?: Enumerable<InventoryItemWhereUniqueInput>
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<UserRoleCreateWithoutUsersInput>, Enumerable<UserRoleUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<UserRoleCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<UserRoleWhereUniqueInput>
  }

  export type InventoryItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutUserInput>, Enumerable<InventoryItemUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutUserInput>
    createMany?: InventoryItemCreateManyUserInputEnvelope
    connect?: Enumerable<InventoryItemWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserRoleUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<UserRoleCreateWithoutUsersInput>, Enumerable<UserRoleUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<UserRoleCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<UserRoleUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<UserRoleWhereUniqueInput>
    disconnect?: Enumerable<UserRoleWhereUniqueInput>
    delete?: Enumerable<UserRoleWhereUniqueInput>
    connect?: Enumerable<UserRoleWhereUniqueInput>
    update?: Enumerable<UserRoleUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<UserRoleUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<UserRoleScalarWhereInput>
  }

  export type InventoryItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutUserInput>, Enumerable<InventoryItemUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<InventoryItemUpsertWithWhereUniqueWithoutUserInput>
    createMany?: InventoryItemCreateManyUserInputEnvelope
    set?: Enumerable<InventoryItemWhereUniqueInput>
    disconnect?: Enumerable<InventoryItemWhereUniqueInput>
    delete?: Enumerable<InventoryItemWhereUniqueInput>
    connect?: Enumerable<InventoryItemWhereUniqueInput>
    update?: Enumerable<InventoryItemUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<InventoryItemUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<InventoryItemScalarWhereInput>
  }

  export type UserRoleUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<UserRoleCreateWithoutUsersInput>, Enumerable<UserRoleUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<UserRoleCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<UserRoleUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<UserRoleWhereUniqueInput>
    disconnect?: Enumerable<UserRoleWhereUniqueInput>
    delete?: Enumerable<UserRoleWhereUniqueInput>
    connect?: Enumerable<UserRoleWhereUniqueInput>
    update?: Enumerable<UserRoleUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<UserRoleUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<UserRoleScalarWhereInput>
  }

  export type InventoryItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutUserInput>, Enumerable<InventoryItemUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<InventoryItemUpsertWithWhereUniqueWithoutUserInput>
    createMany?: InventoryItemCreateManyUserInputEnvelope
    set?: Enumerable<InventoryItemWhereUniqueInput>
    disconnect?: Enumerable<InventoryItemWhereUniqueInput>
    delete?: Enumerable<InventoryItemWhereUniqueInput>
    connect?: Enumerable<InventoryItemWhereUniqueInput>
    update?: Enumerable<InventoryItemUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<InventoryItemUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<InventoryItemScalarWhereInput>
  }

  export type UserCreateNestedManyWithoutRolesInput = {
    create?: XOR<Enumerable<UserCreateWithoutRolesInput>, Enumerable<UserUncheckedCreateWithoutRolesInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutRolesInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<Enumerable<UserCreateWithoutRolesInput>, Enumerable<UserUncheckedCreateWithoutRolesInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutRolesInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUpdateManyWithoutRolesNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutRolesInput>, Enumerable<UserUncheckedCreateWithoutRolesInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutRolesInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutRolesInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutRolesInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutRolesInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type UserUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutRolesInput>, Enumerable<UserUncheckedCreateWithoutRolesInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutRolesInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutRolesInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutRolesInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutRolesInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type InventoryItemDataCreateNestedOneWithoutItemInput = {
    create?: XOR<InventoryItemDataCreateWithoutItemInput, InventoryItemDataUncheckedCreateWithoutItemInput>
    connectOrCreate?: InventoryItemDataCreateOrConnectWithoutItemInput
    connect?: InventoryItemDataWhereUniqueInput
  }

  export type WarehouseCreateNestedOneWithoutItemsInput = {
    create?: XOR<WarehouseCreateWithoutItemsInput, WarehouseUncheckedCreateWithoutItemsInput>
    connectOrCreate?: WarehouseCreateOrConnectWithoutItemsInput
    connect?: WarehouseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutItemsInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    connect?: UserWhereUniqueInput
  }

  export type InventoryItemDataUpdateOneRequiredWithoutItemNestedInput = {
    create?: XOR<InventoryItemDataCreateWithoutItemInput, InventoryItemDataUncheckedCreateWithoutItemInput>
    connectOrCreate?: InventoryItemDataCreateOrConnectWithoutItemInput
    upsert?: InventoryItemDataUpsertWithoutItemInput
    connect?: InventoryItemDataWhereUniqueInput
    update?: XOR<InventoryItemDataUpdateWithoutItemInput, InventoryItemDataUncheckedUpdateWithoutItemInput>
  }

  export type WarehouseUpdateOneWithoutItemsNestedInput = {
    create?: XOR<WarehouseCreateWithoutItemsInput, WarehouseUncheckedCreateWithoutItemsInput>
    connectOrCreate?: WarehouseCreateOrConnectWithoutItemsInput
    upsert?: WarehouseUpsertWithoutItemsInput
    disconnect?: boolean
    delete?: boolean
    connect?: WarehouseWhereUniqueInput
    update?: XOR<WarehouseUpdateWithoutItemsInput, WarehouseUncheckedUpdateWithoutItemsInput>
  }

  export type UserUpdateOneWithoutItemsNestedInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    upsert?: UserUpsertWithoutItemsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InventoryItemCreateNestedManyWithoutDataInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutDataInput>, Enumerable<InventoryItemUncheckedCreateWithoutDataInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutDataInput>
    createMany?: InventoryItemCreateManyDataInputEnvelope
    connect?: Enumerable<InventoryItemWhereUniqueInput>
  }

  export type InventoryItemUncheckedCreateNestedManyWithoutDataInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutDataInput>, Enumerable<InventoryItemUncheckedCreateWithoutDataInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutDataInput>
    createMany?: InventoryItemCreateManyDataInputEnvelope
    connect?: Enumerable<InventoryItemWhereUniqueInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InventoryItemUpdateManyWithoutDataNestedInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutDataInput>, Enumerable<InventoryItemUncheckedCreateWithoutDataInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutDataInput>
    upsert?: Enumerable<InventoryItemUpsertWithWhereUniqueWithoutDataInput>
    createMany?: InventoryItemCreateManyDataInputEnvelope
    set?: Enumerable<InventoryItemWhereUniqueInput>
    disconnect?: Enumerable<InventoryItemWhereUniqueInput>
    delete?: Enumerable<InventoryItemWhereUniqueInput>
    connect?: Enumerable<InventoryItemWhereUniqueInput>
    update?: Enumerable<InventoryItemUpdateWithWhereUniqueWithoutDataInput>
    updateMany?: Enumerable<InventoryItemUpdateManyWithWhereWithoutDataInput>
    deleteMany?: Enumerable<InventoryItemScalarWhereInput>
  }

  export type InventoryItemUncheckedUpdateManyWithoutDataNestedInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutDataInput>, Enumerable<InventoryItemUncheckedCreateWithoutDataInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutDataInput>
    upsert?: Enumerable<InventoryItemUpsertWithWhereUniqueWithoutDataInput>
    createMany?: InventoryItemCreateManyDataInputEnvelope
    set?: Enumerable<InventoryItemWhereUniqueInput>
    disconnect?: Enumerable<InventoryItemWhereUniqueInput>
    delete?: Enumerable<InventoryItemWhereUniqueInput>
    connect?: Enumerable<InventoryItemWhereUniqueInput>
    update?: Enumerable<InventoryItemUpdateWithWhereUniqueWithoutDataInput>
    updateMany?: Enumerable<InventoryItemUpdateManyWithWhereWithoutDataInput>
    deleteMany?: Enumerable<InventoryItemScalarWhereInput>
  }

  export type InventoryItemCreateNestedManyWithoutWarehouseInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutWarehouseInput>, Enumerable<InventoryItemUncheckedCreateWithoutWarehouseInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutWarehouseInput>
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    connect?: Enumerable<InventoryItemWhereUniqueInput>
  }

  export type InventoryItemUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutWarehouseInput>, Enumerable<InventoryItemUncheckedCreateWithoutWarehouseInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutWarehouseInput>
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    connect?: Enumerable<InventoryItemWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type InventoryItemUpdateManyWithoutWarehouseNestedInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutWarehouseInput>, Enumerable<InventoryItemUncheckedCreateWithoutWarehouseInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutWarehouseInput>
    upsert?: Enumerable<InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput>
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    set?: Enumerable<InventoryItemWhereUniqueInput>
    disconnect?: Enumerable<InventoryItemWhereUniqueInput>
    delete?: Enumerable<InventoryItemWhereUniqueInput>
    connect?: Enumerable<InventoryItemWhereUniqueInput>
    update?: Enumerable<InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput>
    updateMany?: Enumerable<InventoryItemUpdateManyWithWhereWithoutWarehouseInput>
    deleteMany?: Enumerable<InventoryItemScalarWhereInput>
  }

  export type InventoryItemUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: XOR<Enumerable<InventoryItemCreateWithoutWarehouseInput>, Enumerable<InventoryItemUncheckedCreateWithoutWarehouseInput>>
    connectOrCreate?: Enumerable<InventoryItemCreateOrConnectWithoutWarehouseInput>
    upsert?: Enumerable<InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput>
    createMany?: InventoryItemCreateManyWarehouseInputEnvelope
    set?: Enumerable<InventoryItemWhereUniqueInput>
    disconnect?: Enumerable<InventoryItemWhereUniqueInput>
    delete?: Enumerable<InventoryItemWhereUniqueInput>
    connect?: Enumerable<InventoryItemWhereUniqueInput>
    update?: Enumerable<InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput>
    updateMany?: Enumerable<InventoryItemUpdateManyWithWhereWithoutWarehouseInput>
    deleteMany?: Enumerable<InventoryItemScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type UserRoleCreateWithoutUsersInput = {
    value: string
  }

  export type UserRoleUncheckedCreateWithoutUsersInput = {
    id?: number
    value: string
  }

  export type UserRoleCreateOrConnectWithoutUsersInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUsersInput, UserRoleUncheckedCreateWithoutUsersInput>
  }

  export type InventoryItemCreateWithoutUserInput = {
    data: InventoryItemDataCreateNestedOneWithoutItemInput
    warehouse?: WarehouseCreateNestedOneWithoutItemsInput
  }

  export type InventoryItemUncheckedCreateWithoutUserInput = {
    id?: number
    dataId: number
    warehouseId?: number | null
  }

  export type InventoryItemCreateOrConnectWithoutUserInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutUserInput, InventoryItemUncheckedCreateWithoutUserInput>
  }

  export type InventoryItemCreateManyUserInputEnvelope = {
    data: Enumerable<InventoryItemCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUsersInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUsersInput, UserRoleUncheckedUpdateWithoutUsersInput>
    create: XOR<UserRoleCreateWithoutUsersInput, UserRoleUncheckedCreateWithoutUsersInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUsersInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUsersInput, UserRoleUncheckedUpdateWithoutUsersInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUsersInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRolesInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: Enumerable<UserRoleScalarWhereInput>
    OR?: Enumerable<UserRoleScalarWhereInput>
    NOT?: Enumerable<UserRoleScalarWhereInput>
    id?: IntFilter | number
    value?: StringFilter | string
  }

  export type InventoryItemUpsertWithWhereUniqueWithoutUserInput = {
    where: InventoryItemWhereUniqueInput
    update: XOR<InventoryItemUpdateWithoutUserInput, InventoryItemUncheckedUpdateWithoutUserInput>
    create: XOR<InventoryItemCreateWithoutUserInput, InventoryItemUncheckedCreateWithoutUserInput>
  }

  export type InventoryItemUpdateWithWhereUniqueWithoutUserInput = {
    where: InventoryItemWhereUniqueInput
    data: XOR<InventoryItemUpdateWithoutUserInput, InventoryItemUncheckedUpdateWithoutUserInput>
  }

  export type InventoryItemUpdateManyWithWhereWithoutUserInput = {
    where: InventoryItemScalarWhereInput
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyWithoutItemsInput>
  }

  export type InventoryItemScalarWhereInput = {
    AND?: Enumerable<InventoryItemScalarWhereInput>
    OR?: Enumerable<InventoryItemScalarWhereInput>
    NOT?: Enumerable<InventoryItemScalarWhereInput>
    id?: IntFilter | number
    dataId?: IntFilter | number
    warehouseId?: IntNullableFilter | number | null
    userId?: IntNullableFilter | number | null
  }

  export type UserCreateWithoutRolesInput = {
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    items?: InventoryItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRolesInput = {
    id?: number
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    items?: InventoryItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type UserUpsertWithWhereUniqueWithoutRolesInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRolesInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
  }

  export type UserUpdateManyWithWhereWithoutRolesInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUsersInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    id?: IntFilter | number
    username?: StringFilter | string
    password?: StringFilter | string
    email?: StringFilter | string
    imageURL?: StringFilter | string
    active?: BoolFilter | boolean
  }

  export type InventoryItemDataCreateWithoutItemInput = {
    active?: boolean
    description: string
    imageURL: string
    cost: number
    name: string
  }

  export type InventoryItemDataUncheckedCreateWithoutItemInput = {
    id?: number
    active?: boolean
    description: string
    imageURL: string
    cost: number
    name: string
  }

  export type InventoryItemDataCreateOrConnectWithoutItemInput = {
    where: InventoryItemDataWhereUniqueInput
    create: XOR<InventoryItemDataCreateWithoutItemInput, InventoryItemDataUncheckedCreateWithoutItemInput>
  }

  export type WarehouseCreateWithoutItemsInput = {
    name: string
    address: string
    latitude?: string | null
    longitude?: string | null
  }

  export type WarehouseUncheckedCreateWithoutItemsInput = {
    id?: number
    name: string
    address: string
    latitude?: string | null
    longitude?: string | null
  }

  export type WarehouseCreateOrConnectWithoutItemsInput = {
    where: WarehouseWhereUniqueInput
    create: XOR<WarehouseCreateWithoutItemsInput, WarehouseUncheckedCreateWithoutItemsInput>
  }

  export type UserCreateWithoutItemsInput = {
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    roles?: UserRoleCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutItemsInput = {
    id?: number
    username: string
    password: string
    email: string
    imageURL: string
    active: boolean
    roles?: UserRoleUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
  }

  export type InventoryItemDataUpsertWithoutItemInput = {
    update: XOR<InventoryItemDataUpdateWithoutItemInput, InventoryItemDataUncheckedUpdateWithoutItemInput>
    create: XOR<InventoryItemDataCreateWithoutItemInput, InventoryItemDataUncheckedCreateWithoutItemInput>
  }

  export type InventoryItemDataUpdateWithoutItemInput = {
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type InventoryItemDataUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type WarehouseUpsertWithoutItemsInput = {
    update: XOR<WarehouseUpdateWithoutItemsInput, WarehouseUncheckedUpdateWithoutItemsInput>
    create: XOR<WarehouseCreateWithoutItemsInput, WarehouseUncheckedCreateWithoutItemsInput>
  }

  export type WarehouseUpdateWithoutItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WarehouseUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpsertWithoutItemsInput = {
    update: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
  }

  export type UserUpdateWithoutItemsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    roles?: UserRoleUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    roles?: UserRoleUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type InventoryItemCreateWithoutDataInput = {
    warehouse?: WarehouseCreateNestedOneWithoutItemsInput
    User?: UserCreateNestedOneWithoutItemsInput
  }

  export type InventoryItemUncheckedCreateWithoutDataInput = {
    id?: number
    warehouseId?: number | null
    userId?: number | null
  }

  export type InventoryItemCreateOrConnectWithoutDataInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutDataInput, InventoryItemUncheckedCreateWithoutDataInput>
  }

  export type InventoryItemCreateManyDataInputEnvelope = {
    data: Enumerable<InventoryItemCreateManyDataInput>
    skipDuplicates?: boolean
  }

  export type InventoryItemUpsertWithWhereUniqueWithoutDataInput = {
    where: InventoryItemWhereUniqueInput
    update: XOR<InventoryItemUpdateWithoutDataInput, InventoryItemUncheckedUpdateWithoutDataInput>
    create: XOR<InventoryItemCreateWithoutDataInput, InventoryItemUncheckedCreateWithoutDataInput>
  }

  export type InventoryItemUpdateWithWhereUniqueWithoutDataInput = {
    where: InventoryItemWhereUniqueInput
    data: XOR<InventoryItemUpdateWithoutDataInput, InventoryItemUncheckedUpdateWithoutDataInput>
  }

  export type InventoryItemUpdateManyWithWhereWithoutDataInput = {
    where: InventoryItemScalarWhereInput
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyWithoutItemInput>
  }

  export type InventoryItemCreateWithoutWarehouseInput = {
    data: InventoryItemDataCreateNestedOneWithoutItemInput
    User?: UserCreateNestedOneWithoutItemsInput
  }

  export type InventoryItemUncheckedCreateWithoutWarehouseInput = {
    id?: number
    dataId: number
    userId?: number | null
  }

  export type InventoryItemCreateOrConnectWithoutWarehouseInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput>
  }

  export type InventoryItemCreateManyWarehouseInputEnvelope = {
    data: Enumerable<InventoryItemCreateManyWarehouseInput>
    skipDuplicates?: boolean
  }

  export type InventoryItemUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: InventoryItemWhereUniqueInput
    update: XOR<InventoryItemUpdateWithoutWarehouseInput, InventoryItemUncheckedUpdateWithoutWarehouseInput>
    create: XOR<InventoryItemCreateWithoutWarehouseInput, InventoryItemUncheckedCreateWithoutWarehouseInput>
  }

  export type InventoryItemUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: InventoryItemWhereUniqueInput
    data: XOR<InventoryItemUpdateWithoutWarehouseInput, InventoryItemUncheckedUpdateWithoutWarehouseInput>
  }

  export type InventoryItemUpdateManyWithWhereWithoutWarehouseInput = {
    where: InventoryItemScalarWhereInput
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyWithoutItemsInput>
  }

  export type InventoryItemCreateManyUserInput = {
    id?: number
    dataId: number
    warehouseId?: number | null
  }

  export type UserRoleUpdateWithoutUsersInput = {
    value?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleUncheckedUpdateManyWithoutRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type InventoryItemUpdateWithoutUserInput = {
    data?: InventoryItemDataUpdateOneRequiredWithoutItemNestedInput
    warehouse?: WarehouseUpdateOneWithoutItemsNestedInput
  }

  export type InventoryItemUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InventoryItemUncheckedUpdateManyWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUpdateWithoutRolesInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    items?: InventoryItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    items?: InventoryItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InventoryItemCreateManyDataInput = {
    id?: number
    warehouseId?: number | null
    userId?: number | null
  }

  export type InventoryItemUpdateWithoutDataInput = {
    warehouse?: WarehouseUpdateOneWithoutItemsNestedInput
    User?: UserUpdateOneWithoutItemsNestedInput
  }

  export type InventoryItemUncheckedUpdateWithoutDataInput = {
    id?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InventoryItemUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InventoryItemCreateManyWarehouseInput = {
    id?: number
    dataId: number
    userId?: number | null
  }

  export type InventoryItemUpdateWithoutWarehouseInput = {
    data?: InventoryItemDataUpdateOneRequiredWithoutItemNestedInput
    User?: UserUpdateOneWithoutItemsNestedInput
  }

  export type InventoryItemUncheckedUpdateWithoutWarehouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataId?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}