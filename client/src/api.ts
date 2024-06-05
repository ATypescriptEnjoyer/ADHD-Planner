import baseAxios from "axios";

export interface AuthResponse {
  access_token: string;
}

const api = baseAxios.create({
  baseURL: "/api/",
});

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return api.post<AuthResponse>("/auth/login", {email, password})
      .then((data) => data.data);
  },
  register: async (firstName: string, lastName: string, email: string, password: string): Promise<AuthResponse> => {
    return api.post<AuthResponse>("/auth/register", { firstName, lastName, email, password})
      .then((data) => data.data);
  }
}