export interface UserLogin {
  phone?: string;
  password?: string;
  access?: string;
}

export interface UserRegister {
  id?: number;
  phone: string;
  re_phone: string;
  // password: string;
  first_name: string;
  last_name: string;
  username: string;
  pathner: number;
}
