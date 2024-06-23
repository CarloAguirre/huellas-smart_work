/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCompany = /* GraphQL */ `query GetCompany($id: ID!) {
  getCompany(id: $id) {
    id
    name
    email
    isActive
    Users {
      nextToken
      startedAt
      __typename
    }
    Factors {
      nextToken
      startedAt
      __typename
    }
    Establishment {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCompanyQueryVariables,
  APITypes.GetCompanyQuery
>;
export const listCompanies = /* GraphQL */ `query ListCompanies(
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
) {
  listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      isActive
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCompaniesQueryVariables,
  APITypes.ListCompaniesQuery
>;
export const syncCompanies = /* GraphQL */ `query SyncCompanies(
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncCompanies(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      email
      isActive
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCompaniesQueryVariables,
  APITypes.SyncCompaniesQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    sub
    email
    isAdmin
    isActive
    companyID
    Emisions {
      nextToken
      startedAt
      __typename
    }
    Factors {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      sub
      email
      isAdmin
      isActive
      companyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const syncUsers = /* GraphQL */ `query SyncUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      sub
      email
      isAdmin
      isActive
      companyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncUsersQueryVariables, APITypes.SyncUsersQuery>;
export const usersByCompanyID = /* GraphQL */ `query UsersByCompanyID(
  $companyID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByCompanyID(
    companyID: $companyID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      sub
      email
      isAdmin
      isActive
      companyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByCompanyIDQueryVariables,
  APITypes.UsersByCompanyIDQuery
>;
export const getEmision = /* GraphQL */ `query GetEmision($id: ID!) {
  getEmision(id: $id) {
    id
    Company
    ALCANCE
    CATEGORIA
    SUBCATEGORIA
    ACTIVIDAD
    COMBUSTIBLE
    UNIDADFE
    CANTIDAD
    CO2
    CH4
    N2O
    SF6
    HFC
    PFC
    NF3
    InicioPeriodo
    TerminoPeriodo
    INCERTIDUMBRE
    ORIGENFE
    userID
    companyID
    EstablishmentID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEmisionQueryVariables,
  APITypes.GetEmisionQuery
>;
export const listEmisions = /* GraphQL */ `query ListEmisions(
  $filter: ModelEmisionFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Company
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      COMBUSTIBLE
      UNIDADFE
      CANTIDAD
      CO2
      CH4
      N2O
      SF6
      HFC
      PFC
      NF3
      InicioPeriodo
      TerminoPeriodo
      INCERTIDUMBRE
      ORIGENFE
      userID
      companyID
      EstablishmentID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEmisionsQueryVariables,
  APITypes.ListEmisionsQuery
>;
export const syncEmisions = /* GraphQL */ `query SyncEmisions(
  $filter: ModelEmisionFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmisions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Company
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      COMBUSTIBLE
      UNIDADFE
      CANTIDAD
      CO2
      CH4
      N2O
      SF6
      HFC
      PFC
      NF3
      InicioPeriodo
      TerminoPeriodo
      INCERTIDUMBRE
      ORIGENFE
      userID
      companyID
      EstablishmentID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncEmisionsQueryVariables,
  APITypes.SyncEmisionsQuery
>;
export const emisionsByUserID = /* GraphQL */ `query EmisionsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmisionFilterInput
  $limit: Int
  $nextToken: String
) {
  emisionsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      Company
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      COMBUSTIBLE
      UNIDADFE
      CANTIDAD
      CO2
      CH4
      N2O
      SF6
      HFC
      PFC
      NF3
      InicioPeriodo
      TerminoPeriodo
      INCERTIDUMBRE
      ORIGENFE
      userID
      companyID
      EstablishmentID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmisionsByUserIDQueryVariables,
  APITypes.EmisionsByUserIDQuery
>;
export const emisionsByCompanyID = /* GraphQL */ `query EmisionsByCompanyID(
  $companyID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmisionFilterInput
  $limit: Int
  $nextToken: String
) {
  emisionsByCompanyID(
    companyID: $companyID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      Company
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      COMBUSTIBLE
      UNIDADFE
      CANTIDAD
      CO2
      CH4
      N2O
      SF6
      HFC
      PFC
      NF3
      InicioPeriodo
      TerminoPeriodo
      INCERTIDUMBRE
      ORIGENFE
      userID
      companyID
      EstablishmentID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmisionsByCompanyIDQueryVariables,
  APITypes.EmisionsByCompanyIDQuery
>;
export const emisionsByEstablishmentID = /* GraphQL */ `query EmisionsByEstablishmentID(
  $EstablishmentID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmisionFilterInput
  $limit: Int
  $nextToken: String
) {
  emisionsByEstablishmentID(
    EstablishmentID: $EstablishmentID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      Company
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      COMBUSTIBLE
      UNIDADFE
      CANTIDAD
      CO2
      CH4
      N2O
      SF6
      HFC
      PFC
      NF3
      InicioPeriodo
      TerminoPeriodo
      INCERTIDUMBRE
      ORIGENFE
      userID
      companyID
      EstablishmentID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmisionsByEstablishmentIDQueryVariables,
  APITypes.EmisionsByEstablishmentIDQuery
>;
export const getFactor = /* GraphQL */ `query GetFactor($id: ID!) {
  getFactor(id: $id) {
    id
    cod
    ALCANCE
    CATEGORIA
    SUBCATEGORIA
    ACTIVIDAD
    CONCATENADO
    COMBUSTIBLE
    CONTAMINANTE
    INCERTIDUMBRE
    VALORFE
    UNIDADFE
    ORIGENFE
    companyID
    userID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetFactorQueryVariables, APITypes.GetFactorQuery>;
export const listFactors = /* GraphQL */ `query ListFactors(
  $filter: ModelFactorFilterInput
  $limit: Int
  $nextToken: String
) {
  listFactors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      cod
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      CONCATENADO
      COMBUSTIBLE
      CONTAMINANTE
      INCERTIDUMBRE
      VALORFE
      UNIDADFE
      ORIGENFE
      companyID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFactorsQueryVariables,
  APITypes.ListFactorsQuery
>;
export const syncFactors = /* GraphQL */ `query SyncFactors(
  $filter: ModelFactorFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncFactors(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      cod
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      CONCATENADO
      COMBUSTIBLE
      CONTAMINANTE
      INCERTIDUMBRE
      VALORFE
      UNIDADFE
      ORIGENFE
      companyID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncFactorsQueryVariables,
  APITypes.SyncFactorsQuery
>;
export const factorsByCompanyID = /* GraphQL */ `query FactorsByCompanyID(
  $companyID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelFactorFilterInput
  $limit: Int
  $nextToken: String
) {
  factorsByCompanyID(
    companyID: $companyID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      cod
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      CONCATENADO
      COMBUSTIBLE
      CONTAMINANTE
      INCERTIDUMBRE
      VALORFE
      UNIDADFE
      ORIGENFE
      companyID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FactorsByCompanyIDQueryVariables,
  APITypes.FactorsByCompanyIDQuery
>;
export const factorsByUserID = /* GraphQL */ `query FactorsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelFactorFilterInput
  $limit: Int
  $nextToken: String
) {
  factorsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      cod
      ALCANCE
      CATEGORIA
      SUBCATEGORIA
      ACTIVIDAD
      CONCATENADO
      COMBUSTIBLE
      CONTAMINANTE
      INCERTIDUMBRE
      VALORFE
      UNIDADFE
      ORIGENFE
      companyID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FactorsByUserIDQueryVariables,
  APITypes.FactorsByUserIDQuery
>;
export const getEstablishment = /* GraphQL */ `query GetEstablishment($id: ID!) {
  getEstablishment(id: $id) {
    id
    name
    companyID
    Emisions {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEstablishmentQueryVariables,
  APITypes.GetEstablishmentQuery
>;
export const listEstablishments = /* GraphQL */ `query ListEstablishments(
  $filter: ModelEstablishmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listEstablishments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      companyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEstablishmentsQueryVariables,
  APITypes.ListEstablishmentsQuery
>;
export const syncEstablishments = /* GraphQL */ `query SyncEstablishments(
  $filter: ModelEstablishmentFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEstablishments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      companyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncEstablishmentsQueryVariables,
  APITypes.SyncEstablishmentsQuery
>;
export const establishmentsByCompanyID = /* GraphQL */ `query EstablishmentsByCompanyID(
  $companyID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEstablishmentFilterInput
  $limit: Int
  $nextToken: String
) {
  establishmentsByCompanyID(
    companyID: $companyID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      companyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EstablishmentsByCompanyIDQueryVariables,
  APITypes.EstablishmentsByCompanyIDQuery
>;
