using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.Results;
using WebAPI.DBContext;

namespace WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class OrdersController : ApiController
    {
        protected readonly UserDBEntities _db = new UserDBEntities();


        public IEnumerable<Order> Get()
        {
            //return _db.Orders.ToList().Take(10).Skip(0);
            return _db.Orders.ToList();
        }

        //[Route("api/srini/{id}")]
        public IHttpActionResult Get(int id)
        {
            if (id < 1)
            {
                return Ok(new Order());
            }


            var cust = _db.Orders.Include(n => n.Order_Details).FirstOrDefault(x => x.OrderID == id);
            if (cust == null)
            {
                return NotFound();
            }

            return Ok(cust);
        }


        public IHttpActionResult Post([FromBody] Order value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest("Can't be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                _db.Orders.Add(value);

                _db.SaveChanges();

                return Ok(value);



            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

        }

        public IHttpActionResult Put(int id, [FromBody]Order value)
        {
            if (value == null)
            {
                return BadRequest("Can't be null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (value.OrderID > 0)
            {
                _db.Entry(value).State = EntityState.Modified;
                return Ok(_db.SaveChanges());
            }

            return BadRequest();

        }
        public IHttpActionResult Delete(int id)
        {
            var ordr = _db.Orders.FirstOrDefault(x => x.OrderID == id);
            if (ordr == null)
                return NotFound();

            _db.Orders.Remove(ordr);
            return Ok(_db.SaveChanges());
        }
    }
}
