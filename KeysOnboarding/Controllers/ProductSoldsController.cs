using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using KeysOnboarding.Models;
using Newtonsoft.Json;

namespace KeysOnboarding.Controllers
{
    public class ProductSoldsController : Controller
    {
        private KeysOnboardingContext db = new KeysOnboardingContext();

        // GET: ProductSolds
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResultExtension GetAllProductSolds()
        {
            //var productSolds = db.ProductSolds.Select(x => new
            //{
            //    Id = x.Id,
            //    ProductId = x.ProductId,
            //    CustomerId = x.CustomerId,
            //    SroreId = x.StoreId,
            //    Product = x.Product.Name,
            //    Customer = x.Customer.Name,                              
            //    Store = x.Store.Name,
            //    DateSold = x.DateSold
            //}).ToList();
            var productSolds = db.ProductSolds.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store);
            //var jsonResult = JsonConvert.SerializeObject(productSolds);

            return new JsonResultExtension(productSolds,"dd/MM/yyyy");
        }


        [HttpPost]
        public JsonResult AddProductSold(ProductSold item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to save record into database
            db.ProductSolds.Add(item);
            db.SaveChanges();
            return new JsonResultExtension(item, "dd/MM/yyyy"); ;
        }

        [HttpPost]
        public JsonResult EditProductSold(ProductSold item)
        {
            try
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }

                var productSold = db.ProductSolds.Single(a => a.Id == item.Id);

                productSold.ProductId = item.ProductId;
                productSold.CustomerId = item.CustomerId;
                productSold.StoreId = item.StoreId;
                productSold.DateSold = item.DateSold;


                db.SaveChanges();
            }
            catch
            {
                return Json(null);
            }
            return new JsonResultExtension(db.ProductSolds, "dd/MM/yyyy");

        }

        [HttpPost]
        public JsonResult DeleteProductSold(int id)
        {
            try
            {
                ProductSold productSold = db.ProductSolds.Find(id);
                db.ProductSolds.Remove(productSold);
                db.SaveChanges();
            }
            catch
            {
                return Json(new { Status = false }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
