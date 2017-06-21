using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace Memory_Game
{
    /// <summary>
    /// Summary description for connection
    /// </summary>
    public class connection : IHttpHandler
    {
        HttpContext _context;
        connForDB theConnect;

        public void ProcessRequest(HttpContext context)
        {
            _context = context;
            string clicked = context.Request.QueryString["clicked"];
            string firstName = context.Request.QueryString["firstName"];
            string lastName = context.Request.QueryString["lastName"];
            string email = context.Request.QueryString["email"];
            string password = context.Request.QueryString["pass"];
            string score = context.Request.QueryString["score"];
            string time= context.Request.QueryString["time"];

            bool isUser = false;
            if (theConnect == null)
            {
                theConnect = new connForDB();
            }
            List<Game> g;
            switch (clicked)
            {
                case "register":
                    {
                        theConnect.newUser(firstName, lastName, email, password);
                        break;
                    }
                case "login":
                    {
                        isUser = theConnect.login(email, password);
                        break;
                    }
                case "game":
                    {
                        theConnect.newGame(email,score , time);
                        break;
                    }
            }

            context.Response.ContentType = "text/plain";
            context.Response.Write(isUser);
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