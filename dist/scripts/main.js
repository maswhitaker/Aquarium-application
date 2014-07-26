  var animals = [{name:'Becca the Blowfish',imgurl:'../images/blowfish.png',age:3,bio:'a nice friendly fish'},
  {name:'Cici the Shark',imgurl:'../images/shark.png',age:6,bio:'people are scared of Cici, but that is only because they do not give her a chance'},
  {name:'Celia the Seal',imgurl:'../images/seal.png',age:1,bio:'He is warm and friendly'}];

  var fishes = [{name:'Fred the Fish',imgurl:'../images/goldfish.png',age:4,bio:'a nice fishies'},
  {name:'dolphin',imgurl:'../images/dolphin.png',age: 8,bio:'dolphy dolphy!! eek eek!'},
  {name:'Yellowfish',imgurl:'../images/yellowfish.png',age: 10,bio:'a yellow goldfish'}];

  var events = [{eventname:'Kids Day'},
  {eventname:'Non-Kids Day'},
  {eventname:'beeeep'}];


  var Animal = Backbone.Model.extend({
    defaults: {
      name: '',
      imgurl: '',
      age: '',
      bio: ''
    }
  });

  var AnimalCollection = Backbone.Collection.extend({
    model: Animal
  });


  var AnimalCollectionView = Backbone.View.extend({
    el:$('#animals'),
    initialize: function(){
      this.collection = new AnimalCollection(animals);
      this.render();
    },
    render: function(){
      var that = this;
      _.each(this.collection.models,function(item){
        that.renderAnimal(item);
      },this);
    },
    renderAnimal: function(item){
      var animalView = new AnimalView({
        model: item
      });
      this.$el.append(animalView.render().el);
    }
  });

  var AnimalView = Backbone.View.extend({
    tagName: 'div',
    className: 'animalContainer',
    template: $('#target-template').html(),
    render: function(){
      var tmpl = _.template(this.template);
      this.$el.html(tmpl(this.model.toJSON()));
      return this;
    }
  });



  var Fish = Backbone.Model.extend({
    defaults:{
      name: '',
      imgurl: '',
      age: '',
      bio: ''
    }
  });

  var FishCollection = Backbone.Collection.extend({
    model: Fish
  });

  var FishCollectionView = Backbone.View.extend({
    el: $('#fishies'),
    initialize: function(){
      this.collection = new FishCollection(fishes);
      this.render();
    },
    render: function(){
      var that = this;
      _.each(this.collection.models,function(item){
        that.renderFish(item);
      }, this);
    },
    renderFish: function(item){
      var fishView = new FishView({
        model: item
      });
      this.$el.append(fishView.render().el);
    }
  });

  var FishView = Backbone.View.extend({
    tagName: 'div',
    className: 'fishContainer',
    template: $('#fish-template').html(),
    render: function(){
      var tmpl = _.template(this.template);
      this.$el.html(tmpl(this.model.toJSON()));
      return this;
    }
  });


var GalleryModel = Backbone.Model.extend({
  defaults:{
    eventname: ''
  }
});

var GalleryCollection = Backbone.Collection.extend({
  model: GalleryModel
});

var GalleryCollectionView = Backbone.View.extend({
  el:$('#events'),
  initialize: function(){
    this.collection = new GalleryCollection(events);
    this.render();
  },
  render: function(){
    var that = this;
    _.each(this.collection.models,function(item){
      that.renderEvent(item);
    },this);
  },
  renderEvent: function(item){
    var galleryView = new GalleryView({
      model: item
    });
    this.$el.append(galleryView.render().el);
  }
});

var GalleryView = Backbone.View.extend({
  tagName: 'li',
  className: 'gallery',
  template: $('#event-template').html(),
  render: function(){
    var tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }
});








var FishRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        "fish": "fish",
        "rare-fish": "rare-fish"
    }
});

$('#click').click(function(){
  var galleryCollectionView = new GalleryCollectionView();
});

$('#hide').click(function(){
  location.reload();
});

var app_router = new FishRouter();

app_router.on('route:home',function(){

});

app_router.on('route:fish', function () {
      $('.fishContainer').css('display', 'none');
      $('.animalContainer').css('display', 'initial');
      var animalCollectionView = new AnimalCollectionView();

});

app_router.on('route:rare-fish', function () {
      $('.animalContainer').css('display', 'none');
      $('.fishContainer').css('display', 'initial');
      var fishCollectionView = new FishCollectionView();
});

Backbone.history.start();
