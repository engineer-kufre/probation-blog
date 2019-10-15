$(document).ready(function() {
    var $username = $('#usernames');
    var $comment = $('#comment');
    $('#newCommentBtn').on('click', function(event){
        event.preventDefault();
        var comment = {
        username: $username.val(),
        comment: $comment.val(),
        };
        $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/comment-post1',
        data: comment,
        success: function(newComment){
            $username.append(newComment.username);
            $comment.append(newComment.comment);
            $('#comment-form').trigger('reset');
            location.reload();       
        }
        });
    });

    // Display Comment

    var $usercomments = $('#usercomment');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/comment-post1',
        success: function(comments){
        $.each(comments, function(i, comment) {
            $usercomments.append(`<li style="list-style-type:none;" data-id=${comment.id}><p><span style="font-size: 20px; color: rgb(2, 2, 70); text-decoration: underline;">${comment.username}</span></p><p><span class="link" style="text-align: justify;">${comment.comment}</span></p>`);
        });
        }
    });
});