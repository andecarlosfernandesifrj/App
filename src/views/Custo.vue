<template>
  <div class="container mt-2">
    <div class="h1" id="icone">
      <i class="bi bi-laptop"></i>
    </div>
    <b-form>
      <b-form-group label="Custo Mensal" label-for="txtcusto">
        <b-form-input
          id="txtcusto"
          v-model="form.custo"
          type="text"
          placeholder="Ex: Aluguél"
          required
          autocomplete="off"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Valor" label-for="txtvalor">
        <b-form-input
          id="txtvalor"
          v-model="form.valor"
          type="number"
          inputmode="numeric"
          min="0"
          placeholder="Ex: 500,00"
          required
          autocomplete="off"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="outline-success" @click="saveTask"
        >Salvar</b-button
      >
    </b-form>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
export default {
  name: "Custo",
  mixins: [ToastMixin],
  data() {
    return {
      form: {
        custo: "",
        valor: 0,
      },
      methodSave: "new",
      custoTotal: 0,
    };
  },

  created() {
    if (this.$route.params.index === 0 || this.$route.params.index !== undefined) {
      this.methodSave = "update";
      let custos = JSON.parse(localStorage.getItem("custos"));
      this.form = custos[this.$route.params.index];
    }
  },

  methods: {
    saveTask() {
      if (this.methodSave === "update") {
        let custos = JSON.parse(localStorage.getItem("custos"));
        custos[this.$route.params.index] = this.form;
        localStorage.setItem("custos", JSON.stringify(custos));
        this.showToast("success", "Sucesso!", "Custo atualizado com sucesso!");
        this.$router.push({ name: "listcustos" });
      } else {
        let custos = localStorage.getItem("custos") ? JSON.parse(localStorage.getItem("custos")) : [];
        custos.push(this.form);
        localStorage.setItem("custos", JSON.stringify(custos));
        this.showToast("success", "Sucesso!", "Custo criado com sucesso!");
        this.$router.push({ name: "listcustos" });
      }
      this.calcularCustos();
    },
    calcularCustos() {
      let vet = JSON.parse(localStorage.getItem("custos"));
      let tot = vet.reduce(function (tot, item) {
        return tot + parseFloat(item.valor);
      },0);
      this.custoTotal=tot;
      localStorage.setItem("custoTotal", tot);
//      console.log(this.custoTotal);
    },
  },
};
</script>

