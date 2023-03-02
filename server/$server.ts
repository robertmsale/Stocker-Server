import type { FastifyMultipartAttachFieldsToBodyOptions, Multipart, MultipartFile } from '@fastify/multipart'
import multipart from '@fastify/multipart'
import type { ReadStream } from 'fs'
import type { HttpStatusOk, AspidaMethodParams } from 'aspida'
import type { Schema } from 'fast-json-stringify'
import type { z } from 'zod'
import hooksFn0 from './api/user/hooks'
import validatorsFn0 from './api/article/_articleId@number/validators'
import validatorsFn1 from './api/tasks/_taskId@number/validators'
import controllerFn0 from './api/controller'
import controllerFn1 from './api/article/controller'
import controllerFn2 from './api/article/_articleId@number/controller'
import controllerFn3 from './api/login/controller'
import controllerFn4 from './api/protected/inventory-item/controller'
import controllerFn5 from './api/protected/inventory-item/data/controller'
import controllerFn6 from './api/protected/inventory-item/data/image/controller'
import controllerFn7 from './api/protected/inventory-item/data/imgurl/controller'
import controllerFn8 from './api/tasks/controller'
import controllerFn9 from './api/tasks/_taskId@number/controller'
import controllerFn10 from './api/user/controller'
import type { FastifyInstance, RouteHandlerMethod, preValidationHookHandler, FastifySchema, FastifySchemaCompiler, RouteShorthandOptions, onRequestHookHandler, preParsingHookHandler, preHandlerHookHandler } from 'fastify'

export type FrourioOptions = {
  basePath?: string
  multipart?: FastifyMultipartAttachFieldsToBodyOptions
}

type HttpStatusNoOk = 301 | 302 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 409 | 500 | 501 | 502 | 503 | 504 | 505

type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type BaseResponse<T, U, V> = {
  status: V extends number ? V : HttpStatusOk
  body: T
  headers: U
}

type ServerResponse<K extends AspidaMethodParams> =
  | (K extends { resBody: K['resBody']; resHeaders: K['resHeaders'] }
  ? BaseResponse<K['resBody'], K['resHeaders'], K['status']>
  : K extends { resBody: K['resBody'] }
  ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'headers'>
  : K extends { resHeaders: K['resHeaders'] }
  ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'body'>
  : PartiallyPartial<
      BaseResponse<K['resBody'], K['resHeaders'], K['status']>,
      'body' | 'headers'
    >)
  | PartiallyPartial<BaseResponse<any, any, HttpStatusNoOk>, 'body' | 'headers'>

type BlobToFile<T extends AspidaMethodParams> = T['reqFormat'] extends FormData
  ? {
      [P in keyof T['reqBody']]: Required<T['reqBody']>[P] extends Blob | ReadStream
        ? MultipartFile
        : Required<T['reqBody']>[P] extends (Blob | ReadStream)[]
        ? MultipartFile[]
        : T['reqBody'][P]
    }
  : T['reqBody']

type RequestParams<T extends AspidaMethodParams> = Pick<{
  query: T['query']
  body: BlobToFile<T>
  headers: T['reqHeaders']
}, {
  query: Required<T>['query'] extends {} | null ? 'query' : never
  body: Required<T>['reqBody'] extends {} | null ? 'body' : never
  headers: Required<T>['reqHeaders'] extends {} | null ? 'headers' : never
}['query' | 'body' | 'headers']>

type ServerHandler<T extends AspidaMethodParams, U extends Record<string, unknown> = {}> = (
  req: RequestParams<T> & U
) => ServerResponse<T>

type ServerHandlerPromise<T extends AspidaMethodParams, U extends Record<string, unknown> = {}> = (
  req: RequestParams<T> & U
) => Promise<ServerResponse<T>>

type AddedHandler<T, R extends Record<string, unknown>> = T extends (req: infer U, ...args: infer V) => infer W ? (req: U & Partial<R>, ...args: V) => W : never

export type ServerHooks<R extends Record<string, unknown> = {}> = {
  onRequest?: AddedHandler<onRequestHookHandler, R> | AddedHandler<onRequestHookHandler, R>[]
  preParsing?: AddedHandler<preParsingHookHandler, R> | AddedHandler<preParsingHookHandler, R>[]
  preValidation?: AddedHandler<preValidationHookHandler, R> | AddedHandler<preValidationHookHandler, R>[]
  preHandler?: AddedHandler<preHandlerHookHandler, R> | AddedHandler<preHandlerHookHandler, R>[]
}

export type ServerMethodHandler<T extends AspidaMethodParams,  U extends Record<string, unknown> = {}> = ServerHandler<T, U> | ServerHandlerPromise<T, U> | {
  validators?: Partial<{ [Key in keyof RequestParams<T>]?: z.ZodType<RequestParams<T>[Key]>}>
  schemas?: { response?: { [V in HttpStatusOk]?: Schema }}
  hooks?: ServerHooks<U>
  handler: ServerHandler<T, U> | ServerHandlerPromise<T, U>
}

const parseNumberTypeQueryParams = (numberTypeParams: [string, boolean, boolean][]): preValidationHookHandler => (req, reply, done) => {
  const query: any = req.query

  for (const [key, isOptional, isArray] of numberTypeParams) {
    const param = isArray ? (query[`${key}[]`] ?? query[key]) : query[key]

    if (isArray) {
      if (!isOptional && param === undefined) {
        query[key] = []
      } else if (!isOptional || param !== undefined) {
        const vals = (Array.isArray(param) ? param : [param]).map(Number)

        if (vals.some(isNaN)) {
          reply.code(400).send()
          return
        }

        query[key] = vals as any
      }

      delete query[`${key}[]`]
    } else if (!isOptional || param !== undefined) {
      const val = Number(param)

      if (isNaN(val)) {
        reply.code(400).send()
        return
      }

      query[key] = val as any
    }
  }

  done()
}

const callParserIfExistsQuery = (parser: OmitThisParameter<preValidationHookHandler>): preValidationHookHandler => (req, reply, done) =>
  Object.keys(req.query as any).length ? parser(req, reply, done) : done()

const createTypedParamsHandler = (numberTypeParams: string[]): preValidationHookHandler => (req, reply, done) => {
  const params = req.params as Record<string, string | number>

  for (const key of numberTypeParams) {
    const val = Number(params[key])

    if (isNaN(val)) {
      reply.code(400).send()
      return
    }

    params[key] = val
  }

  done()
}

const formatMultipartData = (arrayTypeKeys: [string, boolean][]): preValidationHookHandler => (req, _, done) => {
  const body: any = req.body

  for (const [key] of arrayTypeKeys) {
    if (body[key] === undefined) body[key] = []
    else if (!Array.isArray(body[key])) {
      body[key] = [body[key]]
    }
  }

  Object.entries(body).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      body[key] = (val as Multipart[]).map(v => 'file' in v ? v : (v as any).value)
    } else {
      body[key] = 'file' in (val as Multipart) ? val : (val as any).value
    }
  })

  for (const [key, isOptional] of arrayTypeKeys) {
    if (!body[key].length && isOptional) delete body[key]
  }

  done()
}

const validatorCompiler: FastifySchemaCompiler<FastifySchema> = ({ schema }) => (data: unknown) => {
  const result = (schema as z.ZodType<unknown>).safeParse(data)
  return result.success ? { value: result.data } : { error: result.error }
}

const methodToHandler = (
  methodCallback: ServerHandler<any, any>
): RouteHandlerMethod => (req, reply) => {
  const data = methodCallback(req as any) as any

  if (data.headers) reply.headers(data.headers)

  reply.code(data.status).send(data.body)
}

const asyncMethodToHandler = (
  methodCallback: ServerHandlerPromise<any, any>
): RouteHandlerMethod => async (req, reply) => {
  const data = await methodCallback(req as any) as any

  if (data.headers) reply.headers(data.headers)

  reply.code(data.status).send(data.body)
}

export default (fastify: FastifyInstance, options: FrourioOptions = {}) => {
  const basePath = options.basePath ?? ''
  const hooks0 = hooksFn0(fastify)
  const validators0 = validatorsFn0(fastify)
  const validators1 = validatorsFn1(fastify)
  const controller0 = controllerFn0(fastify)
  const controller1 = controllerFn1(fastify)
  const controller2 = controllerFn2(fastify)
  const controller3 = controllerFn3(fastify)
  const controller4 = controllerFn4(fastify)
  const controller5 = controllerFn5(fastify)
  const controller6 = controllerFn6(fastify)
  const controller7 = controllerFn7(fastify)
  const controller8 = controllerFn8(fastify)
  const controller9 = controllerFn9(fastify)
  const controller10 = controllerFn10(fastify)

  fastify.register(multipart, { attachFieldsToBody: true, limits: { fileSize: 1024 ** 3 }, ...options.multipart })

  fastify.get(basePath || '/',
    methodToHandler(controller0.get))

  fastify.get(`${basePath}/article`,
    methodToHandler(controller1.get))

  fastify.get(
    `${basePath}/article/:articleId`,
    {
      schema: {
        params: validators0.params
      },
      validatorCompiler,
      preValidation: createTypedParamsHandler(['articleId'])
    },
    methodToHandler(controller2.get)
  )

  fastify.post(`${basePath}/login`,
    asyncMethodToHandler(controller3.post))

  fastify.get(`${basePath}/protected/inventory-item`,
    asyncMethodToHandler(controller4.get))

  fastify.post(`${basePath}/protected/inventory-item`,
    asyncMethodToHandler(controller4.post))

  fastify.patch(`${basePath}/protected/inventory-item`,
    asyncMethodToHandler(controller4.patch))

  fastify.delete(`${basePath}/protected/inventory-item`,
    asyncMethodToHandler(controller4.delete))

  fastify.get(`${basePath}/protected/inventory-item/data`,
    asyncMethodToHandler(controller5.get))

  fastify.post(`${basePath}/protected/inventory-item/data`,
    asyncMethodToHandler(controller5.post))

  fastify.patch(`${basePath}/protected/inventory-item/data`,
    asyncMethodToHandler(controller5.patch))

  fastify.get(
    `${basePath}/protected/inventory-item/data/image`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([['id', false, false]]))
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller6.get)
  )

  fastify.post(
    `${basePath}/protected/inventory-item/data/image`,
    {
      preValidation: formatMultipartData([])
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller6.post)
  )

  fastify.get(`${basePath}/protected/inventory-item/data/imgurl`,
    asyncMethodToHandler(controller7.get))

  fastify.get(
    `${basePath}/tasks`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([['limit', true, false]]))
    },
    asyncMethodToHandler(controller8.get)
  )

  fastify.post(`${basePath}/tasks`,
    asyncMethodToHandler(controller8.post))

  fastify.patch(
    `${basePath}/tasks/:taskId`,
    {
      schema: {
        params: validators1.params
      },
      validatorCompiler,
      preValidation: createTypedParamsHandler(['taskId'])
    },
    asyncMethodToHandler(controller9.patch)
  )

  fastify.delete(
    `${basePath}/tasks/:taskId`,
    {
      schema: {
        params: validators1.params
      },
      validatorCompiler,
      preValidation: createTypedParamsHandler(['taskId'])
    },
    asyncMethodToHandler(controller9.delete)
  )

  fastify.get(
    `${basePath}/user`,
    {
      onRequest: hooks0.onRequest
    } as RouteShorthandOptions,
    methodToHandler(controller10.get)
  )

  fastify.post(
    `${basePath}/user`,
    {
      onRequest: hooks0.onRequest,
      preValidation: formatMultipartData([])
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller10.post)
  )

  return fastify
}