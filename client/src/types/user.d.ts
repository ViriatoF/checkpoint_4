export default interface UserI {
  id?: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  matricule: number;
  role: string;
}

export default interface NewUserI extends UserI {
  password?: string;
}
