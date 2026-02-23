using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IBusinessCar
    {
        List<Car> GetCars();
        string Delete(Car car);
    }
}
