<template>
  <div class="cointainer mt-2">
    <div class="h1 ml-3 mt-3" id="icone">
      <i class="bi bi-calendar3"> Produtos</i>
    </div>
    <b-card class="bg-info" text-variant="white">Total de Produtos no Estoque: {{parseFloat(qtdProdutos)}} unidades</b-card>
    <div v-for="(produto, index) in produtos" :key="index">
      <b-card :title="produto.descricao" class="mb-2">
        <b-card-text>Preço: R${{ parseFloat(produto.precoNota).toFixed(2) }}</b-card-text>
        <b-card-text>Quantidade: {{ produto.quantidade }}</b-card-text>
        <b-card-text>Preço Unitário: R${{ parseFloat(produto.precoUnitario).toFixed(2) }}</b-card-text>
        <b-button variant="outline-secondary" class="mr-2" @click="edit(index)"
          >Editar</b-button
        >
        <b-button variant="outline-danger" class="mr-2" @click="remove(produto, index)"
          >Excluir</b-button
        >
      </b-card>
    </div>
    <b-modal ref="modalRemove" hide-footer title="Exclusão de Produto">
      <div class="d-block text-center">
        Deseja realmente excluir <b>{{ produtoSelecionado.descricao }} </b>?
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal"
          >Cancelar</b-button
        >
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveProduto"
          >Excluir</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ListProdutos",
  data() {
    return {
      produtos: [],
      produtoSelecionado: [],
      qtdProdutos: 0,
    };
  },

  created() {
    this.produtos = localStorage.getItem("produtos") ? JSON.parse(localStorage.getItem("produtos")) : [];
    this.qtdProdutos = localStorage.getItem("qtdProdutos");
  },

  methods: {
    edit(index) {
      this.$router.push({ name: "produto", params: { index } });
    },
    remove(produto, index) {
      this.produtoSelecionado = produto;
      this.produtoSelecionado.index = index;
      this.$refs.modalRemove.show();
    },
    hideModal() {
      this.$refs.modalRemove.hide();
    },
    confirmRemoveProduto() {
      this.qtdProdutos -= this.produtos[this.produtoSelecionado.index].quantidade;
      this.produtos.splice(this.produtoSelecionado.index, 1);
      localStorage.setItem("produtos", JSON.stringify(this.produtos));
      localStorage.setItem("qtdProdutos", JSON.stringify(this.qtdProdutos));
      this.hideModal();
    },
  },
};
</script>