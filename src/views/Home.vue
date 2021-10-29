<template>
  <div class="cointainer mt-2 ml-2">
    <!-- <h1>Página Inicial</h1> -->

    <!-- <div class="h1 ml-3 mt-3">
      <i class="bi bi-person-square"></i>
    </div> -->
    <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-cast" @click="CadastroProdutos" title="Cadastro de Produtos"></i>
    </div>
    <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-calendar3" @click="ListagemProdutos" title="Exibir Produtos"></i>
    </div>
    <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-laptop" @click="CadastroCustos" title="Cadastro de Custos"></i>
    </div>
    <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-bar-chart" @click="ListagemCustos" title="Exibir Custos"></i>
    </div>
    
    <div class="h1 ml-3 mt-3" id="icone" title="Calcular Preço de Mínimo de Venda">
      <i class="bi bi-graph-up"></i>
    </div>

     <div class="h1 ml-3 mt-3" id="icone" title="Calcular Percentual de Lucro">
      <i class="bi bi-columns"></i>
    </div>
    <!-- <div class="h1 ml-3 mt-3">
      <i class="bi bi-bar-chart"></i>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "Home",
  methods: {
    CadastroProdutos() {
      this.$router.push({ name: "produto" });
    },
    CadastroCustos() {
      this.$router.push({ name: "custo" });
    },
    ListagemProdutos() {
      this.$router.push({ name: "listprodutos" });
    },
    ListagemCustos() {
      this.$router.push({ name: "listcustos" });
    },
  },
};
</script>

<style>
i:hover {
  color: red;
  cursor: pointer;
  
}
#icone {
  text-shadow:2px 2px 6px #000000;
}
</style>