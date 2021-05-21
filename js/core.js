// Name and Password from the register-form
    var name = document.getElementById('username');
    var pw = document.getElementById('password');
  
  // storing input from register-form
  function store(event) {
    event.preventDefault();
      localStorage.setItem('username', username.value);
      localStorage.setItem('password', password.value);
      window.location.assign("home.html");
  }
  // check if stored data from register-form is equal to entered data in the   login-form
  function check(event) {
    event.preventDefault();
      // stored data from the register-form
      var storedName = localStorage.getItem('username');
      var storedPw = localStorage.getItem('password');
  
      // entered data from the login-form
      var userName = document.getElementById('userLogin');
      var userPw = document.getElementById('passLogin');
      
      // check if stored data from register-form is equal to data from login form
      if(userName.value == storedName && userPw.value == storedPw) {
        window.location.assign("pages/home.html");
        
      }else {
        alert('Invalid Username or Password');
        return false
          
      }
  }
  

