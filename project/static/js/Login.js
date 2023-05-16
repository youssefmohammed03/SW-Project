


function validate(){
    const user_name = document.getElementById("user_name");
    const pass_word = document.getElementById("pass_word");

    const usernameval = user_name.value.trim();
    const passwordval = pass_word.value.trim();


    if(usernameval == ""){
      alert("Username cannot be blank");
      return false;
    }
    else if(usernameval.length <=2){
      alert("Username cannot be less than 3 char");
      return false;
    }
    if(passwordval == ""){
      alert("Password cannot be blank");
      return false;
    }
    else if(passwordval.length <=5){
      alert("Password cannot be less than 6");
      return false;
  }
  return true;
  }