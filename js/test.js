let data = [{ "id": 1, "is_read": true, }, { "id": 2, "is_read": true, }, { "id": 3, "is_read": false, }, { "id": 4, "is_read": true, },],
    length = data.filter(function (item) {
        return item.is_read;
    }).length;
console.log(length)