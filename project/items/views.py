from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Items, Category2


@login_required
def products(request):
    category_id = request.GET.get('category')
    if category_id:
        items = Items.objects.filter(category_id=category_id)
        category_name = Category2.objects.get(id=category_id).name
    else:
        items = Items.objects.all()
        category_name = 'All Products'
    context = {
        'items': items,
        'category_name': category_name
    }
    return render(request, 'item/Products.html', context)


def details(request, item_id):
    item = get_object_or_404(Items, id=item_id)
    context = {
        'item': item
    }
    return render(request, 'item/ProductDetails.html', context)


