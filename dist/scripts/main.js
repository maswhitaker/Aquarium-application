  var animals = [{name:'Becca the Blowfish',imgurl:'http://cl.ly/image/19392h3w0j0C/Image%202014-07-24%20at%2012.51.35%20AM.png',age:3,bio:'a nice friendly fish'},
  {name:'Cici the Shark',imgurl:'http://cl.ly/image/3l132g1G421t/Image%202014-07-24%20at%2012.50.05%20AM.png',age:6,bio:'people are scared of Cici, but that is only because they do not give her a chance'},
  {name:'Celia the Seal',imgurl:'http://cl.ly/image/440o2l2i3r2J/Image%202014-07-24%20at%2012.52.40%20AM.png',age:1,bio:'He is warm and friendly'}
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
    localStorage: new Backbone.LocalStorage("AnimalStorage"),
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

var animalCollectionView = new AnimalCollectionView();
