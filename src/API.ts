/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
  isActive?: boolean | null,
  _version?: number | null,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Company = {
  __typename: "Company",
  id: string,
  name?: string | null,
  email?: string | null,
  isActive?: boolean | null,
  Users?: ModelUserConnection | null,
  Factors?: ModelFactorConnection | null,
  Establishment?: ModelEstablishmentConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  sub?: string | null,
  email?: string | null,
  isAdmin?: boolean | null,
  isActive?: boolean | null,
  companyID: string,
  Emisions?: ModelEmisionConnection | null,
  Factors?: ModelFactorConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelEmisionConnection = {
  __typename: "ModelEmisionConnection",
  items:  Array<Emision | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Emision = {
  __typename: "Emision",
  id: string,
  Company: string,
  ALCANCE: string,
  CATEGORIA: string,
  SUBCATEGORIA: string,
  ACTIVIDAD: string,
  COMBUSTIBLE: string,
  UNIDADFE: string,
  CANTIDAD: number,
  CO2: number,
  CH4: number,
  N2O: number,
  SF6: number,
  HFC: number,
  PFC: number,
  NF3: number,
  InicioPeriodo: string,
  TerminoPeriodo: string,
  INCERTIDUMBRE?: string | null,
  ORIGENFE?: string | null,
  userID: string,
  companyID: string,
  EstablishmentID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelFactorConnection = {
  __typename: "ModelFactorConnection",
  items:  Array<Factor | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Factor = {
  __typename: "Factor",
  id: string,
  cod: string,
  ALCANCE: string,
  CATEGORIA: string,
  SUBCATEGORIA: string,
  ACTIVIDAD: string,
  CONCATENADO: string,
  COMBUSTIBLE: string,
  CONTAMINANTE: string,
  INCERTIDUMBRE: string,
  VALORFE: number,
  UNIDADFE: string,
  ORIGENFE: string,
  companyID: string,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelEstablishmentConnection = {
  __typename: "ModelEstablishmentConnection",
  items:  Array<Establishment | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Establishment = {
  __typename: "Establishment",
  id: string,
  name: string,
  companyID: string,
  Emisions?: ModelEmisionConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  isActive?: boolean | null,
  _version?: number | null,
};

export type DeleteCompanyInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  sub?: string | null,
  email?: string | null,
  isAdmin?: boolean | null,
  isActive?: boolean | null,
  companyID: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  sub?: ModelStringInput | null,
  email?: ModelStringInput | null,
  isAdmin?: ModelBooleanInput | null,
  isActive?: ModelBooleanInput | null,
  companyID?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  sub?: string | null,
  email?: string | null,
  isAdmin?: boolean | null,
  isActive?: boolean | null,
  companyID?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateEmisionInput = {
  id?: string | null,
  Company: string,
  ALCANCE: string,
  CATEGORIA: string,
  SUBCATEGORIA: string,
  ACTIVIDAD: string,
  COMBUSTIBLE: string,
  UNIDADFE: string,
  CANTIDAD: number,
  CO2: number,
  CH4: number,
  N2O: number,
  SF6: number,
  HFC: number,
  PFC: number,
  NF3: number,
  InicioPeriodo: string,
  TerminoPeriodo: string,
  INCERTIDUMBRE?: string | null,
  ORIGENFE?: string | null,
  userID: string,
  companyID: string,
  EstablishmentID: string,
  _version?: number | null,
};

export type ModelEmisionConditionInput = {
  Company?: ModelStringInput | null,
  ALCANCE?: ModelStringInput | null,
  CATEGORIA?: ModelStringInput | null,
  SUBCATEGORIA?: ModelStringInput | null,
  ACTIVIDAD?: ModelStringInput | null,
  COMBUSTIBLE?: ModelStringInput | null,
  UNIDADFE?: ModelStringInput | null,
  CANTIDAD?: ModelFloatInput | null,
  CO2?: ModelFloatInput | null,
  CH4?: ModelFloatInput | null,
  N2O?: ModelFloatInput | null,
  SF6?: ModelFloatInput | null,
  HFC?: ModelFloatInput | null,
  PFC?: ModelFloatInput | null,
  NF3?: ModelFloatInput | null,
  InicioPeriodo?: ModelStringInput | null,
  TerminoPeriodo?: ModelStringInput | null,
  INCERTIDUMBRE?: ModelStringInput | null,
  ORIGENFE?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  companyID?: ModelIDInput | null,
  EstablishmentID?: ModelIDInput | null,
  and?: Array< ModelEmisionConditionInput | null > | null,
  or?: Array< ModelEmisionConditionInput | null > | null,
  not?: ModelEmisionConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateEmisionInput = {
  id: string,
  Company?: string | null,
  ALCANCE?: string | null,
  CATEGORIA?: string | null,
  SUBCATEGORIA?: string | null,
  ACTIVIDAD?: string | null,
  COMBUSTIBLE?: string | null,
  UNIDADFE?: string | null,
  CANTIDAD?: number | null,
  CO2?: number | null,
  CH4?: number | null,
  N2O?: number | null,
  SF6?: number | null,
  HFC?: number | null,
  PFC?: number | null,
  NF3?: number | null,
  InicioPeriodo?: string | null,
  TerminoPeriodo?: string | null,
  INCERTIDUMBRE?: string | null,
  ORIGENFE?: string | null,
  userID?: string | null,
  companyID?: string | null,
  EstablishmentID?: string | null,
  _version?: number | null,
};

export type DeleteEmisionInput = {
  id: string,
  _version?: number | null,
};

export type CreateFactorInput = {
  id?: string | null,
  cod: string,
  ALCANCE: string,
  CATEGORIA: string,
  SUBCATEGORIA: string,
  ACTIVIDAD: string,
  CONCATENADO: string,
  COMBUSTIBLE: string,
  CONTAMINANTE: string,
  INCERTIDUMBRE: string,
  VALORFE: number,
  UNIDADFE: string,
  ORIGENFE: string,
  companyID: string,
  userID: string,
  _version?: number | null,
};

export type ModelFactorConditionInput = {
  cod?: ModelStringInput | null,
  ALCANCE?: ModelStringInput | null,
  CATEGORIA?: ModelStringInput | null,
  SUBCATEGORIA?: ModelStringInput | null,
  ACTIVIDAD?: ModelStringInput | null,
  CONCATENADO?: ModelStringInput | null,
  COMBUSTIBLE?: ModelStringInput | null,
  CONTAMINANTE?: ModelStringInput | null,
  INCERTIDUMBRE?: ModelStringInput | null,
  VALORFE?: ModelFloatInput | null,
  UNIDADFE?: ModelStringInput | null,
  ORIGENFE?: ModelStringInput | null,
  companyID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelFactorConditionInput | null > | null,
  or?: Array< ModelFactorConditionInput | null > | null,
  not?: ModelFactorConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateFactorInput = {
  id: string,
  cod?: string | null,
  ALCANCE?: string | null,
  CATEGORIA?: string | null,
  SUBCATEGORIA?: string | null,
  ACTIVIDAD?: string | null,
  CONCATENADO?: string | null,
  COMBUSTIBLE?: string | null,
  CONTAMINANTE?: string | null,
  INCERTIDUMBRE?: string | null,
  VALORFE?: number | null,
  UNIDADFE?: string | null,
  ORIGENFE?: string | null,
  companyID?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteFactorInput = {
  id: string,
  _version?: number | null,
};

export type CreateEstablishmentInput = {
  id?: string | null,
  name: string,
  companyID: string,
  _version?: number | null,
};

export type ModelEstablishmentConditionInput = {
  name?: ModelStringInput | null,
  companyID?: ModelIDInput | null,
  and?: Array< ModelEstablishmentConditionInput | null > | null,
  or?: Array< ModelEstablishmentConditionInput | null > | null,
  not?: ModelEstablishmentConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateEstablishmentInput = {
  id: string,
  name?: string | null,
  companyID?: string | null,
  _version?: number | null,
};

export type DeleteEstablishmentInput = {
  id: string,
  _version?: number | null,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection",
  items:  Array<Company | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  sub?: ModelStringInput | null,
  email?: ModelStringInput | null,
  isAdmin?: ModelBooleanInput | null,
  isActive?: ModelBooleanInput | null,
  companyID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelEmisionFilterInput = {
  id?: ModelIDInput | null,
  Company?: ModelStringInput | null,
  ALCANCE?: ModelStringInput | null,
  CATEGORIA?: ModelStringInput | null,
  SUBCATEGORIA?: ModelStringInput | null,
  ACTIVIDAD?: ModelStringInput | null,
  COMBUSTIBLE?: ModelStringInput | null,
  UNIDADFE?: ModelStringInput | null,
  CANTIDAD?: ModelFloatInput | null,
  CO2?: ModelFloatInput | null,
  CH4?: ModelFloatInput | null,
  N2O?: ModelFloatInput | null,
  SF6?: ModelFloatInput | null,
  HFC?: ModelFloatInput | null,
  PFC?: ModelFloatInput | null,
  NF3?: ModelFloatInput | null,
  InicioPeriodo?: ModelStringInput | null,
  TerminoPeriodo?: ModelStringInput | null,
  INCERTIDUMBRE?: ModelStringInput | null,
  ORIGENFE?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  companyID?: ModelIDInput | null,
  EstablishmentID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEmisionFilterInput | null > | null,
  or?: Array< ModelEmisionFilterInput | null > | null,
  not?: ModelEmisionFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelFactorFilterInput = {
  id?: ModelIDInput | null,
  cod?: ModelStringInput | null,
  ALCANCE?: ModelStringInput | null,
  CATEGORIA?: ModelStringInput | null,
  SUBCATEGORIA?: ModelStringInput | null,
  ACTIVIDAD?: ModelStringInput | null,
  CONCATENADO?: ModelStringInput | null,
  COMBUSTIBLE?: ModelStringInput | null,
  CONTAMINANTE?: ModelStringInput | null,
  INCERTIDUMBRE?: ModelStringInput | null,
  VALORFE?: ModelFloatInput | null,
  UNIDADFE?: ModelStringInput | null,
  ORIGENFE?: ModelStringInput | null,
  companyID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelFactorFilterInput | null > | null,
  or?: Array< ModelFactorFilterInput | null > | null,
  not?: ModelFactorFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelEstablishmentFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  companyID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEstablishmentFilterInput | null > | null,
  or?: Array< ModelEstablishmentFilterInput | null > | null,
  not?: ModelEstablishmentFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionCompanyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
  or?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  sub?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  isAdmin?: ModelSubscriptionBooleanInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  companyID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmisionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  Company?: ModelSubscriptionStringInput | null,
  ALCANCE?: ModelSubscriptionStringInput | null,
  CATEGORIA?: ModelSubscriptionStringInput | null,
  SUBCATEGORIA?: ModelSubscriptionStringInput | null,
  ACTIVIDAD?: ModelSubscriptionStringInput | null,
  COMBUSTIBLE?: ModelSubscriptionStringInput | null,
  UNIDADFE?: ModelSubscriptionStringInput | null,
  CANTIDAD?: ModelSubscriptionFloatInput | null,
  CO2?: ModelSubscriptionFloatInput | null,
  CH4?: ModelSubscriptionFloatInput | null,
  N2O?: ModelSubscriptionFloatInput | null,
  SF6?: ModelSubscriptionFloatInput | null,
  HFC?: ModelSubscriptionFloatInput | null,
  PFC?: ModelSubscriptionFloatInput | null,
  NF3?: ModelSubscriptionFloatInput | null,
  InicioPeriodo?: ModelSubscriptionStringInput | null,
  TerminoPeriodo?: ModelSubscriptionStringInput | null,
  INCERTIDUMBRE?: ModelSubscriptionStringInput | null,
  ORIGENFE?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  companyID?: ModelSubscriptionIDInput | null,
  EstablishmentID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmisionFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmisionFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionFactorFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cod?: ModelSubscriptionStringInput | null,
  ALCANCE?: ModelSubscriptionStringInput | null,
  CATEGORIA?: ModelSubscriptionStringInput | null,
  SUBCATEGORIA?: ModelSubscriptionStringInput | null,
  ACTIVIDAD?: ModelSubscriptionStringInput | null,
  CONCATENADO?: ModelSubscriptionStringInput | null,
  COMBUSTIBLE?: ModelSubscriptionStringInput | null,
  CONTAMINANTE?: ModelSubscriptionStringInput | null,
  INCERTIDUMBRE?: ModelSubscriptionStringInput | null,
  VALORFE?: ModelSubscriptionFloatInput | null,
  UNIDADFE?: ModelSubscriptionStringInput | null,
  ORIGENFE?: ModelSubscriptionStringInput | null,
  companyID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFactorFilterInput | null > | null,
  or?: Array< ModelSubscriptionFactorFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionEstablishmentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  companyID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEstablishmentFilterInput | null > | null,
  or?: Array< ModelSubscriptionEstablishmentFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateEmisionMutationVariables = {
  input: CreateEmisionInput,
  condition?: ModelEmisionConditionInput | null,
};

export type CreateEmisionMutation = {
  createEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateEmisionMutationVariables = {
  input: UpdateEmisionInput,
  condition?: ModelEmisionConditionInput | null,
};

export type UpdateEmisionMutation = {
  updateEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteEmisionMutationVariables = {
  input: DeleteEmisionInput,
  condition?: ModelEmisionConditionInput | null,
};

export type DeleteEmisionMutation = {
  deleteEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateFactorMutationVariables = {
  input: CreateFactorInput,
  condition?: ModelFactorConditionInput | null,
};

export type CreateFactorMutation = {
  createFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateFactorMutationVariables = {
  input: UpdateFactorInput,
  condition?: ModelFactorConditionInput | null,
};

export type UpdateFactorMutation = {
  updateFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteFactorMutationVariables = {
  input: DeleteFactorInput,
  condition?: ModelFactorConditionInput | null,
};

export type DeleteFactorMutation = {
  deleteFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateEstablishmentMutationVariables = {
  input: CreateEstablishmentInput,
  condition?: ModelEstablishmentConditionInput | null,
};

export type CreateEstablishmentMutation = {
  createEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateEstablishmentMutationVariables = {
  input: UpdateEstablishmentInput,
  condition?: ModelEstablishmentConditionInput | null,
};

export type UpdateEstablishmentMutation = {
  updateEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteEstablishmentMutationVariables = {
  input: DeleteEstablishmentInput,
  condition?: ModelEstablishmentConditionInput | null,
};

export type DeleteEstablishmentMutation = {
  deleteEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCompaniesQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompaniesQuery = {
  listCompanies?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name?: string | null,
      email?: string | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCompaniesQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCompaniesQuery = {
  syncCompanies?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name?: string | null,
      email?: string | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      sub?: string | null,
      email?: string | null,
      isAdmin?: boolean | null,
      isActive?: boolean | null,
      companyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      sub?: string | null,
      email?: string | null,
      isAdmin?: boolean | null,
      isActive?: boolean | null,
      companyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByCompanyIDQueryVariables = {
  companyID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByCompanyIDQuery = {
  usersByCompanyID?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      sub?: string | null,
      email?: string | null,
      isAdmin?: boolean | null,
      isActive?: boolean | null,
      companyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEmisionQueryVariables = {
  id: string,
};

export type GetEmisionQuery = {
  getEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListEmisionsQueryVariables = {
  filter?: ModelEmisionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmisionsQuery = {
  listEmisions?:  {
    __typename: "ModelEmisionConnection",
    items:  Array< {
      __typename: "Emision",
      id: string,
      Company: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      COMBUSTIBLE: string,
      UNIDADFE: string,
      CANTIDAD: number,
      CO2: number,
      CH4: number,
      N2O: number,
      SF6: number,
      HFC: number,
      PFC: number,
      NF3: number,
      InicioPeriodo: string,
      TerminoPeriodo: string,
      INCERTIDUMBRE?: string | null,
      ORIGENFE?: string | null,
      userID: string,
      companyID: string,
      EstablishmentID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEmisionsQueryVariables = {
  filter?: ModelEmisionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmisionsQuery = {
  syncEmisions?:  {
    __typename: "ModelEmisionConnection",
    items:  Array< {
      __typename: "Emision",
      id: string,
      Company: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      COMBUSTIBLE: string,
      UNIDADFE: string,
      CANTIDAD: number,
      CO2: number,
      CH4: number,
      N2O: number,
      SF6: number,
      HFC: number,
      PFC: number,
      NF3: number,
      InicioPeriodo: string,
      TerminoPeriodo: string,
      INCERTIDUMBRE?: string | null,
      ORIGENFE?: string | null,
      userID: string,
      companyID: string,
      EstablishmentID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmisionsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmisionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmisionsByUserIDQuery = {
  emisionsByUserID?:  {
    __typename: "ModelEmisionConnection",
    items:  Array< {
      __typename: "Emision",
      id: string,
      Company: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      COMBUSTIBLE: string,
      UNIDADFE: string,
      CANTIDAD: number,
      CO2: number,
      CH4: number,
      N2O: number,
      SF6: number,
      HFC: number,
      PFC: number,
      NF3: number,
      InicioPeriodo: string,
      TerminoPeriodo: string,
      INCERTIDUMBRE?: string | null,
      ORIGENFE?: string | null,
      userID: string,
      companyID: string,
      EstablishmentID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmisionsByCompanyIDQueryVariables = {
  companyID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmisionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmisionsByCompanyIDQuery = {
  emisionsByCompanyID?:  {
    __typename: "ModelEmisionConnection",
    items:  Array< {
      __typename: "Emision",
      id: string,
      Company: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      COMBUSTIBLE: string,
      UNIDADFE: string,
      CANTIDAD: number,
      CO2: number,
      CH4: number,
      N2O: number,
      SF6: number,
      HFC: number,
      PFC: number,
      NF3: number,
      InicioPeriodo: string,
      TerminoPeriodo: string,
      INCERTIDUMBRE?: string | null,
      ORIGENFE?: string | null,
      userID: string,
      companyID: string,
      EstablishmentID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmisionsByEstablishmentIDQueryVariables = {
  EstablishmentID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmisionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmisionsByEstablishmentIDQuery = {
  emisionsByEstablishmentID?:  {
    __typename: "ModelEmisionConnection",
    items:  Array< {
      __typename: "Emision",
      id: string,
      Company: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      COMBUSTIBLE: string,
      UNIDADFE: string,
      CANTIDAD: number,
      CO2: number,
      CH4: number,
      N2O: number,
      SF6: number,
      HFC: number,
      PFC: number,
      NF3: number,
      InicioPeriodo: string,
      TerminoPeriodo: string,
      INCERTIDUMBRE?: string | null,
      ORIGENFE?: string | null,
      userID: string,
      companyID: string,
      EstablishmentID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetFactorQueryVariables = {
  id: string,
};

export type GetFactorQuery = {
  getFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListFactorsQueryVariables = {
  filter?: ModelFactorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFactorsQuery = {
  listFactors?:  {
    __typename: "ModelFactorConnection",
    items:  Array< {
      __typename: "Factor",
      id: string,
      cod: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      CONCATENADO: string,
      COMBUSTIBLE: string,
      CONTAMINANTE: string,
      INCERTIDUMBRE: string,
      VALORFE: number,
      UNIDADFE: string,
      ORIGENFE: string,
      companyID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncFactorsQueryVariables = {
  filter?: ModelFactorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncFactorsQuery = {
  syncFactors?:  {
    __typename: "ModelFactorConnection",
    items:  Array< {
      __typename: "Factor",
      id: string,
      cod: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      CONCATENADO: string,
      COMBUSTIBLE: string,
      CONTAMINANTE: string,
      INCERTIDUMBRE: string,
      VALORFE: number,
      UNIDADFE: string,
      ORIGENFE: string,
      companyID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type FactorsByCompanyIDQueryVariables = {
  companyID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFactorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FactorsByCompanyIDQuery = {
  factorsByCompanyID?:  {
    __typename: "ModelFactorConnection",
    items:  Array< {
      __typename: "Factor",
      id: string,
      cod: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      CONCATENADO: string,
      COMBUSTIBLE: string,
      CONTAMINANTE: string,
      INCERTIDUMBRE: string,
      VALORFE: number,
      UNIDADFE: string,
      ORIGENFE: string,
      companyID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type FactorsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFactorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FactorsByUserIDQuery = {
  factorsByUserID?:  {
    __typename: "ModelFactorConnection",
    items:  Array< {
      __typename: "Factor",
      id: string,
      cod: string,
      ALCANCE: string,
      CATEGORIA: string,
      SUBCATEGORIA: string,
      ACTIVIDAD: string,
      CONCATENADO: string,
      COMBUSTIBLE: string,
      CONTAMINANTE: string,
      INCERTIDUMBRE: string,
      VALORFE: number,
      UNIDADFE: string,
      ORIGENFE: string,
      companyID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEstablishmentQueryVariables = {
  id: string,
};

export type GetEstablishmentQuery = {
  getEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListEstablishmentsQueryVariables = {
  filter?: ModelEstablishmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEstablishmentsQuery = {
  listEstablishments?:  {
    __typename: "ModelEstablishmentConnection",
    items:  Array< {
      __typename: "Establishment",
      id: string,
      name: string,
      companyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEstablishmentsQueryVariables = {
  filter?: ModelEstablishmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEstablishmentsQuery = {
  syncEstablishments?:  {
    __typename: "ModelEstablishmentConnection",
    items:  Array< {
      __typename: "Establishment",
      id: string,
      name: string,
      companyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EstablishmentsByCompanyIDQueryVariables = {
  companyID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEstablishmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EstablishmentsByCompanyIDQuery = {
  establishmentsByCompanyID?:  {
    __typename: "ModelEstablishmentConnection",
    items:  Array< {
      __typename: "Establishment",
      id: string,
      name: string,
      companyID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany?:  {
    __typename: "Company",
    id: string,
    name?: string | null,
    email?: string | null,
    isActive?: boolean | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Establishment?:  {
      __typename: "ModelEstablishmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    sub?: string | null,
    email?: string | null,
    isAdmin?: boolean | null,
    isActive?: boolean | null,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Factors?:  {
      __typename: "ModelFactorConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateEmisionSubscriptionVariables = {
  filter?: ModelSubscriptionEmisionFilterInput | null,
  owner?: string | null,
};

export type OnCreateEmisionSubscription = {
  onCreateEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateEmisionSubscriptionVariables = {
  filter?: ModelSubscriptionEmisionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEmisionSubscription = {
  onUpdateEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteEmisionSubscriptionVariables = {
  filter?: ModelSubscriptionEmisionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEmisionSubscription = {
  onDeleteEmision?:  {
    __typename: "Emision",
    id: string,
    Company: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    COMBUSTIBLE: string,
    UNIDADFE: string,
    CANTIDAD: number,
    CO2: number,
    CH4: number,
    N2O: number,
    SF6: number,
    HFC: number,
    PFC: number,
    NF3: number,
    InicioPeriodo: string,
    TerminoPeriodo: string,
    INCERTIDUMBRE?: string | null,
    ORIGENFE?: string | null,
    userID: string,
    companyID: string,
    EstablishmentID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateFactorSubscriptionVariables = {
  filter?: ModelSubscriptionFactorFilterInput | null,
  owner?: string | null,
};

export type OnCreateFactorSubscription = {
  onCreateFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateFactorSubscriptionVariables = {
  filter?: ModelSubscriptionFactorFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFactorSubscription = {
  onUpdateFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteFactorSubscriptionVariables = {
  filter?: ModelSubscriptionFactorFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFactorSubscription = {
  onDeleteFactor?:  {
    __typename: "Factor",
    id: string,
    cod: string,
    ALCANCE: string,
    CATEGORIA: string,
    SUBCATEGORIA: string,
    ACTIVIDAD: string,
    CONCATENADO: string,
    COMBUSTIBLE: string,
    CONTAMINANTE: string,
    INCERTIDUMBRE: string,
    VALORFE: number,
    UNIDADFE: string,
    ORIGENFE: string,
    companyID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateEstablishmentSubscriptionVariables = {
  filter?: ModelSubscriptionEstablishmentFilterInput | null,
  owner?: string | null,
};

export type OnCreateEstablishmentSubscription = {
  onCreateEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateEstablishmentSubscriptionVariables = {
  filter?: ModelSubscriptionEstablishmentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEstablishmentSubscription = {
  onUpdateEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteEstablishmentSubscriptionVariables = {
  filter?: ModelSubscriptionEstablishmentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEstablishmentSubscription = {
  onDeleteEstablishment?:  {
    __typename: "Establishment",
    id: string,
    name: string,
    companyID: string,
    Emisions?:  {
      __typename: "ModelEmisionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
