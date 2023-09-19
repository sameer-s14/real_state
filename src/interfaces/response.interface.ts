export interface IResponse<Idata = unknown> {
  status: boolean;
  message: string;
  data: Idata;
}
