<template>
  <div class="jumbotron jumbotron-fluid banner">
      <div class="container">
        <h1 class="display-3">Fluid jumbotron</h1>
        <div class="row justify-content-md-center">
          <div class="col-lg-6 input">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for...">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.banner {
  height: 400px;
  width: 100%;
  max-height: 50%;
  max-width: 100%;
  min-height: 20%;
  min-width: 30%;
  background-image: url("http://www.wcdentalarts.com/hubfs/Dentist.jpg?t=1496676111025");
  background-size: cover;
}
.input{
  margin-top:40px;
}
</style>
