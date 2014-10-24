/**
 * Created by Sarah on 10/20/2014.
 */

exports.File = function (path1, size1, version1, name1) {
    this.name = name1;
    this.size = size1;
    this.version = version1;
    this.type = fileType(this.name);
    this.path = path1;
    this.kind = "file";

    function fileType(name) {
        var parts = name.split('.', 2);
        return parts[1]
    }

    return this;
}