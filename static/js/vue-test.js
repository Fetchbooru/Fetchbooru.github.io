var $grid = $('.grid').masonry({
});
//materialize stuff
$(document).ready(function () {
  $('.sidenav').sidenav();

  $('.sidenav').sidenav('open');

  $('.tooltipped').tooltip();

  $('input.autocomplete').autocomplete({
    data: {
      "teste": null,
    },
  });

  // Autocomplete
  $(function() {
    $("input").keyup(function() {
      tag = document.getElementById('tags').value;
      $.ajax({
        type: 'GET',
        url: 'https://yande.re/tag.json?name=' + tag,
        success: function(response) {
          var nameArray = response;
          var dataName = {};
          for (var i = 0; i < nameArray.length; i++) {
            //console.log(countryArray[i].name);
            dataName[nameArray[i].name] = nameArray[i].flag; //countryArray[i].flag or null
          }
          $('.autocomplete').autocomplete('updateData',
            dataName);
        }
      });
    });
  });

});

var VueMasonryPlugin = window["vue-masonry-plugin"].VueMasonryPlugin
Vue.use(VueMasonryPlugin)

Vue.component('card-grid', {
  // The grid component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called itens.
  props: {
    grid:{
      type:Object
    },
},
  template:'<div v-masonry-tile class="block"><div class="card grey darken-3"><div class="card-image waves-effect waves-block waves-light"><img class="activator"  frameBorder="0" id="img" v-bind:src="grid.preview_url" /></div><div class="card-content"><span class="card-title activator white-text">ID:{{grid.id}}<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" target="_blank" v-bind:href="grid.jpeg_url">Source</a></p></div><div class="card-reveal grey darken-3"><span class="card-title white-text">ID:{{grid.id}}<i class="material-icons right">close</i></span><p class="white-text">Tags:{{grid.tags}}.</p></div></div></div>'
}
)


var page=0;
var app = new Vue({
  el: '#app',
  data: {
    blocks: '0',
    grid: '',
    cardList: [],
    errors:'',
    checkedSources: [],
    tags:'',
    md5s:[],
  },
  methods: {
    search: function () {
      page = 0
      this.counter=0
      this.cardList=[]
      this.md5s=[]
      blocks=0
      this.searchChecked()
    },
    searchChecked: function(){
      for(cont=0;cont<4;cont++){
        if(this.checkedSources[cont]=="checkKona"){
          this.getKona()
          console.log("pega resultado konachan")
        }else if(this.checkedSources[cont]=="checkDan"){
          this.getDan()
          console.log("pega resultado danbooru")
        }else if(this.checkedSources[cont]=="checkYan"){
          this.getYan()
          console.log("pega resultado Yandere")
        }else if(this.checkedSources[cont]=="checkGel"){
          this.getGel()
          console.log("pega resultado Gelbooru")
        }
      }
    },
    getKona: function() {
      page++
      axios.get(`https://cors-anywhere.herokuapp.com/https://konachan.com/post.json?commit=Search&limit=20&page=`+ page +'&tags='+ this.tags)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("konachan pego")
        for(cont=0;cont<20;cont++){
        console.log("entrei no loop")
        if(response.data[cont].rating=='s'){//verify if safe for work
          console.log("encontrei um safe")
          if(!this.md5s.includes(response.data[cont].md5)){
            console.log("nao repetido")
            this.md5s.push(response.data[cont].md5)
            this.cardList.push(response.data[cont])
          }else{
            this.blocks++
          }
        }
        }
      })
      .catch(e => {
        console.log("konachan falhou")
        this.errors.push(e)
      })
    },
    getYan: function() {
      page++
      axios.get(`https://yande.re/post.json?commit=Search&limit=20&page=`+ page +'&tags='+ this.tags)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("Yandere pego")
        for(cont=0;cont<20;cont++){
          console.log("entrei no loop")
          if(response.data[cont].rating=='s'){//verify if safe for work
            console.log("encontrei um safe")
            if(!this.md5s.includes(response.data[cont].md5)){
              console.log("nao repetido")
              this.md5s.push(response.data[cont].md5)
              this.cardList.push(response.data[cont])
            }else{
              this.blocks++
            }
          }
        }
      })
      .catch(e => {
        console.log("Yandere falhou")
        this.errors.push(e)
      })
    },
    getDan: function() {
      page++
      axios.get(`https://danbooru.donmai.us/posts.json?commit=Search&limit=20&page=`+ page +'&tags='+ this.tags, {transformResponse: [function (data) {
        // Do whatever you want to transform the data
        // danbooru api doest match konachan/yandere, so I ahve to do some changes in the response data
        console.log(data);
        console.log(typeof(data));
        data = data.replace(/large_file_url/g,"jpeg_url");
        data = data.replace(/file_url/g,"preview_url");
        data = data.replace(/tag_string/g,"tags");
        data = JSON.parse(data);
        return data;
      }],})
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("Danbooru pego")
        console.log(response.data)
        console.log(typeof(response.data));
        for(cont=0;cont<20;cont++){
          console.log("entrei no loop")
          console.log(response.data[cont]);
          if(response.data[cont].rating=='s'){//verify if safe for work
            console.log("encontrei um safe")
            if(!this.md5s.includes(response.data[cont].md5)){
              console.log("nao repetido")
              this.md5s.push(response.data[cont].md5)
              this.cardList.push(response.data[cont])
            }else{
              this.blocks++
            }
          }
        }
      })
      .catch(e => {
        console.log("Danbooru falhou")
        this.errors.push(e)
      })
    },
  }
})


var scroll = new Vue({
  el: '#scroll',
  data() {
    return {
      bottom: false,
    }
  },
    methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY + 275 >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        app.searchChecked()
      }
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  }
})