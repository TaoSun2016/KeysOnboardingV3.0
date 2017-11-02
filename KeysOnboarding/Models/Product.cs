using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KeysOnboarding.Models
{
    public class Product
    {
        public virtual int Id { get; set; }
        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Please intput the Product Name")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        public virtual string Name { get; set; }


        [Display(Name = "Product Price")]
        [Required(ErrorMessage = "Please intput the Price")]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString ="{0:C}")]
        public virtual decimal Price { get; set; }
        public virtual List<ProductSold> ProductSolds { get; set; }
    }
}