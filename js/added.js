// CKEditor

ClassicEditor
.create( document.querySelector( '#body' ), {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
    }
} )
.catch( error => {
    console.log( error );
} );

// User Signup

$(document).ready(function() {
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
              $('#signup').trigger('reset');
            },
          });
        }
      },
    });
  });
});