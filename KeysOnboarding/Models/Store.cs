using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KeysOnboarding.Models
{
    public class Store
    {
        public virtual int Id { get; set; }
        [Display(Name = "Store Price")]
        [Required(ErrorMessage = "Please intput Store Name")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        public virtual string Name { get; set; }
        [Display(Name = "Store Address")]
        [Required(ErrorMessage = "Please intput Store Address")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        public virtual string Address { get; set; }
        public virtual List<ProductSold> ProductSolds { get; set; }
    }
}