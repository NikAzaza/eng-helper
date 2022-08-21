export interface IConvertibleFromDto<D, T> {
  fromDto(dto: D, args?: any[]): T;
}
