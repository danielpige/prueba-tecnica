export interface UserResponse {
  token:   string;
  usuario: UserR;
}

export interface UserR {
  apellido:         string;
  nombre:           string;
  fecha:            Date;
  doctO_IDENT:      string;
  usuario:          string;
  clave:            string;
  e_MAIL:           string;
}
