import { InjectionKey } from 'vue';

export type capitalizedFunction = (str: string) => string;
export type isEmptyFunction = (value?: any) => boolean;
export const capitalizedKey: InjectionKey<capitalizedFunction> = Symbol('');
export const isEmptyKey: InjectionKey<isEmptyFunction> = Symbol('');
