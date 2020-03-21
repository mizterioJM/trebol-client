export interface IUser {
  id: string;

  nDocument?: string;

  chofer?: boolean;

  details: IDetails;
}

interface IDetails {
  name?: string;

  lastname?: string;

  fechaNac?: Date;
}
