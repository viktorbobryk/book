var app = app || {};
console.log('view works ');
var userBookCollection = new app.BookCollection();

app.testView = Backbone.View.extend({

    el: '#book',

    booksCollection: userBookCollection,
    
    initialize: function (){
        this.listenTo(this.booksCollection, "update", this.render);
        console.log(this.booksCollection);
        console.log('hi');
        this.booksCollection.fetch();
        console.log('booksCollection = ' + this.booksCollection.toJSON());
    },

    render: function () {
        var template = _.template('<% collection.forEach( function (item) { %> <%= item.text %> </br></hr></br><hr></br><hr></br><hr> <% });%>');
        console.log('booksCollection = ' + this.booksCollection.toJSON());
        this.$el.append(template({collection: this.booksCollection.toJSON()}));
        return this;
    }
});

new app.testView();