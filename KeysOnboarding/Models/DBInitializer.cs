using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KeysOnboarding.Models
{
    public class DBInitializer : System.Data.Entity.DropCreateDatabaseAlways<KeysOnboardingContext>
    {
        protected override void Seed(KeysOnboardingContext context)
        {
            List<Product> products = new List<Product> { new Product {Name="MobilePhone",Price=1000.00m },
                                     new Product { Name = "TV", Price = 9900.00m },
                                     new Product { Name = "Projecter", Price = 2000.00m }};
            context.Products.AddRange(products);

            List<Customer> customers = new List<Customer> { new Customer {Name="Jobs",Address="USA" },
                                     new Customer { Name = "Jack Ma", Address="China" },
                                     new Customer { Name = "Elizabeth", Address="British" }};
            context.Customers.AddRange(customers);

            List<Store> stores = new List<Store> { new Store {Name="Warehouse",Address="Wellington" },
                                     new Store { Name = "CountDown", Address="Auckland" },
                                     new Store { Name = "PB", Address="Christchurch" }};
            context.Stores.AddRange(stores);

            base.Seed(context);
        }
    }
}