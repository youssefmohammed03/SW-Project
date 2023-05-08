
function validate(){

    const First = document.getElementById("First");
    const Second = document.getElementById("Second");
    const username = document.getElementById("username");
    const Password = document.getElementById("Password");
    const Email= document.getElementById("Email");

    const firstval = First.value.trim();
    const secondval = Second.value.trim();
    const usernameval = username.value.trim();
    const passwordval = Password.value.trim();
    const emailval = Email.value.trim();




    if(firstval == ""){
      alert("First name cannont be blank");
      return false;
    }
    else if (firstval.length <=2){
      alert("First name cannot be less than 3 char ");
      return false;
    }
    if(secondval == ""){
      alert("Last name cannont be blank");
      return false;
    }
    else if (secondval.length <=2){
      alert("Last name cannot be less than 3 char ");
      return false;
    }
    if(emailval == ""){
      alert("Email cannont be blank");
      return false;
    }
    else if (emailval.length <=9){
      alert("Email cannot be less than 10 char ");
      return false;
    }
    if(usernameval == ""){
      alert("Username cannont be blank");
      return false;
    }
    else if(usernameval.length <=2){
      alert("Username cannont be less than 3 char");
      return false;
    }
    if(passwordval == ""){
      alert("Password cannont be blank");
      return false;
    }
    else if(passwordval.length <=5){
      alert("Password cannont be less than 6");
      return false;
  }


  return true;

  }