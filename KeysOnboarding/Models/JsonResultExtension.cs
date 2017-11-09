using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KeysOnboarding.Models
{
    public class JsonResultExtension : JsonResult
    {

        public JsonResultExtension() { }

        public JsonResultExtension(object data)
        {
            base.Data = data;
            base.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            this.DateTimeFormat = "yyyy-MM-dd hh:mm:ss";
        }
        public JsonResultExtension(object data, JsonRequestBehavior behavior)
        {
            base.Data = data;
            base.JsonRequestBehavior = behavior;
            this.DateTimeFormat = "yyyy-MM-dd hh:mm:ss";
        }
        public JsonResultExtension(object data, String dateTimeFormat)
        {
            base.Data = data;
            base.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            this.DateTimeFormat = dateTimeFormat;
        }

        /// <summary>
        /// 日期格式
        /// </summary>
        public string DateTimeFormat { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }
            if ((this.JsonRequestBehavior == JsonRequestBehavior.DenyGet) && string.Equals(context.HttpContext.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("MvcResources.JsonRequest_GetNotAllowed");
            }
            HttpResponseBase httpResponse = context.HttpContext.Response;
            if (!string.IsNullOrEmpty(this.ContentType))
            {
                httpResponse.ContentType = this.ContentType;
            }
            else
            {
                httpResponse.ContentType = "application/json";
            }
            if (this.ContentEncoding != null)
            {
                httpResponse.ContentEncoding = this.ContentEncoding;
            }
            if (this.Data != null)
            {
                //ISO 8601 (2008-04-12T12:53Z)
                IsoDateTimeConverter isoDateTimeConverter = new IsoDateTimeConverter();
                
                isoDateTimeConverter.DateTimeFormat = DateTimeFormat;
                
                String jsonResult = JsonConvert.SerializeObject(this.Data, isoDateTimeConverter);

                httpResponse.Write(jsonResult);
            }

        }
    }

}