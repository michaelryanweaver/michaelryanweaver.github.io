(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};


// Person Model
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		age: 30,
		occupation: 'worker',
		gender: 'gender undeclared'
	}
});

// A List of People
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});


// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},
	
	render: function() {
		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(person) {
		var personView = new App.Views.Person({ model: person });
		this.$el.append(personView.render().el);
	}
});

// The View for a Person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),	
	
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	
	events: {
	 'click .edit' : 'editPerson',
	 'click .delete' : 'DestroyPerson'	
	},
	
	editPerson: function(){
		var newName = prompt("Please enter the new name", this.model.get('name'));
		if (!newName) return;
		this.model.set('name', newName);
		var newAge = prompt("Please enter the new age", this.model.get('age'));
		if (!newAge) return;
		this.model.set('age', newAge);
		var newGender = prompt("Please enter the new gender", this.model.get('gender'));
		if (!newGender) return;
		this.model.set('gender', newGender);
		var newOccupation = prompt("Please enter the new occupation", this.model.get('occupation'));
		if (!newOccupation) return;
		this.model.set('occupation', newOccupation);
	},
	
	DestroyPerson: function(){
		this.model.destroy();
	},
	
	remove: function(){
		this.$el.remove();
	},
	
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});


App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',

	events: {
		'submit': 'submit'
	},

	submit: function(e) {
		e.preventDefault();
		var newPersonName = $(e.currentTarget).find('input[name=pname]').val();
		var newPersonAge = $(e.currentTarget).find('input[name=age]').val();
		var newPersonOccupation = $(e.currentTarget).find('input[name=occupation]').val();
		var newPersonGender = $(e.currentTarget).find('input[name=gender]').val();
		var person = new App.Models.Person(
			{
				name: newPersonName, 
				age: newPersonAge,
				occupation: newPersonOccupation,
				gender: newPersonGender
			});
		this.collection.add(person);

	}
});


var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		age: 26
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer'
	}
]);
var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);
})();
