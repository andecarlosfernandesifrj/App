<template>
  <div class="container mt-2">
      <div class="h1" id="icone">
      <i class="bi bi-cast"></i>
    </div>
    <b-form>
      <b-form-group 
      label="Produto" 
      label-for="descricao"
      > 
      <b-form-input
        id="descricao"
        v-model="form.descricao"
        type="text"
        placeholder="Ex: Caneta"
        required
        autocomplete="off"
        :state="!validationProd"
      >
      </b-form-input>
      </b-form-group>

      <b-form-group 
      label="Preço da Nota" 
      label-for="precoNota"
      > 
      <b-form-input
        id="precoNota"
        v-model="form.precoNota"
        type="number"
        inputmode="numeric"
        min="0"
        placeholder="Ex: 3,50"
        @change="atualizarCalculos"
        required
        autocomplete="off"
        :state="!validationPreco"
      >
      </b-form-input>
      </b-form-group>

      <!-- <b-form-group 
      label="Quantidade" 
      label-for="quantidade"
      > 
      <b-form-input
        id="quantidade"
        v-model="form.quantidade"
        type="text"
        placeholder="Ex: 20"
        required
        autocomplete="off"
      >
      
      </b-form-input>
      </b-form-group> -->

    <b-form-group 
      label="Quantidade" 
      label-for="quantidade"
      > 
      <b-form-spinbutton
        id="quantidade"
        v-model="form.quantidade"
        inline
        required
        autocomplete="off"
        @change="atualizarCalculos"
        :state="!validationQtd"
      >
      </b-form-spinbutton>
      </b-form-group>
      
      <b-card-text>Preço Unitário: R${{ form.precoUnitario }}</b-card-text>
       <!-- <b-card-text>Preço Unitário: {{ calcPreco }}</b-card-text> -->
      <!-- <b-card-text>Preço Mínimo de Venda: R${{ form.precoMin }}</b-card-text> -->

      <b-button type="submit" variant="outline-success" :disabled="validation" @click="saveProduto">Salvar</b-button>
   
    </b-form>
    
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js"
export default {
  name: "Produto",
  mixins:[ToastMixin],
  data() {
    return {
      form: {
        descricao: "",
        precoNota: 0,
        quantidade: 0,
        precoUnitario: 0,
        precoMin: 0,
        
      },
      methodSave:"new",
      qtdProdutos: 0,
      
    }
  },

  created(){
        if(this.$route.params.index === 0 || this.$route.params.index !== undefined){
        this.methodSave = "update";
        let produtos = JSON.parse(localStorage.getItem("produtos"));
        this.form = produtos[this.$route.params.index];
       
      }
       
      this.qtdProdutos = JSON.parse(localStorage.getItem("qtdProdutos"));
      this.custoTotal = JSON.parse(localStorage.getItem("custoTotal"));
      this.calcularPrecoMin();
  },
  

  methods: {
    saveProduto() {
      if(this.methodSave === "update") {
        let produtos = JSON.parse(localStorage.getItem("produtos"));
        produtos[this.$route.params.index] = this.form;
        localStorage.setItem("produtos", JSON.stringify(produtos));
        this.showToast("success", "Sucesso!", "Produto atualizado com sucesso!");
        this.$router.push({name: "listprodutos"});
       // return;
      }else{
        let produtos = localStorage.getItem("produtos") ? JSON.parse(localStorage.getItem("produtos")) : [] ;
        produtos.push(this.form);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        this.showToast("success", "Sucesso!", "Produto criado com sucesso!");
       // console.log({name: "list"});
        this.$router.push({name: "listprodutos"});
      }

      this.somarQtdProdutos();
      this.calcularPrecoMin();
    },
    calcularPrecoUni (){
      //form.precoUnitario=parseFloat(form.precoNota/form.quantidade).toFixed(2)
      this.form.precoUnitario=parseFloat(this.form.precoNota/this.form.quantidade).toFixed(2);
    },
    atualizarCalculos(){
      
      this.calcularPrecoUni();
      this.calcularPrecoMin();
    },
      somarQtdProdutos() {
      let vet = JSON.parse(localStorage.getItem("produtos"));
      let tot = vet.reduce(function (tot, item) {
        return tot + parseFloat(item.quantidade);
      },0);
      this.qtdProdutos=tot;
      localStorage.setItem("qtdProdutos", tot);
     // console.log(this.qtdProdutos);
    }, 
    calcularPrecoMin() {
      //console.log(this.form.precoUnitario);
     
      this.form.precoMin = (parseFloat(this.form.precoUnitario) +parseFloat(this.custoTotal/this.qtdProdutos)).toFixed(2);
     },  
  },
   computed: {
    validation() {
        return this.form.descricao.length > 3 && this.form.precoNota > 0 && this.form.quantidade > 0 ? false : true;
    },
    validationProd() {
        return this.form.descricao.length > 3 ? false : true;
    },
    validationPreco() {
        return this.form.precoNota > 0 ? false : true;
    },
    validationQtd() {
        return this.form.quantidade > 0 ? false : true;
    },
   }
}
</script>

