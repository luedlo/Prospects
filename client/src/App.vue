<template>
  <div id="app">
    <header>
      <navbar/>
    </header>

    <main class="container mt-3 mb-5">
      <router-view/>
    </main>
  </div>
</template>

<script>
import M from 'materialize-css'
import navbar from './Navbar'

export default {
  name: 'App',
  components: { navbar },
  mounted () {
    M.Sidenav.init(document.querySelector('.sidenav'), {})
  }
}
</script>
