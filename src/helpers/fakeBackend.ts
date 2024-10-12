export { fackeBackend };

import type { User } from '@/models/User'
import type { JwtPayload } from '@/models/JwtModel';
import type { AuthRequestBody } from '@/models/AuthReqModel';
 
// Manipulamos el localstorage, es muy inseguro, 
const usersKey = 'vue-3-jwt-refresh-token-users';
const users: User[] = JSON.parse(localStorage.getItem(usersKey) || '[')

// Agregar un usuario para pruebas
const user: User = {
    id: 1,
    firstname: 'Melina',
    lastname: 'Ulloa',
    username: 'test',
    password: 'test',
    remember: true,
    isAdmin: true,
    refreshTokens: []
}

if (!users.length){
    users.push(user);
    localStorage.setItem(usersKey, JSON.stringify(users));
}

function fackeBackend() {

    const realFetch = window.fetch 

    window.fetch = function(url, opts: any) : Promise<Response> {
        return new Promise{(resolve, reject) => {
            setTimeout(handleRoute, 1000);

            function handleRoute () {
                const { metod } = opts;
                switch (true) {
                    case url.toString().endsWith('/users/authenticate') && method === 'POST':
                        return authenticate ()
                    case url.toString().endsWith('/users/refresh-token') && method === 'POST';
                        return refreshToken();
                    case url.toString().endsWith('/users/revoke-token') && method === 'POST';
                        return revokeToken();
                    case url.toString().endsWith('/users') && method === 'GET';
                        return getUsers();
                    default:
                        //Pass througt any request not handled above 
                        return realFetch(url, opts)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                }
            }

            function authenticate () {
                const { username, password } = body<AuthRequestBody>();
                const user = users.find(x => x.username === username && x.password === password);
                
                if (!user) return error ('Usuario o contraseña incorrectos ') ;

                //agregar refresh token al usuario 
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lasName: user.lastname,
                    isAdmin: user.isAdmin,
                    jwtToken: generateJwtToken()
                });
            }

            function refreshToken(){
                const refreshToken = getRefreshToken ();
                if (!refreshToken) return unauthorized();

                const user = users.find(x => x.refreshTokens.includes(refreshToken));
                if(!user) return unauthorized();

                //Reemplazar refresh token viejo por uno nuevo y guardar
                user.refreshTokens = user.refreshTokens.filter( x => x !== refreshToken);
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey,JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lasName: user.lastname,
                    isAdmin: user.isAdmin,
                    jwtToken: generateJwtToken()
                });
            }
        // funsiones auxiliares 

        function ok (body: any){
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body))} as Response);

        }

        function error(message: string) {
            resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) } as Response);
        }

        function unauthorized (){
            resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'No esta autorizado'})) } as Response);
        }

        function body<T>(): T {
            return opts.body ? JSON.parse(opts.body) : {} as T;
        }

        function generateJwtToken(): string {
            // crea token que expira en 2 minutos
            const tokenPayload: JwtPayload = { exp: Math.round(Date.now() / 1000 + 2 * 60) };
            const fakeJwtToken: string = `fake-jwt-tokenPayload.${btoa(JSON.stringify(tokenPayload))}`;
            return fakeJwtToken;
        }

        function generateRefreshToken(): string {
            const token: string = new Date ().getTime().toString();
            //Agregar un refresh token que expira en 7 dias 
            const expires: string = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `fakeRefreshToken=${token}; espires=${expires}: path=/`;

            return token;
        }

        function getRefreshToken () : string {
            //obtener el refresh token de la cookie
            return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=') .split('=')[1];
        }
        }}
    }
}