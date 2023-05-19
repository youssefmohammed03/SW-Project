from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.contrib import messages 


@login_required
def index(request):
    return render(request, 'core/Home.html')



def signup(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']

        if User.objects.filter(email=email).exists():
            message = 'Email is already taken'
            messages.error(request, message)
            return render(request, 'core/Signup.html', {'username': username, 'email': email, 'first_name': first_name, 'last_name': last_name, 'message': message})
        elif User.objects.filter(username=username).exists():
            message = 'Username is already taken'
            messages.error(request, message)
            return render(request, 'core/Signup.html', {'username': username, 'email': email, 'first_name': first_name, 'last_name': last_name, 'message': message})
        else:
            user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
            user.save()
            message = 'Your account has been created!'
            messages.success(request, message)
            return redirect('login')
    else:
        return render(request, 'core/Signup.html')
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'You have been logged in!')
            return redirect('index')
        else:
            messages.error(request, 'Invalid username or password.')
            return render(request, 'core/Login.html', {'username': username})
    else:
        return render(request, 'core/Login.html')
    

@login_required
def profile(request):
    user = request.user
    context = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'email': user.email,
    }
    return render(request, 'core/User.html', context)


def logout_view(request):
    logout(request)
    return redirect('login')


