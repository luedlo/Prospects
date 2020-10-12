<template>
  <div class="hello">
    <loader v-if="loader"/>
    <div v-show="content">

      <div class="parallax-container">
        <div class="parallax"><img src="@/assets/img/parallax1.jpg"/></div>
        <h1>BIENVENIDO</h1>
        <h1>BIENVENIDO</h1>
      </div>

      <div class="section">
        <div class="container" style="width:100vw">
          <div class="row my-3">
            <router-link class="col m4 s12" v-bind:to="{ name: 'NewProspect' }">
              <div class="card new col m12 s12">
                <div class="icon">
                <i class="material-icons large">add</i>
              </div>
              <div class="text">
                <p>Nuevo Prospecto</p>
              </div>
              </div>
            </router-link>

            <router-link class="col m4 s12" v-bind:to="{ name: 'Prospects' }">
              <div class="card list col m12 s12">
                <div class="icon">
                  <i class="material-icons large">person</i>
                </div>
                <div class="text">
                  <p>Ver Prospectos</p>
                </div>
              </div>
            </router-link>

            <router-link class="col m4 s12" v-bind:to="{ name: 'About' }">
              <div class="card about col m12 s12">
                <div class="icon">
                  <i class="material-icons large">info_outline</i>
                </div>
                <div class="text">
                  <p>Acerca De</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="parallax-container">
        <div class="parallax"><img src="@/assets/img/parallax2.jpg"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from '@/Loader'
import M from 'materialize-css'

export default {
  name: 'HelloWorld',
  components: { loader },
  data () {
    return {
      loader: true,
      content: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.content = true
      this.loader = false
    }, 1000)
  },
  updated () {
    M.Parallax.init(document.querySelectorAll('.parallax'), {})
  }
}
</script>
