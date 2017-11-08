using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using KeysOnboarding.Models;

namespace KeysOnboarding.Controllers
{
    public class CustomersController : Controller
    {
        private KeysOnboardingContext db = new KeysOnboardingContext();

        //Render view of customers
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        //Get Json data of all customers
        [HttpGet]
        public JsonResult GetAllCustomers()
        {
            return Json(db.Customers, JsonRequestBehavior.AllowGet);
        }

        //Add new customer
        [HttpPost]
        public JsonResult AddCustomer(Customer item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            db.Customers.Add(item);
            db.SaveChanges();
            return Json(item, JsonRequestBehavior.AllowGet);
        }


        //Edit customer info
        [HttpPost]
        public JsonResult EditCustomer(Customer item)
        {
            try
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }

                var product = db.Customers.Single(a => a.Id == item.Id);
                product.Name = item.Name;
                product.Address = item.Address;
                db.SaveChanges();
            }
            catch
            {
                return Json(null);
            }
            return Json(db.Customers, JsonRequestBehavior.AllowGet);

        }


        // Delete customer
        [HttpPost]
        public JsonResult DeleteCustomer(int id)
        {
            try
            {
                Customer customer = db.Customers.Find(id);
                db.Customers.Remove(customer);
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
