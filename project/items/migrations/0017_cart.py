# Generated by Django 4.2 on 2023-05-10 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0016_cartitem_remove_orderitem_order_delete_order_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('items', models.ManyToManyField(to='items.cartitem')),
            ],
        ),
    ]
