<template>
  <div>
    <nav class="bg-secondary px-1">
      <div class="nav-wrapper">
        <div class="hide-on-med-and-down">
          <a href="/" class="left">
            <img class="responsive-img circle" src="./assets/img/logo.png" width="65px" alt="Logo" />
          </a>
          <a href="/" class="brand-logo ml-1 left">
            ConCrédito
          </a>
        </div>
        <div class="hide-on-med-and-up">
          <a href="/" class="brand-logo ml-1 center">
            ConCrédito
          </a>
        </div>

        <a data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link class="waves-effect" v-bind:to="{ name: 'HelloWorld' }">Inicio</router-link></li>
          <li><router-link class="waves-effect" v-bind:to="{ name: 'Prospects' }">Promotores</router-link></li>
          <li><router-link class="waves-effect" v-bind:to="{ name: 'ProspectsEvaluate' }">Evaluadores</router-link></li>
          <li><router-link class="waves-effect" v-bind:to="{ name: 'About' }">Acerca de..</router-link></li>
        </ul>
      </div>
    </nav>

    <ul id="slide-out" class="sidenav">
      <li class="vector"><div class="user-view">
        <div class="background">
        </div>
        <a><img class="responsive-img circle" src="./assets/img/logo.png" alt="Logo" /></a>
        <a><span class="white-text name bold">Empleado</span></a>
        <a href="#email"><span class="white-text email">empleado@concredito.com.mx</span></a>
      </div></li>
      <li><router-link class="waves-effect sidenav-close" v-bind:to="{ name: 'HelloWorld' }"><i class="material-icons">home</i>Inicio</router-link></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Administrar</a></li>
      <li><router-link class="waves-effect sidenav-close" v-bind:to="{ name: 'Prospects' }"><i class="material-icons">list</i>Prospectos</router-link></li>
      <li><router-link class="waves-effect sidenav-close" v-bind:to="{ name: 'ProspectsEvaluate' }"><i class="material-icons">list</i>Evaluadores</router-link></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Información</a></li>
      <li><router-link class="waves-effect sidenav-close" v-bind:to="{ name: 'About' }"><i class="material-icons">info</i>Acerca de..</router-link></li>
    </ul>
  </div>
</template>
