<template>
  <div class="cointainer mt-2">
     <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-bar-chart"> Custos</i>
    </div>
    <b-card class="bg-danger" text-variant="white">Custo Total: R${{parseFloat(custoTotal).toFixed(2)}}</b-card>
    <div v-for="(custo, index) in custos" :key="index">
      <b-card :title="custo.custo" class="mb-2">
        <b-card-text>Valor: R${{ parseFloat(custo.valor).toFixed(2) }}</b-card-text>
        <b-button variant="outline-secondary" class="mr-2" @click="edit(index)"
          >Editar</b-button
        >
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="remove(custo, index)"
          >Excluir</b-button
        >
      </b-card>
      <!-- <b-card>{{custo.custoTotal}}</b-card> -->
    </div>
    
    <b-modal ref="modalRemove" hide-footer title="Exclusão do Custo">
      <div class="d-block text-center">
        Deseja realmente excluir<b> {{ custoSelecionado.custo }} </b>?
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal"
          >Cancelar</b-button
        >
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveCusto"
          >Excluir</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ListCustos",
  data() {
    return {
      custos: [],
      custoSelecionado: [],
      custoTotal: 0,
    };
  },

  created() {
    this.custos = localStorage.getItem("custos") ? JSON.parse(localStorage.getItem("custos")) : [];
    this.custoTotal = localStorage.getItem("custoTotal");
  },

  methods: {
    edit(index) {
      this.$router.push({ name: "custo", params: { index } });
    },
    remove(custo, index) {
      this.custoSelecionado = custo;
      this.custoSelecionado.index = index;
      this.$refs.modalRemove.show();
    },
    hideModal() {
      this.$refs.modalRemove.hide();
    },
    confirmRemoveCusto() {
      this.custoTotal -= this.custos[this.custoSelecionado.index].valor;
      this.custos.splice(this.custoSelecionado.index, 1);
      localStorage.setItem("custos", JSON.stringify(this.custos));
      localStorage.setItem("custoTotal", JSON.stringify(this.custoTotal));
      this.hideModal();
    },
  },
};
</script>