from django.shortcuts import render, get_object_or_404 , redirect
from django.contrib.auth.decorators import login_required
from .models import Items, Category2 , Order
from django.views.decorators.http import require_POST




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



@login_required
def ordersaved(request):
    return render(request, 'item/ordersaved.html')


@require_POST
def save_order(request):
    item_ids = request.POST.getlist('item_ids[]')
    items = Items.objects.filter(id__in=item_ids)
    order = Order.objects.create()
    order.items.set(items)
    return redirect('ordersaved')