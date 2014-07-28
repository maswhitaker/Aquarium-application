  var animals = [{name:'Becca the Blowfish',imgurl:'../images/blowfish.png',age:3,bio:'a nice friendly fish'},
  {name:'Cici the Shark',imgurl:'../images/shark.png',age:6,bio:'people are scared of Cici, but that is only because they do not give her a chance'},
  {name:'Celia the Seal',imgurl:'../images/seal.png',age:1,bio:'He is warm and friendly'}];

  var fishes = [{name:'Fred the Fish',imgurl:'../images/goldfish.png',age:4,bio:'a nice fishies'},
  {name:'dolphin',imgurl:'../images/dolphin.png',age: 8,bio:'dolphy dolphy!! eek eek!'},
  {name:'Yellowfish',imgurl:'../images/yellowfish.png',age: 10,bio:'a yellow goldfish'}];

  var events = [{eventname:'Kids Day', date: 'July 29, 2014'},
  {eventname:'Non-Kids Day', date: 'August 15, 2014'},
  {eventname:'beeeep', date: 'August 25, 2014'}];

  var contacts = [{contactName:'North Carolina Aquarium on Roanoke Island', street:'374 Airport Road Manteo, NC 27954',suite:'',email:'rimail@ncaquariums.com',number:'800-832-3474'},
  {contactName:'North Carolina Aquarium at Pine Knoll Shores', street:'1 Roosevelt Blvd. Pine Knoll Shores, NC 28512.',suite:'',email:'pksmail@ncaquariums.com',number:'800-832-3474'},
  {contactName:'North Carolina Aquarium at Fort Fisher', street:'900 Loggerhead Road Kure Beach, NC 28449',suite:'',email:'ffmail@ncaquariums.com',number:'800-832-3474'},
  {contactName:'Jennette’s Pier in Nags Head', street:'7223 So. Virginia Dare Trail Nags Head, NC 27959',suite:'',email:'',number:'252-255-1501'},
  {contactName:'North Carolina Aquarium Society', street:'3125 Poplarwood Ct. Raleigh, North Carolina 27604',suite:'Suite 160',email:'societymail@ncaquariums.com',number:''}
];

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

// var Contact = Backbone.Model.extend({
//     defaults:{
//       contactName: '',
//       street: '',
//       suite: '',
//       email: '',
//       number: ''
//     }
// });
//
// var Rolodex = Backbone.Collection.extend({
//   model: Contact
// });
//
// var RolodexView = Backbone.View.extend({
//   el:$('#contact'),
//   intialize: function(){
//     this.collection = new Rolodex(contacts);
//     this.render();
//   },
//   render: function(){
//     var that = this;
//     _.each(this.collection.models,function(item){
//       that.renderContact(item);
//     },this);
//   },
//   renderContact: function(item){
//     var contactView = new ContactView({
//       model: item
//     });
//     this.$el.append(contactView.render().el);
//   }
// });
//
// var ContactView = Backbone.View.extend({
//   tagName: 'li',
//   template: $('#contact-template').html(),
//   render: function(){
//     var tmpl = _.template(this.template);
//     this.$el.html(tmpl(this.model.toJSON()));
//     return this;
//   }
// });

var FishRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      "fisher": "fisher",
      "rare-fish": "rare-fish",
      'apply': 'apply',
      'contact': 'contactRoute',
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
  $('#animals').hide();
  $('#fishies').hide();
  console.log('home route');
});

app_router.on('route:contactRoute',function(){
  $('#contact').show();
  $('#apply').hide();
  $('#membership').hide();
  $('#menu').hide();
  $('#animals').hide();
  $('#fishies').hide();
  $('#events').hide();
  $('info-container').hide();
  console.log('contact route');
  var rolodexView = new RolodexView();
});

app_router.on('route:eventList',function(){
  $('#apply').hide();
  $('#membership').hide();
  $('#menu').hide();
  $('#animals').hide();
  $('#fishies').hide();
  $('#events').show(100);
  $('info-container').show(100);
  var galleryCollectionView = new GalleryCollectionView();
  console.log('route eventList');
});

app_router.on('route:membership',function(){
  $('#info-container').show();
  $('#events').hide();
  $('#menu').hide();
  $('#apply').hide();
  $('#animals').hide();
  $('#fishies').hide();
  $('#membership').show(100);
  console.log('membership route');
});

app_router.on('route:apply',function(){
  $('#info-container').show();
  $('#events').hide();
  $('#menu').hide();
  $('#apply').show(100);
  $('#membership').hide();
  $('#animals').hide();
  $('#fishies').hide();
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
