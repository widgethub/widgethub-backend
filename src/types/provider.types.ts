
export enum ProviderEnum {
  GITHUB = 1
}

export type Provider = {
  provider: ProviderEnum,
  name: string,
  info: string
}