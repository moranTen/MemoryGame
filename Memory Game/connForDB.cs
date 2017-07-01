using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Memory_Game
{
    public class connForDB
    {
        Memory_Game_DBEntities _contextDB;
        public connForDB()
        {
            _contextDB = new Memory_Game_DBEntities();
        }

        public void newUser(string firstName, string lastName, string email, string password)
        {
            string encrypetPass;
                using (SHA256 a = SHA256.Create())
            {
                encrypetPass = Convert.ToBase64String(Encoding.ASCII.GetBytes(password));
            }
            _contextDB.Players.Add(new Player()
            {
                FiratName = firstName,
                LastName = lastName,
                Email = email,
                Password = encrypetPass
            });
            _contextDB.SaveChanges();
        }

        public bool login(string email, string password)
        {
            string encrypetPass;
            using (SHA256 a = SHA256.Create())
            {
                encrypetPass = Convert.ToBase64String(Encoding.ASCII.GetBytes(password));
            }
            var list = _contextDB.Players.Where(x => x.Email == email && x.Password == encrypetPass).ToList();
            if (list.Count == 0)
                return false;
            else
                return true;

        }

        public void newGame(string email, string score, string time)
        {
            var player = _contextDB.Players.Where(x => x.Email == email).FirstOrDefault();
            var theTime = time.Split('.');
            _contextDB.Games.Add(new Game()
            {
                GameScore = int.Parse(score),
                GameTime = new TimeSpan(0, int.Parse(theTime[0]), int.Parse(theTime[1])),
                PlayerID = player.PlayerID
            });
            _contextDB.SaveChanges();

        }

        public string bestGames()
        {
            foreach (var item in _contextDB.Winners)
            {
                _contextDB.Winners.Remove(item);
            }
            _contextDB.SaveChanges();
            
            string str = "";
            List<Game> l = _contextDB.Games.OrderBy(x => x.GameTime).ThenByDescending(y => y.GameScore).ToList();
            List<Game> winners = new List<Game>();
            var gamesNumber = _contextDB.Games.Count();
            if (gamesNumber > 5)
                gamesNumber = 5;
            for (int i = 0; i < gamesNumber; i++)
            {
                Game w = l.ElementAt(i);
                _contextDB.Winners.Add(new Winner() {
                    PlayerID = w.PlayerID,
                    BestPlayerScore = w.GameScore,
                    BestPlayerTime = w.GameTime,
                    
                });
                _contextDB.SaveChanges();
                var pl =_contextDB.Players.Where(x=> x.PlayerID == w.PlayerID).First();
                str += pl.Email + " " + w.GameTime + " " + w.GameScore + " ";   
                
            }
            return str;
        }
    }
}