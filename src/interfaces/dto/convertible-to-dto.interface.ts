export interface IConvertibleToDto<D> {
  toDto(args?: any[]): D;
}
