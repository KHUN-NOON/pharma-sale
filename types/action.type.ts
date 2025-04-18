import { ServiceResponseType } from "./service.type";

export type ActionResponseType<T> = ServiceResponseType<T> & { errors?: Record<string, string[]>; };