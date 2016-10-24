var app = app || {};
console.log('collection works');
console.log('model - ' + app.BookModel);
app.BookCollection = Backbone.Collection.extend({
    model: app.BookModel,
    url: function () {
        console.log('this.id = ' + this.id);
        return '/showBook/' + (this.id ? this.id : 0);
    }
});
