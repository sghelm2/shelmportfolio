/**
 * Created by Sarah on 10/20/2014.
 */
exports.Version = function (revision1, author1, date1, message1) {
    this.revision = revision1;
    this.author = author1;
    this.date = date1;
    this.message = message1;

    return this;
}