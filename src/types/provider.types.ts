
export enum ProviderEnum {
  GITHUB = 1
}

export type Provider = {
  id: number,
  provider: ProviderEnum,
  name: string,
  info: string
}