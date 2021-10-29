<template>
  <div class="cointainer mt-2">
     <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-bar-chart"> Custos</i>
    </div>
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
    };
  },

  created() {
    this.custos = localStorage.getItem("custos")
      ? JSON.parse(localStorage.getItem("custos"))
      : [];
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
      this.custos.splice(this.custoSelecionado.index, 1);

      localStorage.setItem("custos", JSON.stringify(this.custos));

      this.hideModal();
    },
  },
};
</script>