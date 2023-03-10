export interface User {
  nombre:   string;
  apellido: string;
  email:    string;
  clave:    string;
  cia:      string;
  doctoIdent:string;
  claveConfirmation?: string
}

export interface UserLogin {
  email:    string;
  password:    string;
  desdeMs:string;
  companyId?: string
}
