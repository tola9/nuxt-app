<template>
  <div>
    <div class="user container">
      <div class="d-flex flex-row justify-content-center">
        <div class="col-md-8 mt-3">
          <div class="card">
            <div class="card-header">Add New Product</div>
            <div class="card-body">
              <b-form @submit.prevent="addProduct">
                <b-container fluid>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="id">ID</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input v-model="product.id" id="id" type="text" />
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="title">Title</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input v-model="product.title" id="title" type="text" />
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="detail">Detail</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="detail" v-model="product.detail" type="text" required />
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="price">Price</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="price" v-model="product.price" type="text" required />
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="qty">Quantity</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="qty" v-model="product.qty" type="text" required />
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <div v-if="product.image"
                      class="imagePreviewWrapper"
                      :style="{ 'background-image': `url(${product.image})` }">
                    </div>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="image">Image</label>
                    </b-col>
                    <b-col sm="9">
                      <input @input="pickFile" ref="fileInput" class="mt-3" type="file" />
                    </b-col>
                  </b-row>
                  <div class="btnSubmit">
                    <button type="submit" class="btn btn-success col-sm-3">Add</button>
                  </div>
                </b-container>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "create",
    data() {
      return {
        product: {
          id: null,
          title: '',
          detail: '',
          price: null,
          qty: null,
          image: null,
          isFavorite: false
        }
      }
    },
    methods: {
      pickFile() {
        let input = this.$refs.fileInput;
        let file = input.files;
        if(file && file[0]) {
          let reader = new FileReader;
          reader.onload = e => {
            this.product.image = e.target.result;
          }
          reader.readAsDataURL(file[0]);
          this.$emit('input', file[0]);
        }
      },
      addProduct() {
        this.$store.dispatch('addProduct', this.product);
      }
    }
  }
</script>

<style scoped>
  .imagePreviewWrapper {
    width: 308px;
    height: 173px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
  }
</style>
