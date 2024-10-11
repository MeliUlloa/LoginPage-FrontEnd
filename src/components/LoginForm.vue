<!-- Este es el componente que representa el formulario de inicio de sesión. -->

<!--v-model="user": Utiliza dos enlaces de datos para capturar la información del usuario-->


 <template>
  <!--handleSubmit(): Este método maneja el envío del formulario, guarda los datos en el estado global 
 (Pinia) y redirige a la página de inicio.-->
  <form @submit.prevent="handleSubmit" class="login-form">

    <h1>Login</h1>

    <div class="input-bx">
      <input v-model="user" type="text" placeholder="Usuario" required />
      <ion-icon class="icon" name="person-circle"></ion-icon>
    </div>

    <div class="input-bx">
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <ion-icon class="icon" name="lock-closed"></ion-icon>
    </div>

    <div class="remember-forgot">
      <label><input v-model="remember" type="checkbox" /> Recordarme</label>
      <a href="#">Olvidaste tu contraseña</a>
    </div>

    <button type="submit" class="btn">Ingresar</button>

  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const user = ref('')
const password = ref('')
const remember = ref(false)

const handleSubmit = () => {
  console.log(
    `Usuario: ${user.value}, Contraseña: ${password.value}, Recordarme: ${remember.value}`
  )

  // Aquí creamos un objeto usuario
  const newUser = {
    user: user.value,
    password: password.value,
    remember: remember.value
  }

  // Guardamos el usuario en el store
  userStore.setUser(newUser)

  // Redirigimos a la página de inicio
  router.push('/home')
}
</script>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    margin-bottom: 20px;
    color: #333;
}

.input-bx {
    position: relative;
    width: 100%;
}

input[type="text"],
input[type="password"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}

.icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.remember-forgot {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
