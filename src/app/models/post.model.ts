export interface Post{
  _id?: string,
  name: string,
  prompt: string,
  images: string[] //colocandolo asi se guardan las imagenes por grupo
}
