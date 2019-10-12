$(document).ready(function() {

  // User Signup

  $('.regSubmitBtn').click(function(event) {
    event.preventDefault();
    const fullname = $('#fullname').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
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
  var $body = $('#body');
  $('#newPostBtn').on('click', function(event){
    event.preventDefault();
    var post = {
      title: $title.val(),
      body: $body.val(),
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/posts',
      data: post,
      success: function(newPost){
        $title.append('<a href="index.html"><h5>'+newPost.title+'</h5></a>');
        $body.append('<p>'+newPost.body+'</p>');
        $('#postform').trigger('reset');
        alert('Article Posted'); 
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
        $adminposts.append(`<li style="list-style-type:none;" data-id=${post.id}><a href="index.html"><h5><span class="noedit title">${post.title}</span></h5></a><br><input id="updateTitle" class="edit titles text-input" placeholder="Update Title"/><br><br><p><span class="noedit body">${post.body}</span><br><textarea id="updateText" class="edit body text-input" placeholder="Update Body"></textarea></p><button data-id=${post.id} id="updtbutton" class="updtbutton noedit myadminbutton">Update</button> <button data-id=${post.id} id="saveButton" class="saveButton edit myadminbutton">Save</button> <button data-id=${post.id} id="cancelButton" class="cancelButton edit myadminbutton">Cancel</button> <button data-id=${post.id} id="delbutton" class="delbutton myadminbutton">Delete</button><hr><br><br>`);
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
            $li.remove();
        }
    });
  });

  // Manage Post UPDATE

  $adminposts.delegate('.updtbutton', 'click', function(){
    var $li = $(this).closest('li');
    $li.find('input.titles').val($li.find('span.title').html());
    $li.find('textarea.body').val($li.find('span.body').html());
    $li.addClass('edit');
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