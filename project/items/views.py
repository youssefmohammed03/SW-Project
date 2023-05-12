import json
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404 , redirect
from django.contrib.auth.decorators import login_required
from .models import Items, Category2 , Order
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt




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


@csrf_exempt
def save_order(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        items_list = body_data.get('itemsList', '')
        order = Order(items=items_list)
        order.save()
        return JsonResponse({'success': True})
    return render(request, 'Products.html')