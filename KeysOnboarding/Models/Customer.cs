using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KeysOnboarding.Models
{
    public class Customer
    {
        public virtual int Id { get; set; }
        [Display(Name = "Customer Name")]
        [Required(ErrorMessage = "Please intput Customer Name")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        public virtual string Name { get; set; }
        [Display(Name = "Customer Address")]
        [Required(ErrorMessage = "Please intput Address")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        public virtual string Address { get; set; }
        //public virtual List<ProductSold> ProductSolds { get; set; }
    }
}