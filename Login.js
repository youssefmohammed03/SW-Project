$('.btn').click(function(){
    $(this).toggleClass("click");
    $('.sidebar').toggleClass("show");
  });
    $('.feat-btn').click(function(){
      $('nav ul .feat-show').toggleClass("show");
      $('nav ul .first').toggleClass("rotate");
    });
    $('.serv-btn').click(function(){
      $('nav ul .serv-show').toggleClass("show1");
      $('nav ul .second').toggleClass("rotate");
    });
    $('nav ul li').click(function(){
      $(this).addClass("active").siblings().removeClass("active");
    });


    function validate(){
    const user_name = document.getElementById("user_name");
    const pass_word = document.getElementById("pass_word");

    const usernameval = user_name.value.trim();
    const passwordval = pass_word.value.trim();


    if(usernameval == ""){
      alert("Username cannont be blank");
    }
    else if(usernameval.length <=2){
      alert("Username cannont be less than 3 char");
    }
    if(passwordval == ""){
      alert("Password cannont be blank");
    }
    else if(passwordval.length <=5){
      alert("Password cannont be less than 6");
  }
  }