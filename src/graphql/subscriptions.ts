/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCompany = /* GraphQL */ `subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onCreateCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCompanySubscriptionVariables,
  APITypes.OnCreateCompanySubscription
>;
export const onUpdateCompany = /* GraphQL */ `subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onUpdateCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCompanySubscriptionVariables,
  APITypes.OnUpdateCompanySubscription
>;
export const onDeleteCompany = /* GraphQL */ `subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onDeleteCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCompanySubscriptionVariables,
  APITypes.OnDeleteCompanySubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateEmision = /* GraphQL */ `subscription OnCreateEmision(
  $filter: ModelSubscriptionEmisionFilterInput
  $owner: String
) {
  onCreateEmision(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEmisionSubscriptionVariables,
  APITypes.OnCreateEmisionSubscription
>;
export const onUpdateEmision = /* GraphQL */ `subscription OnUpdateEmision(
  $filter: ModelSubscriptionEmisionFilterInput
  $owner: String
) {
  onUpdateEmision(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEmisionSubscriptionVariables,
  APITypes.OnUpdateEmisionSubscription
>;
export const onDeleteEmision = /* GraphQL */ `subscription OnDeleteEmision(
  $filter: ModelSubscriptionEmisionFilterInput
  $owner: String
) {
  onDeleteEmision(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEmisionSubscriptionVariables,
  APITypes.OnDeleteEmisionSubscription
>;
export const onCreateFactor = /* GraphQL */ `subscription OnCreateFactor(
  $filter: ModelSubscriptionFactorFilterInput
  $owner: String
) {
  onCreateFactor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFactorSubscriptionVariables,
  APITypes.OnCreateFactorSubscription
>;
export const onUpdateFactor = /* GraphQL */ `subscription OnUpdateFactor(
  $filter: ModelSubscriptionFactorFilterInput
  $owner: String
) {
  onUpdateFactor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFactorSubscriptionVariables,
  APITypes.OnUpdateFactorSubscription
>;
export const onDeleteFactor = /* GraphQL */ `subscription OnDeleteFactor(
  $filter: ModelSubscriptionFactorFilterInput
  $owner: String
) {
  onDeleteFactor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFactorSubscriptionVariables,
  APITypes.OnDeleteFactorSubscription
>;
export const onCreateEstablishment = /* GraphQL */ `subscription OnCreateEstablishment(
  $filter: ModelSubscriptionEstablishmentFilterInput
  $owner: String
) {
  onCreateEstablishment(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEstablishmentSubscriptionVariables,
  APITypes.OnCreateEstablishmentSubscription
>;
export const onUpdateEstablishment = /* GraphQL */ `subscription OnUpdateEstablishment(
  $filter: ModelSubscriptionEstablishmentFilterInput
  $owner: String
) {
  onUpdateEstablishment(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEstablishmentSubscriptionVariables,
  APITypes.OnUpdateEstablishmentSubscription
>;
export const onDeleteEstablishment = /* GraphQL */ `subscription OnDeleteEstablishment(
  $filter: ModelSubscriptionEstablishmentFilterInput
  $owner: String
) {
  onDeleteEstablishment(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEstablishmentSubscriptionVariables,
  APITypes.OnDeleteEstablishmentSubscription
>;
