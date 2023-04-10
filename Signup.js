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
                  const username = document.getElementById("username");
                  const Password = document.getElementById("Password");
                  const Email= document.getElementById("Email");
                  const Phone = document.getElementById("Phone");


                  const usernameval = username.value.trim();
                  const passwordval = Password.value.trim();
                  const emailval = Email.value.trim();
                  const phoneval = Phone.value.trim();

                    

                  if(emailval == ""){
                    alert("Email cannont be blank");
                  }
                  else if (emailval.length <=9){
                    alert("Email cannot be less than 10 char ");
                  }
                  if(usernameval == ""){
                    alert("Username cannont be blank");
                  }
                  else if(usernameval.length <=2){
                    alert("Username cannont be less than 3 char");
                  }
                  if(phoneval == ""){
                    alert("Phone number cannont be blank");
                  }
                  else if(phoneval.length <=10){
                    alert("Phone number cannont be less than 11 char");
                }
                  if(passwordval == ""){
                    alert("Password cannont be blank");
                  }
                  else if(passwordval.length <=5){
                    alert("Password cannont be less than 6");
                }
                  
                

                }