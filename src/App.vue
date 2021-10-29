<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand to="/home">Controle de Preços</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item disabled>|</b-nav-item>
          <b-nav-item to="/produto">Produtos</b-nav-item>
          <b-nav-item disabled>|</b-nav-item>
          <b-nav-item to="/ListProdutos">Exibir Produtos</b-nav-item>
          <b-nav-item disabled>|</b-nav-item>
          <b-nav-item to="/custo">Custos</b-nav-item>
          <b-nav-item disabled>|</b-nav-item>
          <b-nav-item to="/ListCustos">Exibir Custos</b-nav-item>
          <b-nav-item disabled>|</b-nav-item>
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
 
    <router-view />
    
  </div>
 
</template>

<style>
</style>
