using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Memory_Game
{
    /// <summary>
    /// Summary description for getWinners
    /// </summary>
    public class getWinners : IHttpHandler
    {
        connForDB theConnect;


        public void ProcessRequest(HttpContext context)
        {

            if (theConnect == null)
            {
                theConnect = new connForDB();
            }

            string str = theConnect.bestGames();
            context.Response.ContentType = "text/plain";
            context.Response.Write(str);

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}