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
    public class CustomersController : ApiController
    {
        protected readonly UserDBEntities _db = new UserDBEntities();


        public IEnumerable<Customer> Get()
        {
            return _db.Customers.AsEnumerable().Skip(0).Take(10);
        }

        public HttpResponseMessage Get(string custId)
        {
            var customerOrders = _db.Customers.Include(n => n.Orders).FirstOrDefault(c => c.CustomerID == custId);
            
            //Getting Cusotmer Orders in JOIN approach

            //var customerOrders = _db.Customers
            //    .Join(_db.Orders,
            //        c => c.CustomerID,
            //        o => o.CustomerID,
            //        (c, o) => new { c, o }).Where(x => x.c.ContactName == custName).Select (x =>new {x.c.CustomerID, x.o});





            // Joining 3 tables
            //var query = _db.Customers // source
            //    .Join(_db.Orders, // target
            //        c => c.CustomerID, // FK
            //        cm => cm.CustomerID, // PK
            //        (c, cm) => new { Customer = c, Order = cm })
            //    .Join(_db.Order_Details, po => po.Order.OrderID,
            //        od => od.OrderID,
            //        (po, od) => new { CustomerOrders = po, OrderDetails = od }).
            //     Select(x =>
            //        new { x.CustomerOrders.Customer.ContactName, x.CustomerOrders.Customer.CustomerID, x.CustomerOrders.Order.ShipCity, x.OrderDetails }).Where(c => c.ContactName == custName).ToList();




            //return _db.Customers.ToList().Take(10).Skip(0);
            //HttpResponseMessage response = Request.CreateResponse<dynamic>(HttpStatusCode.OK, customerOrders);
            //return response;


            //var custOrders = (from c in _db.Customers
            //    join od in _db.Orders on c.CustomerID equals od.CustomerID
            //    where c.ContactName == custName
            //    select new
            //    {
            //        c.CustomerID,
            //        c.ContactName,
            //        od.OrderID,
            //        od.ShipAddress
            //    }).Take(10);

            return Request.CreateResponse<dynamic>(HttpStatusCode.OK, customerOrders);

        }
    }

}
