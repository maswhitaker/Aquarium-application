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
        "fisher": "fisher",
        "rare-fish": "rare-fish",
        'apply': 'apply',
        'contact': 'contact',
        'member': 'membership',
        'fish': 'fishies',
        'events': 'eventList'
    }
});

var app_router = new FishRouter();

app_router.on('route:home',function(){
  $('#info-container').hide();
  $('#apply').hide();
  $('#membership').hide();
  console.log('home route');
});

app_router.on('route:eventList',function(){
  $('#apply').hide();
  $('#membership').hide();
  $('#menu').hide();
  $('#events').show(100);
  $('info-container').show(100);
  var galleryCollectionView = new GalleryCollectionView();
  console.log('route eventList');
});

app_router.on('route:membership',function(){
  $('#info-container').hide();
  $('#apply').hide();
  $('#membership').show(100);
  console.log('membership route');
});

app_router.on('route:apply',function(){
  $('#info-container').hide();
  $('#apply').show(100);
  $('#membership').hide();
  console.log('apply route');
});

app_router.on('route:fishies',function(){
  $('#info-container').show();
  $('#menu').show();
  $('#apply').hide();
  $('#events').hide();
  $('#animals').hide();
  $('#fishies').hide();
  $('#membership').hide();
  console.log('fishies route');
});

app_router.on('route:fisher', function () {
    $('#info-container').show();
    $('#events').hide();
    $('#apply').hide();
    $('#membership').hide();
    $('#animals').show(200);
    $('#fishies').hide();
    var animalCollectionView = new AnimalCollectionView();
    console.log('fisher route');
});

app_router.on('route:rare-fish', function () {
  $('#info-container').show();
  $('#events').hide();
  $('#membership').hide();
  $('#apply').hide();
  $('#animals').hide();
  $('#fishies').show(200);
    var fishCollectionView = new FishCollectionView();
    console.log('rare-fish route');
});



Backbone.history.start();
