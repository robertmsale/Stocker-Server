"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/velona/dist/index.js
var require_dist = __commonJS({
  "node_modules/velona/dist/index.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    var __spread = exports && exports.__spread || function() {
      for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
      return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.depend = void 0;
    var depend19 = function(dependencies, cb) {
      var fn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return cb.apply(void 0, __spread([dependencies], args));
      };
      fn.inject = function(deps) {
        return typeof deps === "function" ? exports.depend(__assign(__assign({}, dependencies), deps(dependencies)), cb) : exports.depend(__assign(__assign({}, dependencies), deps), cb);
      };
      return fn;
    };
    exports.depend = depend19;
  }
});

// service/app.ts
var import_path4 = __toESM(require("path"));
var import_fastify = __toESM(require("fastify"));
var import_helmet = __toESM(require("@fastify/helmet"));
var import_cors = __toESM(require("@fastify/cors"));
var import_static = __toESM(require("@fastify/static"));
var import_jwt2 = __toESM(require("@fastify/jwt"));

// service/envValues.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var API_JWT_SECRET = process.env.API_JWT_SECRET ?? "";
var API_USER_ID = process.env.API_USER_ID ?? "";
var API_USER_PASS = process.env.API_USER_PASS ?? "";
var API_SERVER_PORT = +(process.env.API_SERVER_PORT ?? "8080");
var API_BASE_PATH = process.env.API_BASE_PATH ?? "";
var API_ORIGIN = process.env.API_ORIGIN ?? "";
var API_UPLOAD_DIR = process.env.API_UPLOAD_DIR ?? "";
var API_REDIS_URL = process.env.API_REDIS_URL ?? "";

// $server.ts
var import_multipart = __toESM(require("@fastify/multipart"));

// api/protected/$relay.ts
var import_velona = __toESM(require_dist());
function defineHooks(hooks, cb) {
  return cb && typeof hooks !== "function" ? (0, import_velona.depend)(hooks, cb) : hooks;
}

// service/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JWT = class {
  static verify(token) {
    return import_jsonwebtoken.default.verify(token, API_JWT_SECRET);
  }
  static decode(token) {
    return { id: -1 };
  }
  static sign(token) {
    return new Promise((resolve, reject) => {
      import_jsonwebtoken.default.sign(token, API_JWT_SECRET, (err, token2) => {
        if (err) {
          reject(err);
        } else {
          resolve(token2 || "");
        }
      });
    });
  }
};

// service/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// api/protected/hooks.ts
var hooks_default = defineHooks(() => ({
  preHandler: async (req, res) => {
    const decoded = JWT.verify(req.headers.authorization);
    const user = await prisma_default.user.findFirst({ where: { id: decoded.id }, include: { roles: true } });
    if (!user) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    const isAdmin = user.roles.some((role) => role.id === 1);
    if (user.active === false && !isAdmin) {
      res.status(401).send({ message: "User is not active" });
      return;
    }
    req.user = user;
  }
}));

// api/protected/admin/$relay.ts
var import_velona2 = __toESM(require_dist());
function defineHooks2(hooks, cb) {
  return cb && typeof hooks !== "function" ? (0, import_velona2.depend)(hooks, cb) : hooks;
}

// api/protected/admin/hooks.ts
var hooks_default2 = defineHooks2(() => ({
  onRequest: async (req, reply, done) => {
  }
}));

// api/article/_articleId@number/validators.ts
var import_zod = require("zod");

// api/article/_articleId@number/$relay.ts
var import_velona3 = __toESM(require_dist());
function defineValidators(validator) {
  return validator;
}
function defineController(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona3.depend)(methods, cb) : methods;
}

// api/article/_articleId@number/validators.ts
var validators_default = defineValidators(() => ({
  params: import_zod.z.object({ articleId: import_zod.z.number() })
}));

// api/$relay.ts
var import_velona4 = __toESM(require_dist());
function defineController2(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona4.depend)(methods, cb) : methods;
}

// api/controller.ts
var controller_default = defineController2(() => ({
  get: () => ({ status: 200, body: "Hello, world!" })
}));

// service/article.ts
var articleData = [
  {
    id: 1,
    title: "First article",
    body: "Hello from frourio!"
  },
  {
    id: 2,
    title: "Create Frourio App",
    body: "From installation\n         To deployment\n\n   In  One  Command"
  },
  {
    id: 3,
    title: "TypeScript full stack framework",
    body: "All you need is TypeScript"
  },
  {
    id: 4,
    title: "What databases are suported?",
    body: "- SQLite (prisma only for now)\n- PostgreSQL\n- MySQL\nPlanning to support others... stay tuned!"
  }
];
var getArticles = (search) => {
  const filtered = articleData.filter(
    (article) => !search || search.toLowerCase().split(/\s+/).every(
      (word) => (article.title + article.body).replace(/\s/g, "").toLowerCase().search(word.toLowerCase()) >= 0
    )
  );
  return filtered;
};
var getArticle = (id) => {
  return articleData.find((article) => article.id === id);
};

// api/article/$relay.ts
var import_velona5 = __toESM(require_dist());
function defineController3(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona5.depend)(methods, cb) : methods;
}

// api/article/controller.ts
var controller_default2 = defineController3(() => ({
  get: ({ query }) => ({ status: 200, body: getArticles(query == null ? void 0 : query.search) })
}));

// api/article/_articleId@number/controller.ts
var controller_default3 = defineController(() => ({
  get: ({ params: { articleId } }) => ((article) => article ? {
    status: 200,
    body: article
  } : { status: 404 })(getArticle(articleId))
}));

// api/dirs/$relay.ts
var import_velona6 = __toESM(require_dist());
function defineController4(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona6.depend)(methods, cb) : methods;
}

// api/dirs/controller.ts
var controller_default4 = defineController4(() => ({
  get: async () => {
    return {
      status: 200,
      body: {
        baseURL: API_ORIGIN,
        itemImages: "/uploads/item-images/",
        profileImages: "/uploads/profile-images/",
        dummy: "/static/icons/dummy.svg"
      }
    };
  }
}));

// api/login/$relay.ts
var import_velona7 = __toESM(require_dist());
function defineController5(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona7.depend)(methods, cb) : methods;
}

// api/login/controller.ts
var controller_default5 = defineController5((fastify) => ({
  post: async (req) => {
    return { status: 200, body: {} };
  }
}));

// api/protected/admin/roles/$relay.ts
var import_velona8 = __toESM(require_dist());
function defineController6(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona8.depend)(methods, cb) : methods;
}

// api/protected/admin/roles/controller.ts
var import_lodash = __toESM(require("lodash"));
var controller_default6 = defineController6(() => ({
  get: async ({ query }) => {
    if (import_lodash.default.isUndefined(query)) {
      let rv2 = await prisma_default.userRole.findMany();
      return { status: 200, body: import_lodash.default.isNull(rv2) ? [] : rv2 };
    }
    let rv = await prisma_default.userRole.findFirst({
      where: { id: query.id }
    });
    return { status: 200, body: import_lodash.default.isNull(rv) ? [] : [rv] };
  },
  post: async ({ body }) => {
    let rv = await prisma_default.userRole.create({
      data: body
    });
    return { status: 201, body: rv };
  }
}));

// api/protected/admin/user/$relay.ts
var import_velona9 = __toESM(require_dist());
function defineController7(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona9.depend)(methods, cb) : methods;
}

// api/protected/admin/user/controller.ts
var import_lodash2 = __toESM(require("lodash"));
var controller_default7 = defineController7(() => ({
  post: async ({ body }) => {
    return { status: 200, body: await prisma_default.user.create({ data: body }) };
  },
  patch: async ({ body }) => {
    let rv = await prisma_default.user.update({ where: { id: body.id }, data: import_lodash2.default.omit(body, "id") });
    return { status: 200, body: rv };
  }
}));

// api/protected/admin/user/img/$relay.ts
var import_velona10 = __toESM(require_dist());
function defineController8(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona10.depend)(methods, cb) : methods;
}

// api/protected/admin/user/img/controller.ts
var import_lodash3 = __toESM(require("lodash"));
var import_fs_jetpack = __toESM(require("fs-jetpack"));
var import_path = __toESM(require("path"));
var import_uuid = require("uuid");
var controller_default8 = defineController8(() => ({
  get: async ({ query }) => {
    let urlusr = await prisma_default.user.findFirst({ where: { id: query.id }, select: { imageURL: true } });
    if (import_lodash3.default.isNull(urlusr))
      return { status: 404 };
    return { status: 200, body: urlusr.imageURL };
  },
  post: async ({ query, body }) => {
    let usr = await prisma_default.user.findFirst({ where: { id: query.id } });
    if (import_lodash3.default.isNull(usr))
      return { status: 404 };
    let imgname = `${(0, import_uuid.v1)()}${import_path.default.extname(body.icon.filename)}`;
    let imgpath = import_path.default.resolve(API_UPLOAD_DIR, "profile-images", imgname);
    await import_fs_jetpack.default.writeAsync(imgpath, await body.icon.toBuffer());
    await prisma_default.user.update({ where: { id: query.id }, data: { imageURL: imgname } });
    return { status: 200, body: imgname };
  }
}));

// api/protected/events/$relay.ts
var import_velona11 = __toESM(require_dist());
function defineController9(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona11.depend)(methods, cb) : methods;
}

// api/protected/events/controller.ts
var controller_default9 = defineController9(() => ({
  get: async () => {
    const res = await prisma_default.events.findMany();
    return { status: 200, body: res };
  }
}));

// api/protected/inventory-item/$relay.ts
var import_velona12 = __toESM(require_dist());
function defineController10(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona12.depend)(methods, cb) : methods;
}

// api/protected/inventory-item/controller.ts
var import_lodash4 = __toESM(require("lodash"));
var controller_default10 = defineController10(() => ({
  get: async ({ query }) => {
    const selectsafe = import_lodash4.default.isUndefined(query) || import_lodash4.default.isUndefined(query.select) ? [] : query.select;
    const select = import_lodash4.default.isEmpty(selectsafe) ? {} : import_lodash4.default.zipObject(selectsafe, import_lodash4.default.repeat(" ", selectsafe.length).split(" ").map(() => true));
    const where = import_lodash4.default.omitBy(query, (v, k) => k == "select" || k == "limit" || import_lodash4.default.isUndefined(v));
    const take = import_lodash4.default.isUndefined(query) || import_lodash4.default.isUndefined(query.limit) ? 1e6 : query.limit;
    const items = await prisma_default.inventoryItem.findMany(
      import_lodash4.default.merge(select, take, where)
    );
    return { status: 200, body: items };
  },
  post: async ({ body }) => {
    const rv = await prisma_default.inventoryItem.create({ data: body });
    const data = await prisma_default.inventoryItemData.findFirst({ where: { id: rv.dataId } });
    await prisma_default.events.create({ data: {
      description: `{username} scanned in a new item: ${(data == null ? void 0 : data.name) ?? ""}`,
      time: new Date(),
      userid: 0
    } });
    return { status: 200, body: rv };
  },
  patch: async ({ body }) => {
    const rv = await prisma_default.inventoryItem.update({
      data: import_lodash4.default.omit(body, "id"),
      where: { id: body.id }
    });
    const data = await prisma_default.inventoryItemData.findFirst({ where: { id: rv.dataId } });
    await prisma_default.events.create({ data: {
      description: `{username} updated an item's information: ${(data == null ? void 0 : data.name) ?? ""}`,
      time: new Date(),
      userid: 0
    } });
    return { status: 200, body: rv };
  },
  delete: async ({ body }) => {
    for (let id of body) {
      const rv = await prisma_default.inventoryItem.findFirst({ where: { id } });
      const data = await prisma_default.inventoryItemData.findFirst({ where: { id: (rv == null ? void 0 : rv.dataId) ?? 0 } });
      await prisma_default.events.create({ data: {
        description: `{username} scanned an item out of stock: ${(data == null ? void 0 : data.name) ?? ""}`,
        time: new Date(),
        userid: 0
      } });
    }
    await prisma_default.inventoryItem.deleteMany({
      where: {
        id: {
          in: body
        }
      }
    });
    return { status: 200, body: { status: "ok" } };
  }
}));

// api/protected/inventory-item/data/$relay.ts
var import_velona13 = __toESM(require_dist());
function defineController11(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona13.depend)(methods, cb) : methods;
}

// api/protected/inventory-item/data/controller.ts
var import_lodash5 = __toESM(require("lodash"));
var controller_default11 = defineController11(() => ({
  get: async ({ query }) => {
    const where = import_lodash5.default.omitBy(query, (v, k) => k == "select" || k == "limit" || import_lodash5.default.isUndefined(v));
    const items = await prisma_default.inventoryItemData.findMany(
      { where }
    );
    return { status: 200, body: items };
  },
  post: async ({ body }) => {
    const rv = await prisma_default.inventoryItemData.create({ data: body });
    await prisma_default.events.create({ data: {
      description: `{username} created a new item data record: ${rv.name}`,
      time: new Date(),
      userid: 0
    } });
    return { status: 200, body: rv };
  },
  patch: async ({ body }) => {
    const before = await prisma_default.inventoryItemData.findFirst({ where: { id: body.id } });
    const rv = await prisma_default.inventoryItemData.update({ data: import_lodash5.default.omit(body, "id"), where: { id: body.id } });
    await prisma_default.events.create({ data: {
      description: `{username} updated a new item data record: ${(before == null ? void 0 : before.name) ?? ""} -> ${rv.name}`,
      time: new Date(),
      userid: 0
    } });
    return { status: 200, body: rv };
  }
}));

// api/protected/inventory-item/data/image/$relay.ts
var import_velona14 = __toESM(require_dist());
function defineController12(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona14.depend)(methods, cb) : methods;
}

// api/protected/inventory-item/data/image/controller.ts
var import_fs_jetpack2 = __toESM(require("fs-jetpack"));
var import_lodash6 = __toESM(require("lodash"));
var import_path2 = __toESM(require("path"));
var import_uuid2 = require("uuid");
var defaultImagePath = `${API_ORIGIN}/static/icons/dummy.svg`;
var genImagePath = (img) => `${API_ORIGIN}/upload/item-images/${img}`;
var relImagePath = (img) => import_path2.default.resolve(API_UPLOAD_DIR, "item-images", img);
var controller_default12 = defineController12(() => ({
  get: async ({ query }) => {
    if (import_lodash6.default.isUndefined(query))
      return { status: 200, body: defaultImagePath };
    const idata = await prisma_default.inventoryItemData.findFirst({ where: { id: query.id } });
    if (import_lodash6.default.isNull(idata))
      return { status: 200, body: defaultImagePath };
    const relpath = relImagePath(idata.imageURL);
    if (!import_fs_jetpack2.default.exists(relpath))
      return { status: 200, body: defaultImagePath };
    return { status: 200, body: genImagePath(idata.imageURL) };
  },
  post: async ({ body, query }) => {
    const filename = `${(0, import_uuid2.v1)()}${import_path2.default.extname(body.icon.filename)}`;
    const filepath = ``;
    await import_fs_jetpack2.default.writeAsync(filename, await body.icon.toBuffer());
    await prisma_default.inventoryItemData.update({ where: { id: query.id }, data: { imageURL: `` } });
    return { status: 200, body: genImagePath(import_path2.default.basename(filename)) };
  }
}));

// api/protected/inventory-item/data/imgurl/$relay.ts
var import_velona15 = __toESM(require_dist());
function defineController13(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona15.depend)(methods, cb) : methods;
}

// api/protected/inventory-item/data/imgurl/controller.ts
var import_lodash7 = __toESM(require("lodash"));
var defaultImagePath2 = `${API_ORIGIN}/static/icons/dummy.svg`;
var genImagePath2 = (img) => `${API_ORIGIN}/upload/item-images/${img}`;
var controller_default13 = defineController13(() => ({
  get: async ({ query }) => {
    if (import_lodash7.default.isUndefined(query.fileName))
      return { status: 200, body: defaultImagePath2 };
    return {
      status: 200,
      body: genImagePath2(query.fileName)
    };
  }
}));

// api/protected/user/$relay.ts
var import_velona16 = __toESM(require_dist());
function defineController14(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona16.depend)(methods, cb) : methods;
}

// api/protected/user/controller.ts
var import_lodash8 = __toESM(require("lodash"));
var defaultImagePath3 = `${API_ORIGIN}/static/icons/dummy.svg`;
var controller_default14 = defineController14(() => ({
  get: async (req) => {
    if (import_lodash8.default.isUndefined(req.query)) {
      return { status: 200, body: req.user };
    }
    let rv = await prisma_default.user.findFirst({ where: { id: req.query.id } });
    if (import_lodash8.default.isNull(rv))
      return { status: 404 };
    return { status: 200, body: rv };
  }
}));

// api/protected/user/img/$relay.ts
var import_velona17 = __toESM(require_dist());
function defineController15(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona17.depend)(methods, cb) : methods;
}

// service/dirs.ts
var dirs = {
  baseURL: API_ORIGIN,
  dummy: "/static/icons/dummy.svg",
  profileImages: "/uploads/profile-images/",
  itemImages: "/uploads/item-images/"
};
var dirs_default = dirs;

// api/protected/user/img/controller.ts
var import_lodash9 = __toESM(require("lodash"));
var import_uuid3 = require("uuid");
var import_path3 = __toESM(require("path"));
var import_fs_jetpack3 = __toESM(require("fs-jetpack"));
var controller_default15 = defineController15(() => ({
  get: async (req) => {
    if (import_lodash9.default.isUndefined(req.query)) {
      return { status: 200, body: `${dirs_default.baseURL}${dirs_default.profileImages}${req.user.imageURL}` };
    }
    const user = await prisma_default.user.findFirst({ where: { id: req.query.id } });
    if (import_lodash9.default.isNull(user))
      return { status: 404 };
    return { status: 200, body: `${dirs_default.baseURL}${dirs_default.profileImages}${user.imageURL}` };
  },
  post: async (req) => {
    const { icon } = req.body;
    const filename = `${(0, import_uuid3.v1)()}${import_path3.default.extname(icon.filename)}`;
    const filepath = `${API_UPLOAD_DIR}/${filename}`;
    await import_fs_jetpack3.default.writeAsync(filepath, await icon.toBuffer());
    await prisma_default.user.update({ where: { id: req.user.id }, data: { imageURL: filepath } });
    return { status: 200, body: filename };
  }
}));

// api/try-login/$relay.ts
var import_velona18 = __toESM(require_dist());
function defineController16(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona18.depend)(methods, cb) : methods;
}

// api/try-login/controller.ts
var controller_default16 = defineController16(() => ({
  get: async (req) => {
    return {
      status: 200,
      body: {}
    };
  }
}));

// $server.ts
var parseNumberTypeQueryParams = (numberTypeParams) => (req, reply, done) => {
  const query = req.query;
  for (const [key, isOptional, isArray] of numberTypeParams) {
    const param = isArray ? query[`${key}[]`] ?? query[key] : query[key];
    if (isArray) {
      if (!isOptional && param === void 0) {
        query[key] = [];
      } else if (!isOptional || param !== void 0) {
        const vals = (Array.isArray(param) ? param : [param]).map(Number);
        if (vals.some(isNaN)) {
          reply.code(400).send();
          return;
        }
        query[key] = vals;
      }
      delete query[`${key}[]`];
    } else if (!isOptional || param !== void 0) {
      const val = Number(param);
      if (isNaN(val)) {
        reply.code(400).send();
        return;
      }
      query[key] = val;
    }
  }
  done();
};
var callParserIfExistsQuery = (parser) => (req, reply, done) => Object.keys(req.query).length ? parser(req, reply, done) : done();
var createTypedParamsHandler = (numberTypeParams) => (req, reply, done) => {
  const params = req.params;
  for (const key of numberTypeParams) {
    const val = Number(params[key]);
    if (isNaN(val)) {
      reply.code(400).send();
      return;
    }
    params[key] = val;
  }
  done();
};
var formatMultipartData = (arrayTypeKeys) => (req, _12, done) => {
  const body = req.body;
  for (const [key] of arrayTypeKeys) {
    if (body[key] === void 0)
      body[key] = [];
    else if (!Array.isArray(body[key])) {
      body[key] = [body[key]];
    }
  }
  Object.entries(body).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      body[key] = val.map((v) => "file" in v ? v : v.value);
    } else {
      body[key] = "file" in val ? val : val.value;
    }
  });
  for (const [key, isOptional] of arrayTypeKeys) {
    if (!body[key].length && isOptional)
      delete body[key];
  }
  done();
};
var validatorCompiler = ({ schema }) => (data) => {
  const result = schema.safeParse(data);
  return result.success ? { value: result.data } : { error: result.error };
};
var methodToHandler = (methodCallback) => (req, reply) => {
  const data = methodCallback(req);
  if (data.headers)
    reply.headers(data.headers);
  reply.code(data.status).send(data.body);
};
var asyncMethodToHandler = (methodCallback) => async (req, reply) => {
  const data = await methodCallback(req);
  if (data.headers)
    reply.headers(data.headers);
  reply.code(data.status).send(data.body);
};
var server_default = (fastify, options = {}) => {
  const basePath = options.basePath ?? "";
  const hooks0 = hooks_default(fastify);
  const hooks1 = hooks_default2(fastify);
  const validators0 = validators_default(fastify);
  const controller0 = controller_default(fastify);
  const controller1 = controller_default2(fastify);
  const controller2 = controller_default3(fastify);
  const controller3 = controller_default4(fastify);
  const controller4 = controller_default5(fastify);
  const controller5 = controller_default6(fastify);
  const controller6 = controller_default7(fastify);
  const controller7 = controller_default8(fastify);
  const controller8 = controller_default9(fastify);
  const controller9 = controller_default10(fastify);
  const controller10 = controller_default11(fastify);
  const controller11 = controller_default12(fastify);
  const controller12 = controller_default13(fastify);
  const controller13 = controller_default14(fastify);
  const controller14 = controller_default15(fastify);
  const controller15 = controller_default16(fastify);
  fastify.register(import_multipart.default, { attachFieldsToBody: true, limits: { fileSize: 1024 ** 3 }, ...options.multipart });
  fastify.get(
    basePath || "/",
    methodToHandler(controller0.get)
  );
  fastify.get(
    `${basePath}/article`,
    methodToHandler(controller1.get)
  );
  fastify.get(
    `${basePath}/article/:articleId`,
    {
      schema: {
        params: validators0.params
      },
      validatorCompiler,
      preValidation: createTypedParamsHandler(["articleId"])
    },
    methodToHandler(controller2.get)
  );
  fastify.get(
    `${basePath}/dirs`,
    asyncMethodToHandler(controller3.get)
  );
  fastify.post(
    `${basePath}/login`,
    asyncMethodToHandler(controller4.post)
  );
  fastify.get(
    `${basePath}/protected/admin/roles`,
    {
      onRequest: hooks1.onRequest,
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([["id", false, false]])),
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller5.get)
  );
  fastify.post(
    `${basePath}/protected/admin/roles`,
    {
      onRequest: hooks1.onRequest,
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller5.post)
  );
  fastify.post(
    `${basePath}/protected/admin/user`,
    {
      onRequest: hooks1.onRequest,
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller6.post)
  );
  fastify.patch(
    `${basePath}/protected/admin/user`,
    {
      onRequest: hooks1.onRequest,
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller6.patch)
  );
  fastify.get(
    `${basePath}/protected/admin/user/img`,
    {
      onRequest: hooks1.onRequest,
      preValidation: parseNumberTypeQueryParams([["id", false, false]]),
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller7.get)
  );
  fastify.post(
    `${basePath}/protected/admin/user/img`,
    {
      onRequest: hooks1.onRequest,
      preValidation: [
        parseNumberTypeQueryParams([["id", false, false]]),
        formatMultipartData([])
      ],
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller7.post)
  );
  fastify.get(
    `${basePath}/protected/events`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller8.get)
  );
  fastify.get(
    `${basePath}/protected/inventory-item`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller9.get)
  );
  fastify.post(
    `${basePath}/protected/inventory-item`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller9.post)
  );
  fastify.patch(
    `${basePath}/protected/inventory-item`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller9.patch)
  );
  fastify.delete(
    `${basePath}/protected/inventory-item`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller9.delete)
  );
  fastify.get(
    `${basePath}/protected/inventory-item/data`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller10.get)
  );
  fastify.post(
    `${basePath}/protected/inventory-item/data`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller10.post)
  );
  fastify.patch(
    `${basePath}/protected/inventory-item/data`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller10.patch)
  );
  fastify.get(
    `${basePath}/protected/inventory-item/data/image`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([["id", false, false]])),
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller11.get)
  );
  fastify.post(
    `${basePath}/protected/inventory-item/data/image`,
    {
      preValidation: [
        parseNumberTypeQueryParams([["id", false, false]]),
        formatMultipartData([])
      ],
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller11.post)
  );
  fastify.get(
    `${basePath}/protected/inventory-item/data/imgurl`,
    {
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller12.get)
  );
  fastify.get(
    `${basePath}/protected/user`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([["id", false, false]])),
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller13.get)
  );
  fastify.get(
    `${basePath}/protected/user/img`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([["id", false, false]])),
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller14.get)
  );
  fastify.post(
    `${basePath}/protected/user/img`,
    {
      preValidation: formatMultipartData([]),
      preHandler: hooks0.preHandler
    },
    asyncMethodToHandler(controller14.post)
  );
  fastify.get(
    `${basePath}/try-login`,
    asyncMethodToHandler(controller15.get)
  );
  return fastify;
};

// service/app.ts
var import_websocket = __toESM(require("@fastify/websocket"));

// service/encryption.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_client2 = require("@prisma/client");
var import_lodash10 = __toESM(require("lodash"));
var prisma2 = new import_client2.PrismaClient();
var saltRounds = 10;
var encryption_default = {
  hashAndStore: async (userid, pass) => {
    let hash = await import_bcrypt.default.hash(pass, saltRounds);
    await prisma2.user.update({
      where: { id: userid },
      data: {
        password: hash
      }
    });
  },
  compare: async (userid, pass) => {
    let stored = await prisma2.user.findFirst({
      where: { id: userid },
      select: { password: true }
    });
    if (import_lodash10.default.isNull(stored))
      return 2 /* nouser */;
    let comparison = await import_bcrypt.default.compare(pass, stored.password);
    return comparison ? 0 /* correct */ : 1 /* incorrect */;
  }
};

// service/app.ts
var import_client3 = require("@prisma/client");
var import_lodash11 = __toESM(require("lodash"));
var import_fs = __toESM(require("fs"));
var process2 = __toESM(require("process"));
var seed = async () => {
  const prisma3 = new import_client3.PrismaClient();
  const userrole1 = await prisma3.userRole.upsert({
    where: { id: 1 },
    update: {},
    create: {
      value: "Administrator"
    }
  });
  const userrole2 = await prisma3.userRole.upsert({
    where: { id: 2 },
    update: {},
    create: {
      value: "Default User"
    }
  });
  let admin = await prisma3.user.findFirst({ where: { id: 1 } });
  if (import_lodash11.default.isNull(admin)) {
    admin = await prisma3.user.create({
      data: {
        email: "",
        username: "admin",
        password: "",
        active: true,
        roles: {
          connect: [{ id: userrole1.id }]
        },
        imageURL: ""
      }
    });
  }
  await encryption_default.hashAndStore(admin.id, "admin");
};
var init = (serverFactory) => {
  seed();
  const app = (0, import_fastify.default)({ serverFactory });
  app.register(import_helmet.default, { crossOriginResourcePolicy: false });
  app.register(
    import_cors.default
  );
  app.register(import_websocket.default);
  app.register(import_static.default, {
    root: import_path4.default.join(__dirname, "static"),
    prefix: "/static/"
  });
  if (API_UPLOAD_DIR) {
    try {
      if (!import_fs.default.existsSync(API_UPLOAD_DIR)) {
        import_fs.default.mkdirSync(API_UPLOAD_DIR, { recursive: true });
      }
    } catch (e) {
      console.error("Could not create upload directory. Exiting...");
      process2.exit(1);
    }
    app.after(() => {
      app.register(import_static.default, {
        root: API_UPLOAD_DIR,
        prefix: "/upload/",
        decorateReply: false
      });
    });
  }
  app.register(import_jwt2.default, { secret: API_JWT_SECRET });
  server_default(app, { basePath: API_BASE_PATH });
  return app;
};

// entrypoints/index.ts
init().listen({ port: API_SERVER_PORT, host: "0.0.0.0" }).then(() => {
  var _a;
  (_a = process.send) == null ? void 0 : _a.call(process, "ready");
});
