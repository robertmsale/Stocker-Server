import {FastifyRequest, FastifyReply} from "fastify";

export type AdditionalRequest = Pick<FastifyRequest, 'cookies'> & {
  setCookie: (...args: Parameters<FastifyReply['setCookie']>) => void;
  token: string;
};