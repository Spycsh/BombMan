
// 0,1 are trees
var mapStatus0 =
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 0, 0, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 1, 8, 1, 6, 6, 6, 6, 6, 6, 0, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 1, 8, 8, 8, 1, 6, 6, 6, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 1, 8, 2, 8, 2, 8, 1, 6, 6, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 6, 1, 8, 3, 2, 8, 2, 3, 8, 1, 6, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 1, 8, 2, 2, 8, 8, 8, 2, 2, 8, 1, 6, 6, 6, 0],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [0, 6, 6, 6, 6, 1, 8, 2, 2, 8, 8, 8, 2, 2, 8, 1, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 6, 1, 8, 3, 2, 8, 2, 3, 8, 1, 6, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 1, 8, 2, 8, 2, 8, 1, 6, 6, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 1, 8, 8, 8, 1, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 1, 8, 1, 6, 6, 6, 6, 6, 6, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

var mapStatus1 =
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 6, 6, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 6, 0, 6, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 8, 0, 0, 0, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 6, 0, 0, 6, 0],
    [0, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6, 6, 6, 6, 0],
    [0, 6, 8, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 6, 8, 6, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 6, 6, 0],
    [0, 6, 8, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0],
    [0, 6, 8, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 6, 8, 8, 8, 8, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 6, 6, 6, 0],
    [0, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 6, 6, 6, 8, 8, 8, 8, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

var mapStatus2 =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0],
        [0, 6, 3, 3, 0, 6, 0, 0, 6, 6, 6, 6, 6, 0, 6, 0, 6, 6, 6, 0],
        [0, 3, 3, 0, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 0],
        [0, 6, 6, 0, 6, 3, 3, 8, 8, 8, 8, 8, 8, 8, 8, 6, 6, 0, 6, 0],
        [0, 6, 6, 0, 6, 6, 8, 3, 0, 0, 0, 0, 0, 6, 8, 6, 6, 0, 6, 0],
        [0, 6, 6, 0, 6, 6, 8, 6, 0, 8, 8, 8, 6, 0, 8, 2, 6, 0, 6, 0],
        [0, 8, 6, 0, 6, 6, 8, 6, 0, 0, 0, 8, 6, 0, 8, 2, 2, 0, 6, 0],
        [0, 8, 8, 6, 0, 6, 6, 8, 8, 8, 8, 8, 6, 0, 8, 2, 2, 6, 6, 0],
        [0, 6, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 6, 0, 2, 6, 0],
        [0, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6, 0, 6, 2, 0],
        [0, 6, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 0],
        [0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0],
        [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

var mapStatus3 =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
        [0, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0],
        [0, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 6, 6, 6, 6, 6, 6, 0],
        [0, 6, 0, 6, 0, 2, 0, 6, 0, 6, 0, 6, 0, 2, 0, 6, 0, 6, 0, 0],
        [0, 6, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 0],
        [0, 0, 6, 0, 2, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0],
        [0, 6, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 0],
        [0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 2, 0, 6, 0, 0],
        [0, 6, 6, 6, 2, 6, 2, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 0],
        [0, 0, 6, 0, 6, 0, 2, 0, 6, 0, 6, 0, 6, 0, 2, 0, 6, 0, 6, 0],
        [0, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2, 6, 6, 6, 6, 6, 0],
        [0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 0],
        [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

var mapStatus4 =
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 0, 5, 0],
    [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 1, 0, 5, 1, 5, 3, 3, 5, 5, 0],
    [0, 0, 0, 0, 0, 0, 5, 5, 5, 1, 5, 0, 5, 1, 5, 5, 5, 5, 5, 0],
    [0, 5, 5, 5, 3, 3, 3, 5, 1, 5, 5, 0, 5, 1, 5, 5, 5, 5, 5, 0],
    [0, 5, 5, 5, 5, 3, 3, 1, 5, 5, 5, 0, 5, 1, 5, 0, 0, 5, 5, 0],
    [0, 5, 1, 1, 1, 1, 1, 5, 5, 5, 5, 0, 5, 5, 1, 3, 0, 5, 5, 0],
    [0, 1, 1, 5, 5, 0, 5, 5, 0, 5, 5, 5, 3, 5, 5, 1, 1, 5, 5, 0],
    [0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 1, 5, 5, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 5, 0, 0],
    [0, 0, 0, 0, 0, 5, 5, 5, 1, 1, 1, 1, 1, 5, 5, 1, 1, 5, 5, 0],
    [0, 5, 5, 5, 5, 5, 1, 1, 5, 3, 5, 5, 5, 1, 1, 1, 5, 5, 5, 0],
    [0, 1, 1, 1, 1, 1, 1, 5, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

var mapStatus5 =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 5, 5, 5, 5, 5, 3, 3, 3, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
        [0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0],
        [0, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

var mapStatus6 =
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 5, 5, 3, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 1, 1, 1, 3],
        [0, 5, 5, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 3, 3, 3],
        [3, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 1, 1, 0, 3, 3, 3, 5, 5, 3],
        [3, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 3, 3, 3, 5, 5, 5, 5, 3],
        [3, 5, 5, 5, 5, 0, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 0, 5, 5, 3],
        [3, 5, 5, 5, 1, 1, 1, 5, 5, 5, 3, 5, 5, 5, 5, 5, 3, 5, 5, 3],
        [0, 3, 3, 3, 3, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 1, 1, 1, 5, 5, 5, 5, 5, 5, 3],
        [0, 0, 0, 0, 0, 3, 3, 3, 3, 1, 1, 0, 1, 1, 1, 1, 5, 5, 5, 3],
        [0, 5, 5, 5, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 1, 1, 1, 3],
        [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 0, 5, 3, 3, 1, 1, 3],
        [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 3],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

var mapStatus7 =
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 2, 3, 3, 1],
    [1, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 0, 3, 3, 3, 1],
    [1, 3, 3, 1, 2, 3, 3, 3, 2, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 1, 1, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 0, 1, 0, 3, 3, 3, 3, 3, 3, 3, 2, 0, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 2, 1, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 0, 1, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 2, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    ]

var mapStatus8 =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0],
        [0, 3, 3, 0, 2, 2, 0, 3, 3, 1, 1, 3, 3, 0, 2, 2, 0, 3, 3, 0],
        [0, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 1, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 1, 3, 3, 3, 0],
        [0, 3, 3, 3, 1, 1, 3, 3, 0, 2, 2, 0, 3, 3, 1, 1, 3, 3, 3, 0],
        [0, 3, 3, 3, 1, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 1, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0],
        [0, 3, 3, 0, 2, 2, 0, 3, 3, 1, 1, 3, 3, 0, 2, 2, 0, 3, 3, 0],
        [0, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

var mapStatus9 =
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 3, 3, 3, 3, 3, 1, 2, 1, 2, 1, 1, 2, 3, 3, 3, 3, 1],
        [1, 0, 1, 3, 1, 1, 0, 3, 1, 2, 1, 3, 3, 1, 3, 3, 1, 1, 3, 1],
        [1, 0, 0, 3, 3, 3, 1, 3, 1, 2, 1, 3, 1, 0, 3, 1, 0, 1, 3, 1],
        [1, 3, 3, 3, 1, 3, 1, 3, 1, 1, 1, 3, 3, 1, 3, 3, 1, 0, 3, 1],
        [1, 3, 1, 3, 1, 3, 3, 3, 3, 3, 2, 3, 1, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 2, 1],
        [1, 3, 1, 3, 1, 1, 1, 1, 2, 3, 1, 3, 1, 3, 0, 3, 1, 3, 1, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 1],
        [1, 3, 3, 1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1],
        [1, 3, 3, 1, 3, 2, 1, 3, 1, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 1],
        [1, 1, 1, 1, 3, 2, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]