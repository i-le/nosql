<template>
  <q-page class="q-pa-lg">
  <div class="colum">
  <div class="row">
  <h5 class="q-px-md" text-color="primary"> Admin Login</h5>
  </div>
  <div class="row">
  <q-card-section>
  <q-form class="q-gutter-md">
  <q-input square filled clearable v-model="email" type="email" label="uis email"></q-input>
  <q-input square filled clearable v-model="password" type="password" label="password"></q-input>
  </q-form>
  </q-card-section>
  <q-card-actions class="q-px-md">
  <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" />
  </q-card-actions>
  
  </div>
   <q-card-section class="q-px-md">
   <p><a href="/#/reset">reset password </a></p>
  </q-card-section>
  </div>
  </q-page>
</template>

<script>
export default {
  name:'Login',
  data(){
    return{
      email:'',
      password:''
    }
  }
}
</script>
