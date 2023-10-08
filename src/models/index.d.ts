import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





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