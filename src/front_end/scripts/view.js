// var app = app || {};
//
// var books = new app.Books();
//
// app.BooksView = Backbone.View.extend({
//
//     el: '#book',
//
//     booksCollection: books,
//
//     initialize: function (){
//         this.listenTo(this.booksCollection, "update", this.render);
//     },
//
//     render: function () {
//         var template = _.template('<% collection.forEach( function (item) { %> <%= item.data %> </br></hr></br><hr></br><hr></br><hr> <% });%>');
//         this.$el.append(template({collection: this.booksCollection.toJSON()}));
//         return this;
//     }
// });
