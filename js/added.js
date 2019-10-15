$(document).ready(function() {

  // User Signup

  $('.regSubmitBtn').click(function(event) {
    event.preventDefault();
    const fullname = $('#fullname').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    if (!fullname || !username || !password || !email) {
      alert('Kindly fill in all fields');
      return;
    }
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${email}`,
      data: {
        email,
      },
      success: function(response) {
        if (response.length) {
          alert("User already exist");
        } else {
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/users',
            data: {
              fullname,
              username,
              email,
              password,
            },
            success: function() {
              window.location.assign('userlogin.html');
            },
          });
        }
      },
    });
  });

  // User Signin

  $('.signinbutton').click(function(event) {
      event.preventDefault();
      const usernameSI = $('#usernameSI').val();
      const passwordSI = $('#passwordSI').val();
      if (!usernameSI || !passwordSI) {
        alert('Kindly fill in all fields');
        return;
      }
      $.ajax({
          method: 'GET',
          url: `http://localhost:3000/users?username=${usernameSI}&password=${passwordSI}`,
          data: {
              username: usernameSI,
              password: passwordSI,
          },
          success: function(response) {
              if (response.length) {
                  localStorage.setItem('username', usernameSI);
                  window.location.assign('index.html');
              } else {
                  alert('Username or Password Incorrect');
              }
          },
      });
  });

  // User Logout

  $('.userlogout').click(function() {
    localStorage.clear();
  });

  // Admin Signup

  $('.signupSubBtn').click(function(event) {
    event.preventDefault();
    const fullname = $('#fullname').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    if (!fullname || !username || !password || !email) {
      alert('Kindly fill in all fields');
      return;
    }
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/admin?email=${email}`,
      data: {
        email,
      },
      success: function(response) {
        if (response.length) {
          alert('User already exist');
        } else {
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/admin',
            data: {
              fullname,
              username,
              email,
              password,
            },
            success: function() {
              window.location.assign('adminlogin.html');
            },
          });
        }
      },
    });
  });

  // Admin Signin

  $('.signinBtn').click(function(event) {
    event.preventDefault();
    const usernameSI = $('#usernameSI').val();
    const passwordSI = $('#passwordSI').val();
    if (!usernameSI || !passwordSI) {
      alert('Kindly fill in all fields');
      return;
    }
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/admin?username=${usernameSI}&password=${passwordSI}`,
        data: {
            username: usernameSI,
            password: passwordSI,
        },
        success: function(response) {
            if (response.length) {
                localStorage.setItem('username', usernameSI);
                window.location.assign('createpost.html');
            } else {
                alert('Username or Password Incorrect');
            }
        },
    });
  });

// Admin Logout

  $('.logoutBtn').click(function() {
    localStorage.clear();
    window.location.assign('adminlogin.html');
  });

  // POST To DB

  var $title = $('#title');
  var $link = $('#link');
  var $body = $('#body');
  var $summary = $('#summary');
  $('#newPostBtn').on('click', function(event){
    event.preventDefault();
    var post = {
      title: $title.val(),
      link: $link.val(),
      body: $body.val(),
      summary: $summary.val(),
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/posts',
      data: post,
      success: function(newPost){
        $title.append('<a href="index.html"><h5>'+newPost.title+'</h5></a>');
        $link.append(newPost.link);
        $body.append('<p>'+newPost.body+'</p>');
        $summary.append('<p>'+newPost.summary+'</p>');
        $('#postform').trigger('reset');
        location.reload();       
      }
    });
  });

  // GET POST To Admin

  var $adminposts = $('#adminart');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts',
    success: function(posts){
      $.each(posts, function(i, post) {
        $adminposts.append(`<li style="list-style-type:none;" data-id=${post.id}><a href="${post.link}"><h5><span class="noedit title">${post.title}</span></h5></a><input id="updateTitle" class="edit titles text-input" placeholder="Update Title"/><p><span class="noedit link">${post.link}</span><br><input id="updateLink" class="edit link text-input" placeholder="Update Link"/></p><p><span class="noedit body">${post.body}</span><br><textarea id="updateText" class="edit body text-input" placeholder="Update Body" rows="5"></textarea></p><p><span class="noedit summary">${post.summary}</span><br><textarea id="updateSummary" class="edit summary text-input" placeholder="Update Summary" rows="5"></textarea></p><button data-id=${post.id} id="updtbutton" class="updtbutton noedit myadminbutton">Update</button> <button data-id=${post.id} id="saveButton" class="saveButton edit myadminbutton">Save</button> <button data-id=${post.id} id="cancelButton" class="cancelButton edit myadminbutton">Cancel</button> <button data-id=${post.id} id="delbutton" class="delbutton myadminbutton">Delete</button><hr><br><br>`);
      });
    }
  });

  // Manage Post DELETE
  
  $adminposts.delegate('.delbutton', 'click', function(){
    var $li = $(this).closest('li');
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/posts/' + $(this).attr('data-id'),
        success: function(){
          $li.fadeOut(300, function(){
            $(this).remove();
          });
        }
    });
  });

  // Manage Post UPDATE

  $adminposts.delegate('.updtbutton', 'click', function(){
    var $li = $(this).closest('li');
    $li.find('input.titles').val($li.find('span.title').html());
    $li.find('input.link').val($li.find('span.link').html());
    $li.find('textarea.body').val($li.find('span.body').html());
    $li.find('textarea.summary').val($li.find('span.summary').html());
    $li.addClass('edit');
  });

  // Manage Post CANCEL

  $adminposts.delegate('.cancelButton', 'click', function(){
    $(this).closest('li').removeClass('edit');
  });

  // Manage Post SAVE

  $adminposts.delegate('.saveButton', 'click', function(){
    var $li = $(this).closest('li');
    var post = {
        title:$li.find('input.titles').val(),
        link:$li.find('input.link').val(),
        body:$li.find('textarea.body').val(),
        summary:$li.find('textarea.summary').val(),
    };
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/posts/' + $li.attr('data-id'),
        data: post,
        success: function(newPosts){
          $li.find('span.titles').html(post.title);
          $li.find('span.link').html(post.link);
          $li.find('span.body').html(post.body);
          $li.find('span.summary').html(post.summary);
          $li.removeClass('edit');
          location.reload(); 
        }
    });
  });

  // Comment SHOW and HIDE

  $("#hide").click(function() {
    $("form").fadeOut("slow").hide();
  });

  $("#show").click(function() {
    $("form").fadeIn("slow").show();
  });

 // POST Comment To DB

  // var $usercomments = $('#usersname');
  // $.ajax({
  //   type: 'GET',
  //   url: 'http://localhost:3000/users',
  //   success: function(users){
  //     if (users.length) {
  //       $.each(users, function(i, user) {
  //         $usercomments.append(`<li style="list-style-type:none;" data-id=${user.id}><p><span class="usernames">${user.username}</span></p>`);
  //       });
  //     } else {
  //       $li.find('input.usercomment').val("Anonymous");
  //     }
  //   }
  // });

  // var $username = $('#usernames');
  // var $comment = $('#comment');
  // $('#newCommentBtn').on('click', function(event){
  //   event.preventDefault();
  //   var comment = {
  //     username: $username.val(),
  //     comment: $comment.val(),
  //   };
  //   $.ajax({
  //     type: 'POST',
  //     url: 'http://localhost:3000/comment-post1',
  //     data: comment,
  //     success: function(newComment){
  //       $username.append(newComment.username);
  //       $comment.append(newComment.comment);
  //       $('#comment-form').trigger('reset');
  //       location.reload();       
  //     }
  //   });
  // });

  //   // Display Comment

  // var $usercomments = $('#usercomment');
  // $.ajax({
  //   type: 'GET',
  //   url: 'http://localhost:3000/comment-post1',
  //   success: function(comments){
  //     $.each(comments, function(i, comment) {
  //       $usercomments.append(`<li style="list-style-type:none;" data-id=${comment.id}><p><span style="font-size: 20px; color: rgb(2, 2, 70); text-decoration: underline;">${comment.username}</span></p><p><span class="link" style="text-align: justify;">${comment.comment}</span></p>`);
  //     });
  //   }
  // });

  // // AutoCAD Post Comments Manager

  // var $username = $('#usernames');
  // var $comment = $('#comment');
  // $('#newCommentBtn').on('click', function(event){
  //   event.preventDefault();
  //   var comment = {
  //     username: $username.val(),
  //     comment: $comment.val(),
  //   };
  //   $.ajax({
  //     type: 'POST',
  //     url: 'http://localhost:3000/comment-post2',
  //     data: comment,
  //     success: function(newComment){
  //       $username.append(newComment.username);
  //       $comment.append(newComment.comment);
  //       $('#comment-form').trigger('reset');
  //       location.reload();       
  //     }
  //   });
  // });

  // var $usercomments = $('#usercomment');
  // $.ajax({
  //   type: 'GET',
  //   url: 'http://localhost:3000/comment-post2',
  //   success: function(comments){
  //     $.each(comments, function(i, comment) {
  //       $usercomments.append(`<li style="list-style-type:none;" data-id=${comment.id}><p><span style="font-size: 20px; color: rgb(2, 2, 70); text-decoration: underline;">${comment.username}</span></p><p><span class="link" style="text-align: justify;">${comment.comment}</span></p>`);
  //     });
  //   }
  // });

  // GET SUMMARY To Frontpage

  var $frontendposts = $('#frontendpost');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts',
    success: function(posts){
      $.each(posts, function(i, post) {
        $frontendposts.append(`<li style="list-style-type:none;" data-id=${post.id}><a href="${post.link}"><h5><span class="noedit title">${post.title}</span></h5></a><input id="updateTitle" class="edit titles text-input" placeholder="Update Title"/><p><span class="noedit summary">${post.summary}</span><a href="${post.link}">Read More</a><hr>`);
      });
    }
  });

  // CKEditor

  // ClassicEditor
  // .create( document.querySelector( '#body' ), {
  //     toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
  //     heading: {
  //         options: [
  //             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
  //             { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
  //             { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
  //         ]
  //     }
  // } )
  // .catch( error => {
  //     console.log( error );
  // } );
});