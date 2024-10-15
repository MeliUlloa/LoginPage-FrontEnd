export { fakeBackend };

import type { User } from '@/models/User';
import type { JwtPayload } from '@/models/JwtModel';
import type { AuthRequestBody } from '@/models/AuthReqModel';

// Manipulamos el localStorage (muy inseguro para datos sensibles como contraseñas).
const usersKey = 'vue-3-jwt-refresh-token-users';
const users: User[] = JSON.parse(localStorage.getItem(usersKey) || '[]');

// Usuario de prueba para simular la autenticación
const user: User = {
    id: 1,
    firstname: 'Melina',
    lastname: 'Ulloa',
    username: 'test',
    password: 'test',
    remember: true,
    isAdmin: true,
    refreshTokens: []
};

// Si no hay usuarios en localStorage, agregamos el usuario de prueba.
if (!users.length) {
    users.push(user);
    localStorage.setItem(usersKey, JSON.stringify(users));
}

// Función que intercepta las peticiones fetch y las redirige a funciones personalizadas
function fakeBackend() {
    const realFetch = window.fetch;

    window.fetch = function (url, opts: any): Promise<Response> {
        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 1000);

            function handleRoute() {
                const { method } = opts; // Corregido de "metod" a "method"
                switch (true) {
                    case url.toString().endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.toString().endsWith('/users/refresh-token') && method === 'POST':
                        return refreshToken();
                    case url.toString().endsWith('/users/revoke-token') && method === 'POST':
                        return revokeToken();
                    case url.toString().endsWith('/users') && method === 'GET':
                        return getUsers();
                    default:
                        // Si ninguna ruta coincide, hacemos el fetch real
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // Función para autenticar al usuario
            function authenticate() {
                const { username, password } = body<AuthRequestBody>();
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) return error('Usuario o contraseña incorrectos.');

                // Agregar refresh token al usuario autenticado
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname, // Corregido de "lasName" a "lastname"
                    isAdmin: user.isAdmin,
                    jwtToken: generateJwtToken()
                });
            }

            // Función para refrescar el token JWT
            function refreshToken() {
                const refreshToken = getRefreshToken();
                if (!refreshToken) return unauthorized();

                const user = users.find(x => x.refreshTokens.includes(refreshToken));
                if (!user) return unauthorized();

                // Reemplazar el refresh token antiguo por uno nuevo
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname, // Corregido de "lasName" a "lastname"
                    isAdmin: user.isAdmin,
                    jwtToken: generateJwtToken()
                });
            }

            // Función para revocar el token de refresh (logout)
            function revokeToken() {
                if (!isLoggedIn()) return unauthorized();

                const refreshToken = getRefreshToken();
                const _user = users.find(x => x.refreshTokens.includes(refreshToken));

                // Eliminar el token de refresh del usuario
                if (_user !== undefined) {
                    _user.refreshTokens = _user.refreshTokens.filter(x => x !== refreshToken);
                    localStorage.setItem(usersKey, JSON.stringify(users));
                }

                return ok({ msg: 'Token revocado' });
            }

            // Función para obtener la lista de usuarios (solo si está logueado)
            function getUsers() {
                if (!isLoggedIn()) return unauthorized();
                return ok(users);
            }

            // Funciones auxiliares

            // Función para devolver una respuesta correcta (200 OK)
            function ok(body: any) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) } as Response);
            }

            // Función para devolver una respuesta con error (400 Bad Request)
            function error(message: string) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) } as Response);
            }

            // Función para verificar si el usuario está logueado mediante el JWT en el header
            function isLoggedIn(): boolean {
                const authHeader = opts.headers?.['Authorization'] || '';
                if (!authHeader.startsWith('Bearer fake-jwt-token')) return false;

                try {
                    const jwtToken = JSON.parse(atob(authHeader.split('.')[1])) as JwtPayload;
                    const tokenExpired = Date.now() > jwtToken.exp * 1000;
                    if (tokenExpired) return false;
                } catch {
                    return false;
                }

                return true;
            }

            // Función para devolver una respuesta de no autorizado (401 Unauthorized)
            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'No está autorizado' })) } as Response);
            }

            // Función para parsear el body de la petición
            function body<T>(): T {
                return opts.body ? JSON.parse(opts.body) : {} as T;
            }

            // Función para generar un token JWT falso que expira en 2 minutos
            function generateJwtToken(): string {
                const tokenPayload: JwtPayload = { exp: Math.round(Date.now() / 1000 + 2 * 60) };
                const fakeJwtToken = `fake-jwt.${btoa(JSON.stringify(tokenPayload))}`;
                return fakeJwtToken;
            }

            // Función para generar un refresh token
            function generateRefreshToken(): string {
                const token = new Date().getTime().toString();
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

                return token;
            }

            // Función para obtener el refresh token de las cookies
            function getRefreshToken(): string {
                return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
            }
        });
    };
}
