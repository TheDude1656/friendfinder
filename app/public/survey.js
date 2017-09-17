var name, picURL, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, newFriend;

$("#submit").on("click", function (event) {

    event.preventDefault();
    name = $("#name").val();
    picURL = $("#picURL").val();
    q1 = parseInt($('#q1').val());
    q2 = parseInt($('#q2').val());
    q3 = parseInt($('#q3').val());
    q4 = parseInt($('#q4').val());
    q5 = parseInt($('#q5').val());
    q6 = parseInt($('#q6').val());
    q7 = parseInt($('#q7').val());
    q8 = parseInt($('#q8').val());
    q9 = parseInt($('#q9').val());
    q10 = parseInt($('#q10').val());
    newFriend = new Friend(name, picURL, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);

    var modalTitle = $(".modal-title");
    var modalBody = $(".modal-body");
    var modal = $("#modal");
    var apiFriendsRoute = "/api/friends";

    if (filledOut()) {
        $.get(apiFriendsRoute, function (data) {
            console.log(data);
            var match = friendMatch(data);
            if (match.name !== undefined) {
                modalTitle.text('You have a match!');
                modalBody.html('<p class="strong">You\'re most compatible with:</p><p>' + match.name + '</p><img src="' + match.picURL + '" height="45">');
            } else {
                modalTitle.text('Too few friends');
                modalBody.text('Sorry, there are too few friends to match you with.');
            }
        }).then(function () {
            $("#modal").modal('show');
            $(".form")[0].reset();
            $.post(apiFriendsRoute, newFriend);
        });
    } else {
        modalTitle.text('Error');
        modalBody.text('Please make sure all questions have been filled in.');
        $("#modal").modal('show');
    };
});

function filledOut() {
    return (name !== '' && picURL !== '' && !isNaN(q1) && !isNaN(q2) && !isNaN(q3) && !isNaN(q4) &&
        !isNaN(q5) && !isNaN(q6) && !isNaN(q7) && !isNaN(q8) && !isNaN(q9) && !isNaN(q10));
};

function Friend(name, picURL, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) {
    this.name = name;
    this.picture = picURL;
    this.q1 = q1;
    this.q2 = q2;
    this.q3 = q3;
    this.q4 = q4;
    this.q5 = q5;
    this.q6 = q6;
    this.q7 = q7;
    this.q8 = q8;
    this.q9 = q9;
    this.q10 = q10
};

function friendMatch(data) {
    var difference = 50;
    var minName;
    var minImage;
    data.forEach(function (response) {
        var localDiff = Math.abs(newFriend.total - response.total);
        if (localDiff < difference) {
            difference = localDiff;
            minName = response.name;
            minImage = response.image;
        }
    });
    return {
        name: minName,
        image: minImage
    };

};