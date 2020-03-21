export interface IServicio {
  id?: string;

  ruta: string;

  jaula: string;

  vehicle: string;

  chofer: string;

  apoyoA: string;

  apoyoB?: string;

  image: ImageDetail;
}

interface ImageDetail {
  img_id?: string;

  img_url?: string;

  secure_url?: string;

  base64?: string;
}
