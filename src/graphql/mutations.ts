/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCompany = /* GraphQL */ `mutation CreateCompany(
  $input: CreateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  createCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCompanyMutationVariables,
  APITypes.CreateCompanyMutation
>;
export const updateCompany = /* GraphQL */ `mutation UpdateCompany(
  $input: UpdateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  updateCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCompanyMutationVariables,
  APITypes.UpdateCompanyMutation
>;
export const deleteCompany = /* GraphQL */ `mutation DeleteCompany(
  $input: DeleteCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  deleteCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCompanyMutationVariables,
  APITypes.DeleteCompanyMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createEmision = /* GraphQL */ `mutation CreateEmision(
  $input: CreateEmisionInput!
  $condition: ModelEmisionConditionInput
) {
  createEmision(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEmisionMutationVariables,
  APITypes.CreateEmisionMutation
>;
export const updateEmision = /* GraphQL */ `mutation UpdateEmision(
  $input: UpdateEmisionInput!
  $condition: ModelEmisionConditionInput
) {
  updateEmision(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEmisionMutationVariables,
  APITypes.UpdateEmisionMutation
>;
export const deleteEmision = /* GraphQL */ `mutation DeleteEmision(
  $input: DeleteEmisionInput!
  $condition: ModelEmisionConditionInput
) {
  deleteEmision(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEmisionMutationVariables,
  APITypes.DeleteEmisionMutation
>;
export const createFactor = /* GraphQL */ `mutation CreateFactor(
  $input: CreateFactorInput!
  $condition: ModelFactorConditionInput
) {
  createFactor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateFactorMutationVariables,
  APITypes.CreateFactorMutation
>;
export const updateFactor = /* GraphQL */ `mutation UpdateFactor(
  $input: UpdateFactorInput!
  $condition: ModelFactorConditionInput
) {
  updateFactor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateFactorMutationVariables,
  APITypes.UpdateFactorMutation
>;
export const deleteFactor = /* GraphQL */ `mutation DeleteFactor(
  $input: DeleteFactorInput!
  $condition: ModelFactorConditionInput
) {
  deleteFactor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteFactorMutationVariables,
  APITypes.DeleteFactorMutation
>;
export const createEstablishment = /* GraphQL */ `mutation CreateEstablishment(
  $input: CreateEstablishmentInput!
  $condition: ModelEstablishmentConditionInput
) {
  createEstablishment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEstablishmentMutationVariables,
  APITypes.CreateEstablishmentMutation
>;
export const updateEstablishment = /* GraphQL */ `mutation UpdateEstablishment(
  $input: UpdateEstablishmentInput!
  $condition: ModelEstablishmentConditionInput
) {
  updateEstablishment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEstablishmentMutationVariables,
  APITypes.UpdateEstablishmentMutation
>;
export const deleteEstablishment = /* GraphQL */ `mutation DeleteEstablishment(
  $input: DeleteEstablishmentInput!
  $condition: ModelEstablishmentConditionInput
) {
  deleteEstablishment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEstablishmentMutationVariables,
  APITypes.DeleteEstablishmentMutation
>;
