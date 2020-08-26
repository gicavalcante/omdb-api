<template>
      <div class= "card">
      <img class="card-img-top" :src="movie.Poster" :alt="movie.Title">
      <div class=" card-body">
        <h5 class="card-title">{{movie.Title}}</h5>
        <p class="card-text">{{movie.Year}}</p>
          <button v-if="addToFavorite" @click="addToFavorite(movie)" type="button" class="btn btn-danger"> Add to Favorite </button>
      </div>
    </div>
</template>

<script>
export default {
    props: ['movie', 'addToFavorite'],
};
</script>