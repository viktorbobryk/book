var app = app || {};

var books = new app.Books();

app.BooksView = Backbone.View.extend({

    el: '#book',

    booksCollection: books,

    initialize: function (){
        this.listenTo(this.booksCollection, "update", this.render);
        this.booksCollection.fetch();
    },

    render: function () {
        var template = _.template('<% collection.forEach( function (item) { %> <%= item.text %></br><hr></br><hr> <% });%>');
        console.log(this.booksCollection.toJSON());
        this.$el.append(template({collection: this.booksCollection.toJSON()}));
        return this;
    }
});

new app.BooksView();