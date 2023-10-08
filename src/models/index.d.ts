import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerEmision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Emision, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Company: string;
  readonly ALCANCE: string;
  readonly CATEGORIA: string;
  readonly SUBCATEGORIA: string;
  readonly ACTIVIDAD: string;
  readonly CONCATENADO: string;
  readonly COMBUSTIBLE: string;
  readonly UNIDADFE: string;
  readonly CANTIDAD: number;
  readonly CO2: number;
  readonly CH4: number;
  readonly N2O: number;
  readonly SF6: number;
  readonly HFC: number;
  readonly PFC: number;
  readonly NF3: number;
  readonly InicioPeriodo: string;
  readonly TerminoPeriodo: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Emision, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Company: string;
  readonly ALCANCE: string;
  readonly CATEGORIA: string;
  readonly SUBCATEGORIA: string;
  readonly ACTIVIDAD: string;
  readonly CONCATENADO: string;
  readonly COMBUSTIBLE: string;
  readonly UNIDADFE: string;
  readonly CANTIDAD: number;
  readonly CO2: number;
  readonly CH4: number;
  readonly N2O: number;
  readonly SF6: number;
  readonly HFC: number;
  readonly PFC: number;
  readonly NF3: number;
  readonly InicioPeriodo: string;
  readonly TerminoPeriodo: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Emision = LazyLoading extends LazyLoadingDisabled ? EagerEmision : LazyEmision

export declare const Emision: (new (init: ModelInit<Emision>) => Emision) & {
  copyOf(source: Emision, mutator: (draft: MutableModel<Emision>) => MutableModel<Emision> | void): Emision;
}

type EagerFactor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Factor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cod: string;
  readonly ALCANCE: string;
  readonly CATEGORIA: string;
  readonly SUBCATEGORIA: string;
  readonly ACTIVIDAD: string;
  readonly CONCATENADO: string;
  readonly COMBUSTIBLE: string;
  readonly CONTAMINANTE: string;
  readonly INCERTIDUMBRE: string;
  readonly VALORFE: number;
  readonly UNIDADFE: string;
  readonly ORIGENFE: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFactor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Factor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cod: string;
  readonly ALCANCE: string;
  readonly CATEGORIA: string;
  readonly SUBCATEGORIA: string;
  readonly ACTIVIDAD: string;
  readonly CONCATENADO: string;
  readonly COMBUSTIBLE: string;
  readonly CONTAMINANTE: string;
  readonly INCERTIDUMBRE: string;
  readonly VALORFE: number;
  readonly UNIDADFE: string;
  readonly ORIGENFE: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Factor = LazyLoading extends LazyLoadingDisabled ? EagerFactor : LazyFactor

export declare const Factor: (new (init: ModelInit<Factor>) => Factor) & {
  copyOf(source: Factor, mutator: (draft: MutableModel<Factor>) => MutableModel<Factor> | void): Factor;
}