<template>
  <div id="app">
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"> Find your favorite movies </a>
          </nav>
    </header>
    <main class = "container mt-2">
        <form @submit.prevent="getResults">
        <fieldset class="form-group">
            <label for="searchTerm"> Search: </label>
            <input v-model ="searchTerm" type="text" class="form-control" id="searchTerm" placeholder="Enter that amazing title">
        </fieldset> 
        <button type="submit" id="searchTerm" class="btn btn-primary" > GO! </button>
            
    </form> 
 <section>
  <section class="row movies-area">
  <section class="mt-2 col-9 row" id="results">
      <div v-if= "error" class="alert alert-danger col" role="alert">
       {{error}}
      </div>
      <movie class="col-4"
      v-for="movie in results" v-bind:key="movie" 
      :movie="movie" :addToFavorite="addToFavorite">
      </movie>
  </section>
  <section class=" mt-2 col-3 row">
    <h3> My Favorites </h3>
        <movie class="col-12"
      v-for="movie in Favorite" v-bind:key="movie"
      :movie="movie"></movie>
  </section> 
</section>  
</section>   
  
}
    </main>
    <fotter>
        <h5 class=" mt-2 mylogo"> Developed by: Giovanna Cavalcante </h5>
    </fotter>

  </div>
</template>

<script>

import Movie from '@/components/Movie';

const API_URL='http://www.omdbapi.com/?apikey=45ebdd49&s=';

export default {
  name: 'app',
  components: {
    Movie, 
  },
  data: () => ({
     error: '',
    searchTerm: '',
    results: [],
    Favorite: [],
   
  }),
  methods:{
    async getResults(){
      

      const url =  `${API_URL}${this.searchTerm}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Error){
        this.results = [];
        this.error = data.Error;
      } else {
      this.results = data.Search;
      this.error = '';
     }
   },
   addToFavorite(movie){
     this.Favorite.push(movie);
   }
  }
};
</script>

<style>
   .movies-area{
        justify-content: space-around;
        align-items: flex-start;
        }

        .mylogo{
          text-align: center;
          color: grey;
        }

</style>
