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
    public class StoresController : Controller
    {
        private KeysOnboardingContext db = new KeysOnboardingContext();

        //Render view of stores
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        //Get Json data of all stores
        [HttpGet]
        public JsonResult GetAllStores()
        {
            return Json(db.Stores, JsonRequestBehavior.AllowGet);
        }

        //Add new store
        [HttpPost]
        public JsonResult AddStore(Store item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            db.Stores.Add(item);
            db.SaveChanges();
            return Json(item, JsonRequestBehavior.AllowGet);
        }


        //Edit store info
        [HttpPost]
        public JsonResult EditStore(Store item)
        {
            try
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }

                var product = db.Stores.Single(a => a.Id == item.Id);
                product.Name = item.Name;
                product.Address = item.Address;
                db.SaveChanges();
            }
            catch
            {
                return Json(null);
            }
            return Json(db.Stores, JsonRequestBehavior.AllowGet);

        }


        // Delete store
        [HttpPost]
        public JsonResult DeleteStore(int id)
        {
            try
            {
                Store store = db.Stores.Find(id);
                db.Stores.Remove(store);
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
