// Aquí defines el modelo de datos del usuario,
// utilizando TypeScript para asegurarte de que el código maneje
// los tipos de datos correctamente.

//User: Representa los datos del usuario. En este caso, tiene user, password, y remember

export interface User {
  user: string
  password: string
  remember: boolean
}
