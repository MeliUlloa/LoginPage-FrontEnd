import { useAuthStore } from '@/stores/authStore'

// Este wrapper facilita el uso de fetch para hacer peticiones HTTP con los métodos GET, POST, PUT, DELETE
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

// La función request crea una función que puede hacer peticiones HTTP usando un método específico
function request(method: string) {
    return (url: string, body?: any, { credentials }: { credentials?: RequestCredentials } = {}) => {
        // Configuración inicial de la petición HTTP
        const requestOptions: RequestInit = {
            method,
            headers: authHeader(url),  // Agrega el token JWT a la cabecera si está disponible
        };

        // Si hay un cuerpo (body), lo convertimos a JSON y lo agregamos a la configuración
        if (body) {
            requestOptions.headers = {
                ...requestOptions.headers,
                'Content-Type': 'application/json'  // Indicamos que el cuerpo es JSON
            };
            requestOptions.body = JSON.stringify(body);  // Convertimos el body a una cadena JSON
        }

        // Si se especifican credenciales (como cookies), las agregamos a la configuración
        if (credentials) {
            requestOptions.credentials = credentials;
        }

        // Hacemos la petición usando fetch y procesamos la respuesta con handleResponse
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// Función auxiliar para agregar el header de autenticación (JWT) si el usuario está logueado y la URL es parte de la API
function authHeader(url: string): Record<string, string> {
    const { auth } = useAuthStore();  // Obtenemos los datos de autenticación del store
    const isLoggedIn = !!auth.data?.jwtToken;  // Verificamos si el usuario está logueado
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);  // Comprobamos si la URL es de la API

    // Si el usuario está logueado y la URL es de la API, añadimos el token JWT a la cabecera de autorización
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${auth.data?.jwtToken}` };
    } else {
        return {};  // Si no, devolvemos un objeto vacío (sin cabecera de autorización)
    }
}

// Función para manejar la respuesta de la petición
async function handleResponse(response: Response): Promise<any> {
    const text = await response.text();  // Obtenemos el cuerpo de la respuesta como texto
    const data: any = text ? JSON.parse(text) : null;  // Si hay contenido, lo parseamos como JSON

    // Si la respuesta no fue exitosa (response.ok es false)
    if (!response.ok) {
        const { auth, logout } = useAuthStore();  // Obtenemos los datos de autenticación y la función de logout

        // Si el estado es 401 (no autorizado) o 403 (prohibido), cerramos la sesión
        if ([401, 403].includes(response.status) && auth.data) {
            logout();
        }

        // Extraemos el mensaje de error (si existe), o usamos el texto del estado HTTP
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);  // Rechazamos la promesa con el error
    }

    // Si la respuesta es exitosa, devolvemos los datos
    return data;
}
