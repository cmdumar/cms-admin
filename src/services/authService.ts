// src/services/authService.ts
class AuthService {
  static saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  static getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  static removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

export default AuthService;
