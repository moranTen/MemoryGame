//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Memory_Game
{
    using System;
    using System.Collections.Generic;
    
    public partial class Winner
    {
        public int WinnerID { get; set; }
        public int PlayerID { get; set; }
        public int BestPlayerScore { get; set; }
        public System.TimeSpan BestPlayerTime { get; set; }
    
        public virtual Player Player { get; set; }
    }
}
