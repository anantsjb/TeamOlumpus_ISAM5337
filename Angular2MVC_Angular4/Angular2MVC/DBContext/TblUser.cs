//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Angular2MVC.DBContext
{
    using System;
    using System.Collections.Generic;
    
    public partial class TblUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Role { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsLocked { get; set; }
        public string SecurityAnswer { get; set; }
        public Nullable<int> CompanyId { get; set; }
    }
}
